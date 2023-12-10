import { auth } from "@/authConfig";
import { db } from "@/dbConfig";

//TODO Add proper error handling
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return Response.json({ status: 401 });
  }

  const result = await db
    .deleteFrom("Location")
    .where("Location.id", "=", `${params.id}`)
    .where("Location.owner", "=", `${session.user.id}`)
    .executeTakeFirst();

  if (result.numDeletedRows === BigInt(0)) {
    return Response.json({
      status: 400,
    });
  }

  return Response.json({
    status: 200,
  });
}
