$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " TENANT CONTEXT SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\tenancy\context",
  "$ProjectRoot\src\features\tenancy\hooks",
  "$ProjectRoot\src\features\tenancy\services"
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
# TENANT SERVICE
# -------------------------------------------------

$tenantService = @'
import { Organization }
from "@/features/organizations/types/Organization";

import { Membership }
from "@/features/memberships/types/Membership";

export type TenantContextType = {

  organization:
    Organization | null;

  membership:
    Membership | null;

  tenantId:
    string | null;

  organizationId:
    string | null;

  role:
    string | null;
};

export const TenantService = {

  buildContext(
    organization: Organization | null,
    membership: Membership | null
  ): TenantContextType {

    return {

      organization,

      membership,

      tenantId:
        organization?.tenantId || null,

      organizationId:
        organization?.id || null,

      role:
        membership?.role || null,
    };
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\tenancy\services\TenantService.ts",
  $tenantService
)

Write-Host "Created: TenantService.ts"

# -------------------------------------------------
# TENANT PROVIDER
# -------------------------------------------------

$tenantProvider = @'
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
} from "react";

import {
  TenantService,
  TenantContextType,
} from "@/features/tenancy/services/TenantService";

const TenantContext =
  createContext<TenantContextType>({
    organization: null,
    membership: null,
    tenantId: null,
    organizationId: null,
    role: null,
  });

type Props = {

  children: ReactNode;
};

export const TenantProvider = ({
  children,
}: Props) => {

  # MOCK DATA
  # Replace later with Firebase user context

  const organization = {
    id: "org-demo",
    tenantId: "tenant-demo",
    name: "Terragest Demo",
  } as any;

  const membership = {
    role: "admin",
  } as any;

  const value =
    useMemo(() => {

      return TenantService
        .buildContext(
          organization,
          membership
        );

    }, []);

  return (
    <TenantContext.Provider
      value={value}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenantContext =
() => {

  return useContext(
    TenantContext
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\tenancy\context\TenantProvider.tsx",
  $tenantProvider
)

Write-Host "Created: TenantProvider.tsx"

# -------------------------------------------------
# USE TENANT
# -------------------------------------------------

$useTenant = @'
"use client";

import {
  useTenantContext,
} from "@/features/tenancy/context/TenantProvider";

export function useTenant() {

  return useTenantContext();
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\tenancy\hooks\useTenant.ts",
  $useTenant
)

Write-Host "Created: useTenant.ts"

# -------------------------------------------------
# LAYOUT PATCH
# -------------------------------------------------

$layoutPatch = @'
import "./globals.css";

import { ReactNode }
from "react";

import { AuthProvider }
from "@/contexts/AuthContext";

import { TenantProvider }
from "@/features/tenancy/context/TenantProvider";

type Props = {

  children: ReactNode;
};

export default function RootLayout({
  children,
}: Props) {

  return (
    <html lang="fr">

      <body>

        <AuthProvider>

          <TenantProvider>

            {children}

          </TenantProvider>

        </AuthProvider>

      </body>

    </html>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\layout.tsx",
  $layoutPatch
)

Write-Host "Updated: layout.tsx"

Write-Host ""
Write-Host "======================================="
Write-Host " TENANT CONTEXT COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""