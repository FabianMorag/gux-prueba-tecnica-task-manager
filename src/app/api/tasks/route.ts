import { prismaClient } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const taskList = await prismaClient.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: taskList });
}
