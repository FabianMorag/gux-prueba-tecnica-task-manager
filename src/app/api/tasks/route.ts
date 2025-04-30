import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const listOfTasks = await prismaClient.task.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ data: listOfTasks });
}
