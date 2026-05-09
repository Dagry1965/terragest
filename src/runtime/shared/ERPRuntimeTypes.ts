export type ERPStatus =
  | "success"
  | "warning"
  | "error"
  | "pending";

export type ERPLevel =
  | "info"
  | "warning"
  | "critical";

export type ERPMessageType =
  | "info"
  | "success"
  | "warning"
  | "error";

export interface ERPBaseRuntimeRecord {

  id?: string;

  module?: string;

  action?: string;

  actor?: string;

  title?: string;

  message?: string;

  description?: string;

  status?: ERPStatus;

  level?: ERPLevel;

  type?: ERPMessageType;

  metadata?:
    Record<string, unknown>;

  createdAt?: string;

  timestamp?: string;
}