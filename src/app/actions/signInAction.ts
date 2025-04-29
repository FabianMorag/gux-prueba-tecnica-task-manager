"use server";
import { signIn } from "@/auth";
import { formSchema } from "@/app/lib/zod";
import { AuthError } from "next-auth";
import { z } from "zod";

export const signInAction = async (data: z.infer<typeof formSchema>) => {
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
