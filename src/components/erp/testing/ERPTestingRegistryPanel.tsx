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

export function ERPTestingRegistryPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Runtime Tests
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Validation des couches runtime.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.tests.map((test) => (

          <div
            key={test.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {test.label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {test.module}
                </p>

              </div>

              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  test.status === "passed"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700",
                ].join(" ")}
              >
                {test.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}