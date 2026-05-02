Write-Host "Generating Terragest Enterprise Frontend Foundation..." -ForegroundColor Cyan

# =====================================================
# ROOT PATH
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\components" -Force
mkdir "src\components\layout" -Force
mkdir "src\components\navigation" -Force
mkdir "src\components\ui" -Force
mkdir "src\components\notifications" -Force
mkdir "src\theme" -Force

# =====================================================
# APP LAYOUT
# =====================================================

$appLayout = @'
"use client";

import { Sidebar } from "@/components/navigation/Sidebar";

import { Topbar } from "@/components/navigation/Topbar";

interface AppLayoutProps {

  children: React.ReactNode;
}

export const AppLayout = ({
  children,
}: AppLayoutProps) => {

  return (

    <div className="
      min-h-screen
      bg-gray-100
      flex
    ">

      <Sidebar />

      <div className="
        flex-1
        flex
        flex-col
      ">

        <Topbar />

        <main className="
          p-6
        ">

          {children}

        </main>

      </div>

    </div>
  );
}
'@

Set-Content `
"$ROOT\src\components\layout\AppLayout.tsx" `
$appLayout

# =====================================================
# SIDEBAR
# =====================================================

$sidebar = @'
"use client";

const items = [

  "Dashboard",

  "Exploitations",

  "Terrains",

  "Stocks",

  "Produits",

  "Interventions",

  "IoT",

  "Analytics",

  "Billing",

  "Security",
];

export const Sidebar = () => {

  return (

    <aside className="
      w-72
      bg-black
      text-white
      min-h-screen
      p-6
    ">

      <h1 className="
        text-3xl
        font-bold
        mb-10
      ">
        Terragest
      </h1>

      <nav className="
        space-y-3
      ">

        {items.map(
          (item) => (

            <div
              key={item}
              className="
                px-4
                py-3
                rounded-xl
                hover:bg-white/10
                cursor-pointer
              "
            >

              {item}

            </div>

          )
        )}

      </nav>

    </aside>
  );
}
'@

Set-Content `
"$ROOT\src\components\navigation\Sidebar.tsx" `
$sidebar

# =====================================================
# TOPBAR
# =====================================================

$topbar = @'
"use client";

export const Topbar = () => {

  return (

    <header className="
      bg-white
      border-b
      px-6
      py-4
      flex
      items-center
      justify-between
    ">

      <div>

        <h2 className="
          text-2xl
          font-bold
        ">
          Enterprise Platform
        </h2>

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
"$ROOT\src\components\navigation\Topbar.tsx" `
$topbar

# =====================================================
# BUTTON COMPONENT
# =====================================================

$buttonComponent = @'
interface ButtonProps {

  label: string;

  onClick?: () => void;
}

export const Button = ({
  label,
  onClick,
}: ButtonProps) => {

  return (

    <button
      onClick={onClick}
      className="
        px-5
        py-3
        rounded-xl
        bg-black
        text-white
        font-medium
        hover:opacity-90
      "
    >

      {label}

    </button>
  );
}
'@

Set-Content `
"$ROOT\src\components\ui\Button.tsx" `
$buttonComponent

# =====================================================
# CARD COMPONENT
# =====================================================

$cardComponent = @'
interface CardProps {

  title: string;

  children?: React.ReactNode;
}

export const Card = ({
  title,
  children,
}: CardProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-4
      ">
        {title}
      </h2>

      {children}

    </div>
  );
}
'@

Set-Content `
"$ROOT\src\components\ui\Card.tsx" `
$cardComponent

# =====================================================
# INPUT COMPONENT
# =====================================================

$inputComponent = @'
interface InputProps {

  placeholder?: string;

  value?: string;

  onChange?: any;
}

export const Input = ({
  placeholder,
  value,
  onChange,
}: InputProps) => {

  return (

    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="
        w-full
        border
        rounded-xl
        px-4
        py-3
        outline-none
      "
    />

  );
}
'@

Set-Content `
"$ROOT\src\components\ui\Input.tsx" `
$inputComponent

# =====================================================
# NOTIFICATION CENTER
# =====================================================

$notificationCenter = @'
"use client";

export const NotificationCenter = () => {

  return (

    <div className="
      fixed
      top-6
      right-6
      w-96
      space-y-4
      z-50
    ">

      <div className="
        bg-white
        rounded-2xl
        shadow-lg
        p-4
      ">

        <p className="
          font-semibold
        ">
          IoT Alert
        </p>

        <p className="
          text-sm
          text-gray-500
          mt-1
        ">
          Humidité faible détectée
        </p>

      </div>

    </div>
  );
}
'@

Set-Content `
"$ROOT\src\components\notifications\NotificationCenter.tsx" `
$notificationCenter

# =====================================================
# THEME CONFIG
# =====================================================

$themeConfig = @'
export const theme = {

  colors: {

    primary:
      "#000000",

    secondary:
      "#1f2937",

    background:
      "#f3f4f6",

    white:
      "#ffffff",
  },

  borderRadius: {

    xl:
      "1rem",

    xxl:
      "1.5rem",
  },
};
'@

Set-Content `
"$ROOT\src\theme\theme.ts" `
$themeConfig

# =====================================================
# DASHBOARD PAGE
# =====================================================

$dashboardPage = @'
import { AppLayout } from "@/components/layout/AppLayout";

import { Card } from "@/components/ui/Card";

export default function DashboardPage() {

  return (

    <AppLayout>

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      ">

        <Card title="Revenue">

          €1.2M

        </Card>

        <Card title="IoT Events">

          845K

        </Card>

        <Card title="Operations">

          98.7%

        </Card>

        <Card title="AI Predictions">

          14K

        </Card>

      </div>

    </AppLayout>
  );
}
'@

mkdir `
"$ROOT\src\app\dashboard" `
-Force

Set-Content `
"$ROOT\src\app\dashboard\page.tsx" `
$dashboardPage

# =====================================================
# DOCUMENTATION
# =====================================================

$frontendDoc = @'
# Terragest Enterprise Frontend Foundation

## Components

- AppLayout
- Sidebar
- Topbar
- Button
- Card
- Input
- NotificationCenter

--------------------------------------------------

## UI Architecture

- Shared UI components
- Enterprise layout
- Responsive design
- Theme management

--------------------------------------------------

## Principles

- Reusable components
- Modular architecture
- Enterprise UX
- Scalable frontend
'@

Set-Content `
"$ROOT\docs\FRONTEND_FOUNDATION.md" `
$frontendDoc

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Enterprise Frontend Foundation generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Enterprise layout"
Write-Host "- Navigation system"
Write-Host "- Shared UI components"
Write-Host "- Theme configuration"
Write-Host "- Notification center"
Write-Host "- Scalable frontend architecture"
Write-Host ""