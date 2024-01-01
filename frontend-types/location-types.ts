export type Location = {
  longitude: number;
  latitude: number;
};

export type SavedLocation = {
  id: string;
  location_name: string;
  latitude: number;
  longitude: number;
};

export type SavedLocationsResponse = {
  favorite_locations: SavedLocation[];
};
