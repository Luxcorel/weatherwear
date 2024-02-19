import { fetchLocationByName } from "@/lib/weather-api-requests";
import { z } from "zod";

const locationSchema = z.object({
  id: z.number(),
  name: z.string(),
  region: z.string(),
  country: z.string(),
  lat: z.number(),
  lon: z.number(),
  url: z.string(),
});

// Get geocoding(latitude,longitude) of specified city name
export async function GET(request: Request, { params }: { params: { name: string } }) {
  if (!params.name) {
    return Response.json({}, { status: 400 });
  }

  const locationData = await fetchLocationByName(params.name);
  if (!locationData) {
    return Response.json({}, { status: 404 });
  }

  const location = locationSchema.safeParse(locationData[0]);

  if (!location.success) {
    return Response.json({}, { status: 404 });
  }

  const locationReturn = {
    name: location.data.name,
    latitude: location.data.lat,
    longitude: location.data.lon,
    region: location.data.region,
    country: location.data.country,
  };

  return Response.json(locationReturn, { status: 200 });
}
