import { ERPPageHeader } from "@/components/erp/ui";
import { getERPProductionReadinessSnapshot } from "@/runtime/production";

import { ERPProductionMetricsGrid } from "./ERPProductionMetricsGrid";
import { ERPProductionPoliciesPanel } from "./ERPProductionPoliciesPanel";
import { ERPProductionCloudPanel } from "./ERPProductionCloudPanel";
import { ERPProductionQuotasPanel } from "./ERPProductionQuotasPanel";

export function ERPProductionDashboard() {
  const snapshot = getERPProductionReadinessSnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Production"
        title="Production Governance Core"
        description="Gouvernance SaaS, readiness cloud, quotas tenant, rate limits, backup et policies runtime."
      />

      <ERPProductionMetricsGrid snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPProductionPoliciesPanel snapshot={snapshot} />
        <ERPProductionCloudPanel snapshot={snapshot} />
        <ERPProductionQuotasPanel snapshot={snapshot} />
      </div>
    </div>
  );
}