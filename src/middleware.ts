import { NextResponse }
from "next/server";

import type { NextRequest }
from "next/server";

import {
  isPublicRoute,
}
from "./lib/auth/session";

export function middleware(
  request: NextRequest
) {

  const token =
    request.cookies.get("token");

  const pathname =
    request.nextUrl.pathname;

  const isPublic =
    isPublicRoute(pathname);

  if (!token && !isPublic) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  if (
    token &&
    pathname === "/login"
  ) {

    return NextResponse.redirect(
      new URL(
        "/dashboard",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/exploitations/:path*",
    "/produits/:path*",
    "/stocks/:path*",
    "/materiels/:path*",
  ],
};