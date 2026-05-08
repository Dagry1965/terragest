import { ERPSection } from "@/components/erp/ui";
import type { getERPCockpitSnapshot } from "@/runtime/cockpit";

type Snapshot = ReturnType<typeof getERPCockpitSnapshot>;

type ERPCockpitStreamsPanelProps = {
  snapshot: Snapshot;
};

export function ERPCockpitStreamsPanel({
  snapshot,
}: ERPCockpitStreamsPanelProps) {
  const streams = [
    {
      label: "Event stream",
      value: snapshot.eventsCount,
      helper: "Evenements domaine declares",
    },
    {
      label: "Workflow monitoring",
      value: snapshot.workflowsCount,
      helper: "Workflows rattaches aux modules",
    },
    {
      label: "Automation monitoring",
      value: snapshot.automationCount,
      helper: "Automatisations disponibles",
    },
    {
      label: "Navigation registry",
      value: snapshot.navigationCount,
      helper: "Routes issues du registre",
    },
  ];

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Flux runtime
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Vision logique des flux ERP connectes au registre central.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {streams.map((stream) => (
          <div
            key={stream.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-900">{stream.label}</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Actif
              </span>
            </div>

            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {stream.value}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {stream.helper}
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}