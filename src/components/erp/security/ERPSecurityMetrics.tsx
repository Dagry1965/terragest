import { ERPStatCard } from "@/components/erp/ui";
import type { getERPSecuritySnapshot } from "@/runtime/security";

type Snapshot = ReturnType<typeof getERPSecuritySnapshot>;

type ERPSecurityMetricsProps = {
  snapshot: Snapshot;
};

export function ERPSecurityMetrics({
  snapshot,
}: ERPSecurityMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Roles" value={snapshot.rolesCount} helper="RBAC" />
      <ERPStatCard label="Permissions" value={snapshot.permissionsCount} helper="Actions securisees" />
      <ERPStatCard label="Policies" value={snapshot.policiesCount} helper="Regles d'acces" />
      <ERPStatCard label="Audit" value={snapshot.auditCount} helper="Controles traces" />
      <ERPStatCard label="Denied" value={snapshot.deniedCount} helper="Acces refuses" />
      <ERPStatCard label="Session" value={snapshot.session.role} helper={snapshot.session.displayName} />
      <ERPStatCard label="Tenant" value={snapshot.session.tenantId ?? "default"} helper="Isolation preparee" />
      <ERPStatCard label="Runtime" value="Actif" helper="Access guard" />
    </div>
  );
}