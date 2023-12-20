import { ClothingType } from "@/frontend-types/clothing-type";
import { Season } from "@/frontend-types/season";

export type ClothingDTO = {
  id: string;
  clothing_type: ClothingType;
  season: Season;
  name: string;
  is_precipitation_proof: boolean;
  icon_path: string;
};
