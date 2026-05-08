import {
  ERPSection,
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

export function ERPTenantRegistryPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Tenant Registry
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Registre des tenants ERP.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.tenants.map((tenant) => (

          <div
            key={tenant.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {tenant.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {tenant.plan}
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {tenant.status}
              </span>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              {tenant.modules.map((module) => (

                <span
                  key={module}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                >
                  {module}
                </span>

              ))}

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}