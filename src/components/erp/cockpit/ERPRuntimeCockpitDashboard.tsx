import { ERPPageHeader } from "@/components/erp/ui";
import { getERPCockpitSnapshot } from "@/runtime/cockpit";

import { ERPCockpitMetricGrid } from "./ERPCockpitMetricGrid";
import { ERPCockpitModuleMatrix } from "./ERPCockpitModuleMatrix";
import { ERPCockpitStreamsPanel } from "./ERPCockpitStreamsPanel";
import { ERPCockpitHealthPanel } from "./ERPCockpitHealthPanel";

export function ERPRuntimeCockpitDashboard() {
  const snapshot = getERPCockpitSnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Mission Control"
        title="Cockpit runtime Terragest"
        description="Supervision centrale des modules, schemas, actions, workflows, events, automation, permissions et navigation."
      />

      <ERPCockpitMetricGrid snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPCockpitStreamsPanel snapshot={snapshot} />
        <ERPCockpitHealthPanel snapshot={snapshot} />
      </div>

      <ERPCockpitModuleMatrix snapshot={snapshot} />
    </div>
  );
}