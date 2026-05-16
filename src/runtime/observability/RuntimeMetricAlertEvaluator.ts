import {
  ERPAlertStore,
}
from "@/runtime/observability";

import type {
  RuntimeMetricEntry,
}
from "@/runtime/metrics/RuntimeMetrics";

export class RuntimeMetricAlertEvaluator {

  static evaluate(
    metric: RuntimeMetricEntry
  ) {

    if (

      metric.key ===
        "amarkhys.revenue.real"

      &&

      metric.value <
        1000

    ) {

      ERPAlertStore.add({

        id:
          `alert-${Date.now()}`,

        module:
          "facturesauto",

        title:
          "CA faible",

        description:

          `CA réel faible : ${metric.value}`,

        level:
          "warning",

        timestamp:
          new Date()
            .toISOString(),

      });

    }


    if (

      metric.key ===
        "amarkhys.factures.paid"

      &&

      metric.value >
        100

    ) {

      ERPAlertStore.add({

        id:
          `alert-${Date.now()}`,

        module:
          "facturesauto",

        title:
          "Volume élevé",

        description:
          "Factures payées élevées",

        level:
          "info",

        timestamp:
          new Date()
            .toISOString(),

      });

    }

  }

}