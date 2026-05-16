import {
  ERPRealtimeBus,
} from "../bus/ERPRealtimeBus";

import {
  ERPRealtimePresenceStore,
} from "../presence/ERPRealtimePresence";

export function getERPRealtimeSnapshot() {
  const messages = ERPRealtimeBus.all();
  const presence = ERPRealtimePresenceStore.all();
  const metrics = ERPRealtimeBus.byChannel("metrics");

  return {
    messages,
    metrics,
    presence,
    totalMessages: messages.length,
    onlineUsers: presence.filter((user) => user.status === "online").length,
    events: ERPRealtimeBus.byChannel("events").length,
    workflows: ERPRealtimeBus.byChannel("workflows").length,
    automation: ERPRealtimeBus.byChannel("automation").length,
    queue: ERPRealtimeBus.byChannel("queue").length,
    alerts: ERPRealtimeBus.byChannel("alerts").length,
    metricsCount: metrics.length,
    system: ERPRealtimeBus.byChannel("system").length,
  };
}