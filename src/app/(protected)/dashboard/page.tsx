import { auth, signOut } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    return (
      <main className="flex flex-col items-center h-screen px-2 pt-24 md:pt-36">
        <h1>Dashboard</h1>
        <p>Not authenticated</p>;
      </main>
    );
  }

  const onClickFn = async () => {
    await signOut({ redirect: false });
  };

  return (
    <main className="flex flex-col items-center h-screen px-2 pt-24 md:pt-36">
      <pre>{JSON.stringify(session, null, 2)}</pre>
      <button onClick={onClickFn}>Log out</button>
    </main>
  );
}
