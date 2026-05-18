import { ERPSection } from "@/components/erp/ui";
import type { getERPCockpitSnapshot } from "@/runtime/cockpit";

type Snapshot = ReturnType<typeof getERPCockpitSnapshot>;

type ERPCockpitHealthPanelProps = {
  snapshot: Snapshot;
};

export function ERPCockpitHealthPanel({
  snapshot,
}: ERPCockpitHealthPanelProps) {
  const checks = [
    {
      label: "Registry modules",
      ok: snapshot.modulesCount > 0,
    },
    {
      label: "Schemas disponibles",
      ok: snapshot.schemasCount === snapshot.modulesCount,
    },
    {
      label: "Actions configurees",
      ok: snapshot.actionsCount > 0,
    },
    {
      label: "Workflows declares",
      ok: snapshot.workflowsCount > 0,
    },
    {
      label: "Events declares",
      ok: snapshot.eventsCount > 0,
    },
    {
      label: "Navigation generee",
      ok: snapshot.navigationCount > 0,
    },
  ];

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">
          Health system ERP
        </h2>
        <p className="mt-1 text-sm text-slate-300">
          Controle minimal de coherence du runtime.
        </p>
      </div>

      <div className="space-y-3">
        {checks.map((check) => (
          <div
            key={check.label}
            className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-white/10 bg-[#0B201D] shadow-[0_30px_90px_rgba(0,0,0,0.38)] px-4 py-3"
          >
            <span className="text-sm font-medium text-white">
              {check.label}
            </span>

            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold",
                check.ok
                  ? "bg-[rgba(14,175,170,0.12)] text-[#7FFFE8]"
                  : "bg-red-50 text-red-700",
              ].join(" ")}
            >
              {check.ok ? "OK" : "A verifier"}
            </span>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}