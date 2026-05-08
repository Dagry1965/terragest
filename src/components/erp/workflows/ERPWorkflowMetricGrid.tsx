import { ERPStatCard } from "@/components/erp/ui";
import {
  ERPWorkflowEngine,
  ERPWorkflowExecutionStore,
  ERPWorkflowTimelineStore,
} from "@/runtime/workflows/enterprise";

export function ERPWorkflowMetricGrid() {
  const definitions =
    ERPWorkflowEngine.definitions();

  const executions =
    ERPWorkflowExecutionStore.all();

  const timeline =
    ERPWorkflowTimelineStore.all();

  const completed =
    executions.filter((execution) => execution.state === "completed");

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Definitions" value={definitions.length} helper="Workflows declares" />
      <ERPStatCard label="Executions" value={executions.length} helper="Instances runtime" />
      <ERPStatCard label="Termines" value={completed.length} helper="Completions" />
      <ERPStatCard label="Timeline" value={timeline.length} helper="Evenements workflow" />
    </div>
  );
}