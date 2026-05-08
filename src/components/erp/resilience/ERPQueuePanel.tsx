import { ERPSection } from "@/components/erp/ui";
import { ERPQueueStore } from "@/runtime/resilience";

export function ERPQueuePanel() {
  const jobs = ERPQueueStore.all();

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Queue runtime
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Jobs asynchrones traites par le runtime ERP.
        </p>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">{job.type}</p>
                <p className="mt-1 text-sm text-slate-500">
                  {job.module} - attempts: {job.attempts}/{job.maxAttempts}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {job.status}
              </span>
            </div>

            {job.error && (
              <p className="mt-3 text-sm text-red-600">
                {job.error}
              </p>
            )}
          </div>
        ))}
      </div>
    </ERPSection>
  );
}