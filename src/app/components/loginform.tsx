"use client";

import { logInSchema } from "@/app/lib/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export default function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const onSubmitFn = (values: z.infer<typeof logInSchema>) => {
    console.log(values);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmitFn)}>
      <label className="font-medium" htmlFor="user">
        User
      </label>
      <input
        className="px-2 py-1rounded-lg outline outline-slate-700 focus:outline-slate-500"
        type="text"
        id="user"
        autoComplete="username"
        {...register("user")}
      />
      <p className="mb-6 text-sm text-red-500 ">{errors.user?.message}</p>
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
      <p className="mb-6 text-sm text-red-500 ">{errors.password?.message}</p>

      <button
        className="w-full px-3 py-2 text-white rounded-full cursor-pointer text-bold bg-slate-700 hover:bg-slate-600"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
