import { auth } from "@/authConfig";
import { db } from "@/dbConfig";
import { z } from "zod";

const locationAddSchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

//TODO Add proper error handling
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ status: 401 });
  }

  // prettier-ignore
  const locations = await db
    .selectFrom("Location")
    .selectAll()
    .where("Location.owner", "=", session.user.id)
    .execute();

  return Response.json({
    locations: locations,
  });
}

//TODO Add proper error handling
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ status: 401 });
  }

  const requestBody = locationAddSchema.safeParse(await request.json());
  if (!requestBody.success) {
    return Response.json({
      status: 400,
      error: requestBody.error.issues,
    });
  }

  const result = await db
    .insertInto("Location")
    .values({
      owner: session.user.id,
      name: requestBody.data.name,
      latitude: requestBody.data.latitude,
      longitude: requestBody.data.longitude,
    })
    .executeTakeFirst();

  return Response.json({
    status: 200,
  });
}
