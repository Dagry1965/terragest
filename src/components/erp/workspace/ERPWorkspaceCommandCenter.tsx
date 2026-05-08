import { ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPWorkflowRuntimePanel } from "@/components/erp/workflow-runtime";
import { ERPAutomationRuntimePanel } from "@/components/erp/automation-runtime";
import { ERPEventRuntimePanel } from "@/components/erp/event-runtime";

interface ERPWorkspaceCommandCenterProps {
  module: ERPModule;
}

export function ERPWorkspaceCommandCenter({
  module,
}: ERPWorkspaceCommandCenterProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">
          Command center
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Actions contextuelles pour piloter le module {module.metadata.label}.
        </p>

        <div className="mt-5 grid gap-3">
          <ERPButton type="button">Analyser les donnees</ERPButton>
          <ERPButton variant="secondary" type="button">Voir historique</ERPButton>
          <ERPButton variant="ghost" type="button">Controler permissions</ERPButton>
        </div>
      </section>

      <ERPWorkflowRuntimePanel module={module} />

      <ERPAutomationRuntimePanel module={module} />

      <ERPEventRuntimePanel module={module} />
    </div>
  );
}