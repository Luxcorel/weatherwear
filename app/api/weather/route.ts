import { z } from "zod";
import { WEATHER_DATA_SCHEMA } from "@/types/weather-data";
import { NextRequest } from "next/server";
import { fetchWeatherByLocation } from "@/lib/weather-api-requests";
import { WEATHER_CONDITIONS } from "@/types/weather-conditions";

const locationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

// Get weather data for a specific location
export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  if (!latitude || !longitude) {
    return Response.json({}, { status: 400 });
  }

  const requestBody = locationSchema.safeParse({
    latitude: Number.parseFloat(latitude),
    longitude: Number.parseFloat(longitude),
  });
  if (!requestBody.success) {
    return Response.json({}, { status: 400 });
  }

  const weatherResponse = await fetchWeatherByLocation(requestBody.data.latitude, requestBody.data.longitude);
  if (!weatherResponse.location) {
    return Response.json({}, { status: 404 });
  }

  const weather = WEATHER_DATA_SCHEMA.safeParse(weatherResponse);
  if (!weather.success) {
    return Response.json({}, { status: 500 });
  }

  const weatherKeyword = WEATHER_CONDITIONS[weather.data.current.condition.code].weather_keyword || undefined;
  if (!weatherKeyword) {
    return Response.json({}, { status: 500 });
  }

  return Response.json(
    {
      location: weather.data.location.name,
      local_time: weather.data.location.localtime,
      precipitation: weather.data.current.precip_mm,
      degrees: weather.data.current.temp_c,
      condition: weather.data.current.condition.text,
      weather_keyword: weatherKeyword,
      weather_picture: `/images/weather/${weatherKeyword}.svg`,
    },
    { status: 200 },
  );
}
