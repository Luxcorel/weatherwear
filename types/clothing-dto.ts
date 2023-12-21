import { ClothingType } from "@/types/clothing-type";
import { Season } from "@/types/season";

export interface ClothingDTO {
  id: string;
  clothing_type: ClothingType | string;
  season: Season;
  name: string;
  is_precipitation_proof: boolean;
  icon_path: string;
}
