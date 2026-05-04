# =========================================================
# TERRAGEST - ERP SHELL SETUP
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " ERP SHELL SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\components\layout",

  ".\src\components\sidebar",

  ".\src\components\topbar",

  ".\src\components\navigation"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"

  } else {

    Write-Host "[EXISTS]  $directory"
  }
}

# =========================================================
# ERP SIDEBAR
# =========================================================

$sidebar = @'
// src/components/sidebar/ERPSidebar.tsx

"use client";

import Link
from "next/link";

const items = [

  "Dashboard",

  "Exploitations",

  "Terrains",

  "Stocks",

  "Produits",

  "Matériels",

  "Interventions",

  "Maintenance",

  "Contrats",

  "Paiements",

  "Workflows",

  "Supervision"
];

export function ERPSidebar() {

  return (

    <aside
      className="w-64 min-h-screen bg-zinc-900 text-white p-4"
    >

      <h1
        className="text-2xl font-bold mb-8"
      >
        Terragest
      </h1>

      <nav
        className="flex flex-col gap-2"
      >

        {items.map(item => (

          <Link

            key={item}

            href="#"

            className="
              px-3
              py-2
              rounded-lg
              hover:bg-zinc-800
              transition
            "
          >
            {item}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
'@

Set-Content `
  ".\src\components\sidebar\ERPSidebar.tsx" `
  $sidebar

Write-Host ""
Write-Host "[CREATED] ERPSidebar.tsx"

# =========================================================
# ERP TOPBAR
# =========================================================

$topbar = @'
// src/components/topbar/ERPTopbar.tsx

"use client";

export function ERPTopbar() {

  return (

    <header
      className="
        h-16
        border-b
        bg-white
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
          ERP Terragest
        </h2>
      </div>

      <div
        className="
          flex
          items-center
          gap-4
        "
      >

        <div>
          Notifications
        </div>

        <div>
          Admin
        </div>
      </div>
    </header>
  );
}
'@

Set-Content `
  ".\src\components\topbar\ERPTopbar.tsx" `
  $topbar

Write-Host "[CREATED] ERPTopbar.tsx"

# =========================================================
# ERP LAYOUT
# =========================================================

$layout = @'
// src/components/layout/ERPLayout.tsx

"use client";

import {
  ReactNode
}
from "react";

import { ERPSidebar }
from "@/components/sidebar/ERPSidebar";

import { ERPTopbar }
from "@/components/topbar/ERPTopbar";

interface ERPLayoutProps {

  children:
    ReactNode;
}

export function ERPLayout({

  children
}: ERPLayoutProps) {

  return (

    <div
      className="
        flex
        min-h-screen
        bg-zinc-100
      "
    >

      <ERPSidebar />

      <div
        className="
          flex-1
          flex
          flex-col
        "
      >

        <ERPTopbar />

        <main
          className="
            flex-1
            p-6
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
'@

Set-Content `
  ".\src\components\layout\ERPLayout.tsx" `
  $layout

Write-Host "[CREATED] ERPLayout.tsx"

# =========================================================
# DASHBOARD PAGE
# =========================================================

$dashboard = @'
// src/app/page.tsx

import { ERPLayout }
from "@/components/layout/ERPLayout";

export default function HomePage() {

  return (

    <ERPLayout>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Stocks
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Maintenance
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Paiements
        </div>

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            p-6
          "
        >
          Workflows
        </div>
      </div>

    </ERPLayout>
  );
}
'@

Set-Content `
  ".\src\app\page.tsx" `
  $dashboard

Write-Host "[UPDATED] page.tsx"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " ERP SHELL READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-erp-shell.ps1"
Write-Host "pnpm build"
Write-Host ""