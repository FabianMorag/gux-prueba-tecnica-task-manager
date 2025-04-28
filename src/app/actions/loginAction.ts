"use server";
import { signIn } from "@/auth";
import { logInSchema } from "@app/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";

export const logInAction = async (data: z.infer<typeof logInSchema>) => {
  try {
    await signIn("credentials", { ...data, redirect: false });
    return { status: 200 };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: error.cause?.err?.message };
    }
    return { status: 500, error: "Something went wrong" };
  }
};
