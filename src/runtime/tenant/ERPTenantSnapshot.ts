import {
  ERPTenantRegistry,
} from "./registry/ERPTenantRegistry";

import {
  ERPTenantContext,
} from "./context/ERPTenantContext";

import {
  ERPTenantMetricsStore,
} from "./metrics/ERPTenantMetricsStore";

export function getERPTenantSnapshot() {

  const current =
    ERPTenantContext.current();

  return {

    current,

    tenants:
      ERPTenantRegistry,

    metrics:
      ERPTenantMetricsStore.all(),

    currentMetrics:
      ERPTenantMetricsStore.byTenant(
        current.id
      ),

    tenantsCount:
      ERPTenantRegistry.length,

    activeTenants:
      ERPTenantRegistry.filter(
        (tenant) =>
          tenant.status === "active"
      ).length,
  };
}