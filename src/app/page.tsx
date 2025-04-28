/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <main className="flex flex-col items-center h-screen px-2 pt-24 md:pt-36">
      <img
        className="mb-16 w-96"
        src="https://gux.tech/wp-content/uploads/2023/04/Logo-GUX-white.png"
        alt="Gux logo"
      />
      <div className="p-8 rounded-lg shadow-lg md:p-24 bg-slate-900 outline-slate-600 outline-2">
        <h1 className="mb-8 text-2xl font-bold text-center">Login</h1>
        <form className="flex flex-col" action="">
          <label className="" htmlFor="user">
            User
          </label>
          <input
            className="px-2 py-1 mb-4 rounded-md outline outline-slate-700 focus:outline-slate-500"
            type="text"
            name="user"
            id="user"
          />
          <label className="" htmlFor="password">
            Password
          </label>
          <input
            className="px-2 py-1 mb-4 rounded-md outline outline-slate-700 focus:outline-slate-500"
            type="password"
            name="password"
            id="password"
          />
        </form>
      </div>
    </main>
  );
}
