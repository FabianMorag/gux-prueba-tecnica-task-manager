/* eslint-disable @next/next/no-img-element */
import { auth } from "@/auth";
import SignOutButton from "@/app/components/signoutbutton";
import CreateTask from "@/app/components/createtask";

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
          <SignOutButton />
        </div>
      </header>

      <main className="flex flex-col h-screen p-6">
        <div className="flex w-full justify-between max-w-7xl mx-auto">
          <span>
            Welcome, <pre className="inline">{session?.user?.email}</pre>
          </span>
          <CreateTask />
        </div>
      </main>
    </>
  );
}
