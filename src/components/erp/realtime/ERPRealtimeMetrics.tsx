import { ERPStatCard } from "@/components/erp/ui";
import type { getERPRealtimeSnapshot } from "@/runtime/realtime";

type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;

type ERPRealtimeMetricsProps = {
  snapshot: Snapshot;
};

function metricSum(
  snapshot: Snapshot,
  metricKey: string
): number {
  return snapshot.metrics
    .filter((message) => message.payload?.metric === metricKey)
    .reduce(
      (total, message) =>
        total + Number(message.payload?.value ?? 0),
      0
    );
}

function metricCount(
  snapshot: Snapshot,
  metricKey: string
): number {
  return snapshot.metrics
    .filter((message) => message.payload?.metric === metricKey)
    .length;
}

export function ERPRealtimeMetrics({
  snapshot,
}: ERPRealtimeMetricsProps) {
  const revenueReal =
    metricSum(
      snapshot,
      "amarkhys.revenue.real"
    );

  const revenuePredicted =
    metricSum(
      snapshot,
      "amarkhys.revenue.predicted"
    );

  const facturesPaid =
    metricCount(
      snapshot,
      "amarkhys.factures.paid"
    );

  const interventionsCompleted =
    metricCount(
      snapshot,
      "amarkhys.interventions.completed"
    );

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="CA réel" value={revenueReal} helper="Paiements reçus" />
      <ERPStatCard label="CA prévisionnel" value={revenuePredicted} helper="Factures générées" />
      <ERPStatCard label="Factures payées" value={facturesPaid} helper="Paiements finalisés" />
      <ERPStatCard label="Interventions terminées" value={interventionsCompleted} helper="Performance atelier" />

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