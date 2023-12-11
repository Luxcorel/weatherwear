import { z } from "zod";
import { db } from "@/db-config";
import { auth } from "@/auth-config";

const clothingAddSchema = z.object({
  name: z.string(),
  precipitation_compatible: z.boolean(),
  season: z.string(),
  temperature_high: z.number(),
  temperature_low: z.number(),
});

//TODO Add proper error handling
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  // prettier-ignore
  const clothing = await db
    .selectFrom("Clothing")
    .selectAll()
    .where("Clothing.owner", "=", session.user.id)
    .execute();

  return Response.json(
    {
      clothing: clothing,
    },
    { status: 200 },
  );
}

//TODO Add proper error handling and clean up zod code
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const requestBody = clothingAddSchema.safeParse(await request.json());
  if (!requestBody.success) {
    return Response.json(
      {
        error: requestBody.error.issues,
      },
      { status: 400 },
    );
  }

  const result = await db
    .insertInto("Clothing")
    .values({
      owner: session.user.id,
      name: requestBody.data.name,
      season: requestBody.data.season,
      precipitation_compatible: requestBody.data.precipitation_compatible,
      temperature_high: requestBody.data.temperature_high,
      temperature_low: requestBody.data.temperature_low,
    })
    .executeTakeFirst();

  return Response.json({}, { status: 200 });
}
