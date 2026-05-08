import { ERPSection } from "@/components/erp/ui";
import type { getERPSecuritySnapshot } from "@/runtime/security";

type Snapshot = ReturnType<typeof getERPSecuritySnapshot>;

type ERPPoliciesPanelProps = {
  snapshot: Snapshot;
};

export function ERPPoliciesPanel({
  snapshot,
}: ERPPoliciesPanelProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Policies
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Extrait des regles RBAC par module.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.policies.slice(0, 12).map((policy) => (
          <div
            key={`${policy.role}-${policy.module}`}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-slate-900">
                {policy.module}
              </p>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {policy.role}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              {policy.actions.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}