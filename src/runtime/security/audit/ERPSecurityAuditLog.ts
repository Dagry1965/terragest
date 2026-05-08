export type ERPSecurityAuditLevel =
  | "info"
  | "warning"
  | "denied";

export type ERPSecurityAuditEntry = {
  id: string;
  userId: string;
  role: string;
  module: string;
  action: string;
  allowed: boolean;
  level: ERPSecurityAuditLevel;
  timestamp: string;
};