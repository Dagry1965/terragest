import {
  ERPSection,
  ERPEmptyState,
} from "@/components/erp/ui";

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

export function ERPTenantMetricsPanel({
  snapshot,
}: Props) {

  const metrics =
    snapshot.currentMetrics;

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Tenant Metrics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Activite runtime du tenant courant.
        </p>

      </div>

      {!metrics ? (

        <ERPEmptyState
          title="Aucune metrique"
          description="Les metriques tenant apparaitront ici."
        />

      ) : (

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Users</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {metrics.activeUsers}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Workflows</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {metrics.workflows}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Automations</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {metrics.automations}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Storage</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {metrics.storage}%
            </p>
          </div>

        </div>

      )}

    </ERPSection>
  );
}