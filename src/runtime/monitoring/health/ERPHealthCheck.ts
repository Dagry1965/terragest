export type ERPHealthStatus =
  | "healthy"
  | "warning"
  | "critical";

export type ERPHealthCheck = {
  key: string;
  label: string;
  status: ERPHealthStatus;
  description?: string;
};