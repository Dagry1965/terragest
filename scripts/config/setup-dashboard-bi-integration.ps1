Write-Host "Generating Terragest Dashboard BI Integration..." -ForegroundColor Cyan

# =====================================================
# DASHBOARD ANALYTICS SECTION
# =====================================================

$analyticsSection = @'
"use client";

import { useMemo } from "react";

import { KpiBarChart } from "@/features/analytics/components/KpiBarChart";

import { KpiPieChart } from "@/features/analytics/components/KpiPieChart";

import { KpiLineChart } from "@/features/analytics/components/KpiLineChart";

import {
  buildCategoryAnalytics,
  buildMonthlyAnalytics,
} from "@/features/analytics/components/analyticsHelpers";

interface DashboardAnalyticsProps {

  produits: any[];

  terrainsAnalytics: any[];
}

export const DashboardAnalytics = ({
  produits,
  terrainsAnalytics,
}: DashboardAnalyticsProps) => {

  const produitsByCategorie =
    useMemo(
      () =>
        buildCategoryAnalytics(
          produits
        ),
      [produits]
    );

  const produitsMensuels =
    useMemo(
      () =>
        buildMonthlyAnalytics(
          produits
        ),
      [produits]
    );

  return (

    <div className="
      grid
      grid-cols-1
      xl:grid-cols-2
      gap-6
    ">

      <KpiPieChart
        title="Produits par catégorie"
        data={produitsByCategorie}
        dataKey="value"
        nameKey="name"
      />

      <KpiLineChart
        title="Évolution produits"
        data={produitsMensuels}
        dataKey="value"
        nameKey="name"
      />

      <div className="xl:col-span-2">

        <KpiBarChart
          title="Terrains par exploitation"
          data={terrainsAnalytics}
          dataKey="total"
          nameKey="nom"
        />

      </div>

    </div>
  );
}
'@

Set-Content `
"src\components\dashboard\DashboardAnalytics.tsx" `
$analyticsSection

# =====================================================
# UPDATE DASHBOARD PAGE
# =====================================================

$dashboardPatch = @'
AJOUTER CES IMPORTS :

import { DashboardAnalytics } from "@/components/dashboard/DashboardAnalytics";

---------------------------------------------------

AJOUTER CE STATE :

const [produitsData,
  setProduitsData] =
  useState<any[]>([]);

---------------------------------------------------

AJOUTER DANS loadDashboard()

setProduitsData(produits);

---------------------------------------------------

AJOUTER AVANT LA FIN DU RETURN :

<DashboardAnalytics
  produits={produitsData}
  terrainsAnalytics={topExploitations}
/>
'@

Set-Content `
"dashboard-analytics-integration.txt" `
$dashboardPatch

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Dashboard BI Integration generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- DashboardAnalytics"
Write-Host "- Pie charts"
Write-Host "- Line charts"
Write-Host "- Bar charts"
Write-Host "- Executive dashboard foundation"
Write-Host ""
Write-Host "Read:"
Write-Host "dashboard-analytics-integration.txt"
Write-Host ""