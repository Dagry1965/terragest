$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " MODERN ERP LAYOUT SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\components\layout"
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
import { usePathname }
from "next/navigation";

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

  const pathname =
    usePathname();

  return (
    <aside
      className="
        hidden
        md:flex
        flex-col
        w-72
        bg-black
        text-white
        min-h-screen
        p-6
      "
    >
      <div className="mb-10">

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Terragest
        </h1>

        <p
          className="
            text-sm
            text-gray-400
            mt-2
          "
        >
          ERP Agricole SaaS
        </p>
      </div>

      <nav className="space-y-2">

        {menuItems.map((item) => {

          const active =
            pathname.startsWith(
              item.href
            );

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                block
                rounded-xl
                px-4
                py-3
                transition
                ${
                  active
                    ? "bg-white text-black"
                    : "hover:bg-white/10"
                }
              `}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-10">

        <div
          className="
            rounded-xl
            bg-white/10
            p-4
          "
        >
          <p className="text-sm">
            Terragest Platform
          </p>

          <p
            className="
              text-xs
              text-gray-400
              mt-1
            "
          >
            Production Ready
          </p>
        </div>
      </div>
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

import {
  signOut,
} from "firebase/auth";

import { auth }
from "@/lib/firebase/config";

import { useRouter }
from "next/navigation";

export const Topbar = () => {

  const router =
    useRouter();

  async function handleLogout() {

    await signOut(auth);

    router.push("/login");
  }

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
      <div>

        <h2
          className="
            text-xl
            font-semibold
          "
        >
          Terragest ERP
        </h2>

        <p
          className="
            text-sm
            text-gray-500
          "
        >
          Gestion Agricole
        </p>
      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >
        <div
          className="
            hidden
            md:block
            text-right
          "
        >
          <p className="font-medium">
            Admin
          </p>

          <p
            className="
              text-xs
              text-gray-500
            "
          >
            Super utilisateur
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="
            bg-black
            text-white
            px-4
            py-2
            rounded-lg
            text-sm
          "
        >
          Logout
        </button>
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
        bg-gray-100
        min-h-screen
      "
    >
      <Sidebar />

      <div
        className="
          flex-1
          flex
          flex-col
        "
      >
        <Topbar />

        <main
          className="
            flex-1
            p-6
            overflow-auto
          "
        >
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
Write-Host " MODERN ERP LAYOUT COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. firebase deploy"
Write-Host ""