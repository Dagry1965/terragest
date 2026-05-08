import {
  ERPStatCard,
} from "@/components/erp/ui";

import type {
  getERPWorkersSnapshot,
} from "@/runtime/workers";

type Snapshot =
  ReturnType<
    typeof getERPWorkersSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPWorkersMetricsGrid({
  snapshot,
}: Props) {

  const metrics =
    snapshot.metrics;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

      <ERPStatCard
        label="Workers"
        value={metrics.activeWorkers}
        helper="Workers actifs"
      />

      <ERPStatCard
        label="Completed"
        value={metrics.completedJobs}
        helper="Jobs completes"
      />

      <ERPStatCard
        label="Failed"
        value={metrics.failedJobs}
        helper="Jobs en echec"
      />

      <ERPStatCard
        label="Scheduled"
        value={metrics.scheduledTasks}
        helper="Cron tasks"
      />

    </div>
  );
}