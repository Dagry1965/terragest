import { ERPBadge, ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPModuleWorkflowPanelProps {
  module: ERPModule;
}

export function ERPModuleWorkflowPanel({
  module,
}: ERPModuleWorkflowPanelProps) {
  const workflowsEnabled = module.metadata.features?.workflows === true;
  const auditEnabled = module.metadata.features?.audit === true;
  const automationEnabled = module.metadata.features?.automation === true;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-950">
          Pilotage metier
        </h2>
        <p className="text-sm text-slate-500">
          Actions operationnelles, workflows et audit discret.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {workflowsEnabled && <ERPBadge tone="info">Workflows</ERPBadge>}
        {auditEnabled && <ERPBadge tone="success">Audit</ERPBadge>}
        {automationEnabled && <ERPBadge tone="warning">Automation</ERPBadge>}
      </div>

      <div className="grid gap-3">
        <ERPButton type="button">
          Creer un dossier
        </ERPButton>

        <ERPButton variant="secondary" type="button">
          Lancer une action metier
        </ERPButton>

        <ERPButton variant="ghost" type="button">
          Consulter l'historique
        </ERPButton>

        <ERPButton variant="ghost" type="button">
          Voir les relations
        </ERPButton>
      </div>
    </section>
  );
}