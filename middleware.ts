import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const atCookie = request.cookies.get("__at__")?.value;

  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (!atCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|_next/static|_next/image|favicon.ico|api|public).*)"],
};
