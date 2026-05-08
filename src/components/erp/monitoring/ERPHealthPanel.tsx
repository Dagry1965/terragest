import { ERPSection } from "@/components/erp/ui";
import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";

type Snapshot = ReturnType<typeof getERPMonitoringSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPHealthPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Health Checks
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Etat des sous-systemes ERP.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.health.map((check) => (
          <div
            key={check.key}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div>
              <p className="font-semibold text-slate-900">
                {check.label}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {check.description}
              </p>
            </div>

            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold",
                check.status === "healthy"
                  ? "bg-emerald-50 text-emerald-700"
                  : check.status === "warning"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700",
              ].join(" ")}
            >
              {check.status}
            </span>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}