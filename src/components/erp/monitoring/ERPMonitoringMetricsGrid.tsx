import { ERPStatCard } from "@/components/erp/ui";
import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";

type Snapshot = ReturnType<typeof getERPMonitoringSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPMonitoringMetricsGrid({
  snapshot,
}: Props) {
  const metrics = snapshot.metrics;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Modules" value={metrics.modules} helper="Registry" />
      <ERPStatCard label="Tenants" value={metrics.tenants} helper="SaaS runtime" />
      <ERPStatCard label="Workers" value={metrics.workers} helper="Execution" />
      <ERPStatCard label="Workflows" value={metrics.workflows} helper="Instances" />
      <ERPStatCard label="Queue" value={metrics.queueJobs} helper="Jobs" />
      <ERPStatCard label="Realtime" value={metrics.realtimeMessages} helper="Messages" />
      <ERPStatCard label="Security" value={metrics.securityAudits} helper="Audit logs" />
      <ERPStatCard label="Errors" value={snapshot.errors.total} helper="Analytics" />
    </div>
  );
}