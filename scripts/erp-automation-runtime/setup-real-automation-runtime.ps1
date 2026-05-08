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

Write-Host "=== REAL AUTOMATION RUNTIME ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\automation-runtime" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\automation-runtime" | Out-Null

WriteFile "src\runtime\automation-runtime\AutomationRuntimeTypes.ts" @'
export type AutomationRuntimeTriggerType =
  | "threshold"
  | "workflow_blocked"
  | "maintenance_overdue"
  | "manual"
  | "event";

export type AutomationRuntimeJobStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "dead_letter";

export interface AutomationRuntimeTrigger {
  type: AutomationRuntimeTriggerType;
  field?: string;
  operator?: "<" | ">" | "=" | "!=";
  value?: unknown;
}

export interface AutomationRuntimeAction {
  type:
    | "notify"
    | "workflow"
    | "audit"
    | "task"
    | "alert";

  label: string;
  payload?: Record<string, unknown>;
}

export interface AutomationRuntimeRule {
  key: string;
  moduleKey: string;
  label: string;
  description?: string;
  trigger: AutomationRuntimeTrigger;
  actions: AutomationRuntimeAction[];
  enabled: boolean;
}

export interface AutomationRuntimeJob {
  id: string;
  ruleKey: string;
  moduleKey: string;
  status: AutomationRuntimeJobStatus;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
  error?: string;
  actions: AutomationRuntimeAction[];
}
'@

WriteFile "src\runtime\automation-runtime\AutomationRuntimeRules.ts" @'
import type { AutomationRuntimeRule } from "./AutomationRuntimeTypes";

export const automationRuntimeRules: AutomationRuntimeRule[] = [
  {
    key: "stock-critical-threshold",
    moduleKey: "stocks",
    label: "Alerte stock critique",
    description: "Declenche une alerte lorsque le stock passe sous le seuil.",
    enabled: true,
    trigger: {
      type: "threshold",
      field: "quantite",
      operator: "<",
      value: 10,
    },
    actions: [
      {
        type: "alert",
        label: "Creer alerte stock",
      },
      {
        type: "notify",
        label: "Notifier superviseur",
      },
      {
        type: "workflow",
        label: "Declencher workflow reapprovisionnement",
      },
    ],
  },
  {
    key: "materiel-maintenance-overdue",
    moduleKey: "materiels",
    label: "Maintenance materiel en retard",
    description: "Cree une priorite lorsque la maintenance est depassee.",
    enabled: true,
    trigger: {
      type: "maintenance_overdue",
    },
    actions: [
      {
        type: "alert",
        label: "Creer incident maintenance",
      },
      {
        type: "task",
        label: "Creer tache intervention",
      },
      {
        type: "notify",
        label: "Notifier responsable",
      },
    ],
  },
  {
    key: "workflow-blocked-escalation",
    moduleKey: "exploitations",
    label: "Relance workflow bloque",
    description: "Relance automatiquement les workflows bloques.",
    enabled: true,
    trigger: {
      type: "workflow_blocked",
    },
    actions: [
      {
        type: "notify",
        label: "Notifier valideur",
      },
      {
        type: "audit",
        label: "Tracer relance automatique",
      },
    ],
  },
];
'@

WriteFile "src\runtime\automation-runtime\AutomationRuntimeRegistry.ts" @'
import type { AutomationRuntimeRule } from "./AutomationRuntimeTypes";
import { automationRuntimeRules } from "./AutomationRuntimeRules";

export class AutomationRuntimeRegistry {
  static all(): AutomationRuntimeRule[] {
    return automationRuntimeRules;
  }

  static forModule(moduleKey: string): AutomationRuntimeRule[] {
    return automationRuntimeRules.filter(
      (rule) => rule.moduleKey === moduleKey
    );
  }

  static get(ruleKey: string): AutomationRuntimeRule | undefined {
    return automationRuntimeRules.find((rule) => rule.key === ruleKey);
  }
}
'@

WriteFile "src\runtime\automation-runtime\AutomationRuntimeTriggerEngine.ts" @'
import type {
  AutomationRuntimeRule,
  AutomationRuntimeTrigger,
} from "./AutomationRuntimeTypes";

function compare(
  current: unknown,
  operator: AutomationRuntimeTrigger["operator"],
  expected: unknown
): boolean {
  if (operator === "<") {
    return Number(current) < Number(expected);
  }

  if (operator === ">") {
    return Number(current) > Number(expected);
  }

  if (operator === "=") {
    return current === expected;
  }

  if (operator === "!=") {
    return current !== expected;
  }

  return false;
}

export class AutomationRuntimeTriggerEngine {
  static matches(
    rule: AutomationRuntimeRule,
    payload: Record<string, unknown> = {}
  ): boolean {
    if (!rule.enabled) {
      return false;
    }

    if (rule.trigger.type === "manual") {
      return true;
    }

    if (rule.trigger.type === "event") {
      return true;
    }

    if (rule.trigger.type === "workflow_blocked") {
      return payload.workflowBlocked === true;
    }

    if (rule.trigger.type === "maintenance_overdue") {
      return payload.maintenanceOverdue === true;
    }

    if (rule.trigger.type === "threshold") {
      if (!rule.trigger.field) {
        return false;
      }

      return compare(
        payload[rule.trigger.field],
        rule.trigger.operator,
        rule.trigger.value
      );
    }

    return false;
  }
}
'@

WriteFile "src\runtime\automation-runtime\AutomationRuntimeQueue.ts" @'
import type {
  AutomationRuntimeJob,
  AutomationRuntimeRule,
} from "./AutomationRuntimeTypes";

const queue: AutomationRuntimeJob[] = [];
const deadLetters: AutomationRuntimeJob[] = [];

export class AutomationRuntimeQueue {
  static enqueue(rule: AutomationRuntimeRule): AutomationRuntimeJob {
    const now = new Date().toISOString();

    const job: AutomationRuntimeJob = {
      id: `${rule.key}-${Date.now()}`,
      ruleKey: rule.key,
      moduleKey: rule.moduleKey,
      status: "pending",
      attempts: 0,
      maxAttempts: 3,
      createdAt: now,
      updatedAt: now,
      actions: rule.actions,
    };

    queue.unshift(job);

    return job;
  }

  static all(): AutomationRuntimeJob[] {
    return queue;
  }

  static pending(): AutomationRuntimeJob[] {
    return queue.filter((job) => job.status === "pending");
  }

  static update(job: AutomationRuntimeJob): AutomationRuntimeJob {
    job.updatedAt = new Date().toISOString();

    const index = queue.findIndex((item) => item.id === job.id);

    if (index >= 0) {
      queue[index] = job;
    }

    return job;
  }

  static moveToDeadLetter(job: AutomationRuntimeJob): AutomationRuntimeJob {
    job.status = "dead_letter";
    job.updatedAt = new Date().toISOString();

    deadLetters.unshift(job);

    AutomationRuntimeQueue.update(job);

    return job;
  }

  static deadLetters(): AutomationRuntimeJob[] {
    return deadLetters;
  }
}
'@

WriteFile "src\runtime\automation-runtime\AutomationRuntimeExecutor.ts" @'
import type {
  AutomationRuntimeAction,
  AutomationRuntimeJob,
} from "./AutomationRuntimeTypes";
import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";

export class AutomationRuntimeExecutor {
  static async executeAction(
    action: AutomationRuntimeAction,
    job: AutomationRuntimeJob
  ): Promise<void> {
    console.log("AUTOMATION ACTION", {
      job: job.id,
      type: action.type,
      label: action.label,
      payload: action.payload,
    });
  }

  static async execute(job: AutomationRuntimeJob): Promise<AutomationRuntimeJob> {
    job.status = "running";
    job.attempts += 1;

    AutomationRuntimeQueue.update(job);

    try {
      for (const action of job.actions) {
        await AutomationRuntimeExecutor.executeAction(action, job);
      }

      job.status = "completed";
      job.error = undefined;

      return AutomationRuntimeQueue.update(job);
    } catch (error) {
      job.error =
        error instanceof Error ? error.message : "Erreur automation";

      if (job.attempts >= job.maxAttempts) {
        return AutomationRuntimeQueue.moveToDeadLetter(job);
      }

      job.status = "failed";

      return AutomationRuntimeQueue.update(job);
    }
  }
}
'@

WriteFile "src\runtime\automation-runtime\AutomationRuntimeEngine.ts" @'
import { AutomationRuntimeRegistry } from "./AutomationRuntimeRegistry";
import { AutomationRuntimeTriggerEngine } from "./AutomationRuntimeTriggerEngine";
import { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
import { AutomationRuntimeExecutor } from "./AutomationRuntimeExecutor";

export class AutomationRuntimeEngine {
  static evaluate(
    moduleKey: string,
    payload: Record<string, unknown> = {}
  ) {
    const rules = AutomationRuntimeRegistry.forModule(moduleKey);

    const jobs = rules
      .filter((rule) =>
        AutomationRuntimeTriggerEngine.matches(rule, payload)
      )
      .map((rule) => AutomationRuntimeQueue.enqueue(rule));

    return jobs;
  }

  static async runPending() {
    const jobs = AutomationRuntimeQueue.pending();

    for (const job of jobs) {
      await AutomationRuntimeExecutor.execute(job);
    }

    return AutomationRuntimeQueue.all();
  }

  static async triggerManual(ruleKey: string) {
    const rule = AutomationRuntimeRegistry.get(ruleKey);

    if (!rule) {
      throw new Error(`Automation introuvable: ${ruleKey}`);
    }

    const job = AutomationRuntimeQueue.enqueue(rule);

    return AutomationRuntimeExecutor.execute(job);
  }
}
'@

WriteFile "src\runtime\automation-runtime\AutomationRuntimeScheduler.ts" @'
import { AutomationRuntimeEngine } from "./AutomationRuntimeEngine";

export class AutomationRuntimeScheduler {
  static async tick() {
    return AutomationRuntimeEngine.runPending();
  }
}
'@

WriteFile "src\runtime\automation-runtime\index.ts" @'
export type {
  AutomationRuntimeAction,
  AutomationRuntimeJob,
  AutomationRuntimeJobStatus,
  AutomationRuntimeRule,
  AutomationRuntimeTrigger,
  AutomationRuntimeTriggerType,
} from "./AutomationRuntimeTypes";

export { automationRuntimeRules } from "./AutomationRuntimeRules";
export { AutomationRuntimeRegistry } from "./AutomationRuntimeRegistry";
export { AutomationRuntimeTriggerEngine } from "./AutomationRuntimeTriggerEngine";
export { AutomationRuntimeQueue } from "./AutomationRuntimeQueue";
export { AutomationRuntimeExecutor } from "./AutomationRuntimeExecutor";
export { AutomationRuntimeEngine } from "./AutomationRuntimeEngine";
export { AutomationRuntimeScheduler } from "./AutomationRuntimeScheduler";
'@

WriteFile "src\components\erp\automation-runtime\ERPAutomationRuntimePanel.tsx" @'
"use client";

import { useState } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import {
  AutomationRuntimeEngine,
  AutomationRuntimeQueue,
  AutomationRuntimeRegistry,
  type AutomationRuntimeJob,
} from "@/runtime/automation-runtime";

interface ERPAutomationRuntimePanelProps {
  module: ERPModule;
}

export function ERPAutomationRuntimePanel({
  module,
}: ERPAutomationRuntimePanelProps) {
  const rules = AutomationRuntimeRegistry.forModule(module.metadata.key);

  const [jobs, setJobs] =
    useState<AutomationRuntimeJob[]>(AutomationRuntimeQueue.all());

  function simulate() {
    AutomationRuntimeEngine.evaluate(module.metadata.key, {
      quantite: 5,
      maintenanceOverdue: true,
      workflowBlocked: true,
    });

    setJobs([...AutomationRuntimeQueue.all()]);
  }

  async function runPending() {
    await AutomationRuntimeEngine.runPending();
    setJobs([...AutomationRuntimeQueue.all()]);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Automation runtime
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Regles automatiques du module {module.metadata.label}.
          </p>
        </div>

        <ERPBadge tone="info">{rules.length} regles</ERPBadge>
      </div>

      <div className="mb-5 space-y-3">
        {rules.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aucune automation declaree pour ce module.
          </p>
        ) : (
          rules.map((rule) => (
            <div
              key={rule.key}
              className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-black text-slate-900">
                    {rule.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {rule.description}
                  </p>
                </div>

                <ERPBadge tone={rule.enabled ? "success" : "warning"}>
                  {rule.enabled ? "active" : "inactive"}
                </ERPBadge>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <ERPButton type="button" onClick={simulate}>
          Simuler evenement
        </ERPButton>

        <ERPButton variant="secondary" type="button" onClick={runPending}>
          Executer queue
        </ERPButton>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4">
        <h3 className="text-sm font-black text-slate-900">
          Jobs automation
        </h3>

        <div className="mt-3 space-y-2">
          {jobs.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aucun job automation.
            </p>
          ) : (
            jobs.slice(0, 6).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between rounded-xl bg-white p-3 text-sm"
              >
                <span className="font-medium text-slate-700">
                  {job.ruleKey}
                </span>

                <ERPBadge tone={job.status === "completed" ? "success" : "info"}>
                  {job.status}
                </ERPBadge>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\automation-runtime\index.ts" @'
export { ERPAutomationRuntimePanel } from "./ERPAutomationRuntimePanel";
'@

WriteFile "src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx" @'
import { ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPWorkflowRuntimePanel } from "@/components/erp/workflow-runtime";
import { ERPAutomationRuntimePanel } from "@/components/erp/automation-runtime";

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

      <ERPAutomationRuntimePanel module={module} />
    </div>
  );
}
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== REAL AUTOMATION RUNTIME TERMINE ===" -ForegroundColor Green