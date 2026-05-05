# =========================================================
# TERRAGEST - RUNTIME BOOTSTRAP
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RUNTIME BOOTSTRAP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\platform\runtime",

  ".\src\components\bootstrap"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"
  }
}

# =========================================================
# RUNTIME BOOTSTRAP SERVICE
# =========================================================

$bootstrapService = @'
// src/platform/runtime/RuntimeBootstrap.ts

import { MaterielsStore }
from "@/domains/materiels/store/MaterielsStore";

export class RuntimeBootstrap {

  static async initialize() {

    console.log(
      "[BOOTSTRAP] Runtime initialization"
    );

    await MaterielsStore.load();

    console.log(
      "[BOOTSTRAP] Runtime ready"
    );
  }
}
'@

Set-Content `
  ".\src\platform\runtime\RuntimeBootstrap.ts" `
  $bootstrapService

Write-Host ""
Write-Host "[CREATED] RuntimeBootstrap.ts"

# =========================================================
# BOOTSTRAP COMPONENT
# =========================================================

$bootstrapComponent = @'
// src/components/bootstrap/RuntimeBootstrapProvider.tsx

"use client";

import {
  useEffect,

  useState
}
from "react";

import { RuntimeBootstrap }
from "@/platform/runtime/RuntimeBootstrap";

interface RuntimeBootstrapProviderProps {

  children:
    React.ReactNode;
}

export function RuntimeBootstrapProvider({

  children
}: RuntimeBootstrapProviderProps) {

  const [ready, setReady] =
    useState(false);

  useEffect(() => {

    async function bootstrap() {

      await RuntimeBootstrap
        .initialize();

      setReady(true);
    }

    bootstrap();

  }, []);

  if (!ready) {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        Chargement runtime ERP...
      </div>
    );
  }

  return children;
}
'@

Set-Content `
  ".\src\components\bootstrap\RuntimeBootstrapProvider.tsx" `
  $bootstrapComponent

Write-Host "[CREATED] RuntimeBootstrapProvider.tsx"

# =========================================================
# ROOT LAYOUT
# =========================================================

$rootLayout = @'
// src/app/layout.tsx

import "./globals.css";

import {
  RuntimeBootstrapProvider
}
from "@/components/bootstrap/RuntimeBootstrapProvider";

export default function RootLayout({

  children
}: {

  children:
    React.ReactNode;
}) {

  return (

    <html lang="fr">

      <body>

        <RuntimeBootstrapProvider>

          {children}

        </RuntimeBootstrapProvider>

      </body>

    </html>
  );
}
'@

Set-Content `
  ".\src\app\layout.tsx" `
  $rootLayout

Write-Host "[UPDATED] Root layout"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RUNTIME BOOTSTRAP READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-runtime-bootstrap.ps1"
Write-Host "pnpm build"
Write-Host ""