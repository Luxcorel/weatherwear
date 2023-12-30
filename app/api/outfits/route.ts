import { NextRequest } from "next/server";
import { auth } from "@/auth-config";
import { ClothingDTO } from "@/types/clothing-dto";
import { fetchWeatherByLocation } from "@/lib/weather-api-requests";
import { db } from "@/db-config";
import { z } from "zod";
import { WEATHER_CONDITIONS } from "@/types/weather-conditions";
import { weatherDataSchema } from "@/types/weather-data";
import { UsableTemperatureRange } from "@/types/usableTemperatureRange";

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

  const weatherResponseBody = (await weatherResponse.json()) as unknown;
  const weather = weatherDataSchema.safeParse(weatherResponseBody);
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
      "Clothing.usable_temperature_range",
      "Clothing.name",
      "Clothing.is_precipitation_proof",
      "Clothing.icon_path",
    ])
    .where("Clothing.owner", "=", `${session.user.id}`)
    .execute();

  const weatherKeyword = WEATHER_CONDITIONS[weather.data.current.condition.code].weather_keyword || undefined;
  if (!weatherKeyword) {
    return Response.json({}, { status: 500 });
  }

  // weather data is available through the following variable: weather.data
  // weather keyword ("sunny", "cloudy", "rainy", "snowy") is available through the variable: weatherKeyword
  // this is the array that is supposed to contain the clothes that will make up the outfit:

  const outfit: ClothingDTO[] = clothesPicker(wardrobe as ClothingDTO[], weather.data);

  // TODO: add outfit-building logic here (pick appropriate clothing based on weather data)

  // the return is set up here per the API documentation (with the addition of "_debug" for testing purposes)
  return Response.json(
    {
      outfit,
      degrees_c: weather.data.current.temp_c,
      weather_keyword: weatherKeyword,
      weather_picture: `/public/icons/${weatherKeyword}.png`,
      _debug: { wardrobe, weather, weatherKeyword },
    },
    { status: 200 },
  );
}

function clothesPicker(wardrobe: ClothingDTO[], weather: z.infer<typeof weatherDataSchema>) {
  const outfit: ClothingDTO[] = [];

  const shirts: ClothingDTO[] = [];
  const outwear: ClothingDTO[] = [];
  const bottoms: ClothingDTO[] = [];

  const temperatureRange = mapTemperatureToRange(weather.current.temp_c);
  const fallbackTemperatureRange = fallbackMapTemperatureToRange(weather.current.temp_c, temperatureRange);

  const dummyObject = {
    id: "",
    clothing_type: "none",
    usable_temperature_range: 0,
    name: "",
    is_precipitation_proof: false,
    icon_path: "",
  };

  for (const clothing of wardrobe) {
    switch (clothing.clothing_type) {
      case "Shirt":
        shirts.push(clothing);
        break;

      case "Outwear":
        outwear.push(clothing);
        break;

      case "Bottom":
        bottoms.push(clothing);
        break;

      default:
        break;
    }
  }

  shuffle(shirts);
  shuffle(outwear);
  shuffle(bottoms);

  // SHIRTS
  for (const shirt of shirts) {
    if (shirt.usable_temperature_range === temperatureRange) {
      outfit.push(shirt);
      break;
    }
  }

  if (outfit.length !== 1) {
    for (const shirt of shirts) {
      if (shirt.usable_temperature_range === fallbackTemperatureRange) {
        outfit.push(shirt);
        break;
      }
    }
  }

  if (outfit.length !== 1) {
    outfit.push(dummyObject);
  }

  // OUTWEAR
  for (const outwearItem of outwear) {
    if (outwearItem.usable_temperature_range === temperatureRange) {
      outfit.push(outwearItem);
      break;
    }
  }

  if (outfit.length !== 2) {
    for (const outwearItem of outwear) {
      if (outwearItem.usable_temperature_range === fallbackTemperatureRange) {
        outfit.push(outwearItem);
        break;
      }
    }
  }

  if (outfit.length !== 2) {
    outfit.push(dummyObject);
  }

  // BOTTOM
  for (const bottom of bottoms) {
    if (bottom.usable_temperature_range === temperatureRange) {
      outfit.push(bottom);
      break;
    }
  }

  if (outfit.length !== 3) {
    for (const bottom of bottoms) {
      if (bottom.usable_temperature_range === fallbackTemperatureRange) {
        outfit.push(bottom);
        break;
      }
    }
  }

  if (outfit.length !== 3) {
    outfit.push(dummyObject);
  }

  return outfit;
}

//https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffle(array: any[]) {
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

function mapTemperatureToRange(weatherTemp: number): UsableTemperatureRange {
  if (weatherTemp < 0) {
    return UsableTemperatureRange.FREEZING;
  }

  if (weatherTemp < 11) {
    return UsableTemperatureRange.COLD;
  }

  if (weatherTemp < 21) {
    return UsableTemperatureRange.WARM;
  }

  return UsableTemperatureRange.HOT;
}

function fallbackMapTemperatureToRange(weatherTemp: number, tempRange: UsableTemperatureRange): UsableTemperatureRange {
  switch (tempRange) {
    case UsableTemperatureRange.FREEZING: {
      return UsableTemperatureRange.COLD;
    }

    case UsableTemperatureRange.COLD: {
      if (weatherTemp < 5) {
        return UsableTemperatureRange.FREEZING;
      }

      return UsableTemperatureRange.WARM;
    }

    case UsableTemperatureRange.WARM: {
      if (weatherTemp < 16) {
        return UsableTemperatureRange.COLD;
      }

      return UsableTemperatureRange.HOT;
    }

    //if tempRange = HOT
    default:
      return UsableTemperatureRange.WARM;
  }
}
