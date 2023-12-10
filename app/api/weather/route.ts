import { z } from "zod";
import { WEATHER_API_BASE_URL, WeatherData } from "@/types/weather-data";

export async function GET(request: Request) {
  const weatherApi = WEATHER_API_BASE_URL + `&q=55.609, 13.00&aqi=no`;

  //TODO: Fix API error handling
  const weatherResponse = await fetch(weatherApi);
  const weatherData: WeatherData = await weatherResponse.json();

  return Response.json({
    status: 200,
    location: weatherData.location.name,
    precipitation: weatherData.current.precip_mm,
    degrees: weatherData.current.temp_c,
  });
}

export async function POST(request: Request) {
  const schema = z.object({
    latitude: z.number(),
    longitude: z.number(),
  });

  const requestBody = await request.json();
  try {
    schema.parse(requestBody);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({
        status: 400,
        error: error.issues,
      });
    }
  }

  const weatherApi = WEATHER_API_BASE_URL + `&q=${requestBody.latitude}, ${requestBody.longitude}&aqi=no`;

  //TODO: Fix API error handling
  const weatherResponse = await fetch(weatherApi);
  const weatherData: WeatherData = await weatherResponse.json();

  return Response.json({
    status: 200,
    location: weatherData.location.name,
    precipitation: weatherData.current.precip_mm,
    degrees: weatherData.current.temp_c,
  });
}
