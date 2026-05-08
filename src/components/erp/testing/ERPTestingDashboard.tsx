import {
  ERPPageHeader,
} from "@/components/erp/ui";

import {
  getERPTestingSnapshot,
  seedERPTestingPlatform,
} from "@/runtime/testing";

import {
  ERPTestingMetricsGrid,
} from "./ERPTestingMetricsGrid";

import {
  ERPTestingRegistryPanel,
} from "./ERPTestingRegistryPanel";

import {
  ERPTestingHistoryPanel,
} from "./ERPTestingHistoryPanel";

seedERPTestingPlatform();

export function ERPTestingDashboard() {

  const snapshot =
    getERPTestingSnapshot();

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Validation Center"
        title="Enterprise Testing Platform"
        description="Validation runtime, workflows, workers, securite, multi-tenant et observability."
      />

      <ERPTestingMetricsGrid
        snapshot={snapshot}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ERPTestingRegistryPanel
          snapshot={snapshot}
        />

        <ERPTestingHistoryPanel
          snapshot={snapshot}
        />

      </div>

    </div>
  );
}