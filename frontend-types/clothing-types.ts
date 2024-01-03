import { Season } from "@/frontend-types/season";

export enum ClothingType {
  SHIRT = "Shirt",
  OUTWEAR = "Outwear",
  BOTTOM = "Bottom",
}

export type ClothingDTO = {
  id: string;
  clothing_type: ClothingType | string;
  season: Season;
  name: string;
  is_precipitation_proof: boolean;
  icon_path: string;
};
