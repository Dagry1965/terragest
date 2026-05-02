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
