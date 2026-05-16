import {
  ERPAlertStore,
}
from "@/runtime/observability/alerts/ERPAlertStore";

import type {
  ERPTenantMetrics,
}
from "./ERPTenantMetrics";

import {
  ERPTenantMetricsStore,
} from "./ERPTenantMetricsStore";

const quotaByPlan = {

  starter: {
    activeUsers: 5,
    workflows: 20,
    automations: 20,
    queueJobs: 100,
    storage: 1000,
  },

  business: {
    activeUsers: 25,
    workflows: 200,
    automations: 200,
    queueJobs: 1000,
    storage: 10000,
  },

  enterprise: {
    activeUsers: 9999,
    workflows: 9999,
    automations: 9999,
    queueJobs: 99999,
    storage: 999999,
  },

};

export type ERPTenantQuotaPlan =
  keyof typeof quotaByPlan;

export class ERPTenantQuotaEvaluator {

  static evaluate(
    metrics: ERPTenantMetrics,
    plan: ERPTenantQuotaPlan = "starter"
  ) {

    const quotas =
      quotaByPlan[plan];


    const checks = [

      "activeUsers",
      "workflows",
      "automations",
      "queueJobs",
      "storage",

    ] as const;


    for (
      const metric
      of checks
    ) {

      const current =
        Number(
          metrics[
            metric
          ]
        );

      const forecast =
        ERPTenantMetricsStore
          .forecast(

            metrics.tenantId,

            metric,

            3

          );

      const quota =
        quotas[
          metric
        ];


      if (
        current >= quota
      ) {

        ERPAlertStore.add({

          id:
            `tenant-quota-${Date.now()}`,

          module:
            "tenant",

          title:
            "Quota dépassé",

          description:

            `${metric}: ${current}/${quota}`,

          level:
            "warning",

          timestamp:
            new Date()
              .toISOString(),

        });

      }


      if (

        forecast >=
          quota

        &&

        current <
          quota

      ) {

        ERPAlertStore.add({

          id:
            `tenant-forecast-${Date.now()}`,

          module:
            "tenant",

          title:
            "Quota bientôt dépassé",

          description:

            `${metric}: projection ${forecast}/${quota}`,

          level:
            "info",

          timestamp:
            new Date()
              .toISOString(),

        });

      }

    }

  }

}