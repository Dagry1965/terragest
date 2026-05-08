import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPTestingSnapshot,
} from "@/runtime/testing";

type Snapshot =
  ReturnType<
    typeof getERPTestingSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPTestingHistoryPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Execution History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Historique des executions de tests.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.history.map((item) => (

          <div
            key={`${item.id}_${item.updatedAt}`}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {item.label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.type}
                </p>

              </div>

              <span className="text-sm text-slate-500">
                {item.duration}ms
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}