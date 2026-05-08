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

export function ERPWorkersRegistryPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Distributed Workers
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Workers runtime distribues.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.workers.map((worker) => (

          <div
            key={worker.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {worker.label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Queue: {worker.queue}
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {worker.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}