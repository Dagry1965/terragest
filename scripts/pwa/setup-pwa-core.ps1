$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " PWA CORE SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\public\icons",
  "$ProjectRoot\src\features\pwa\components",
  "$ProjectRoot\src\features\pwa\services"
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
# MANIFEST
# -------------------------------------------------

$manifest = @'
{
  "name": "Terragest",
  "short_name": "Terragest",
  "description": "ERP Agricole SaaS",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\public\manifest.json",
  $manifest
)

Write-Host "Created: manifest.json"

# -------------------------------------------------
# PWA INSTALL BUTTON
# -------------------------------------------------

$installButton = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

export const PWAInstallButton =
() => {

  const [
    deferredPrompt,
    setDeferredPrompt,
  ] = useState<any>(null);

  useEffect(() => {

    function handler(e: any) {

      e.preventDefault();

      setDeferredPrompt(e);
    }

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () => {

      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );
    };

  }, []);

  async function handleInstall() {

    if (!deferredPrompt) {

      return;
    }

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setDeferredPrompt(null);
  }

  if (!deferredPrompt) {

    return null;
  }

  return (
    <button
      onClick={handleInstall}
      className="
        bg-black
        text-white
        px-4
        py-3
        rounded-xl
      "
    >
      Installer application
    </button>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\pwa\components\PWAInstallButton.tsx",
  $installButton
)

Write-Host "Created: PWAInstallButton.tsx"

# -------------------------------------------------
# OFFLINE CARD
# -------------------------------------------------

$offline = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

export const OfflineStatusCard =
() => {

  const [
    online,
    setOnline,
  ] = useState(true);

  useEffect(() => {

    function updateStatus() {

      setOnline(
        navigator.onLine
      );
    }

    updateStatus();

    window.addEventListener(
      "online",
      updateStatus
    );

    window.addEventListener(
      "offline",
      updateStatus
    );

    return () => {

      window.removeEventListener(
        "online",
        updateStatus
      );

      window.removeEventListener(
        "offline",
        updateStatus
      );
    };

  }, []);

  return (
    <div
      className="
        bg-white
        border
        rounded-2xl
        p-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>

          <h2
            className="
              text-xl
              font-semibold
            "
          >
            Statut réseau
          </h2>

          <p
            className="
              text-gray-500
              mt-1
            "
          >
            Synchronisation offline
          </p>
        </div>

        <div
          className={`
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
            ${
              online
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {
            online
              ? "En ligne"
              : "Hors ligne"
          }
        </div>
      </div>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\pwa\components\OfflineStatusCard.tsx",
  $offline
)

Write-Host "Created: OfflineStatusCard.tsx"

# -------------------------------------------------
# ROOT LAYOUT PATCH
# -------------------------------------------------

$layout = @'
import type { Metadata }
from "next";

import "./globals.css";

export const metadata:
Metadata = {

  title: "Terragest",

  description:
    "ERP Agricole SaaS",

  manifest:
    "/manifest.json",
};

export default function
RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\layout.tsx",
  $layout
)

Write-Host "Updated: RootLayout"

# -------------------------------------------------
# PWA PAGE
# -------------------------------------------------

$pageDir =
"$ProjectRoot\src\app\(private)\pwa"

if (!(Test-Path $pageDir)) {

  New-Item `
    -ItemType Directory `
    -Path $pageDir `
    -Force | Out-Null

  Write-Host "Created: pwa page dir"
}

$page = @'
import { PWAInstallButton }
from "@/features/pwa/components/PWAInstallButton";

import { OfflineStatusCard }
from "@/features/pwa/components/OfflineStatusCard";

export default function PWAPage() {

  return (
    <div
      className="
        p-6
        space-y-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            PWA & Offline
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Mobile et synchronisation
          </p>
        </div>

        <PWAInstallButton />
      </div>

      <OfflineStatusCard />
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\pwa\page.tsx",
  $page
)

Write-Host "Created: PWA page"

Write-Host ""
Write-Host "======================================="
Write-Host " PWA CORE COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. add icons"
Write-Host "2. pnpm build"
Write-Host "3. git commit"
Write-Host "4. firebase deploy"
Write-Host ""