"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AppLayout,
} from "@/components/layout/AppLayout";

import {
  KPICard,
} from "@/analytics/dashboards/KPICard";

import {
  AggregationService,
} from "@/analytics/services/AggregationService";

export default function AnalyticsDashboard() {

  const [metrics,
    setMetrics] =
    useState<any>(null);

  useEffect(() => {

    const load =
      async () => {

        const result =
          await AggregationService.buildDashboardMetrics();

        setMetrics(
          result
        );
      };

    load();

  }, []);

  if (!metrics) {

    return (

      <AppLayout>

        <div className="
          p-10
        ">

          Loading analytics...

        </div>

      </AppLayout>
    );
  }

  return (

    <AppLayout>

      <div className="
        p-10
        space-y-8
      ">

        <h1 className="
          text-5xl
          font-bold
        ">
          Enterprise Analytics
        </h1>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          xl:grid-cols-4
          gap-6
        ">

          <KPICard
            title="Revenue"
            value={`€${metrics.revenue}`}
          />

          <KPICard
            title="Stock Rate"
            value={`${metrics.stockRate}%`}
          />

          <KPICard
            title="Products"
            value={metrics.productsCount}
          />

          <KPICard
            title="Transactions"
            value={metrics.transactionsCount}
          />

        </div>

      </div>

    </AppLayout>
  );
}
