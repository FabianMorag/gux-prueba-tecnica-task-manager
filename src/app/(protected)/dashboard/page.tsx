/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import SignOutButton from "@/components/signoutbutton";
import CreateTask from "@/components/createtask";
import TaksList from "@/components/tasklist";
import { Suspense } from "react";

export default async function Dashboard() {
  const session = await auth();

  return (
    <>
      <header className="sticky top-0 w-full p-4 border-b border-slate-400 bg-slate-950">
        <div className="flex justify-between items-center max-w-7xl m-auto">
          <img
            className="w-32 object-center object-cover"
            src="https://gux.tech/wp-content/uploads/2023/04/Logo-GUX-white.png"
            alt="Gux logo"
          />
          <span>
            Welcome, <pre className="inline">{session?.user?.email}</pre>
          </span>
          <SignOutButton />
        </div>
      </header>

      <main className="flex flex-col h-screen p-6">
        <section className="flex w-full justify-between max-w-7xl mx-auto mb-6">
          <h1 className="text-3xl">List of tasks</h1>
          <CreateTask />
        </section>

        <section className="w-full max-w-7xl mx-auto mb-4">
          <Suspense fallback={<p>Loading data...</p>}>
            <TaksList />
          </Suspense>
        </section>
      </main>
    </>
  );
}
