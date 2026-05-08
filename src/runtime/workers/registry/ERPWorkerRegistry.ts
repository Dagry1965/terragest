import type {
  ERPWorker,
} from "../engine/ERPWorkerTypes";

export const ERPWorkerRegistry: ERPWorker[] = [
  {
    id: "worker_runtime_1",
    label: "Runtime Worker 1",
    queue: "runtime",
    status: "running",
    concurrency: 5,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "worker_automation_1",
    label: "Automation Worker",
    queue: "automation",
    status: "running",
    concurrency: 3,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "worker_reporting_1",
    label: "Reporting Worker",
    queue: "reporting",
    status: "idle",
    concurrency: 2,
    updatedAt: new Date().toISOString(),
  },
];