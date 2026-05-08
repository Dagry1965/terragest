import { ERPPageHeader } from "@/components/erp/ui";
import {
  getERPRealtimeSnapshot,
  seedERPRealtimeRuntime,
} from "@/runtime/realtime";

import { ERPRealtimeMetrics } from "./ERPRealtimeMetrics";
import { ERPRealtimeFeed } from "./ERPRealtimeFeed";
import { ERPRealtimePresencePanel } from "./ERPRealtimePresencePanel";

seedERPRealtimeRuntime();

export function ERPRuntimeRealtimeDashboard() {
  const snapshot = getERPRealtimeSnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Realtime Runtime"
        title="Realtime Mission Control"
        description="Supervision des messages live, channels, subscriptions et presence runtime."
      />

      <ERPRealtimeMetrics snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPRealtimeFeed snapshot={snapshot} />
        <ERPRealtimePresencePanel snapshot={snapshot} />
      </div>
    </div>
  );
}