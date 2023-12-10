import { z } from "zod";
import { db } from "@/dbConfig";
import { auth } from "@/authConfig";

//TODO Add proper error handling
export async function GET(request: Request) {
  const session = await auth();
  if (!session) {
    return Response.json({ status: 401 });
  }

  // prettier-ignore
  const clothing = await db
    .selectFrom("Clothing")
    .selectAll()
    .where("Clothing.owner", "=", session.user.id)
    .execute();

  return Response.json({
    clothes: clothing,
    status: 200,
  });
}

//TODO Add proper error handling and clean up zod code
export async function POST(request: Request) {
  const clothingSchema = z.object({
    name: z.string(),
    precipitation_compatible: z.boolean(),
    season: z.string(),
    temperature_high: z.number(),
    temperature_low: z.number(),
  });

  const session = await auth();
  if (!session) {
    return Response.json({ status: 401 });
  }

  const body = await request.json();
  try {
    clothingSchema.parse(body);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({
        status: 400,
        error: error.issues,
      });
    }
  }

  const result = await db
    .insertInto("Clothing")
    .values({
      owner: session.user.id,
      name: body.name,
      season: body.season,
      precipitation_compatible: body.precipitation_compatible,
      temperature_high: body.temperature_high,
      temperature_low: body.temperature_low,
    })
    .executeTakeFirst();

  return Response.json({ status: 200 });
}
