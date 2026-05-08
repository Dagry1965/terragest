import { ERPStatCard } from "@/components/erp/ui";
import type { getERPCockpitSnapshot } from "@/runtime/cockpit";

type Snapshot = ReturnType<typeof getERPCockpitSnapshot>;

type ERPCockpitMetricGridProps = {
  snapshot: Snapshot;
};

export function ERPCockpitMetricGrid({
  snapshot,
}: ERPCockpitMetricGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Modules" value={snapshot.modulesCount} helper="Modules runtime" />
      <ERPStatCard label="Schemas" value={snapshot.schemasCount} helper="Schemas generatifs" />
      <ERPStatCard label="Actions" value={snapshot.actionsCount} helper="Actions ERP" />
      <ERPStatCard label="Workflows" value={snapshot.workflowsCount} helper="Processus metier" />
      <ERPStatCard label="Events" value={snapshot.eventsCount} helper="Evenements domaine" />
      <ERPStatCard label="Automation" value={snapshot.automationCount} helper="Automatisations" />
      <ERPStatCard label="Permissions" value={snapshot.permissionsCount} helper="Controle acces" />
      <ERPStatCard label="Navigation" value={snapshot.navigationCount} helper="Routes registre" />
    </div>
  );
}