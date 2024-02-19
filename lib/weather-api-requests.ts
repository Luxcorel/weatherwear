import { GeocodingResponse } from "@/types/geocoding-types";
import { WeatherData } from "@/types/weather-data";

const BASE_URL_WEATHER_API_CURRENT_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}`;
const BASE_URL_WEATHER_API_LOCATION = `https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}`;

/**
 * Returns weather data for a location
 * @param latitude latitude of location
 * @param longitude longitude of location
 */
export async function fetchWeatherByLocation(latitude: number, longitude: number) {
  // weatherapi.com sometimes serves stale weather data 1 time before revalidating data.
  // That is: it serves stale data THEN revalidates on server.
  // yes I'm losing my mind
  const fiveMinutes = 5 * 60;
  const weatherResponse = await fetch(BASE_URL_WEATHER_API_CURRENT_WEATHER + `&q=${latitude}, ${longitude}`, {
    next: { revalidate: fiveMinutes },
  });

  const weatherData = (await weatherResponse.json()) as WeatherData;

  // start of hack that makes sure we don't get stale data
  const currentDate = new Date();
  const contentDate = new Date(weatherData.current.last_updated_epoch * 1000);
  const contentAge = currentDate.getTime() - contentDate.getTime();

  const thirtyMinutes = 30 * 60 * 1000;
  if (contentAge > thirtyMinutes) {
    return fetch(BASE_URL_WEATHER_API_CURRENT_WEATHER + `&q=${latitude}, ${longitude}`, {
      next: { revalidate: 0 },
    }).then(async (response) => (await response.json()) as WeatherData);
  }
  // end of hack

  return weatherData;
}

/** Returns geocoding data for a location
 * @param query location
 */
export async function fetchLocationByName(query: string) {
  const twentyFourHours = 24 * 60 * 60;

  return fetch(BASE_URL_WEATHER_API_LOCATION + `&q=${query}`, {
    next: { revalidate: twentyFourHours },
  }).then(async (response) => (await response.json()) as GeocodingResponse | undefined);
}
