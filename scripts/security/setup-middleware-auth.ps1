$ErrorActionPreference = "Stop"

# -------------------------------------------------
# PROJECT ROOT
# -------------------------------------------------

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " TERRAGEST AUTH MIDDLEWARE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# CREATE DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\lib\auth"
)

foreach ($dir in $dirs) {

  if (!(Test-Path $dir)) {

    New-Item `
      -ItemType Directory `
      -Path $dir `
      -Force | Out-Null

    Write-Host "Created: $dir"
  }
}

# -------------------------------------------------
# SESSION FILE
# -------------------------------------------------

$sessionFile = @'
export const PUBLIC_ROUTES = [
  "/login",
  "/offline",
];

export function isPublicRoute(
  pathname: string
) {
  return PUBLIC_ROUTES.some(
    (route) =>
      pathname.startsWith(route)
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\lib\auth\session.ts",
  $sessionFile
)

Write-Host "Created: src/lib/auth/session.ts"

# -------------------------------------------------
# MIDDLEWARE
# -------------------------------------------------

$middleware = @'
import { NextResponse }
from "next/server";

import type { NextRequest }
from "next/server";

import {
  isPublicRoute,
}
from "@/lib/auth/session";

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
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\middleware.ts",
  $middleware
)

Write-Host "Created: src/middleware.ts"

Write-Host ""
Write-Host "======================================="
Write-Host " AUTH MIDDLEWARE COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. firebase deploy"
Write-Host ""