import {
  ERPStatCard,
} from "@/components/erp/ui";

import type {
  getERPStreamsSnapshot,
} from "@/runtime/streams";

type Snapshot =
  ReturnType<
    typeof getERPStreamsSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPStreamsMetricsGrid({
  snapshot,
}: Props) {

  const metrics =
    snapshot.metrics;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

      <ERPStatCard
        label="Streams"
        value={metrics.totalStreams}
        helper="Realtime channels"
      />

      <ERPStatCard
        label="Events"
        value={metrics.totalEvents}
        helper="Live events"
      />

      <ERPStatCard
        label="Critical"
        value={metrics.criticalEvents}
        helper="Critical alerts"
      />

      <ERPStatCard
        label="Active"
        value={metrics.activeChannels}
        helper="Active channels"
      />

    </div>
  );
}