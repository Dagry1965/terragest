// src/platform/intelligence/RuntimeAnomalyDetector.ts

import { MetricsRegistry }
from "@/platform/observability/MetricsRegistry";

export class RuntimeAnomalyDetector {

  static analyze() {

    const metrics =
      MetricsRegistry
        .getMetrics();

    for (
      const [metric, value]
      of Object.entries(metrics)
    ) {

      if (value > 100) {

        console.warn(
          "[ANOMALY DETECTED]",
          metric,
          value
        );
      }
    }
  }
}