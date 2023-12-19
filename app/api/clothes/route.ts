import { z } from "zod";
import { db } from "@/db-config";
import { auth } from "@/auth-config";

// TODO: error checking for failed db queries

const clothingAddSchema = z.object({
  clothing_type: z.string(),
  color: z.string(),
  size: z.string(),
});

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return Response.json({}, { status: 401 });
  }

  const clothes = await db
    .selectFrom("Clothing")
    .select(["Clothing.id", "Clothing.clothing_type", "Clothing.color", "Clothing.size"])
    .where("Clothing.owner", "=", session.user.id)
    .execute();

  return Response.json(
    {
      clothes,
    },
    { status: 200 },
  );
}

// TODO: Implement ClothingType enum and check that input strings conform
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
      color: requestBody.data.color,
      size: requestBody.data.size,
    })
    .returning(["Clothing.id", "Clothing.clothing_type", "Clothing.color", "Clothing.size"])
    .executeTakeFirst();

  return Response.json(dbInsert, { status: 200 });
}
