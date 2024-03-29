import { auth } from "@/auth-config";
import { db } from "@/db-config";
import { z } from "zod";

const submitLocationSchema = z.object({
  location_name: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

// Get favorite locations for the logged in user
export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  const userLocations = await db
    .selectFrom("Location")
    .select(["Location.id", "Location.location_name", "Location.latitude", "Location.longitude"])
    .where("Location.owner", "=", session.user.id)
    .execute();

  return Response.json(
    {
      favorite_locations: userLocations,
    },
    { status: 200 },
  );
}

// Add a new favorite location for the logged in user
export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  const requestBody = submitLocationSchema.safeParse(await request.json());
  if (!requestBody.success) {
    return Response.json({}, { status: 400 });
  }

  const dbInsert = await db
    .insertInto("Location")
    .values({
      owner: session.user.id,
      location_name: requestBody.data.location_name,
      latitude: requestBody.data.latitude,
      longitude: requestBody.data.longitude,
    })
    .returning(["Location.id", "Location.location_name", "Location.latitude", "Location.longitude"])
    .executeTakeFirst();

  if (!dbInsert) {
    return Response.json({}, { status: 500 });
  }

  return Response.json(dbInsert, { status: 200 });
}
