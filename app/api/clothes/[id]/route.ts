import { auth } from "@/auth-config";
import { db } from "@/db-config";
import { z } from "zod";
import { UsableTemperatureRange } from "@/types/usableTemperatureRange";
import { ClothingType } from "@/types/clothing-types";

const updateClothingSchema = z.object({
  clothing_type: z.nativeEnum(ClothingType),
  usableTemperatureRange: z.nativeEnum(UsableTemperatureRange),
  name: z.string(),
  is_precipitation_proof: z.boolean(),
  icon_path: z.string(),
});

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  const clothing = await db
    .selectFrom("Clothing")
    .select([
      "Clothing.id",
      "Clothing.clothing_type",
      "Clothing.usable_temperature_range",
      "Clothing.name",
      "Clothing.is_precipitation_proof",
      "Clothing.icon_path",
    ])
    .where("Clothing.id", "=", `${params.id}`)
    .where("Clothing.owner", "=", session.user.id)
    .executeTakeFirst();

  if (!clothing) {
    return Response.json({}, { status: 404 });
  }

  return Response.json(clothing, { status: 200 });
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  const requestBody = updateClothingSchema.safeParse(await request.json());
  if (!requestBody.success) {
    return Response.json({}, { status: 400 });
  }

  const dbUpdate = await db
    .updateTable("Clothing")
    .set({
      clothing_type: requestBody.data.clothing_type,
      usable_temperature_range: requestBody.data.usableTemperatureRange,
      name: requestBody.data.name,
      is_precipitation_proof: requestBody.data.is_precipitation_proof,
      icon_path: requestBody.data.icon_path,
    })
    .where("Clothing.id", "=", `${params.id}`)
    .where("Clothing.owner", "=", `${session.user.id}`)
    .returning([
      "Clothing.id",
      "Clothing.clothing_type",
      "Clothing.usable_temperature_range",
      "Clothing.name",
      "Clothing.is_precipitation_proof",
      "Clothing.icon_path",
    ])
    .executeTakeFirst();

  if (!dbUpdate) {
    return Response.json({}, { status: 404 });
  }

  return Response.json(dbUpdate, { status: 200 });
}

// API CONTRACT IMPL
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  const dbDelete = await db
    .deleteFrom("Clothing")
    .where("Clothing.id", "=", `${params.id}`)
    .where("Clothing.owner", "=", `${session.user.id}`)
    .executeTakeFirst();

  if (!dbDelete.numDeletedRows) {
    return Response.json({}, { status: 404 });
  }

  return Response.json({}, { status: 200 });
}
