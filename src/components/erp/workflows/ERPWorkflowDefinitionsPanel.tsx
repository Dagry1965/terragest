import { ERPSection } from "@/components/erp/ui";
import { ERPWorkflowEngine } from "@/runtime/workflows/enterprise";

export function ERPWorkflowDefinitionsPanel() {
  const definitions =
    ERPWorkflowEngine.definitions();

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Definitions workflows
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Processus metier declares dans le moteur ERP.
        </p>
      </div>

      <div className="space-y-4">
        {definitions.map((workflow) => (
          <div
            key={workflow.key}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {workflow.label}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {workflow.description}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                {workflow.module}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {workflow.steps.map((step) => (
                <span
                  key={step.key}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                >
                  {step.label}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}