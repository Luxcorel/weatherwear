import { z } from "zod";
import { WEATHER_API_BASE_URL, WeatherData } from "@/types/weather-data";
import { NextRequest } from "next/server";

const locationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
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
    latitude: Number(latitude),
    longitude: Number(longitude),
  });
  if (!requestBody.success) {
    return Response.json(
      {
        error: requestBody.error.issues,
      },
      { status: 400 },
    );
  }

  const weatherApi = WEATHER_API_BASE_URL + `&q=${requestBody.data.latitude}, ${requestBody.data.longitude}&aqi=no`;

  //TODO: Add API error handling
  const weatherResponse = await fetch(weatherApi, { next: { revalidate: 300 } });
  const weatherData: WeatherData = await weatherResponse.json();

  return Response.json(
    {
      location: weatherData.location.name,
      precipitation: weatherData.current.precip_mm,
      degrees: weatherData.current.temp_c,
    },
    { status: 200 },
  );
}
