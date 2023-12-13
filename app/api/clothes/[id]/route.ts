import { auth } from "@/auth-config";
import { db } from "@/db-config";
import { z } from "zod";

//TODO: error checking for failed db queries

const updateClothingSchema = z.object({
  clothing_type: z.string(),
  color: z.string(),
  size: z.string(),
});

// API CONTRACT IMPL
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return Response.json({}, { status: 401 });
  }

  const clothing = await db
    .selectFrom("Clothing")
    .select(["Clothing.id", "Clothing.clothing_type", "Clothing.color", "Clothing.size"])
    .where("Clothing.id", "=", `${params.id}`)
    .where("Clothing.owner", "=", session.user.id)
    .executeTakeFirst();

  if (!clothing) {
    return Response.json({}, { status: 404 });
  }

  return Response.json(clothing, { status: 200 });
}

// API CONTRACT IMPL
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
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
      color: requestBody.data.color,
      size: requestBody.data.size,
    })
    .where("Clothing.id", "=", `${params.id}`)
    .where("Clothing.owner", "=", `${session.user.id}`)
    .returning(["Clothing.id", "Clothing.clothing_type", "Clothing.color", "Clothing.size"])
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
    .deleteFrom("Clothing")
    .where("Clothing.id", "=", `${params.id}`)
    .where("Clothing.owner", "=", `${session.user.id}`)
    .executeTakeFirst();

  if (!dbDelete.numDeletedRows) {
    return Response.json({}, { status: 404 });
  }

  return Response.json({}, { status: 200 });
}
