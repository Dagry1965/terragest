$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " REALTIME ALERTS SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\features\alerts\hooks",
  "$ProjectRoot\src\features\alerts\services",
  "$ProjectRoot\src\features\alerts\components"
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
# ALERT SERVICE
# -------------------------------------------------

$alertService = @'
export type AlertItem = {
  id: string;

  level:
    | "info"
    | "warning"
    | "critical";

  title: string;

  description: string;
};

export const AlertService = {

  generateProductsAlerts(
    products: any[]
  ): AlertItem[] {

    const alerts: AlertItem[] = [];

    products.forEach(
      (product: any) => {

        const quantity =
          Number(
            product.quantite || 0
          );

        const value =
          Number(
            product.prix || 0
          ) * quantity;

        if (quantity < 5) {

          alerts.push({
            id:
              `${product.id}-stock`,
            level: "warning",
            title:
              "Stock faible",
            description:
              `${product.nom} faible stock`,
          });
        }

        if (!product.actif) {

          alerts.push({
            id:
              `${product.id}-inactive`,
            level: "info",
            title:
              "Produit inactif",
            description:
              `${product.nom} inactif`,
          });
        }

        if (value > 10000) {

          alerts.push({
            id:
              `${product.id}-value`,
            level: "critical",
            title:
              "Valeur élevée",
            description:
              `${product.nom} forte valeur`,
          });
        }
      }
    );

    return alerts;
  },
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\alerts\services\AlertService.ts",
  $alertService
)

Write-Host "Created: AlertService.ts"

# -------------------------------------------------
# USE ALERTS
# -------------------------------------------------

$useAlerts = @'
"use client";

import { useMemo }
from "react";

import { useProducts }
from "@/features/produits/hooks/useProducts";

import { AlertService }
from "@/features/alerts/services/AlertService";

export function useAlerts() {

  const {
    data: products,
    loading,
  } = useProducts();

  const alerts =
    useMemo(() => {

      return AlertService
        .generateProductsAlerts(
          products
        );

    }, [products]);

  return {
    loading,
    alerts,
  };
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\alerts\hooks\useAlerts.ts",
  $useAlerts
)

Write-Host "Created: useAlerts.ts"

# -------------------------------------------------
# ALERTS PANEL
# -------------------------------------------------

$alertsPanel = @'
"use client";

import { useAlerts }
from "@/features/alerts/hooks/useAlerts";

export const AlertsPanel = () => {

  const {
    alerts,
    loading,
  } = useAlerts();

  if (loading) {

    return (
      <p>
        Chargement alertes...
      </p>
    );
  }

  if (alerts.length === 0) {

    return (
      <div
        className="
          bg-white
          rounded-2xl
          border
          p-6
        "
      >
        <h3
          className="
            text-xl
            font-semibold
          "
        >
          Alertes
        </h3>

        <p
          className="
            text-gray-500
            mt-4
          "
        >
          Aucune alerte active
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        p-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >
        <h3
          className="
            text-xl
            font-semibold
          "
        >
          Alertes
        </h3>

        <span
          className="
            bg-red-600
            text-white
            text-xs
            px-3
            py-1
            rounded-full
          "
        >
          {alerts.length}
        </span>
      </div>

      <div className="space-y-3">

        {alerts.map((alert) => (

          <div
            key={alert.id}
            className={`
              p-4
              rounded-xl
              border

              ${
                alert.level ===
                "critical"
                  ? "bg-red-50 border-red-200"
                  : ""
              }

              ${
                alert.level ===
                "warning"
                  ? "bg-yellow-50 border-yellow-200"
                  : ""
              }

              ${
                alert.level ===
                "info"
                  ? "bg-blue-50 border-blue-200"
                  : ""
              }
            `}
          >
            <p
              className="
                font-semibold
              "
            >
              {alert.title}
            </p>

            <p
              className="
                text-sm
                mt-1
              "
            >
              {alert.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\alerts\components\AlertsPanel.tsx",
  $alertsPanel
)

Write-Host "Created: AlertsPanel.tsx"

# -------------------------------------------------
# DASHBOARD UPDATE
# -------------------------------------------------

$dashboardPage = @'
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
          ERP Agricole Intelligent
        </p>
      </div>

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
Write-Host " REALTIME ALERTS COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""