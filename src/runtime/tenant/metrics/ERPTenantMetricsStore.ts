import type {
  ERPTenantMetrics,
} from "./ERPTenantMetrics";

import {
  ERPTenantRegistry,
} from "../registry/ERPTenantRegistry";

import {
  ERPTenantQuotaEvaluator,
} from "./ERPTenantQuotaEvaluator";

class ERPTenantMetricsStoreClass {
  private metrics: ERPTenantMetrics[] = [];

  set(metrics: ERPTenantMetrics) {
    const exists =
      this.metrics.some(
        (item) =>
          item.tenantId === metrics.tenantId
      );

    if (exists) {
      this.metrics =
        this.metrics.map(
          (item) =>
            item.tenantId === metrics.tenantId
              ? metrics
              : item
        );
    } else {
      this.metrics.push(metrics);
    }

    const tenant =
      ERPTenantRegistry.find(
        (item) =>
          item.id === metrics.tenantId
      );

    ERPTenantQuotaEvaluator.evaluate(
      metrics,
      tenant?.plan ?? "starter"
    );
  }

  all() {
    return this.metrics;
  }

  byTenant(tenantId: string) {
    return this.metrics.find(
      (item) =>
        item.tenantId === tenantId
    );
  }
}

export const ERPTenantMetricsStore =
  new ERPTenantMetricsStoreClass();