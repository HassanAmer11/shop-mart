import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/orders", "/carts"];
const authRoutes = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  //const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;
  if (protectedRoutes.includes(pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL("/login", process.env.BASE_URL);
      redirectUrl.searchParams.set("url", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (authRoutes.includes(pathname)) {
    if (token) {
      const redirectUrl = new URL("/", process.env.BASE_URL);
      return NextResponse.redirect(redirectUrl);
    } else {
      return NextResponse.next();
    }
  }
  return NextResponse.next();
}
