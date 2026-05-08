export type ERPWorkerStatus =
  | "idle"
  | "running"
  | "paused"
  | "offline";

export type ERPWorkerJobStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed";

export type ERPWorker = {
  id: string;
  label: string;
  queue: string;
  status: ERPWorkerStatus;
  concurrency: number;
  updatedAt: string;
};

export type ERPWorkerJob = {
  id: string;
  workerId: string;
  module: string;
  type: string;
  status: ERPWorkerJobStatus;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
};

export type ERPScheduledTask = {
  id: string;
  label: string;
  module: string;
  cron: string;
  enabled: boolean;
  nextRun: string;
};