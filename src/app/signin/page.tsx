import SignInForm from "@/components/signinform";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function SignIn() {
  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-24 md:py-36">
      <Link href="/">
        <img
          className="mb-16 w-96"
          src="https://gux.tech/wp-content/uploads/2023/04/Logo-GUX-white.png"
          alt="Gux logo"
        />
      </Link>
      <div className="w-full p-8 rounded-lg shadow-lg md:w-auto md:p-24 bg-slate-900 outline-slate-800 outline-2">
        <h1 className="mb-8 text-3xl font-bold text-center">Sign in</h1>

        <SignInForm />
      </div>
    </main>
  );
}
