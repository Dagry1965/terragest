$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {
  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent
  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {
    $BackupDir = Join-Path $ProjectRoot "backup\workflow-engine-enterprise"
    Ensure-Dir $BackupDir

    $SafeName = $Path
    $SafeName = $SafeName.Replace("\", "__")
    $SafeName = $SafeName.Replace("/", "__")
    $SafeName = $SafeName.Replace(":", "")

    Copy-Item -LiteralPath $FullPath -Destination (Join-Path $BackupDir "$SafeName.bak") -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Host ""
Write-Host "WORKFLOW ENGINE ENTERPRISE" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\workflows\enterprise"
Ensure-Dir "src\runtime\workflows\enterprise\engine"
Ensure-Dir "src\runtime\workflows\enterprise\registry"
Ensure-Dir "src\runtime\workflows\enterprise\timeline"
Ensure-Dir "src\runtime\workflows\enterprise\store"
Ensure-Dir "src\components\erp\workflows"

Write-Utf8 "src\runtime\workflows\enterprise\engine\ERPWorkflowTypes.ts" @'
export type ERPWorkflowState =
  | "draft"
  | "pending"
  | "running"
  | "waiting_approval"
  | "completed"
  | "failed"
  | "cancelled"
  | "compensating"
  | "compensated";

export type ERPWorkflowStepType =
  | "task"
  | "approval"
  | "automation"
  | "event"
  | "notification"
  | "compensation";

export type ERPWorkflowStep = {
  key: string;
  label: string;
  type: ERPWorkflowStepType;
  next?: string;
  onFailure?: string;
};

export type ERPWorkflowDefinition = {
  key: string;
  module: string;
  label: string;
  description?: string;
  initialState: ERPWorkflowState;
  steps: ERPWorkflowStep[];
};

export type ERPWorkflowExecution = {
  id: string;
  workflowKey: string;
  module: string;
  state: ERPWorkflowState;
  currentStep?: string;
  startedAt: string;
  updatedAt: string;
  completedAt?: string;
  metadata?: Record<string, unknown>;
};
'@

Write-Utf8 "src\runtime\workflows\enterprise\registry\ERPWorkflowRegistry.ts" @'
import type {
  ERPWorkflowDefinition,
} from "../engine/ERPWorkflowTypes";

export const ERPWorkflowRegistry: ERPWorkflowDefinition[] = [
  {
    key: "maintenance-critical-flow",
    module: "maintenance",
    label: "Maintenance critique",
    description: "Workflow de traitement des maintenances critiques.",
    initialState: "pending",
    steps: [
      {
        key: "analyse",
        label: "Analyse de la demande",
        type: "task",
        next: "approval",
      },
      {
        key: "approval",
        label: "Validation responsable",
        type: "approval",
        next: "intervention",
        onFailure: "compensation",
      },
      {
        key: "intervention",
        label: "Creation intervention",
        type: "automation",
        next: "notification",
      },
      {
        key: "notification",
        label: "Notification equipe",
        type: "notification",
      },
      {
        key: "compensation",
        label: "Compensation",
        type: "compensation",
      },
    ],
  },
  {
    key: "stock-replenishment-flow",
    module: "stocks",
    label: "Reapprovisionnement stock",
    description: "Workflow de reapprovisionnement automatique.",
    initialState: "pending",
    steps: [
      {
        key: "detect",
        label: "Detection seuil",
        type: "event",
        next: "order",
      },
      {
        key: "order",
        label: "Preparation commande",
        type: "automation",
        next: "approval",
      },
      {
        key: "approval",
        label: "Validation achat",
        type: "approval",
        next: "completed",
      },
    ],
  },
  {
    key: "payment-validation-flow",
    module: "paiements",
    label: "Validation paiement",
    description: "Workflow de validation des paiements.",
    initialState: "pending",
    steps: [
      {
        key: "control",
        label: "Controle paiement",
        type: "task",
        next: "approval",
      },
      {
        key: "approval",
        label: "Validation financiere",
        type: "approval",
        next: "notification",
      },
      {
        key: "notification",
        label: "Notification comptable",
        type: "notification",
      },
    ],
  },
];
'@

Write-Utf8 "src\runtime\workflows\enterprise\store\ERPWorkflowExecutionStore.ts" @'
import type {
  ERPWorkflowExecution,
} from "../engine/ERPWorkflowTypes";

class ERPWorkflowExecutionStoreClass {
  private executions: ERPWorkflowExecution[] = [];

  add(execution: ERPWorkflowExecution) {
    this.executions.unshift(execution);
    this.executions = this.executions.slice(0, 200);
  }

  update(
    id: string,
    patch: Partial<ERPWorkflowExecution>
  ) {
    this.executions = this.executions.map((execution) =>
      execution.id === id
        ? {
            ...execution,
            ...patch,
            updatedAt: new Date().toISOString(),
          }
        : execution
    );
  }

  all() {
    return this.executions;
  }

  byModule(module: string) {
    return this.executions.filter(
      (execution) => execution.module === module
    );
  }
}

export const ERPWorkflowExecutionStore =
  new ERPWorkflowExecutionStoreClass();
'@

Write-Utf8 "src\runtime\workflows\enterprise\timeline\ERPWorkflowTimelineStore.ts" @'
export type ERPWorkflowTimelineItem = {
  id: string;
  workflowKey: string;
  module: string;
  label: string;
  state: string;
  timestamp: string;
};

class ERPWorkflowTimelineStoreClass {
  private items: ERPWorkflowTimelineItem[] = [];

  add(item: ERPWorkflowTimelineItem) {
    this.items.unshift(item);
    this.items = this.items.slice(0, 200);
  }

  all() {
    return this.items;
  }
}

export const ERPWorkflowTimelineStore =
  new ERPWorkflowTimelineStoreClass();
'@

Write-Utf8 "src\runtime\workflows\enterprise\engine\ERPWorkflowEngine.ts" @'
import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import {
  ERPTraceStore,
} from "@/runtime/observability";

import {
  ERPWorkflowRegistry,
} from "../registry/ERPWorkflowRegistry";

import {
  ERPWorkflowExecutionStore,
} from "../store/ERPWorkflowExecutionStore";

import {
  ERPWorkflowTimelineStore,
} from "../timeline/ERPWorkflowTimelineStore";

import type {
  ERPWorkflowDefinition,
  ERPWorkflowExecution,
} from "./ERPWorkflowTypes";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export const ERPWorkflowEngine = {
  definitions() {
    return ERPWorkflowRegistry;
  },

  byModule(module: string) {
    return ERPWorkflowRegistry.filter(
      (workflow) => workflow.module === module
    );
  },

  start(
    workflowKey: string,
    metadata?: Record<string, unknown>
  ): ERPWorkflowExecution | undefined {
    const definition =
      ERPWorkflowRegistry.find(
        (workflow) => workflow.key === workflowKey
      );

    if (!definition) {
      return undefined;
    }

    const firstStep =
      definition.steps[0];

    const now =
      new Date().toISOString();

    const execution: ERPWorkflowExecution = {
      id: createId("wf_exec"),
      workflowKey: definition.key,
      module: definition.module,
      state: "running",
      currentStep: firstStep?.key,
      startedAt: now,
      updatedAt: now,
      metadata,
    };

    ERPWorkflowExecutionStore.add(execution);

    ERPWorkflowTimelineStore.add({
      id: createId("wf_timeline"),
      workflowKey: definition.key,
      module: definition.module,
      label: `${definition.label} demarre`,
      state: execution.state,
      timestamp: now,
    });

    ERPTraceStore.add({
      traceId: createId("trace_workflow"),
      module: definition.module,
      action: `WORKFLOW_STARTED:${definition.key}`,
      status: "success",
      duration: 0,
      timestamp: now,
    });

    ERPEventBus.emit({
      id: createId("evt_workflow"),
      type: "WORKFLOW_STARTED",
      module: definition.module,
      timestamp: now,
      actor: "workflow-engine",
      payload: {
        workflowKey: definition.key,
        executionId: execution.id,
      },
    });

    return execution;
  },

  complete(
    executionId: string
  ) {
    const execution =
      ERPWorkflowExecutionStore.all().find(
        (item) => item.id === executionId
      );

    if (!execution) {
      return;
    }

    const now =
      new Date().toISOString();

    ERPWorkflowExecutionStore.update(executionId, {
      state: "completed",
      completedAt: now,
    });

    ERPWorkflowTimelineStore.add({
      id: createId("wf_timeline"),
      workflowKey: execution.workflowKey,
      module: execution.module,
      label: "Workflow termine",
      state: "completed",
      timestamp: now,
    });

    ERPTraceStore.add({
      traceId: createId("trace_workflow"),
      module: execution.module,
      action: `WORKFLOW_COMPLETED:${execution.workflowKey}`,
      status: "success",
      duration: 0,
      timestamp: now,
    });

    ERPEventBus.emit({
      id: createId("evt_workflow"),
      type: "WORKFLOW_COMPLETED",
      module: execution.module,
      timestamp: now,
      actor: "workflow-engine",
      payload: {
        workflowKey: execution.workflowKey,
        executionId,
      },
    });
  },
};
'@

Write-Utf8 "src\runtime\workflows\enterprise\ERPRuntimeWorkflowSeed.ts" @'
import {
  ERPWorkflowEngine,
} from "./engine/ERPWorkflowEngine";

let seeded = false;

export function seedERPRuntimeWorkflows() {
  if (seeded) {
    return;
  }

  seeded = true;

  const maintenanceExecution =
    ERPWorkflowEngine.start("maintenance-critical-flow");

  ERPWorkflowEngine.start("stock-replenishment-flow");

  ERPWorkflowEngine.start("payment-validation-flow");

  if (maintenanceExecution) {
    ERPWorkflowEngine.complete(maintenanceExecution.id);
  }
}
'@

Write-Utf8 "src\runtime\workflows\enterprise\index.ts" @'
export * from "./engine/ERPWorkflowTypes";
export * from "./engine/ERPWorkflowEngine";
export * from "./registry/ERPWorkflowRegistry";
export * from "./store/ERPWorkflowExecutionStore";
export * from "./timeline/ERPWorkflowTimelineStore";
export * from "./ERPRuntimeWorkflowSeed";
'@

Write-Utf8 "src\components\erp\workflows\ERPWorkflowMetricGrid.tsx" @'
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
'@

Write-Utf8 "src\components\erp\workflows\ERPWorkflowDefinitionsPanel.tsx" @'
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
'@

Write-Utf8 "src\components\erp\workflows\ERPWorkflowExecutionsPanel.tsx" @'
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
'@

Write-Utf8 "src\components\erp\workflows\ERPWorkflowTimelinePanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import { ERPWorkflowTimelineStore } from "@/runtime/workflows/enterprise";

export function ERPWorkflowTimelinePanel() {
  const items =
    ERPWorkflowTimelineStore.all();

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Timeline workflow
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Evenements produits par le workflow engine.
        </p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-semibold text-slate-900">
              {item.label}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {item.module} - {item.state}
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\workflows\ERPRuntimeWorkflowDashboard.tsx" @'
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
'@

Write-Utf8 "src\components\erp\workflows\index.ts" @'
export * from "./ERPWorkflowMetricGrid";
export * from "./ERPWorkflowDefinitionsPanel";
export * from "./ERPWorkflowExecutionsPanel";
export * from "./ERPWorkflowTimelinePanel";
export * from "./ERPRuntimeWorkflowDashboard";
'@

Write-Utf8 "src\app\(private)\workflows-runtime\page.tsx" @'
import { ERPRuntimeWorkflowDashboard } from "@/components/erp/workflows";

export default function Page() {
  return <ERPRuntimeWorkflowDashboard />;
}
'@

Write-Host ""
Write-Host "WORKFLOW ENGINE ENTERPRISE INSTALLE" -ForegroundColor Green
Write-Host "Executer : pnpm build" -ForegroundColor Yellow