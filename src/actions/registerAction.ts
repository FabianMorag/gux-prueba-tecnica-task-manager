"use server";
import { signInFormSchema } from "@/lib/zod";
import { z } from "zod";
import { prismaClient } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const registerAction = async (
  credentials: z.infer<typeof signInFormSchema>
) => {
  try {
    const { data, success } = signInFormSchema.safeParse(credentials);

    if (!success) return { error: "Invalid data." };

    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (user) return { error: "User already exists." };

    const hashedPassword = await bcrypt.hash(data.password, 10);
    await prismaClient.user.create({
      data: { email: data.email, password: hashedPassword },
    });

    await signIn("credentials", { ...data, redirect: false });

    return { status: 200 };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { status: 500, error: "Something went wrong" };
  }
};
