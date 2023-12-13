import { auth } from "@/auth-config";
import { db } from "@/db-config";
import { z } from "zod";

//TODO: error checking for failed db queries

const updateLocationSchema = z.object({
  location_name: z.string(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

// API CONTRACT IMPL
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const userLocation = await db
    .selectFrom("Location")
    .select(["Location.id", "Location.location_name", "Location.latitude", "Location.longitude"])
    .where("Location.id", "=", `${params.id}`)
    .where("Location.owner", "=", session.user.id)
    .executeTakeFirst();

  if (!userLocation) {
    return Response.json({}, { status: 404 });
  }

  return Response.json(userLocation, { status: 200 });
}

// API CONTRACT IMPL
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const requestBody = updateLocationSchema.safeParse(await request.json());
  if (!requestBody.success) {
    return Response.json({}, { status: 400 });
  }

  const dbUpdate = await db
    .updateTable("Location")
    .set({
      location_name: requestBody.data.location_name,
      latitude: requestBody.data.latitude,
      longitude: requestBody.data.longitude,
    })
    .where("Location.id", "=", `${params.id}`)
    .where("Location.owner", "=", `${session.user.id}`)
    .returning(["Location.id", "Location.location_name", "Location.latitude", "Location.longitude"])
    .executeTakeFirst();

  if (!dbUpdate) {
    return Response.json({}, { status: 404 });
  }

  return Response.json(dbUpdate, { status: 200 });
}

// API CONTRACT IMPL
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const dbDelete = await db
    .deleteFrom("Location")
    .where("Location.id", "=", `${params.id}`)
    .where("Location.owner", "=", `${session.user.id}`)
    .executeTakeFirst();

  if (!dbDelete.numDeletedRows) {
    return Response.json({}, { status: 404 });
  }

  return Response.json({}, { status: 200 });
}
