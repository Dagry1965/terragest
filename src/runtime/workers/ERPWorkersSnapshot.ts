import {
  ERPWorkerRegistry,
} from "./registry/ERPWorkerRegistry";

import {
  ERPSchedulerRegistry,
} from "./scheduler/ERPSchedulerRegistry";

import {
  ERPWorkerHistoryStore,
} from "./history/ERPWorkerHistoryStore";

import {
  ERPWorkerMetricsStore,
} from "./metrics/ERPWorkerMetricsStore";

export function getERPWorkersSnapshot() {

  return {

    workers:
      ERPWorkerRegistry,

    scheduledTasks:
      ERPSchedulerRegistry,

    jobs:
      ERPWorkerHistoryStore.all(),

    metrics:
      ERPWorkerMetricsStore.get(),
  };
}