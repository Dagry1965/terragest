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

export function ERPSchedulerPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Scheduler Engine
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Taches cron runtime.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.scheduledTasks.map((task) => (

          <div
            key={task.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <p className="font-semibold text-slate-900">
              {task.label}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {task.cron}
            </p>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}