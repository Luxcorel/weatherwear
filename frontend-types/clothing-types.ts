export enum ClothingType {
  SHIRT = "Shirt",
  OUTWEAR = "Outwear",
  BOTTOM = "Bottom",
}

export enum UsableTemperatureRange {
  FREEZING, // <= 0 C
  COLD, // 1-10 C
  WARM, // 11-20 C
  HOT, // > 20 C
}

export type ClothingDTO = {
  id: string;
  clothing_type: ClothingType;
  usable_temperature_range: UsableTemperatureRange;
  name: string;
  is_precipitation_proof: boolean;
  icon_path: string;
};

export type AllSavedClothingResponse = {
  clothes: ClothingDTO[];
};

export type SuggestionDTO = {
  outfit: ClothingDTO[];
};
