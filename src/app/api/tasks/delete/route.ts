import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prismaClient } from "@/app/lib/prisma";
import { getToken } from "next-auth/jwt";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const json = await req.json();
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  await prismaClient.task.delete({
    where: { id: json.id, userId: token?.userId as string },
  });

  revalidatePath("/dashboard");

  return NextResponse.json({
    status: 200,
    message: "Task deleted successfully",
  });
}
