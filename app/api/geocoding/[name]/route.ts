import { auth } from "@/auth-config";
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

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  if (!params.name) {
    return Response.json({}, { status: 400 });
  }

  const locationResponse = await fetchLocationByName(params.name);
  const locationData = await locationResponse.json();
  const location = locationSchema.safeParse(locationData);

  if (!location.success) {
    return Response.json({}, { status: 404 });
  }

  return Response.json(location, { status: 200 });
}
