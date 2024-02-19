export type GeocodingLocation = {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
};

export type GeocodingResponse = GeocodingLocation[];
