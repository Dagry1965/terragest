export type AuditEntry = {
  module: string;
  action: string;
  timestamp: string;
};

export function createAuditEntry(
  entry: AuditEntry
) {
  console.log(
    "ERP AUDIT ENTRY",
    entry
  );

  return {
    id: `AUDIT-${Date.now()}`,
    ...entry,
  };
}
