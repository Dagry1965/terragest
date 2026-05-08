import {
  ERPWorkerRegistry,
} from "../registry/ERPWorkerRegistry";

import {
  ERPSchedulerRegistry,
} from "../scheduler/ERPSchedulerRegistry";

import {
  ERPWorkerHistoryStore,
} from "../history/ERPWorkerHistoryStore";

import {
  ERPWorkerMetricsStore,
} from "../metrics/ERPWorkerMetricsStore";

import type {
  ERPWorkerJob,
} from "./ERPWorkerTypes";

function createId(
  prefix: string
) {

  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export const ERPWorkerEngine = {

  workers() {

    return ERPWorkerRegistry;
  },

  scheduledTasks() {

    return ERPSchedulerRegistry;
  },

  executeJob(
    workerId: string,
    module: string,
    type: string,
    shouldFail = false
  ) {

    const startedAt =
      new Date().toISOString();

    const job: ERPWorkerJob = {
      id: createId("worker_job"),
      workerId,
      module,
      type,
      status: shouldFail
        ? "failed"
        : "completed",
      startedAt,
      completedAt:
        new Date().toISOString(),
      createdAt: startedAt,
    };

    ERPWorkerHistoryStore.add(job);

    this.refreshMetrics();

    return job;
  },

  refreshMetrics() {

    const workers =
      ERPWorkerRegistry;

    const jobs =
      ERPWorkerHistoryStore.all();

    ERPWorkerMetricsStore.set({
      activeWorkers:
        workers.filter(
          (worker) =>
            worker.status === "running"
        ).length,

      runningJobs:
        jobs.filter(
          (job) =>
            job.status === "running"
        ).length,

      completedJobs:
        ERPWorkerHistoryStore.completed().length,

      failedJobs:
        ERPWorkerHistoryStore.failed().length,

      scheduledTasks:
        ERPSchedulerRegistry.length,
    });
  },
};