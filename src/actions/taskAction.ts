"use server";

import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteTaskAction(formData: FormData) {
  const taskId = formData.get("taskId") as string;
  const userId = formData.get("userId") as string;

  try {
    await prismaClient.task.delete({
      where: { id: taskId, userId: userId },
    });
  } catch (error) {
    console.error("Error deleting task:", error);
  }

  revalidatePath("/dashboard");
}
