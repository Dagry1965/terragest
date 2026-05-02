Write-Host "Generating Terragest Enterprise AppShell..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\components\shell" -Force
mkdir "src\components\navigation" -Force
mkdir "src\components\topbar" -Force
mkdir "src\components\sidebar" -Force
mkdir "src\components\notifications" -Force

mkdir "docs" -Force

# =====================================================
# APP SIDEBAR
# =====================================================

$sidebar = @'
"use client";

import Link
from "next/link";

const items = [

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
    href: "/products",
  },

  {
    label: "Stocks",
    href: "/stocks",
  },

  {
    label: "Interventions",
    href: "/interventions",
  },

  {
    label: "Analytics",
    href: "/analytics",
  },

  {
    label: "AI Assistant",
    href: "/ai-assistant",
  },

  {
    label: "Workflow",
    href: "/workflow-engine",
  },
];

export const AppSidebar = () => {

  return (

    <aside className="
      w-72
      min-h-screen
      bg-black
      text-white
      flex
      flex-col
      p-6
    ">

      <div className="
        text-3xl
        font-bold
        mb-10
      ">

        TERRAGEST

      </div>

      <nav className="
        flex
        flex-col
        gap-3
      ">

        {items.map(
          (item) => (

            <Link
              key={item.href}
              href={item.href}
              className="
                px-4
                py-3
                rounded-xl
                hover:bg-white/10
                transition
              "
            >

              {item.label}

            </Link>

          )
        )}

      </nav>

    </aside>
  );
}
'@

Set-Content `
"$ROOT\src\components\sidebar\AppSidebar.tsx" `
$sidebar

# =====================================================
# TOPBAR
# =====================================================

$topbar = @'
"use client";

export const AppTopbar = () => {

  return (

    <header className="
      h-20
      bg-white
      border-b
      flex
      items-center
      justify-between
      px-8
    ">

      <div>

        <h1 className="
          text-2xl
          font-bold
        ">

          Enterprise Platform

        </h1>

      </div>

      <div className="
        flex
        items-center
        gap-4
      ">

        <div className="
          w-10
          h-10
          rounded-full
          bg-gray-200
        " />

      </div>

    </header>
  );
}
'@

Set-Content `
"$ROOT\src\components\topbar\AppTopbar.tsx" `
$topbar

# =====================================================
# NOTIFICATION CENTER
# =====================================================

$notificationCenter = @'
"use client";

export const NotificationCenter =
() => {

  return (

    <div className="
      fixed
      bottom-6
      right-6
      bg-white
      shadow-xl
      rounded-2xl
      p-4
      w-80
    ">

      <h2 className="
        font-bold
        mb-2
      ">

        Notifications

      </h2>

      <div className="
        text-sm
        text-gray-500
      ">

        Aucun événement critique.

      </div>

    </div>
  );
}
'@

Set-Content `
"$ROOT\src\components\notifications\NotificationCenter.tsx" `
$notificationCenter

# =====================================================
# APPSHELL
# =====================================================

$appShell = @'
"use client";

import {
  AppSidebar,
} from "@/components/sidebar/AppSidebar";

import {
  AppTopbar,
} from "@/components/topbar/AppTopbar";

import {
  NotificationCenter,
} from "@/components/notifications/NotificationCenter";

export const EnterpriseAppShell = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (

    <div className="
      flex
      bg-gray-100
      min-h-screen
    ">

      <AppSidebar />

      <div className="
        flex-1
        flex
        flex-col
      ">

        <AppTopbar />

        <main className="
          flex-1
          p-8
        ">

          {children}

        </main>

      </div>

      <NotificationCenter />

    </div>
  );
}
'@

Set-Content `
"$ROOT\src\components\shell\EnterpriseAppShell.tsx" `
$appShell

# =====================================================
# APP LAYOUT
# =====================================================

$appLayout = @'
"use client";

import {
  EnterpriseAppShell,
} from "@/components/shell/EnterpriseAppShell";

export const AppLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return (

    <EnterpriseAppShell>

      {children}

    </EnterpriseAppShell>
  );
}
'@

Set-Content `
"$ROOT\src\components\layout\AppLayout.tsx" `
$appLayout

# =====================================================
# ENTERPRISE DASHBOARD
# =====================================================

$dashboard = @'
"use client";

import {
  AppLayout,
} from "@/components/layout/AppLayout";

export default function DashboardPage() {

  return (

    <AppLayout>

      <div className="
        space-y-8
      ">

        <div>

          <h1 className="
            text-5xl
            font-bold
          ">

            Enterprise Dashboard

          </h1>

          <p className="
            text-gray-500
            mt-2
          ">

            Bienvenue sur Terragest.

          </p>

        </div>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        ">

          <div className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          ">

            <div className="
              text-gray-500
            ">

              Exploitations

            </div>

            <div className="
              text-4xl
              font-bold
              mt-4
            ">

              24

            </div>

          </div>

          <div className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          ">

            <div className="
              text-gray-500
            ">

              Produits

            </div>

            <div className="
              text-4xl
              font-bold
              mt-4
            ">

              132

            </div>

          </div>

          <div className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          ">

            <div className="
              text-gray-500
            ">

              Interventions

            </div>

            <div className="
              text-4xl
              font-bold
              mt-4
            ">

              18

            </div>

          </div>

          <div className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
          ">

            <div className="
              text-gray-500
            ">

              Performance

            </div>

            <div className="
              text-4xl
              font-bold
              mt-4
            ">

              98%

            </div>

          </div>

        </div>

      </div>

    </AppLayout>
  );
}
'@

mkdir `
"$ROOT\src\app\(private)\dashboard" `
-Force

Set-Content `
"$ROOT\src\app\(private)\dashboard\page.tsx" `
$dashboard

# =====================================================
# DOCUMENTATION
# =====================================================

$appShellDoc = @'
# Terragest Enterprise AppShell

## Features

- Enterprise sidebar
- Topbar navigation
- Notification center
- Responsive shell
- Unified layout

--------------------------------------------------

## Architecture

- EnterpriseAppShell
- Sidebar
- Topbar
- Notifications
- Unified layouts

--------------------------------------------------

## Benefits

- Enterprise UX
- Consistent navigation
- Modular shell
- Production-ready UI foundation
'@

Set-Content `
"$ROOT\docs\ENTERPRISE_APPSHELL.md" `
$appShellDoc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Enterprise AppShell generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Enterprise sidebar"
Write-Host "- Topbar"
Write-Host "- Notification center"
Write-Host "- Unified AppShell"
Write-Host "- Responsive enterprise layout"
Write-Host ""