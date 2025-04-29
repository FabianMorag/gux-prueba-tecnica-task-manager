import { auth } from "@/auth";
import LogOutButton from "@/app/components/logoutbutton";

export default async function Dashboard() {
  const session = await auth();
  if (!session) {
    return (
      <main className="flex flex-col items-center h-screen px-2 pt-24 md:pt-36">
        <h1 className="text-3xl font-bold">You are not logged in</h1>
      </main>
    );
  }
  return (
    <main className="flex flex-col items-center h-screen px-2 pt-24 md:pt-36">
      <pre>{JSON.stringify(session)}</pre>
      <LogOutButton />
    </main>
  );
}
