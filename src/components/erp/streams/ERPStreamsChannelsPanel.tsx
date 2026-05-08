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

export function ERPStreamsChannelsPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Live Channels
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Canaux realtime runtime.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.channels.map((channel) => (

          <div
            key={channel.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {channel.label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {channel.key}
                </p>

              </div>

              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  channel.active
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-slate-100 text-slate-700",
                ].join(" ")}
              >
                {channel.active
                  ? "active"
                  : "inactive"}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}