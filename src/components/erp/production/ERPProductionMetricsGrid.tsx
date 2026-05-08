import { ERPStatCard } from "@/components/erp/ui";
import type { getERPProductionReadinessSnapshot } from "@/runtime/production";

type Snapshot = ReturnType<typeof getERPProductionReadinessSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPProductionMetricsGrid({ snapshot }: Props) {
  const metrics = snapshot.metrics;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Readiness" value={`${metrics.readinessScore}%`} helper="Production score" />
      <ERPStatCard label="Policies" value={metrics.policies} helper={`${metrics.okPolicies} OK`} />
      <ERPStatCard label="Quotas" value={metrics.quotas} helper="Tenant limits" />
      <ERPStatCard label="Rate Limits" value={metrics.limits} helper="Runtime limits" />
      <ERPStatCard label="Backups" value={metrics.backups} helper={`${metrics.configuredBackups} configured`} />
      <ERPStatCard label="Cloud Checks" value={metrics.cloudChecks} helper={`${metrics.readyCloud} ready`} />
      <ERPStatCard label="Runtime" value="Governed" helper="SaaS policies" />
      <ERPStatCard label="Status" value="Partial" helper="Cloud readiness" />
    </div>
  );
}