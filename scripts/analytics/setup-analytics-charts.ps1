$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " ANALYTICS CHARTS SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
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
# STOCK VALUE CHART
# -------------------------------------------------

$stockValueChart = @'
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useProducts }
from "@/features/produits/hooks/useProducts";

export const StockValueChart =
() => {

  const {
    data,
    loading,
  } = useProducts();

  if (loading) {

    return (
      <p>
        Chargement graphique...
      </p>
    );
  }

  const chartData =
    data.map((item: any) => ({
      nom: item.nom,
      valeur:
        Number(item.prix || 0) *
        Number(item.quantite || 0),
    }));

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        p-6
        h-[400px]
      "
    >
      <h3
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        Valeur du Stock
      </h3>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={chartData}>

          <XAxis dataKey="nom" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="valeur" />

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\analytics\components\StockValueChart.tsx",
  $stockValueChart
)

Write-Host "Created: StockValueChart.tsx"

# -------------------------------------------------
# CATEGORY CHART
# -------------------------------------------------

$categoryChart = @'
"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { useProducts }
from "@/features/produits/hooks/useProducts";

export const ProductsCategoryChart =
() => {

  const {
    data,
    loading,
  } = useProducts();

  if (loading) {

    return (
      <p>
        Chargement graphique...
      </p>
    );
  }

  const grouped =
    data.reduce(
      (
        acc: any,
        item: any
      ) => {

        const category =
          item.categorie ||
          "Autre";

        acc[category] =
          (acc[category] || 0) + 1;

        return acc;

      },
      {}
    );

  const chartData =
    Object.entries(grouped).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        p-6
        h-[400px]
      "
    >
      <h3
        className="
          text-xl
          font-semibold
          mb-6
        "
      >
        Catégories Produits
      </h3>

      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <PieChart>

          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
          >

            {chartData.map(
              (_, index) => (

              <Cell key={index} />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\analytics\components\ProductsCategoryChart.tsx",
  $categoryChart
)

Write-Host "Created: ProductsCategoryChart.tsx"

# -------------------------------------------------
# DASHBOARD PAGE
# -------------------------------------------------

$dashboardPage = @'
import { AnalyticsCards }
from "@/features/analytics/components/AnalyticsCards";

import { StockValueChart }
from "@/features/analytics/components/StockValueChart";

import { ProductsCategoryChart }
from "@/features/analytics/components/ProductsCategoryChart";

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
          ERP Agricole Analytics
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
Write-Host " ANALYTICS CHARTS COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""