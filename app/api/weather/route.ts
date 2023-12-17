import { z } from "zod";
import { WeatherData } from "@/types/weather-data";
import { NextRequest } from "next/server";
import { fetchWeatherByLocation } from "@/lib/weather-api-requests";

const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  if (!latitude || !longitude) {
    return Response.json(
      {
        error: "Did not specify latitude and longitude",
      },
      { status: 400 },
    );
  }

  const requestBody = locationSchema.safeParse({
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  });
  if (!requestBody.success) {
    return Response.json(
      {
        error: requestBody.error.issues,
      },
      { status: 400 },
    );
  }

  const weatherResponse = await fetchWeatherByLocation(requestBody.data.latitude, requestBody.data.longitude, 15);
  if (!weatherResponse.ok) {
    return Response.json(
      {
        error: "Could not find specified location",
      },
      { status: 404 },
    );
  }

  const weatherData: WeatherData = await weatherResponse.json();

  return Response.json(
    {
      location: weatherData.location.name,
      local_time: weatherData.location.localtime,
      precipitation: weatherData.current.precip_mm,
      degrees: weatherData.current.temp_c,
      condition: weatherData.current.condition.text,
    },
    { status: 200 },
  );
}
