import { ERPPageHeader } from "@/components/erp/ui";
import { getERPCockpitSnapshot } from "@/runtime/cockpit";

import { ERPCockpitMetricGrid } from "./ERPCockpitMetricGrid";
import { ERPCockpitModuleMatrix } from "./ERPCockpitModuleMatrix";
import { ERPCockpitStreamsPanel } from "./ERPCockpitStreamsPanel";
import { ERPCockpitHealthPanel } from "./ERPCockpitHealthPanel";

export function ERPRuntimeCockpitDashboard() {
  const snapshot = getERPCockpitSnapshot();

  return (
    <div className="space-y-5 sm:space-y-4 sm:space-y-5 lg:space-y-6 lg:space-y-8">
      <ERPPageHeader
        eyebrow="ERP Mission Control"
        title="Cockpit runtime Terragest"
        description="Supervision centrale des modules, schemas, actions, workflows, events, automation, permissions et navigation."
      />

      <ERPCockpitMetricGrid snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-4 sm:p-4 sm:p-5 lg:p-6 xl:grid-cols-1 lg:grid-cols-2">
        <ERPCockpitStreamsPanel snapshot={snapshot} />
        <ERPCockpitHealthPanel snapshot={snapshot} />
      </div>

      <ERPCockpitModuleMatrix snapshot={snapshot} />
    </div>
  );
}