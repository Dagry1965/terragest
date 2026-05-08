import { ERPSection, ERPEmptyState } from "@/components/erp/ui";
import type { getERPSecuritySnapshot } from "@/runtime/security";

type Snapshot = ReturnType<typeof getERPSecuritySnapshot>;

type ERPSecurityAuditPanelProps = {
  snapshot: Snapshot;
};

export function ERPSecurityAuditPanel({
  snapshot,
}: ERPSecurityAuditPanelProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Audit securite
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Traces des controles d'acces runtime.
        </p>
      </div>

      {snapshot.audit.length === 0 ? (
        <ERPEmptyState
          title="Aucun audit"
          description="Les controles d'acces apparaitront ici."
        />
      ) : (
        <div className="space-y-4">
          {snapshot.audit.map((entry) => (
            <div
              key={entry.id}
              className="rounded-2xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-900">
                    {entry.module}:{entry.action}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {entry.userId} - {entry.role}
                  </p>
                </div>

                <span
                  className={[
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    entry.allowed
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700",
                  ].join(" ")}
                >
                  {entry.allowed ? "allowed" : "denied"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </ERPSection>
  );
}