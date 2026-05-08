import { ERPSection } from "@/components/erp/ui";
import type { getERPRealtimeSnapshot } from "@/runtime/realtime";

type Snapshot = ReturnType<typeof getERPRealtimeSnapshot>;

type ERPRealtimePresencePanelProps = {
  snapshot: Snapshot;
};

export function ERPRealtimePresencePanel({
  snapshot,
}: ERPRealtimePresencePanelProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Presence runtime
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Utilisateurs et services connectes au runtime.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.presence.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {user.name}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {user.role} - {user.module ?? "global"}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {user.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}