import {
  ERPStreamRegistry,
} from "../channels/ERPStreamRegistry";

import {
  ERPStreamHistoryStore,
} from "../history/ERPStreamHistoryStore";

import {
  ERPStreamMetricsStore,
} from "../metrics/ERPStreamMetricsStore";

import type {
  ERPStreamEvent,
} from "../events/ERPStreamEvent";

function createId(
  prefix: string
) {

  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export const ERPRealtimeGateway = {

  channels() {

    return ERPStreamRegistry;
  },

  publish(
    event: Omit<
      ERPStreamEvent,
      "id" | "timestamp"
    >
  ) {

    const payload:
      ERPStreamEvent = {

      id:
        createId("stream"),

      timestamp:
        new Date().toISOString(),

      ...event,
    };

    ERPStreamHistoryStore.publish(
      payload
    );

    this.refreshMetrics();

    return payload;
  },

  refreshMetrics() {

    const events =
      ERPStreamHistoryStore.all();

    ERPStreamMetricsStore.set({

      totalStreams:
        ERPStreamRegistry.length,

      totalEvents:
        events.length,

      criticalEvents:
        ERPStreamHistoryStore.critical().length,

      activeChannels:
        ERPStreamRegistry.filter(
          (channel) =>
            channel.active
        ).length,
    });
  },
};