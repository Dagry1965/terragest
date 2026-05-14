$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path -Parent

  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

# =========================================================
# SESSION HELPERS
# =========================================================

$sessionPath = Join-Path `
  $root `
  "src\lib\auth\session.ts"

$sessionContent = @'
export const PUBLIC_ROUTES = [

  "/login",

  "/register",

  "/",
];

export function isPublicRoute(
  pathname: string
) {

  return PUBLIC_ROUTES.some(
    (route) => {

      if (
        route === "/"
      ) {

        return pathname === "/";
      }

      return pathname.startsWith(
        route
      );
    }
  );
}

export function isProtectedERPRoute(
  pathname: string
) {

  const protectedPrefixes = [

    "/dashboard",

    "/workspaces",

    "/terrains",

    "/exploitations",

    "/produits",

    "/stocks",

    "/materiels",

    "/maintenance",

    "/interventions",

    "/paiements",

    "/facturations",

    "/contrats",

    "/campagnes",

    "/budgets",

    "/admin",

    "/supervision",
  ];

  return protectedPrefixes.some(
    (prefix) =>
      pathname.startsWith(
        prefix
      )
  );
}
'@

# =========================================================
# MIDDLEWARE
# =========================================================

$middlewarePath = Join-Path `
  $root `
  "src\middleware.ts"

$middlewareContent = @'
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
        "/dashboard",
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
'@

Write-Utf8NoBom `
  -Path $sessionPath `
  -Content $sessionContent

Write-Utf8NoBom `
  -Path $middlewarePath `
  -Content $middlewareContent

Write-Host ""
Write-Host "OK - Enterprise middleware hardened."
Write-Host "Run: pnpm build"
