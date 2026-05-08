import { ERPSection } from "@/components/erp/ui";
import type { getERPSecuritySnapshot } from "@/runtime/security";

type Snapshot = ReturnType<typeof getERPSecuritySnapshot>;

type ERPRolesPanelProps = {
  snapshot: Snapshot;
};

export function ERPRolesPanel({
  snapshot,
}: ERPRolesPanelProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Roles ERP
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Roles globaux disponibles dans le runtime.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.roles.map((role) => (
          <div
            key={role.key}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-semibold text-slate-900">{role.label}</p>
            <p className="mt-1 text-sm text-slate-500">
              {role.description}
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}