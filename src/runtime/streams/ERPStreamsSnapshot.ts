import {
  ERPRealtimeGateway,
} from "./gateway/ERPRealtimeGateway";

import {
  ERPStreamHistoryStore,
} from "./history/ERPStreamHistoryStore";

import {
  ERPStreamMetricsStore,
} from "./metrics/ERPStreamMetricsStore";

export function getERPStreamsSnapshot() {

  return {

    channels:
      ERPRealtimeGateway.channels(),

    events:
      ERPStreamHistoryStore.all(),

    metrics:
      ERPStreamMetricsStore.get(),
  };
}