$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " RBAC SYSTEM SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\auth\types",
  "$ProjectRoot\src\features\auth\services",
  "$ProjectRoot\src\features\auth\hooks",
  "$ProjectRoot\src\features\auth\guards"
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
# USER ROLE TYPE
# -------------------------------------------------

$userRole = @'
export type UserRole =
  | "admin"
  | "manager"
  | "agent"
  | "viewer";
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\auth\types\UserRole.ts",
  $userRole
)

Write-Host "Created: UserRole.ts"

# -------------------------------------------------
# PERMISSION SERVICE
# -------------------------------------------------

$permissionService = @'
import { UserRole }
from "@/features/auth/types/UserRole";

export const PermissionService = {

  canViewDashboard(
    role: UserRole
  ) {

    return [
      "admin",
      "manager",
      "agent",
      "viewer",
    ].includes(role);
  },

  canManageProducts(
    role: UserRole
  ) {

    return [
      "admin",
      "manager",
    ].includes(role);
  },

  canDeleteProducts(
    role: UserRole
  ) {

    return role === "admin";
  },

  canViewAnalytics(
    role: UserRole
  ) {

    return [
      "admin",
      "manager",
    ].includes(role);
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\auth\services\PermissionService.ts",
  $permissionService
)

Write-Host "Created: PermissionService.ts"

# -------------------------------------------------
# USE PERMISSIONS HOOK
# -------------------------------------------------

$usePermissions = @'
"use client";

import { UserRole }
from "@/features/auth/types/UserRole";

import { PermissionService }
from "@/features/auth/services/PermissionService";

export function usePermissions(
  role: UserRole = "admin"
) {

  return {

    canViewDashboard:
      PermissionService
        .canViewDashboard(role),

    canManageProducts:
      PermissionService
        .canManageProducts(role),

    canDeleteProducts:
      PermissionService
        .canDeleteProducts(role),

    canViewAnalytics:
      PermissionService
        .canViewAnalytics(role),
  };
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\auth\hooks\usePermissions.ts",
  $usePermissions
)

Write-Host "Created: usePermissions.ts"

# -------------------------------------------------
# ROLE GUARD
# -------------------------------------------------

$roleGuard = @'
"use client";

import { ReactNode }
from "react";

import { UserRole }
from "@/features/auth/types/UserRole";

import { usePermissions }
from "@/features/auth/hooks/usePermissions";

type Props = {
  role?: UserRole;

  permission:
    keyof ReturnType<
      typeof usePermissions
    >;

  children: ReactNode;
};

export const RoleGuard = ({
  role = "admin",
  permission,
  children,
}: Props) => {

  const permissions =
    usePermissions(role);

  if (!permissions[permission]) {

    return null;
  }

  return <>{children}</>;
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\auth\guards\RoleGuard.tsx",
  $roleGuard
)

Write-Host "Created: RoleGuard.tsx"

# -------------------------------------------------
# ALERT PANEL SECURITY EXAMPLE
# -------------------------------------------------

$dashboardPatch = @'
import { AnalyticsCards }
from "@/features/analytics/components/AnalyticsCards";

import { StockValueChart }
from "@/features/analytics/components/StockValueChart";

import { ProductsCategoryChart }
from "@/features/analytics/components/ProductsCategoryChart";

import { AlertsPanel }
from "@/features/alerts/components/AlertsPanel";

import { RecentActivities }
from "@/components/dashboard/RecentActivities";

import { RoleGuard }
from "@/features/auth/guards/RoleGuard";

export default function DashboardPage() {

  return (
    <div className="space-y-6">

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Dashboard
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          ERP Agricole Enterprise
        </p>
      </div>

      <RoleGuard
        permission="
          canViewAnalytics
        "
      >
        <AnalyticsCards />

        <div
          className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-6
          "
        >
          <StockValueChart />

          <ProductsCategoryChart />
        </div>
      </RoleGuard>

      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
        "
      >
        <div className="xl:col-span-2">
          <RecentActivities />
        </div>

        <AlertsPanel />
      </div>
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\dashboard\page.tsx",
  $dashboardPatch
)

Write-Host "Updated: dashboard RBAC"

Write-Host ""
Write-Host "======================================="
Write-Host " RBAC SYSTEM COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""