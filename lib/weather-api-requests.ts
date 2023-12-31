export const BASE_URL_WEATHER_API = `https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}`;

/**
 * Returns fetch() Promise
 * @param latitude latitude of location
 * @param longitude longitude of location
 */
export function fetchWeatherByLocation(latitude: number, longitude: number) {
  return fetch(BASE_URL_WEATHER_API + `&q=${latitude}, ${longitude}`, {
    next: { revalidate: 60 },
  });
}
