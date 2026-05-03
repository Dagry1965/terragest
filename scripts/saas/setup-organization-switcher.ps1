$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " ORGANIZATION SWITCHER SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\tenancy\components"
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
# TENANT PROVIDER UPDATE
# -------------------------------------------------

$tenantProvider = @'
"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  TenantService,
  TenantContextType,
} from "@/features/tenancy/services/TenantService";

const mockOrganizations = [
  {
    id: "org-demo",
    tenantId: "tenant-demo",
    name: "Terragest Demo",
  },
  {
    id: "org-farm",
    tenantId: "tenant-farm",
    name: "Farm Group",
  },
];

const TenantContext =
  createContext<any>(null);

type Props = {

  children: ReactNode;
};

export const TenantProvider = ({
  children,
}: Props) => {

  const [
    activeOrganization,
    setActiveOrganization,
  ] = useState(
    mockOrganizations[0]
  );

  const membership = {
    role: "admin",
  } as any;

  const value =
    useMemo(() => {

      return {

        ...TenantService.buildContext(
          activeOrganization,
          membership
        ),

        organizations:
          mockOrganizations,

        setActiveOrganization,
      };

    }, [activeOrganization]);

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

Write-Host "Updated: TenantProvider.tsx"

# -------------------------------------------------
# ORGANIZATION SWITCHER
# -------------------------------------------------

$switcher = @'
"use client";

import { useTenant }
from "@/features/tenancy/hooks/useTenant";

export const OrganizationSwitcher =
() => {

  const {
    organizations,
    organization,
    setActiveOrganization,
  } = useTenant() as any;

  return (
    <div
      className="
        flex
        items-center
        gap-3
      "
    >
      <span
        className="
          text-sm
          text-gray-500
        "
      >
        Organisation
      </span>

      <select
        className="
          border
          rounded-xl
          px-3
          py-2
          bg-white
        "
        value={organization?.id}
        onChange={(e) => {

          const selected =
            organizations.find(
              (org: any) =>
                org.id ===
                e.target.value
            );

          if (selected) {

            setActiveOrganization(
              selected
            );
          }
        }}
      >
        {organizations.map(
          (org: any) => (

          <option
            key={org.id}
            value={org.id}
          >
            {org.name}
          </option>
        ))}
      </select>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\tenancy\components\OrganizationSwitcher.tsx",
  $switcher
)

Write-Host "Created: OrganizationSwitcher.tsx"

# -------------------------------------------------
# DASHBOARD UPDATE
# -------------------------------------------------

$dashboard = @'
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

import { OrganizationSwitcher }
from "@/features/tenancy/components/OrganizationSwitcher";

export default function DashboardPage() {

  return (
    <div className="space-y-6">

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
            Dashboard
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            ERP Agricole SaaS
          </p>
        </div>

        <OrganizationSwitcher />
      </div>

      <RoleGuard permission="canViewAnalytics">

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
  $dashboard
)

Write-Host "Updated: dashboard page"

Write-Host ""
Write-Host "======================================="
Write-Host " ORGANIZATION SWITCHER COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""