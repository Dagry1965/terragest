import { ERPSection, ERPEmptyState } from "@/components/erp/ui";
import type { getERPAISnapshot } from "@/runtime/ai";

type Snapshot = ReturnType<typeof getERPAISnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPAIAnomaliesPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Anomaly Detection
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Detection des signaux runtime inhabituels.
        </p>
      </div>

      {snapshot.anomalies.length === 0 ? (
        <ERPEmptyState
          title="Aucune anomalie"
          description="Aucun signal anormal detecte."
        />
      ) : (
        <div className="space-y-4">
          {snapshot.anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
            >
              <p className="font-semibold text-amber-900">
                {anomaly.signal}
              </p>
              <p className="mt-1 text-sm text-amber-700">
                {anomaly.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </ERPSection>
  );
}