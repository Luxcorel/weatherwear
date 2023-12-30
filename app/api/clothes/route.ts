import { z } from "zod";
import { db } from "@/db-config";
import { auth } from "@/auth-config";
import { ClothingType } from "@/types/clothing-type";
import { UsableTemperatureRange } from "@/types/usableTemperatureRange";

const clothingAddSchema = z.object({
  clothing_type: z.nativeEnum(ClothingType),
  usableTemperatureRange: z.nativeEnum(UsableTemperatureRange),
  name: z.string(),
  is_precipitation_proof: z.boolean(),
  icon_path: z.string(),
});

// Fetch all clothes for the current user
export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  const clothes = await db
    .selectFrom("Clothing")
    .select([
      "Clothing.id",
      "Clothing.clothing_type",
      "Clothing.usable_temperature_range",
      "Clothing.name",
      "Clothing.is_precipitation_proof",
      "Clothing.icon_path",
    ])
    .where("Clothing.owner", "=", session.user.id)
    .execute();

  return Response.json(
    {
      clothes,
    },
    { status: 200 },
  );
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  const requestBody = clothingAddSchema.safeParse(await request.json());
  if (!requestBody.success) {
    return Response.json({}, { status: 400 });
  }

  const dbInsert = await db
    .insertInto("Clothing")
    .values({
      owner: session.user.id,
      clothing_type: requestBody.data.clothing_type,
      usable_temperature_range: requestBody.data.usableTemperatureRange,
      name: requestBody.data.name,
      is_precipitation_proof: requestBody.data.is_precipitation_proof,
      icon_path: requestBody.data.icon_path,
    })
    .returning([
      "Clothing.id",
      "Clothing.clothing_type",
      "Clothing.usable_temperature_range",
      "Clothing.name",
      "Clothing.is_precipitation_proof",
      "Clothing.icon_path",
    ])
    .executeTakeFirst();

  if (!dbInsert) {
    return Response.json({}, { status: 500 });
  }

  return Response.json(dbInsert, { status: 200 });
}
