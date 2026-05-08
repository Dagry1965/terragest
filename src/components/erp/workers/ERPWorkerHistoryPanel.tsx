import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPWorkersSnapshot,
} from "@/runtime/workers";

type Snapshot =
  ReturnType<
    typeof getERPWorkersSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPWorkerHistoryPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Execution History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Historique des jobs workers.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.jobs.map((job) => (

          <div
            key={job.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {job.type}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {job.module}
                </p>

              </div>

              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  job.status === "completed"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700",
                ].join(" ")}
              >
                {job.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}