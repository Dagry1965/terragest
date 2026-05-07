export type SecurityAuditEntry = {
  id: string;

  type: string;

  userId?: string;

  userName?: string;

  tenantId?: string;

  tenantName?: string;

  module?: string;

  action?: string;

  entityId?: string;

  metadata?: Record<
    string,
    any
  >;

  createdAt: string;
};

const auditEntries:
  SecurityAuditEntry[] = [];

export function logSecurityAudit(
  entry: Omit<
    SecurityAuditEntry,
    "id" | "createdAt"
  >
) {
  const auditEntry:
    SecurityAuditEntry = {
      id:
        crypto.randomUUID(),

      createdAt:
        new Date().toISOString(),

      ...entry,
    };

  auditEntries.unshift(
    auditEntry
  );

  console.log(
    "ERP SECURITY AUDIT",
    auditEntry.type
  );

  return auditEntry;
}

export function getSecurityAudits() {
  return auditEntries;
}

export function getAuditsByTenant(
  tenantId: string
) {
  return auditEntries.filter(
    (entry) =>
      entry.tenantId ===
      tenantId
  );
}

export function getAuditsByUser(
  userId: string
) {
  return auditEntries.filter(
    (entry) =>
      entry.userId ===
      userId
  );
}
