import { UsableTemperatureRange } from "@/types/usableTemperatureRange";

export enum ClothingType {
  SHIRT = "shirt",
  OUTWEAR = "outwear",
  BOTTOM = "bottom",
}

export type ClothingDTO = {
  id: string;
  clothing_type: ClothingType | string;
  usable_temperature_range: UsableTemperatureRange;
  name: string;
  is_precipitation_proof: boolean;
  icon_path: string;
};
