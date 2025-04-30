"use server";
import { signIn } from "@/auth";
import { signInFormSchema } from "@/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";

export const signInAction = async (data: z.infer<typeof signInFormSchema>) => {
  try {
    await signIn("credentials", { ...data, redirect: false });
    return { status: 200 };
  } catch (error) {
    if (error instanceof AuthError) {
      return { status: 500, error: "Something trying to sign in to app" };
    }
    return { status: 500, error: "Something went wrong" };
  }
};
