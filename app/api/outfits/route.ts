import { NextRequest } from "next/server";
import { auth } from "@/auth-config";
import { ClothingDTO } from "@/types/clothing-dto";
import { fetchWeatherByLocation } from "@/lib/weather-api-requests";
import { db } from "@/db-config";
import { z } from "zod";
import { WEATHER_CONDITIONS } from "@/types/weather-conditions";
import { weatherDataSchema } from "@/types/weather-data";

async function fetchWeatherByCurrentLocation(latitude: number, longitude: number) {
  return fetchWeatherByLocation(latitude, longitude);
}

const locationSchema = z.object({
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  location_id: z.string().uuid().optional(),
});

// TODO refactor this endpoint at some point
export async function GET(request: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  // collect client input parameters
  const { searchParams } = request.nextUrl;
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const savedLocationId = searchParams.get("saved_location");
  // no location given - return bad request error
  if (!(latitude && longitude) && !savedLocationId) {
    return Response.json({}, { status: 400 });
  }

  // validate client input
  const requestBody = locationSchema.safeParse({
    latitude: latitude ? Number.parseFloat(latitude) : undefined,
    longitude: longitude ? Number.parseFloat(longitude) : undefined,
    location_id: savedLocationId ? savedLocationId : undefined,
  });
  if (!requestBody.success) {
    return Response.json(
      {
        error: requestBody.error.issues,
      },
      { status: 400 },
    );
  }

  // select target location (saved location prioritized over current location if it exists)
  let targetLocation: { latitude: number; longitude: number };
  if (savedLocationId) {
    const savedLocation = await db
      .selectFrom("Location")
      .select(["Location.latitude", "Location.longitude"])
      .where("Location.id", "=", `${savedLocationId}`)
      .where("Location.owner", "=", `${session.user.id}`)
      .executeTakeFirst();

    if (!savedLocation) {
      return Response.json(
        {
          error: "Could not find the specified location",
        },
        { status: 400 },
      );
    }

    targetLocation = savedLocation;
  } else if (requestBody.data.latitude && requestBody.data.longitude) {
    targetLocation = { latitude: requestBody.data.latitude, longitude: requestBody.data.longitude };
  } else {
    // this should be impossible, but you never know...
    return Response.json({}, { status: 400 });
  }

  // fetch weather for the target location
  const weatherResponse = await fetchWeatherByCurrentLocation(targetLocation.latitude, targetLocation.longitude);
  if (!weatherResponse.ok) {
    return Response.json(
      {
        error: "Could not find weather for that location",
      },
      { status: 400 },
    );
  }

  const weatherData = await weatherResponse.json();
  const weather = weatherDataSchema.safeParse(weatherData);
  if (!weather.success) {
    return Response.json(
      {
        error: "Weather data error",
      },
      { status: 500 },
    );
  }

  const wardrobe = await db
    .selectFrom("Clothing")
    .select([
      "Clothing.id",
      "Clothing.clothing_type",
      "Clothing.season",
      "Clothing.name",
      "Clothing.is_precipitation_proof",
      "Clothing.icon_path",
    ])
    .where("Clothing.owner", "=", `${session.user.id}`)
    .execute();

  // this is the weather-keyword: "unknown", "sunny", "cloudy", "rainy", "snowy"
  const weatherKeyword =
    WEATHER_CONDITIONS.find((condition) => weatherData.current.condition.code === condition.code)?.generalCondition ||
    "unknown";
  // this is the array that is supposed to contain the clothes that will make up the outfit
  const outfit: ClothingDTO[] = [];
  // weather data is available through the following variable: weather.data
  //weather.data

  // TODO: add outfit-building logic here (pick appropriate clothing based on weather data)

  // the return is set up here per the API documentation (with the addition of _debug)
  return Response.json(
    {
      outfit,
      degrees_c: weatherData.current.temp_c,
      weather_keyword: weatherKeyword,
      weather_picture: `/public/icons/${weatherKeyword}.png`,
      _debug: { wardrobe, weatherData, weatherKeyword },
    },
    { status: 200 },
  );
}
