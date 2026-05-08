import { ERPSection } from "@/components/erp/ui";
import type { getERPProductionReadinessSnapshot } from "@/runtime/production";

type Snapshot = ReturnType<typeof getERPProductionReadinessSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPProductionCloudPanel({ snapshot }: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Cloud Readiness
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Etat de preparation cloud et production.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.cloud.map((check) => (
          <div
            key={check.key}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
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
                  check.status === "ready"
                    ? "bg-emerald-50 text-emerald-700"
                    : check.status === "partial"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700",
                ].join(" ")}
              >
                {check.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}