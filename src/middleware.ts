import { NextResponse }
from "next/server";

import type { NextRequest }
from "next/server";

import {

  isProtectedERPRoute,

  isPublicRoute,

}
from "./lib/auth/session";

export function middleware(
  request: NextRequest
) {

  const token =
    request.cookies.get(
      "token"
    );

  const pathname =
    request.nextUrl.pathname;

  const isPublic =
    isPublicRoute(
      pathname
    );

  const isProtected =
    isProtectedERPRoute(
      pathname
    );

  if (
    isProtected &&
    !token
  ) {

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
        "/workspaces/general",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {

  matcher: [

    "/((?!_next).*)",
  ],
};