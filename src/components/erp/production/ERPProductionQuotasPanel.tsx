import { ERPSection } from "@/components/erp/ui";
import type { getERPProductionReadinessSnapshot } from "@/runtime/production";

type Snapshot = ReturnType<typeof getERPProductionReadinessSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPProductionQuotasPanel({ snapshot }: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Tenant Quotas
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Limites SaaS par tenant.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.quotas.map((quota) => (
          <div
            key={quota.tenantId}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-semibold text-slate-900">
              {quota.tenantId}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Users: {quota.maxUsers} / Modules: {quota.maxModules} / Storage: {quota.maxStorageGb}GB
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}