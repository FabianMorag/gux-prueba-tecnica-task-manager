import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prismaClient } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
  const json = await req.json();
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  const data = {
    title: json.title,
    description: json.description,
    status: json.status.toUpperCase(),
    userId: token?.userId as string,
  };

  const task = await prismaClient.task.update({
    where: { id: json.taskId, userId: data.userId },
    data,
  });

  return NextResponse.json(task);
}
