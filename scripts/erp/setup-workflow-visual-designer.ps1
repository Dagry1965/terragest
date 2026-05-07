Write-Host "=== TERRAGEST_V2 - SETUP ERP WORKFLOW VISUAL DESIGNER ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/components/erp/workflow-designer" | Out-Null

@'
"use client";

type WorkflowStep = {
  id: string;

  label: string;

  status?: string;
};

type WorkflowTransition = {
  from: string;

  to: string;
};

type Props = {
  title: string;

  steps: WorkflowStep[];

  transitions: WorkflowTransition[];
};

export function ERPWorkflowDesigner({
  title,
  steps,
  transitions,
}: Props) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-950">
          {title}
        </h2>
      </div>

      <div className="space-y-6 p-6">
        {steps.map((step) => {
          const outgoing =
            transitions.filter(
              (transition) =>
                transition.from ===
                step.id
            );

          return (
            <div
              key={step.id}
              className="space-y-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    bg-slate-950
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {
                    step.label[0]
                  }
                </div>

                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    {step.label}
                  </div>

                  <div className="mt-1 text-xs text-slate-500">
                    {
                      step.status ||
                      "runtime"
                    }
                  </div>
                </div>
              </div>

              {outgoing.length > 0 && (
                <div className="ml-6 border-l-2 border-dashed border-slate-300 pl-8">
                  <div className="space-y-3">
                    {outgoing.map(
                      (
                        transition,
                        index
                      ) => (
                        <div
                          key={`${transition.from}-${transition.to}-${index}`}
                          className="
                            inline-flex
                            items-center
                            rounded-full
                            bg-slate-100
                            px-4
                            py-2
                            text-xs
                            font-medium
                            text-slate-700
                          "
                        >
                          {transition.from}
                          {" → "}
                          {transition.to}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {steps.length === 0 && (
          <div className="text-sm text-slate-500">
            Aucun workflow ERP.
          </div>
        )}
      </div>
    </div>
  );
}
'@ | Set-Content "src/components/erp/workflow-designer/ERPWorkflowDesigner.tsx"

Write-Host "=== ERP WORKFLOW VISUAL DESIGNER créé avec succès ===" -ForegroundColor Green