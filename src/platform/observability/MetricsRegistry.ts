// src/platform/observability/MetricsRegistry.ts

class MetricsRegistryManager {

  private counters:
    Record<string, number>
    = {};

  increment(metric: string) {

    if (!this.counters[metric]) {

      this.counters[metric] = 0;
    }

    this.counters[metric]++;

    console.log(
      `[METRIC]
       ${metric}
       = ${this.counters[metric]}`
    );
  }

  getMetrics() {

    return this.counters;
  }
}

export const MetricsRegistry =
  new MetricsRegistryManager();