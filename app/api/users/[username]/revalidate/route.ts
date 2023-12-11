import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function PUT(
  _req: Request,
  { params }: { params: { username: string } }
) {
  revalidateTag(`user/${params.username}`);

  return NextResponse.json({
    message: "Revalidated user",
  });
}
