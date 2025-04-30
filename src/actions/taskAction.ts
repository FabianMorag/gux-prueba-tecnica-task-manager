"use server";

import { auth } from "@/auth";
import { prismaClient } from "@/lib/prisma";
import { createTaskFormSchema, updateTaskFormSchema } from "@/lib/zod";
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

export async function deleteTaskAction(taskId: string) {
  const token = await auth();
  const userId = token?.user?.userId as string;

  try {
    const taskToDelete = await prismaClient.task.findUnique({
      where: { id: taskId },
    });
    if (!taskToDelete) {
      return { status: 404, error: "Task not found" };
    }
    if (taskToDelete.userId !== userId) {
      return { status: 403, error: "Unauthorized to delete" };
    }
    await prismaClient.task.delete({
      where: { id: taskId, userId: userId },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, error: "Task creation failed" };
  }

  revalidatePath("/dashboard");
}

export const updateTaskAction = async (
  task: z.infer<typeof updateTaskFormSchema>
) => {
  const token = await auth();
  const data = {
    title: task.title,
    description: task.description,
    status: task.status as TaskStatus,
  };

  if (token?.user?.userId) {
  }

  try {
    const taskToUpdate = await prismaClient.task.findUnique({
      where: { id: task.taskId },
    });
    if (!taskToUpdate) {
      return { status: 404, error: "Task not found" };
    }
    if (taskToUpdate.userId !== token?.user?.userId) {
      return { status: 403, error: "Unauthorized to update" };
    }
    const updatedTask = await prismaClient.task.update({
      where: { id: task.taskId },
      data,
    });
    revalidatePath("/dashboard");
    return { status: 200, data: updatedTask };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { status: 500, error: "Task creation failed" };
  }
};
