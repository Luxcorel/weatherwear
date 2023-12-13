import { auth } from "@/auth-config";
import { db } from "@/db-config";
import { z } from "zod";

//TODO: error checking for failed db queries

const submitLocationSchema = z.object({
  location_name: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

// API CONTRACT IMPL
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const locations = await db
    .selectFrom("Location")
    .select(["Location.id", "Location.location_name", "Location.latitude", "Location.longitude"])
    .where("Location.owner", "=", session.user.id)
    .execute();

  return Response.json(
    {
      favorite_locations: locations,
    },
    { status: 200 },
  );
}

// API CONTRACT IMPL
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
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

  return Response.json(dbInsert, { status: 200 });
}
