import { ClothingDTO } from "@/frontend-types/clothing-dto";

export type SuggestionDTO = {
  outfit: ClothingDTO[];
  degrees_c: number;
  weather_keyword: string;
  weather_picture: string;
};
