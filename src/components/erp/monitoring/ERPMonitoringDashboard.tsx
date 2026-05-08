import { ERPPageHeader } from "@/components/erp/ui";
import { getERPMonitoringSnapshot } from "@/runtime/monitoring";

import { ERPMonitoringMetricsGrid } from "./ERPMonitoringMetricsGrid";
import { ERPHealthPanel } from "./ERPHealthPanel";
import { ERPTopologyPanel } from "./ERPTopologyPanel";
import { ERPErrorAnalyticsPanel } from "./ERPErrorAnalyticsPanel";

export function ERPMonitoringDashboard() {
  const snapshot = getERPMonitoringSnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Monitoring Center"
        title="Advanced Observability"
        description="Health checks, topology, runtime metrics, dependency graph et error analytics."
      />

      <ERPMonitoringMetricsGrid snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPHealthPanel snapshot={snapshot} />
        <ERPErrorAnalyticsPanel snapshot={snapshot} />
      </div>

      <ERPTopologyPanel snapshot={snapshot} />
    </div>
  );
}