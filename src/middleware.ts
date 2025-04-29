import type { NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  console.log("hola");
});
