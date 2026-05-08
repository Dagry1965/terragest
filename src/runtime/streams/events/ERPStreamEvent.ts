export type ERPStreamLevel =
  | "info"
  | "warning"
  | "critical";

export type ERPStreamEvent = {
  id: string;
  tenantId?: string;
  module: string;
  type: string;
  message: string;
  level: ERPStreamLevel;
  timestamp: string;
};