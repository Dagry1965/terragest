export type ERPTrace = {
  traceId: string;

  module: string;

  action: string;

  status:
    | "success"
    | "warning"
    | "error";

  duration: number;

  timestamp: string;

  metadata?: Record<string, unknown>;
};