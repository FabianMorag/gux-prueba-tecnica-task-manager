import LoginForm from "./components/loginform";

/* eslint-disable @next/next/no-img-element */
export default function Home() {
  return (
    <main className="flex flex-col items-center h-screen px-2 pt-24 md:pt-36">
      <img
        className="mb-16 w-96"
        src="https://gux.tech/wp-content/uploads/2023/04/Logo-GUX-white.png"
        alt="Gux logo"
      />
      <div className="p-8 rounded-lg shadow-lg md:p-24 bg-slate-900 outline-slate-800 outline-2">
        <h1 className="mb-8 text-3xl font-bold text-center">Login</h1>
        <LoginForm />

        <button
          className="w-full px-3 py-2 text-white rounded-full cursor-pointer text-bold bg-slate-700 hover:bg-slate-600"
          type="submit"
        >
          Login
        </button>
      </div>
    </main>
  );
}
