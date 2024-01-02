import { WeatherData } from "@/types/weather-data";

const BASE_URL_WEATHER_API_CURRENT_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}`;
const BASE_URL_WEATHER_API_LOCATION = `https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}`;

/**
 * Returns fetch() Promise
 * @param latitude latitude of location
 * @param longitude longitude of location
 */
export async function fetchWeatherByLocation(latitude: number, longitude: number) {
  // weatherapi.com sometimes serves stale weather data 1 time before revalidating data.
  // That is: it serves stale data THEN revalidates on server.
  // yes I'm losing my mind
  const weatherResponse = await fetch(BASE_URL_WEATHER_API_CURRENT_WEATHER + `&q=${latitude}, ${longitude}`, {
    next: { revalidate: 60 },
  });

  const weatherData = (await weatherResponse.json()) as WeatherData;

  const fixedTimestamp = weatherData.current.last_updated_epoch * 1000;
  const contentUpdatedAt = new Date(fixedTimestamp);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - contentUpdatedAt.getTime();

  const thirtyMinMillis = 30 * 60 * 1000;
  if (timeDifference > thirtyMinMillis) {
    return fetch(BASE_URL_WEATHER_API_CURRENT_WEATHER + `&q=${latitude}, ${longitude}`, {
      next: { revalidate: 0 },
    }).then(async (response) => (await response.json()) as WeatherData);
  }

  return weatherData;
}

export function fetchLocationByName(query: string) {
  return fetch(BASE_URL_WEATHER_API_LOCATION + `&q=${query}`, {
    next: { revalidate: 86400 },
  });
}

export type GeocodingResponse = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

export type GeocodingResponseFailure = {
  code: number;
  message: string;
};
