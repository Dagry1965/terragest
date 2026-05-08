import { ERPSection } from "@/components/erp/ui";
import { ERPWorkflowExecutionStore } from "@/runtime/workflows/enterprise";

export function ERPWorkflowExecutionsPanel() {
  const executions =
    ERPWorkflowExecutionStore.all();

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Executions runtime
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Instances de workflows lancees par le moteur.
        </p>
      </div>

      <div className="space-y-4">
        {executions.map((execution) => (
          <div
            key={execution.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {execution.workflowKey}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Step: {execution.currentStep ?? "-"}
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {execution.state}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}