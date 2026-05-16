import {
  ERPAlertStore,
} from "@/runtime/observability/alerts/ERPAlertStore";

import type {
  ERPTenantMetrics,
} from "./ERPTenantMetrics";

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
      {
        key: "activeUsers",
        label: "utilisateurs actifs",
        value: metrics.activeUsers,
        limit: quotas.activeUsers,
      },
      {
        key: "workflows",
        label: "workflows",
        value: metrics.workflows,
        limit: quotas.workflows,
      },
      {
        key: "automations",
        label: "automatisations",
        value: metrics.automations,
        limit: quotas.automations,
      },
      {
        key: "queueJobs",
        label: "jobs de queue",
        value: metrics.queueJobs,
        limit: quotas.queueJobs,
      },
      {
        key: "storage",
        label: "stockage",
        value: metrics.storage,
        limit: quotas.storage,
      },
    ];

    for (const check of checks) {
      if (check.value < check.limit) {
        continue;
      }

      ERPAlertStore.add({
        id: `tenant-quota-${metrics.tenantId}-${check.key}-${Date.now()}`,
        module: "tenant",
        title: "Quota tenant dépassé",
        description: `Le tenant ${metrics.tenantId} dépasse le quota ${check.label}: ${check.value}/${check.limit}.`,
        level: "warning",
        timestamp: new Date().toISOString(),
      });
    }
  }
}