$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " TERRAGEST ERP LAYOUT SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# CREATE DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\components\layout",
  "$ProjectRoot\src\app\(private)"
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
# SIDEBAR
# -------------------------------------------------

$sidebar = @'
"use client";

import Link from "next/link";

const menuItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Exploitations",
    href: "/exploitations",
  },
  {
    label: "Produits",
    href: "/produits",
  },
  {
    label: "Stocks",
    href: "/stocks",
  },
  {
    label: "Matériels",
    href: "/materiels",
  },
];

export const Sidebar = () => {
  return (
    <aside
      className="
        w-64
        bg-black
        text-white
        min-h-screen
        p-6
        hidden
        md:block
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          mb-10
        "
      >
        Terragest
      </h1>

      <nav className="space-y-4">

        {menuItems.map((item) => (

          <Link
            key={item.href}
            href={item.href}
            className="
              block
              hover:bg-white/10
              rounded-lg
              p-3
              transition
            "
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\layout\Sidebar.tsx",
  $sidebar
)

Write-Host "Created: Sidebar.tsx"

# -------------------------------------------------
# TOPBAR
# -------------------------------------------------

$topbar = @'
"use client";

export const Topbar = () => {
  return (
    <header
      className="
        h-16
        bg-white
        border-b
        flex
        items-center
        justify-between
        px-6
      "
    >
      <h2
        className="
          text-xl
          font-semibold
        "
      >
        ERP Agricole
      </h2>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <span>
          Admin
        </span>

        <div
          className="
            w-10
            h-10
            rounded-full
            bg-black
          "
        />
      </div>
    </header>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\layout\Topbar.tsx",
  $topbar
)

Write-Host "Created: Topbar.tsx"

# -------------------------------------------------
# PRIVATE LAYOUT
# -------------------------------------------------

$privateLayout = @'
import { Sidebar }
from "@/components/layout/Sidebar";

import { Topbar }
from "@/components/layout/Topbar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div
      className="
        flex
        min-h-screen
        bg-gray-100
      "
    >
      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <main className="p-6">
          {children}
        </main>

      </div>
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\layout.tsx",
  $privateLayout
)

Write-Host "Created: private layout"

Write-Host ""
Write-Host "======================================="
Write-Host " ERP LAYOUT COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. firebase deploy"
Write-Host ""