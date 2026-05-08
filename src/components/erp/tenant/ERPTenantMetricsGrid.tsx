import { ERPStatCard } from "@/components/erp/ui";

import type {
  getERPTenantSnapshot,
} from "@/runtime/tenant";

type Snapshot =
  ReturnType<
    typeof getERPTenantSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPTenantMetricsGrid({
  snapshot,
}: Props) {

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

      <ERPStatCard
        label="Tenants"
        value={snapshot.tenantsCount}
        helper="Tenants ERP"
      />

      <ERPStatCard
        label="Active"
        value={snapshot.activeTenants}
        helper="Tenants actifs"
      />

      <ERPStatCard
        label="Current"
        value={snapshot.current.name}
        helper={snapshot.current.plan}
      />

      <ERPStatCard
        label="Modules"
        value={snapshot.current.modules.length}
        helper="Modules autorises"
      />

    </div>
  );
}