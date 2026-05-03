$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " REALTIME ANALYTICS SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\analytics\hooks",
  "$ProjectRoot\src\features\analytics\components"
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
# USE ANALYTICS
# -------------------------------------------------

$useAnalytics = @'
"use client";

import { useMemo }
from "react";

import { useProducts }
from "@/features/produits/hooks/useProducts";

export function useAnalytics() {

  const {
    data: products,
    loading,
  } = useProducts();

  const analytics =
    useMemo(() => {

      const totalProducts =
        products.length;

      const totalQuantity =
        products.reduce(
          (
            acc: number,
            item: any
          ) =>
            acc +
            Number(
              item.quantite || 0
            ),
          0
        );

      const totalStockValue =
        products.reduce(
          (
            acc: number,
            item: any
          ) =>
            acc +
            (
              Number(item.prix || 0) *
              Number(
                item.quantite || 0
              )
            ),
          0
        );

      const activeProducts =
        products.filter(
          (item: any) =>
            item.actif
        ).length;

      return {
        totalProducts,
        totalQuantity,
        totalStockValue,
        activeProducts,
      };

    }, [products]);

  return {
    loading,
    analytics,
  };
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\analytics\hooks\useAnalytics.ts",
  $useAnalytics
)

Write-Host "Created: useAnalytics.ts"

# -------------------------------------------------
# ANALYTICS CARDS
# -------------------------------------------------

$analyticsCards = @'
"use client";

import { KPICard }
from "@/components/dashboard/KPICard";

import { useAnalytics }
from "@/features/analytics/hooks/useAnalytics";

export const AnalyticsCards =
() => {

  const {
    analytics,
    loading,
  } = useAnalytics();

  if (loading) {

    return (
      <p>
        Chargement analytics...
      </p>
    );
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
      "
    >
      <KPICard
        title="Produits"
        value={
          String(
            analytics.totalProducts
          )
        }
        subtitle="Produits enregistrés"
      />

      <KPICard
        title="Quantité Totale"
        value={
          String(
            analytics.totalQuantity
          )
        }
        subtitle="Stock global"
      />

      <KPICard
        title="Valeur Stock"
        value={
          `${analytics.totalStockValue} €`
        }
        subtitle="Valeur totale"
      />

      <KPICard
        title="Produits Actifs"
        value={
          String(
            analytics.activeProducts
          )
        }
        subtitle="Produits disponibles"
      />
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\analytics\components\AnalyticsCards.tsx",
  $analyticsCards
)

Write-Host "Created: AnalyticsCards.tsx"

# -------------------------------------------------
# DASHBOARD PAGE
# -------------------------------------------------

$dashboardPage = @'
import { AnalyticsCards }
from "@/features/analytics/components/AnalyticsCards";

import { RecentActivities }
from "@/components/dashboard/RecentActivities";

import { AlertsPanel }
from "@/components/dashboard/AlertsPanel";

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
          Vue globale ERP agricole
        </p>
      </div>

      <AnalyticsCards />

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
  $dashboardPage
)

Write-Host "Updated: dashboard page"

Write-Host ""
Write-Host "======================================="
Write-Host " REALTIME ANALYTICS COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""