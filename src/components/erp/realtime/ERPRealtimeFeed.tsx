import { ERPSection } from "@/components/erp/ui";
import type { getERPRealtimeSnapshot } from "@/runtime/realtime";

type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;

type ERPRealtimeFeedProps = {
  snapshot: Snapshot;
};

export function ERPRealtimeFeed({
  snapshot,
}: ERPRealtimeFeedProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Realtime feed
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Flux des messages runtime en temps reel.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.messages.map((message) => (
          <div
            key={message.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900">
                  {message.title}
                </p>

                {message.description && (
                  <p className="mt-1 text-sm text-slate-500">
                    {message.description}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  {message.module ?? "system"}
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {message.channel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}