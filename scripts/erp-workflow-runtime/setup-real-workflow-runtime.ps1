$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host "=== REAL WORKFLOW RUNTIME ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\workflow-runtime" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\workflow-runtime" | Out-Null

WriteFile "src\runtime\workflow-runtime\WorkflowRuntimeTypes.ts" @'
export type WorkflowRuntimeStatus =
  | "draft"
  | "active"
  | "waiting"
  | "completed"
  | "cancelled"
  | "error";

export interface WorkflowRuntimeStep {
  key: string;
  label: string;
  description?: string;
  status?: WorkflowRuntimeStatus;
}

export interface WorkflowRuntimeTransition {
  from: string;
  to: string;
  label: string;
  requiresValidation?: boolean;
}

export interface WorkflowRuntimeDefinition {
  key: string;
  moduleKey: string;
  label: string;
  initialStep: string;
  steps: WorkflowRuntimeStep[];
  transitions: WorkflowRuntimeTransition[];
}

export interface WorkflowRuntimeInstance {
  id: string;
  moduleKey: string;
  workflowKey: string;
  recordId: string;
  currentStep: string;
  status: WorkflowRuntimeStatus;
  history: WorkflowRuntimeHistoryEntry[];
}

export interface WorkflowRuntimeHistoryEntry {
  id: string;
  from?: string;
  to: string;
  label: string;
  date: string;
}
'@

WriteFile "src\runtime\workflow-runtime\WorkflowRuntimeDefinitions.ts" @'
import type { WorkflowRuntimeDefinition } from "./WorkflowRuntimeTypes";

export const workflowRuntimeDefinitions: WorkflowRuntimeDefinition[] = [
  {
    key: "materiel-maintenance",
    moduleKey: "materiels",
    label: "Workflow maintenance materiel",
    initialStep: "available",
    steps: [
      { key: "available", label: "Disponible" },
      { key: "maintenance", label: "Maintenance" },
      { key: "validation", label: "Validation" },
      { key: "repair", label: "Reparation" },
      { key: "service", label: "Retour service" },
    ],
    transitions: [
      { from: "available", to: "maintenance", label: "Declencher maintenance" },
      { from: "maintenance", to: "validation", label: "Demander validation", requiresValidation: true },
      { from: "validation", to: "repair", label: "Valider reparation" },
      { from: "repair", to: "service", label: "Retour en service" },
    ],
  },
  {
    key: "exploitation-control",
    moduleKey: "exploitations",
    label: "Controle exploitation",
    initialStep: "created",
    steps: [
      { key: "created", label: "Creee" },
      { key: "review", label: "Analyse" },
      { key: "approved", label: "Validee" },
      { key: "active", label: "Active" },
    ],
    transitions: [
      { from: "created", to: "review", label: "Lancer analyse" },
      { from: "review", to: "approved", label: "Valider", requiresValidation: true },
      { from: "approved", to: "active", label: "Activer" },
    ],
  },
  {
    key: "stock-alert",
    moduleKey: "stocks",
    label: "Workflow alerte stock",
    initialStep: "normal",
    steps: [
      { key: "normal", label: "Normal" },
      { key: "alert", label: "Alerte" },
      { key: "order", label: "Reapprovisionnement" },
      { key: "resolved", label: "Resolue" },
    ],
    transitions: [
      { from: "normal", to: "alert", label: "Detecter alerte" },
      { from: "alert", to: "order", label: "Creer commande" },
      { from: "order", to: "resolved", label: "Cloturer" },
    ],
  },
];
'@

WriteFile "src\runtime\workflow-runtime\WorkflowRuntimeRegistry.ts" @'
import type { WorkflowRuntimeDefinition } from "./WorkflowRuntimeTypes";
import { workflowRuntimeDefinitions } from "./WorkflowRuntimeDefinitions";

export class WorkflowRuntimeRegistry {
  static all(): WorkflowRuntimeDefinition[] {
    return workflowRuntimeDefinitions;
  }

  static forModule(moduleKey: string): WorkflowRuntimeDefinition[] {
    return workflowRuntimeDefinitions.filter(
      (workflow) => workflow.moduleKey === moduleKey
    );
  }

  static get(workflowKey: string): WorkflowRuntimeDefinition | undefined {
    return workflowRuntimeDefinitions.find(
      (workflow) => workflow.key === workflowKey
    );
  }
}
'@

WriteFile "src\runtime\workflow-runtime\WorkflowRuntimeStore.ts" @'
import type {
  WorkflowRuntimeDefinition,
  WorkflowRuntimeInstance,
} from "./WorkflowRuntimeTypes";

const instances = new Map<string, WorkflowRuntimeInstance>();

export class WorkflowRuntimeStore {
  static create(
    definition: WorkflowRuntimeDefinition,
    recordId: string
  ): WorkflowRuntimeInstance {
    const id = `${definition.key}-${recordId}`;

    const existing = instances.get(id);

    if (existing) {
      return existing;
    }

    const instance: WorkflowRuntimeInstance = {
      id,
      moduleKey: definition.moduleKey,
      workflowKey: definition.key,
      recordId,
      currentStep: definition.initialStep,
      status: "active",
      history: [
        {
          id: `${id}-start`,
          to: definition.initialStep,
          label: "Workflow initialise",
          date: new Date().toISOString(),
        },
      ],
    };

    instances.set(id, instance);

    return instance;
  }

  static get(id: string): WorkflowRuntimeInstance | undefined {
    return instances.get(id);
  }

  static save(instance: WorkflowRuntimeInstance) {
    instances.set(instance.id, instance);
    return instance;
  }
}
'@

WriteFile "src\runtime\workflow-runtime\WorkflowRuntimeValidator.ts" @'
import type {
  WorkflowRuntimeDefinition,
  WorkflowRuntimeInstance,
  WorkflowRuntimeTransition,
} from "./WorkflowRuntimeTypes";

export class WorkflowRuntimeValidator {
  static findTransition(
    definition: WorkflowRuntimeDefinition,
    instance: WorkflowRuntimeInstance,
    to: string
  ): WorkflowRuntimeTransition | undefined {
    return definition.transitions.find(
      (transition) =>
        transition.from === instance.currentStep &&
        transition.to === to
    );
  }

  static canTransition(
    definition: WorkflowRuntimeDefinition,
    instance: WorkflowRuntimeInstance,
    to: string
  ): boolean {
    return Boolean(
      WorkflowRuntimeValidator.findTransition(
        definition,
        instance,
        to
      )
    );
  }
}
'@

WriteFile "src\runtime\workflow-runtime\WorkflowRuntimeAudit.ts" @'
import type { WorkflowRuntimeInstance } from "./WorkflowRuntimeTypes";

export class WorkflowRuntimeAudit {
  static log(instance: WorkflowRuntimeInstance, label: string) {
    console.log("WORKFLOW AUDIT", {
      workflow: instance.workflowKey,
      recordId: instance.recordId,
      step: instance.currentStep,
      label,
      date: new Date().toISOString(),
    });
  }
}
'@

WriteFile "src\runtime\workflow-runtime\WorkflowRuntimeEngine.ts" @'
import { WorkflowRuntimeRegistry } from "./WorkflowRuntimeRegistry";
import { WorkflowRuntimeStore } from "./WorkflowRuntimeStore";
import { WorkflowRuntimeValidator } from "./WorkflowRuntimeValidator";
import { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";

export class WorkflowRuntimeEngine {
  static start(workflowKey: string, recordId: string) {
    const definition = WorkflowRuntimeRegistry.get(workflowKey);

    if (!definition) {
      throw new Error(`Workflow introuvable: ${workflowKey}`);
    }

    const instance = WorkflowRuntimeStore.create(definition, recordId);

    WorkflowRuntimeAudit.log(instance, "Workflow demarre");

    return instance;
  }

  static transition(
    workflowKey: string,
    recordId: string,
    to: string
  ) {
    const definition = WorkflowRuntimeRegistry.get(workflowKey);

    if (!definition) {
      throw new Error(`Workflow introuvable: ${workflowKey}`);
    }

    const instance = WorkflowRuntimeStore.create(definition, recordId);

    const transition =
      WorkflowRuntimeValidator.findTransition(
        definition,
        instance,
        to
      );

    if (!transition) {
      throw new Error(
        `Transition invalide: ${instance.currentStep} -> ${to}`
      );
    }

    const previous = instance.currentStep;

    instance.currentStep = to;

    instance.history.unshift({
      id: `${instance.id}-${Date.now()}`,
      from: previous,
      to,
      label: transition.label,
      date: new Date().toISOString(),
    });

    const completed =
      definition.transitions.filter((item) => item.from === to).length === 0;

    if (completed) {
      instance.status = "completed";
    }

    WorkflowRuntimeStore.save(instance);
    WorkflowRuntimeAudit.log(instance, transition.label);

    return instance;
  }
}
'@

WriteFile "src\runtime\workflow-runtime\index.ts" @'
export type {
  WorkflowRuntimeDefinition,
  WorkflowRuntimeHistoryEntry,
  WorkflowRuntimeInstance,
  WorkflowRuntimeStatus,
  WorkflowRuntimeStep,
  WorkflowRuntimeTransition,
} from "./WorkflowRuntimeTypes";

export { workflowRuntimeDefinitions } from "./WorkflowRuntimeDefinitions";
export { WorkflowRuntimeRegistry } from "./WorkflowRuntimeRegistry";
export { WorkflowRuntimeStore } from "./WorkflowRuntimeStore";
export { WorkflowRuntimeValidator } from "./WorkflowRuntimeValidator";
export { WorkflowRuntimeAudit } from "./WorkflowRuntimeAudit";
export { WorkflowRuntimeEngine } from "./WorkflowRuntimeEngine";
'@

WriteFile "src\components\erp\workflow-runtime\ERPWorkflowRuntimePanel.tsx" @'
"use client";

import { useState } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import {
  WorkflowRuntimeEngine,
  WorkflowRuntimeRegistry,
  type WorkflowRuntimeInstance,
} from "@/runtime/workflow-runtime";

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
    setInstance(
      WorkflowRuntimeEngine.start(workflow.key, recordId)
    );
  }

  function executeTransition(to: string) {
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
        {!instance && (
          <ERPButton type="button" onClick={startWorkflow}>
            Demarrer workflow
          </ERPButton>
        )}

        {availableTransitions.map((transition) => (
          <ERPButton
            key={transition.to}
            type="button"
            variant={transition.requiresValidation ? "secondary" : "primary"}
            onClick={() => executeTransition(transition.to)}
          >
            {transition.label}
          </ERPButton>
        ))}
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
'@

WriteFile "src\components\erp\workflow-runtime\index.ts" @'
export { ERPWorkflowRuntimePanel } from "./ERPWorkflowRuntimePanel";
'@

WriteFile "src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx" @'
import { ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPWorkflowRuntimePanel } from "@/components/erp/workflow-runtime";

interface ERPWorkspaceCommandCenterProps {
  module: ERPModule;
}

export function ERPWorkspaceCommandCenter({
  module,
}: ERPWorkspaceCommandCenterProps) {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-slate-950">
          Command center
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Actions contextuelles pour piloter le module {module.metadata.label}.
        </p>

        <div className="mt-5 grid gap-3">
          <ERPButton type="button">Analyser les donnees</ERPButton>
          <ERPButton variant="secondary" type="button">Voir historique</ERPButton>
          <ERPButton variant="ghost" type="button">Controler permissions</ERPButton>
        </div>
      </section>

      <ERPWorkflowRuntimePanel module={module} />
    </div>
  );
}
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== REAL WORKFLOW RUNTIME TERMINE ===" -ForegroundColor Green