"use client";

import {
  ERPGrid,
  ERPMetricCard,
} from "../ui";

interface ERPDashboardMetric {

  title: string;

  value: string | number;

  helper?: string;

  trend?: string;
}

interface ERPDashboardMetricsProps {

  metrics:
    ERPDashboardMetric[];
}

export function ERPDashboardMetrics({
  metrics,
}: ERPDashboardMetricsProps) {

  return (

    <ERPGrid
      columns={4}
      gap="16px"
    >

      {
        metrics.map(
          metric => (

            <ERPMetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              helper={metric.helper}
              trend={metric.trend}
            />
          )
        )
      }

    </ERPGrid>
  );
}