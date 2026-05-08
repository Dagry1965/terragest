export type ERPQueueJobStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "dead_letter";

export type ERPQueueJob = {
  id: string;
  type: string;
  module: string;
  payload?: Record<string, unknown>;
  attempts: number;
  maxAttempts: number;
  status: ERPQueueJobStatus;
  createdAt: string;
  updatedAt: string;
  error?: string;
};