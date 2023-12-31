import { WeatherKeyword } from "@/frontend-types/outfit-response";

export interface WeatherInfoDTO {
  location: string;
  local_time: string;
  precipitation: number;
  degrees: number;
  condition: string;
  weather_keyword: WeatherKeyword;
  weather_picture: string;
}
