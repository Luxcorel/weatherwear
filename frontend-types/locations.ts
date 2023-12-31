export type Locations = {
  favorite_locations: SavedLocation[];
};

export type SavedLocation = {
  id: string;
  location_name: string;
  latitude: number;
  longitude: number;
};
