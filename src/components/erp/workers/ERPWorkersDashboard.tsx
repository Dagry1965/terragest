import {
  ERPPageHeader,
} from "@/components/erp/ui";

import {
  getERPWorkersSnapshot,
  seedERPWorkersRuntime,
} from "@/runtime/workers";

import {
  ERPWorkersMetricsGrid,
} from "./ERPWorkersMetricsGrid";

import {
  ERPWorkersRegistryPanel,
} from "./ERPWorkersRegistryPanel";

import {
  ERPSchedulerPanel,
} from "./ERPSchedulerPanel";

import {
  ERPWorkerHistoryPanel,
} from "./ERPWorkerHistoryPanel";

seedERPWorkersRuntime();

export function ERPWorkersDashboard() {

  const snapshot =
    getERPWorkersSnapshot();

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Distributed Runtime"
        title="Workers & Scheduler Engine"
        description="Workers distribues, scheduler runtime, batch processing et orchestration longue duree."
      />

      <ERPWorkersMetricsGrid
        snapshot={snapshot}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ERPWorkersRegistryPanel
          snapshot={snapshot}
        />

        <ERPSchedulerPanel
          snapshot={snapshot}
        />

      </div>

      <ERPWorkerHistoryPanel
        snapshot={snapshot}
      />

    </div>
  );
}