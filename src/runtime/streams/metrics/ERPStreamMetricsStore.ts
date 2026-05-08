export type ERPStreamMetrics = {
  totalStreams: number;
  totalEvents: number;
  criticalEvents: number;
  activeChannels: number;
};

let metrics: ERPStreamMetrics = {
  totalStreams: 0,
  totalEvents: 0,
  criticalEvents: 0,
  activeChannels: 0,
};

export const ERPStreamMetricsStore = {

  set(
    next: ERPStreamMetrics
  ) {

    metrics = next;
  },

  get() {

    return metrics;
  },
};