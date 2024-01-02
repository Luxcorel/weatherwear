const BASE_URL_WEATHER_API_CURRENT_WEATHER = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}`;
const BASE_URL_WEATHER_API_LOCATION = `https://api.weatherapi.com/v1/search.json?key=${process.env.WEATHER_API_KEY}`;

/**
 * Returns fetch() Promise
 * @param latitude latitude of location
 * @param longitude longitude of location
 */
export function fetchWeatherByLocation(latitude: number, longitude: number) {
  return fetch(BASE_URL_WEATHER_API_CURRENT_WEATHER + `&q=${latitude}, ${longitude}`, {
    next: { revalidate: 60 },
    cache: "no-cache",
  });
}

export function fetchLocationByName(query: string) {
  return fetch(BASE_URL_WEATHER_API_LOCATION + `&q=${query}`, {
    next: { revalidate: 60 },
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
