export type ERPWorkerMetrics = {
  activeWorkers: number;
  runningJobs: number;
  completedJobs: number;
  failedJobs: number;
  scheduledTasks: number;
};

let metrics: ERPWorkerMetrics = {
  activeWorkers: 0,
  runningJobs: 0,
  completedJobs: 0,
  failedJobs: 0,
  scheduledTasks: 0,
};

export const ERPWorkerMetricsStore = {

  set(
    next: ERPWorkerMetrics
  ) {

    metrics = next;
  },

  get() {

    return metrics;
  },
};