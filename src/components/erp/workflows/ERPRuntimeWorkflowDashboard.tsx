import { ERPPageHeader } from "@/components/erp/ui";
import { seedERPRuntimeWorkflows } from "@/runtime/workflows/enterprise";

import { ERPWorkflowMetricGrid } from "./ERPWorkflowMetricGrid";
import { ERPWorkflowDefinitionsPanel } from "./ERPWorkflowDefinitionsPanel";
import { ERPWorkflowExecutionsPanel } from "./ERPWorkflowExecutionsPanel";
import { ERPWorkflowTimelinePanel } from "./ERPWorkflowTimelinePanel";

seedERPRuntimeWorkflows();

export function ERPRuntimeWorkflowDashboard() {
  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Workflow Engine"
        title="Workflow Engine Enterprise"
        description="Orchestration des processus metier, executions, timelines, events et traces runtime."
      />

      <ERPWorkflowMetricGrid />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPWorkflowDefinitionsPanel />
        <ERPWorkflowExecutionsPanel />
      </div>

      <ERPWorkflowTimelinePanel />
    </div>
  );
}