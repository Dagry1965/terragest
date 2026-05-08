import { ERPSection, ERPEmptyState } from "@/components/erp/ui";
import { ERPDeadLetterStore } from "@/runtime/resilience";

export function ERPDLQPanel() {
  const jobs = ERPDeadLetterStore.all();

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Dead Letter Queue
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Jobs en echec isoles pour analyse.
        </p>
      </div>

      {jobs.length === 0 ? (
        <ERPEmptyState
          title="Aucune DLQ"
          description="Aucun job bloque pour le moment."
        />
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-red-200 bg-red-50 p-5"
            >
              <p className="font-semibold text-red-900">{job.type}</p>
              <p className="mt-1 text-sm text-red-700">
                {job.module} - {job.error}
              </p>
            </div>
          ))}
        </div>
      )}
    </ERPSection>
  );
}