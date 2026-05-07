import {
  ERPJob,
} from "@/core/jobs/job-queue";

export type ERPWorkerType =
  | "workflow"
  | "notification"
  | "analytics"
  | "maintenance"
  | "export";

export type ERPWorker = {
  type: ERPWorkerType;

  execute: (
    job: ERPJob
  ) => Promise<void>;
};

const workers:
  ERPWorker[] = [];

export function registerWorker(
  worker: ERPWorker
) {
  workers.push(worker);
}

export function getWorker(
  type: ERPWorkerType
) {
  return workers.find(
    (worker) =>
      worker.type === type
  );
}
