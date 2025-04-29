import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen px-6 py-24 md:py-36">
      <Link href="/">
        <img
          className="mb-16 w-96"
          src="https://gux.tech/wp-content/uploads/2023/04/Logo-GUX-white.png"
          alt="Gux logo"
        />
      </Link>
      <h1 className="mb-24 text-3xl font-bold text-center">
        Welcome to the task manager
      </h1>
      <Link
        className="px-3 py-2 mb-8 text-center text-white rounded-full cursor-pointer w-72 text-bold bg-slate-700 hover:bg-slate-600"
        href="/signin"
      >
        Sign in
      </Link>
      <Link className="underline" href="/register">
        I am a new user
      </Link>
    </main>
  );
}
