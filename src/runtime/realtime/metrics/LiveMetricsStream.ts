import {
  ERPRealtimeBus,
}
from "@/runtime/realtime/bus/ERPRealtimeBus";

export interface LiveMetricPayload {
  metric: string;
  value: number;
  workspace?: string;
  tenantId?: string;
  moduleKey?: string;
  userId?: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export class LiveMetricsStream {
  static publish(payload: LiveMetricPayload) {
    ERPRealtimeBus.publish({
      id: `metric-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      channel: "metrics",
      module: payload.moduleKey,
      title: "Metric updated",
      description: `${payload.metric}: ${payload.value}`,
      timestamp: payload.timestamp,
      payload: {
        ...payload,
      },
    });
  }
}