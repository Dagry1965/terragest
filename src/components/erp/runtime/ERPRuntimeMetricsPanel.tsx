"use client";

import {
  ERPGrid,
  ERPMetricCard,
  ERPPanel,
} from "../ui";

interface ERPRuntimeMetric {

  title: string;

  value: string | number;

  helper?: string;
}

interface ERPRuntimeMetricsPanelProps {

  metrics:
    ERPRuntimeMetric[];
}

export function ERPRuntimeMetricsPanel({
  metrics,
}: ERPRuntimeMetricsPanelProps) {

  return (

    <ERPPanel
      title="Runtime Metrics"
      description="Indicateurs du runtime ERP."
    >

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
              />
            )
          )
        }

      </ERPGrid>

    </ERPPanel>
  );
}