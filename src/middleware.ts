import { NextResponse, type NextRequest } from "next/server";
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { getToken } from "next-auth/jwt";
import { PUBLIC_ROUTES } from "./app/constants";

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });

  if (!token && !PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  console.log({ token });
});
