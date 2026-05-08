export type ERPAlertLevel =
  | "info"
  | "warning"
  | "critical";

export type ERPAlert = {

  id: string;

  module: string;

  title: string;

  description?: string;

  level: ERPAlertLevel;

  timestamp: string;
};