export type AuditSeverity =
  | "info"
  | "warning"
  | "critical";

export type AuditEvent = {

  id?: string;

  action: string;

  entity: string;

  entityId?: string;

  userId?: string;

  organizationId?: string;

  severity:
    AuditSeverity;

  metadata?: Record<
    string,
    any
  >;

  createdAt: string;
};