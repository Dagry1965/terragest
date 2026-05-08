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

Write-Host "=== CROSS MODULE EVENT RUNTIME ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\event-runtime" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\event-runtime" | Out-Null

WriteFile "src\runtime\event-runtime\ERPEventRuntimeTypes.ts" @'
export type ERPEventRuntimeLevel =
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface ERPEventRuntimeEvent {
  id: string;
  name: string;
  sourceModule: string;
  targetModules: string[];
  level: ERPEventRuntimeLevel;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface ERPEventRuntimeSubscription {
  id: string;
  moduleKey: string;
  eventName: string;
  handlerLabel: string;
}
'@

WriteFile "src\runtime\event-runtime\ERPEventRuntimeStore.ts" @'
import type {
  ERPEventRuntimeEvent,
} from "./ERPEventRuntimeTypes";

const events: ERPEventRuntimeEvent[] = [];

export class ERPEventRuntimeStore {
  static push(event: ERPEventRuntimeEvent) {
    events.unshift(event);
    return event;
  }

  static all() {
    return events;
  }

  static forModule(moduleKey: string) {
    return events.filter(
      (event) =>
        event.sourceModule === moduleKey ||
        event.targetModules.includes(moduleKey)
    );
  }

  static clear() {
    events.length = 0;
  }
}
'@

WriteFile "src\runtime\event-runtime\ERPEventRuntimeSubscriptions.ts" @'
import type {
  ERPEventRuntimeSubscription,
} from "./ERPEventRuntimeTypes";

export const erpEventRuntimeSubscriptions: ERPEventRuntimeSubscription[] = [
  {
    id: "materiel-breakdown-to-maintenance",
    moduleKey: "materiels",
    eventName: "materiel.breakdown.detected",
    handlerLabel: "Declencher maintenance",
  },
  {
    id: "materiel-breakdown-to-stocks",
    moduleKey: "stocks",
    eventName: "materiel.breakdown.detected",
    handlerLabel: "Verifier pieces disponibles",
  },
  {
    id: "stock-critical-to-purchase",
    moduleKey: "stocks",
    eventName: "stock.critical.detected",
    handlerLabel: "Preparer reapprovisionnement",
  },
  {
    id: "workflow-completed-to-audit",
    moduleKey: "exploitations",
    eventName: "workflow.completed",
    handlerLabel: "Tracer audit exploitation",
  },
];
'@

WriteFile "src\runtime\event-runtime\ERPEventRuntimeSubscriptionRegistry.ts" @'
import { erpEventRuntimeSubscriptions } from "./ERPEventRuntimeSubscriptions";

export class ERPEventRuntimeSubscriptionRegistry {
  static all() {
    return erpEventRuntimeSubscriptions;
  }

  static forEvent(eventName: string) {
    return erpEventRuntimeSubscriptions.filter(
      (subscription) => subscription.eventName === eventName
    );
  }

  static forModule(moduleKey: string) {
    return erpEventRuntimeSubscriptions.filter(
      (subscription) => subscription.moduleKey === moduleKey
    );
  }
}
'@

WriteFile "src\runtime\event-runtime\ERPEventRuntimeBus.ts" @'
import type {
  ERPEventRuntimeEvent,
  ERPEventRuntimeLevel,
} from "./ERPEventRuntimeTypes";
import { ERPEventRuntimeStore } from "./ERPEventRuntimeStore";
import { ERPEventRuntimeSubscriptionRegistry } from "./ERPEventRuntimeSubscriptionRegistry";

interface EmitOptions {
  name: string;
  sourceModule: string;
  payload?: Record<string, unknown>;
  level?: ERPEventRuntimeLevel;
}

export class ERPEventRuntimeBus {
  static emit({
    name,
    sourceModule,
    payload = {},
    level = "info",
  }: EmitOptions): ERPEventRuntimeEvent {
    const subscriptions =
      ERPEventRuntimeSubscriptionRegistry.forEvent(name);

    const event: ERPEventRuntimeEvent = {
      id: `${name}-${Date.now()}`,
      name,
      sourceModule,
      targetModules: subscriptions.map(
        (subscription) => subscription.moduleKey
      ),
      payload,
      level,
      createdAt: new Date().toISOString(),
    };

    ERPEventRuntimeStore.push(event);

    console.log("ERP EVENT EMITTED", event);

    return event;
  }

  static replay(moduleKey?: string) {
    if (moduleKey) {
      return ERPEventRuntimeStore.forModule(moduleKey);
    }

    return ERPEventRuntimeStore.all();
  }
}
'@

WriteFile "src\runtime\event-runtime\ERPEventRuntimeOrchestrator.ts" @'
import { ERPEventRuntimeBus } from "./ERPEventRuntimeBus";

export class ERPEventRuntimeOrchestrator {
  static simulateMaterielBreakdown() {
    return ERPEventRuntimeBus.emit({
      name: "materiel.breakdown.detected",
      sourceModule: "materiels",
      level: "danger",
      payload: {
        materielId: "MAT-204",
        severity: "critical",
      },
    });
  }

  static simulateStockCritical() {
    return ERPEventRuntimeBus.emit({
      name: "stock.critical.detected",
      sourceModule: "stocks",
      level: "warning",
      payload: {
        produitId: "PROD-011",
        quantite: 4,
      },
    });
  }

  static simulateWorkflowCompleted() {
    return ERPEventRuntimeBus.emit({
      name: "workflow.completed",
      sourceModule: "exploitations",
      level: "success",
      payload: {
        workflowId: "WF-001",
      },
    });
  }
}
'@

WriteFile "src\runtime\event-runtime\index.ts" @'
export type {
  ERPEventRuntimeEvent,
  ERPEventRuntimeLevel,
  ERPEventRuntimeSubscription,
} from "./ERPEventRuntimeTypes";

export { ERPEventRuntimeStore } from "./ERPEventRuntimeStore";
export { erpEventRuntimeSubscriptions } from "./ERPEventRuntimeSubscriptions";
export { ERPEventRuntimeSubscriptionRegistry } from "./ERPEventRuntimeSubscriptionRegistry";
export { ERPEventRuntimeBus } from "./ERPEventRuntimeBus";
export { ERPEventRuntimeOrchestrator } from "./ERPEventRuntimeOrchestrator";
'@

WriteFile "src\components\erp\event-runtime\ERPEventRuntimePanel.tsx" @'
"use client";

import { useState } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import {
  ERPEventRuntimeBus,
  ERPEventRuntimeOrchestrator,
  ERPEventRuntimeSubscriptionRegistry,
  type ERPEventRuntimeEvent,
} from "@/runtime/event-runtime";

interface ERPEventRuntimePanelProps {
  module: ERPModule;
}

export function ERPEventRuntimePanel({
  module,
}: ERPEventRuntimePanelProps) {
  const [events, setEvents] =
    useState<ERPEventRuntimeEvent[]>(
      ERPEventRuntimeBus.replay(module.metadata.key)
    );

  const subscriptions =
    ERPEventRuntimeSubscriptionRegistry.forModule(
      module.metadata.key
    );

  function refresh() {
    setEvents([
      ...ERPEventRuntimeBus.replay(module.metadata.key),
    ]);
  }

  function simulateBreakdown() {
    ERPEventRuntimeOrchestrator.simulateMaterielBreakdown();
    refresh();
  }

  function simulateStock() {
    ERPEventRuntimeOrchestrator.simulateStockCritical();
    refresh();
  }

  function simulateWorkflow() {
    ERPEventRuntimeOrchestrator.simulateWorkflowCompleted();
    refresh();
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Event runtime cross-modules
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Propagation et orchestration entre modules ERP.
          </p>
        </div>

        <ERPBadge tone="info">
          {subscriptions.length} subscriptions
        </ERPBadge>
      </div>

      <div className="mb-5 flex flex-wrap gap-3">
        <ERPButton type="button" onClick={simulateBreakdown}>
          Simuler panne materiel
        </ERPButton>

        <ERPButton variant="secondary" type="button" onClick={simulateStock}>
          Simuler stock critique
        </ERPButton>

        <ERPButton variant="ghost" type="button" onClick={simulateWorkflow}>
          Simuler workflow termine
        </ERPButton>
      </div>

      <div className="mb-5 rounded-2xl bg-slate-50 p-4">
        <h3 className="text-sm font-black text-slate-900">
          Subscriptions module
        </h3>

        <div className="mt-3 space-y-2">
          {subscriptions.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aucune subscription declaree pour ce module.
            </p>
          ) : (
            subscriptions.map((subscription) => (
              <div
                key={subscription.id}
                className="rounded-xl bg-white p-3 text-sm text-slate-600"
              >
                {subscription.eventName} - {subscription.handlerLabel}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4">
        <h3 className="text-sm font-black text-slate-900">
          Evenements recus
        </h3>

        <div className="mt-3 space-y-2">
          {events.length === 0 ? (
            <p className="text-sm text-slate-500">
              Aucun evenement runtime.
            </p>
          ) : (
            events.slice(0, 8).map((event) => (
              <div
                key={event.id}
                className="rounded-xl bg-white p-3 text-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">
                      {event.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {event.sourceModule} vers {event.targetModules.join(", ")}
                    </p>
                  </div>

                  <ERPBadge tone={event.level}>
                    {event.level}
                  </ERPBadge>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\event-runtime\index.ts" @'
export { ERPEventRuntimePanel } from "./ERPEventRuntimePanel";
'@

WriteFile "src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx" @'
import { ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPWorkflowRuntimePanel } from "@/components/erp/workflow-runtime";
import { ERPAutomationRuntimePanel } from "@/components/erp/automation-runtime";
import { ERPEventRuntimePanel } from "@/components/erp/event-runtime";

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

      <ERPEventRuntimePanel module={module} />
    </div>
  );
}
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== CROSS MODULE EVENT RUNTIME TERMINE ===" -ForegroundColor Green