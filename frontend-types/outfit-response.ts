import { ClothingDTO } from "@/frontend-types/clothing-dto";

export type WeatherKeyword = "sunny" | "cloudy" | "rainy" | "snowy";

export interface OutfitResponse {
  outfit: ClothingDTO[];
  weather_keyword: WeatherKeyword;
  weather_picture: string;
}
