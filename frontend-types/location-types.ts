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

export type GeocodingResponse = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};
