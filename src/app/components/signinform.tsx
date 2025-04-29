"use client";

import { logInSchema } from "@app/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { signInAction } from "@/src/app/actions/signInAction";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmitFn = (values: z.infer<typeof logInSchema>) => {
    startTransition(async () => {
      const response = await signInAction(values);
      if (response.error) setError(response.error);
      else router.push("/dashboard");
    });
  };

  return (
    <form
      className="flex flex-col min-w-96"
      onSubmit={handleSubmit(onSubmitFn)}
    >
      <label className="font-medium" htmlFor="email">
        Email
      </label>
      <input
        className="px-2 py-1rounded-lg outline outline-slate-700 focus:outline-slate-500"
        type="text"
        id="email"
        autoComplete="email"
        {...register("email")}
      />
      <span className="mb-6 text-sm text-red-500">{errors.email?.message}</span>
      <label className="font-medium" htmlFor="password">
        Password
      </label>
      <input
        className="px-2 py-1rounded-lg outline outline-slate-700 focus:outline-slate-500"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register("password")}
      />
      <span className="mb-6 text-sm text-red-500">
        {errors.password?.message}
      </span>

      {error && (
        <span className="text-sm text-center text-red-500">
          User credentials are incorrect
        </span>
      )}

      <button
        className="w-full px-3 py-2 text-white rounded-full cursor-pointer text-bold bg-slate-700 hover:bg-slate-600"
        type="submit"
        disabled={isPending}
      >
        Sign in
      </button>
    </form>
  );
}
