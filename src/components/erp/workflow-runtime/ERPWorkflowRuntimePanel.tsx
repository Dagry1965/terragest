"use client";

import { useState } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import {
  WorkflowRuntimeEngine,
  WorkflowRuntimeRegistry,
  type WorkflowRuntimeInstance,
} from "@/runtime/workflow-runtime";
import { RuntimeWorkflowGuard } from "@/runtime/security-runtime";

interface ERPWorkflowRuntimePanelProps {
  module: ERPModule;
  recordId?: string;
}

export function ERPWorkflowRuntimePanel({
  module,
  recordId = "demo-record",
}: ERPWorkflowRuntimePanelProps) {
  const workflows = WorkflowRuntimeRegistry.forModule(module.metadata.key);
  const workflow = workflows[0];

  const [instance, setInstance] =
    useState<WorkflowRuntimeInstance | null>(null);

  if (!workflow) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">
          Workflows
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Aucun workflow declare pour ce module.
        </p>
      </section>
    );
  }

  const currentStep = instance?.currentStep ?? workflow.initialStep;

  const availableTransitions = workflow.transitions.filter(
    (transition) => transition.from === currentStep
  );

  function startWorkflow() {
    if (!RuntimeWorkflowGuard.canStart()) {
      return;
    }

    setInstance(
      WorkflowRuntimeEngine.start(workflow.key, recordId)
    );
  }

  function executeTransition(to: string, requiresValidation?: boolean) {
    if (requiresValidation && !RuntimeWorkflowGuard.canValidate()) {
      return;
    }

    if (!RuntimeWorkflowGuard.canTransition()) {
      return;
    }

    setInstance(
      WorkflowRuntimeEngine.transition(workflow.key, recordId, to)
    );
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Workflow runtime
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {workflow.label}
          </p>
        </div>

        <ERPBadge tone={instance?.status === "completed" ? "success" : "info"}>
          {instance?.status ?? "pret"}
        </ERPBadge>
      </div>

      <div className="mb-5 grid gap-3 md:grid-cols-5">
        {workflow.steps.map((step) => {
          const active = step.key === currentStep;

          return (
            <div
              key={step.key}
              className={[
                "rounded-2xl border p-4 text-sm",
                active
                  ? "border-blue-300 bg-blue-50 text-blue-900"
                  : "border-slate-200 bg-slate-50 text-slate-500",
              ].join(" ")}
            >
              <p className="font-black">{step.label}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        {!instance && RuntimeWorkflowGuard.canStart() && (
          <ERPButton type="button" onClick={startWorkflow}>
            Demarrer workflow
          </ERPButton>
        )}

        {availableTransitions.map((transition) => {
          const hidden =
            transition.requiresValidation &&
            !RuntimeWorkflowGuard.canValidate();

          if (hidden || !RuntimeWorkflowGuard.canTransition()) {
            return null;
          }

          return (
            <ERPButton
              key={transition.to}
              type="button"
              variant={transition.requiresValidation ? "secondary" : "primary"}
              onClick={() =>
                executeTransition(
                  transition.to,
                  transition.requiresValidation
                )
              }
            >
              {transition.label}
            </ERPButton>
          );
        })}
      </div>

      {instance && (
        <div className="mt-6 rounded-2xl bg-slate-50 p-4">
          <h3 className="text-sm font-black text-slate-900">
            Historique
          </h3>

          <div className="mt-3 space-y-2">
            {instance.history.map((entry) => (
              <div key={entry.id} className="text-sm text-slate-600">
                {entry.label} - {entry.to}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}