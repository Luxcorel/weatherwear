export const BASE_URL_WEATHER_API = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}`;

/**
 * Returns fetch() Promise
 * @param latitude latitude of location
 * @param longitude longitude of location
 * @param cacheDuration cache duration in minutes. Disable cache = 0
 */
export function fetchWeatherByLocation(latitude: number, longitude: number, cacheDuration: number) {
  return fetch(BASE_URL_WEATHER_API + `&q=${latitude}, ${longitude}`, {
    next: { revalidate: cacheDuration * 60 },
  });
}
