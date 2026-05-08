import type {
  ERPTenantMetrics,
} from "./ERPTenantMetrics";

class ERPTenantMetricsStoreClass {

  private metrics:
    ERPTenantMetrics[] = [];

  set(
    metrics: ERPTenantMetrics
  ) {

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

      return;
    }

    this.metrics.push(metrics);
  }

  all() {

    return this.metrics;
  }

  byTenant(
    tenantId: string
  ) {

    return this.metrics.find(
      (item) =>
        item.tenantId === tenantId
    );
  }
}

export const ERPTenantMetricsStore =
  new ERPTenantMetricsStoreClass();