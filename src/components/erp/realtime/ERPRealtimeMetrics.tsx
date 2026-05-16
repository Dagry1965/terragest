import { ERPStatCard } from "@/components/erp/ui";
import type { getERPRealtimeSnapshot } from "@/runtime/realtime";

type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;

type ERPRealtimeMetricsProps = {
  snapshot: Snapshot;
};

export function ERPRealtimeMetrics({
  snapshot,
}: ERPRealtimeMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Messages" value={snapshot.totalMessages} helper="Flux realtime" />
      <ERPStatCard label="Online" value={snapshot.onlineUsers} helper="Présence active" />
      <ERPStatCard label="Metrics" value={snapshot.metricsCount} helper="KPI live" />
      <ERPStatCard label="Events" value={snapshot.events} helper="Domain events" />
      <ERPStatCard label="Workflows" value={snapshot.workflows} helper="Processus live" />
      <ERPStatCard label="Automation" value={snapshot.automation} helper="Triggers live" />
      <ERPStatCard label="Queue" value={snapshot.queue} helper="Jobs live" />
      <ERPStatCard label="Alerts" value={snapshot.alerts} helper="Alertes live" />
      <ERPStatCard label="System" value={snapshot.system} helper="Runtime" />
    </div>
  );
}