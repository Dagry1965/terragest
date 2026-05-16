export type RuntimeMetricType =
  | "counter"
  | "sum"
  | "timing"
  | "gauge";

export interface RuntimeMetricContext {
  tenantId?: string;
  workspace?: string;
  moduleKey?: string;
  userId?: string;
  source?: string;
}

export interface RuntimeMetricEntry {
  key: string;
  type: RuntimeMetricType;
  value: number;
  timestamp: string;
  context: RuntimeMetricContext;
  metadata?: Record<string, unknown>;
}

export class RuntimeMetrics {
  private static entries: RuntimeMetricEntry[] = [];

  static record(entry: Omit<RuntimeMetricEntry, "timestamp">): RuntimeMetricEntry {
    const metric: RuntimeMetricEntry = {
      ...entry,
      timestamp: new Date().toISOString(),
    };

    RuntimeMetrics.entries.push(metric);

    return metric;
  }

  static increment(
    metric: string,
    context: RuntimeMetricContext = {},
    metadata: Record<string, unknown> = {}
  ): RuntimeMetricEntry {
    return RuntimeMetrics.record({
      key: metric,
      type: "counter",
      value: 1,
      context,
      metadata,
    });
  }

  static sum(
    metric: string,
    value: number,
    context: RuntimeMetricContext = {},
    metadata: Record<string, unknown> = {}
  ): RuntimeMetricEntry {
    return RuntimeMetrics.record({
      key: metric,
      type: "sum",
      value,
      context,
      metadata,
    });
  }

  static gauge(
    metric: string,
    value: number,
    context: RuntimeMetricContext = {},
    metadata: Record<string, unknown> = {}
  ): RuntimeMetricEntry {
    return RuntimeMetrics.record({
      key: metric,
      type: "gauge",
      value,
      context,
      metadata,
    });
  }

  static timing(
    metric: string,
    duration: number,
    context: RuntimeMetricContext = {},
    metadata: Record<string, unknown> = {}
  ): RuntimeMetricEntry {
    return RuntimeMetrics.record({
      key: metric,
      type: "timing",
      value: duration,
      context,
      metadata,
    });
  }

  static all(): RuntimeMetricEntry[] {
    return [...RuntimeMetrics.entries];
  }

  static clear(): void {
    RuntimeMetrics.entries = [];
  }

  static byWorkspace(workspace: string): RuntimeMetricEntry[] {
    return RuntimeMetrics.entries.filter(
      entry => entry.context.workspace === workspace
    );
  }

  static byTenant(tenantId: string): RuntimeMetricEntry[] {
    return RuntimeMetrics.entries.filter(
      entry => entry.context.tenantId === tenantId
    );
  }

  static byModule(moduleKey: string): RuntimeMetricEntry[] {
    return RuntimeMetrics.entries.filter(
      entry => entry.context.moduleKey === moduleKey
    );
  }

  static aggregateSum(
    metric: string,
    context: Partial<RuntimeMetricContext> = {}
  ): number {
    return RuntimeMetrics.entries
      .filter(entry => entry.key === metric)
      .filter(entry => {
        return Object.entries(context).every(
          ([key, value]) =>
            entry.context[key as keyof RuntimeMetricContext] === value
        );
      })
      .reduce((total, entry) => total + entry.value, 0);
  }

  static count(
    metric: string,
    context: Partial<RuntimeMetricContext> = {}
  ): number {
    return RuntimeMetrics.entries
      .filter(entry => entry.key === metric)
      .filter(entry => {
        return Object.entries(context).every(
          ([key, value]) =>
            entry.context[key as keyof RuntimeMetricContext] === value
        );
      })
      .length;
  }
}