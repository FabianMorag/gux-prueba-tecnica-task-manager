"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  const onClickFn = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button
      className="w-full px-3 py-2 text-white rounded-full cursor-pointer text-bold bg-slate-700 hover:bg-slate-600"
      onClick={onClickFn}
    >
      SIgn out
    </button>
  );
}
