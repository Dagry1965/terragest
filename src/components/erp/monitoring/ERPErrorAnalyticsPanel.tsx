import { ERPSection, ERPEmptyState } from "@/components/erp/ui";
import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";

type Snapshot = ReturnType<typeof getERPMonitoringSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPErrorAnalyticsPanel({
  snapshot,
}: Props) {
  const errors = snapshot.errors;

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Error Analytics
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Alertes, DLQ, workers failed et acces refuses.
        </p>
      </div>

      {errors.total === 0 ? (
        <ERPEmptyState
          title="Aucune erreur critique"
          description="Le runtime ne remonte pas d'erreur."
        />
      ) : (
        <div className="space-y-4">
          {errors.alerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
            >
              <p className="font-semibold text-amber-900">
                {alert.title}
              </p>
              <p className="mt-1 text-sm text-amber-700">
                {alert.module}
              </p>
            </div>
          ))}

          {errors.dlq.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-red-200 bg-red-50 p-5"
            >
              <p className="font-semibold text-red-900">
                DLQ: {job.type}
              </p>
              <p className="mt-1 text-sm text-red-700">
                {job.module}
              </p>
            </div>
          ))}
        </div>
      )}
    </ERPSection>
  );
}