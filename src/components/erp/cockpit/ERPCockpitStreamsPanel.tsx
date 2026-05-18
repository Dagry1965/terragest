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
        <h2 className="text-lg font-semibold text-white">
          Flux runtime
        </h2>
        <p className="mt-1 text-sm text-slate-300">
          Vision logique des flux ERP connectes au registre central.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-1 lg:grid-cols-2">
        {streams.map((stream) => (
          <div
            key={stream.label}
            className="rounded-2xl border border-white/10 bg-[#020807] p-4 sm:p-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium text-white">{stream.label}</p>
              <span className="rounded-full bg-[#0EAFAA] px-3 py-1 text-xs font-semibold text-[#7FFFE8]">
                Actif
              </span>
            </div>

            <p className="mt-3 text-xl sm:text-2xl sm:text-3xl font-semibold text-white">
              {stream.value}
            </p>

            <p className="mt-1 text-sm text-slate-300">
              {stream.helper}
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}