export interface RuntimeMetric {

  name: string;

  value: number;

  recordedAt: string;
}

export class RuntimeMetricsRegistry {

  private metrics:
    RuntimeMetric[] = [];

  recordMetric(
    metric: RuntimeMetric
  ) {

    this.metrics.push(metric);
  }

  getMetrics() {

    return this.metrics;
  }

  getMetric(
    name: string
  ) {

    return this.metrics.filter(
      metric =>
        metric.name === name
    );
  }
}

export const runtimeMetricsRegistry =
  new RuntimeMetricsRegistry();