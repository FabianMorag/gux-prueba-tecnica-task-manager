"use server";

import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { createTaskFormSchema } from "@/lib/zod";
import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTaskAction = async (
  task: z.infer<typeof createTaskFormSchema>
) => {
  const token = await auth();
  const data = {
    title: task.title,
    description: task.description,
    status: task.status as TaskStatus,
    userId: token?.user?.userId as string,
  };

  try {
    const createdTask = await prismaClient.task.create({ data });
    revalidatePath("/dashboard");
    return { status: 200, data: createdTask };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, error: "Task creation failed" };
  }
};

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
