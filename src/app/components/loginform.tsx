"use client";
export default function LoginForm() {
  return (
    <form className="flex flex-col" onSubmit={() => {}}>
      <label className="font-medium" htmlFor="user">
        User
      </label>
      <input
        className="px-2 py-1 mb-6 rounded-lg outline outline-slate-700 focus:outline-slate-500"
        type="text"
        name="user"
        id="user"
      />
      <label className="font-medium" htmlFor="password">
        Password
      </label>
      <input
        className="px-2 py-1 mb-6 rounded-lg outline outline-slate-700 focus:outline-slate-500"
        type="password"
        name="password"
        id="password"
      />
    </form>
  );
}
