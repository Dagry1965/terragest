import {
  ERPPageHeader,
} from "@/components/erp/ui";

import {
  getERPTenantSnapshot,
  seedERPTenantRuntime,
} from "@/runtime/tenant";

import {
  ERPTenantMetricsGrid,
} from "./ERPTenantMetricsGrid";

import {
  ERPTenantRegistryPanel,
} from "./ERPTenantRegistryPanel";

import {
  ERPTenantMetricsPanel,
} from "./ERPTenantMetricsPanel";

seedERPTenantRuntime();

export function ERPTenantDashboard() {

  const snapshot =
    getERPTenantSnapshot();

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Multi-Tenant"
        title="Tenant Runtime Dashboard"
        description="Isolation tenant, contexte runtime, modules, quotas et activite SaaS."
      />

      <ERPTenantMetricsGrid
        snapshot={snapshot}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ERPTenantRegistryPanel
          snapshot={snapshot}
        />

        <ERPTenantMetricsPanel
          snapshot={snapshot}
        />

      </div>

    </div>
  );
}