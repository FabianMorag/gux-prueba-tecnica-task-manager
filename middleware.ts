import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";
import { PUBLIC_ROUTES } from "@/src/app/constants";

export default auth(async function middleware(req: NextRequest) {
  console.log("hola");
  const { nextUrl } = req;
  const session = await auth();
  const isLoggedIn = session?.user;

  if (!isLoggedIn && !PUBLIC_ROUTES.includes(nextUrl.pathname))
    return NextResponse.redirect(new URL("/", req.url));

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
