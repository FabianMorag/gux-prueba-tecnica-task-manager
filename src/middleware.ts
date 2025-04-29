import type { NextRequest } from "next/server";

export const config = {
  matcher: ["/"],
};

export default async function middleware(req: NextRequest) {
  console.log("hola");
}
