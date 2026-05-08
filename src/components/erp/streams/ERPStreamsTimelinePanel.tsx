import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPStreamsSnapshot,
} from "@/runtime/streams";

type Snapshot =
  ReturnType<
    typeof getERPStreamsSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPStreamsTimelinePanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Live Timeline
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Flux temps reel du runtime ERP.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.events.map((event) => (

          <div
            key={event.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {event.type}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {event.message}
                </p>

              </div>

              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  event.level === "critical"
                    ? "bg-red-50 text-red-700"
                    : event.level === "warning"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-emerald-50 text-emerald-700",
                ].join(" ")}
              >
                {event.level}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}