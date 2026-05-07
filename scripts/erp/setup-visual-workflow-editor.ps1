Write-Host "=== TERRAGEST_V2 - SETUP ERP VISUAL WORKFLOW EDITOR ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/components/erp/workflow-editor" | Out-Null

@'
"use client";

import {
  useState,
} from "react";

type WorkflowStep = {
  id: string;

  label: string;
};

type WorkflowTransition = {
  from: string;

  to: string;
};

type Props = {
  initialSteps?: WorkflowStep[];

  initialTransitions?: WorkflowTransition[];
};

export function ERPVisualWorkflowEditor({
  initialSteps = [],
  initialTransitions = [],
}: Props) {
  const [steps, setSteps] =
    useState(initialSteps);

  const [
    transitions,
    setTransitions,
  ] = useState(
    initialTransitions
  );

  const [stepLabel, setStepLabel] =
    useState("");

  const [from, setFrom] =
    useState("");

  const [to, setTo] =
    useState("");

  function addStep() {
    if (!stepLabel) {
      return;
    }

    setSteps([
      ...steps,
      {
        id:
          crypto.randomUUID(),

        label: stepLabel,
      },
    ]);

    setStepLabel("");
  }

  function addTransition() {
    if (!from || !to) {
      return;
    }

    setTransitions([
      ...transitions,
      {
        from,
        to,
      },
    ]);

    setFrom("");
    setTo("");
  }

  return (
    <div className="space-y-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-xl font-semibold text-slate-950">
          ERP Workflow Editor
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          Construisez visuellement vos workflows ERP.
        </p>
      </div>

      <section className="space-y-4">
        <div className="text-sm font-semibold text-slate-900">
          Ajouter une étape
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            value={stepLabel}
            onChange={(e) =>
              setStepLabel(
                e.target.value
              )
            }
            placeholder="Nom de l’étape"
            className="
              flex-1
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
              text-sm
              outline-none
            "
          />

          <button
            onClick={addStep}
            className="
              rounded-2xl
              bg-slate-950
              px-5
              py-3
              text-sm
              font-medium
              text-white
            "
          >
            Ajouter
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="text-sm font-semibold text-slate-900">
          Ajouter une transition
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          <input
            value={from}
            onChange={(e) =>
              setFrom(
                e.target.value
              )
            }
            placeholder="Depuis"
            className="
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
              text-sm
              outline-none
            "
          />

          <input
            value={to}
            onChange={(e) =>
              setTo(
                e.target.value
              )
            }
            placeholder="Vers"
            className="
              rounded-2xl
              border
              border-slate-200
              px-4
              py-3
              text-sm
              outline-none
            "
          />

          <button
            onClick={
              addTransition
            }
            className="
              rounded-2xl
              bg-slate-200
              px-5
              py-3
              text-sm
              font-medium
              text-slate-800
            "
          >
            Ajouter transition
          </button>
        </div>
      </section>

      <section className="space-y-4">
        <div className="text-sm font-semibold text-slate-900">
          Workflow Runtime
        </div>

        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                p-4
              "
            >
              <div className="text-sm font-semibold text-slate-900">
                {step.label}
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {transitions
                  .filter(
                    (
                      transition
                    ) =>
                      transition.from ===
                      step.label
                  )
                  .map(
                    (
                      transition,
                      index
                    ) => (
                      <div
                        key={`${transition.from}-${transition.to}-${index}`}
                        className="
                          rounded-full
                          bg-slate-200
                          px-3
                          py-1
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
          ))}

          {steps.length === 0 && (
            <div className="text-sm text-slate-500">
              Aucun workflow défini.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
'@ | Set-Content "src/components/erp/workflow-editor/ERPVisualWorkflowEditor.tsx"

Write-Host "=== ERP VISUAL WORKFLOW EDITOR créé avec succès ===" -ForegroundColor Green