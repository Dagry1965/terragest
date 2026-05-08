$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {

  if (!(Test-Path -LiteralPath $Path)) {

    New-Item `
      -ItemType Directory `
      -Path $Path `
      -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {

  $FullPath =
    Join-Path $ProjectRoot $Path

  $Dir =
    Split-Path $FullPath -Parent

  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {

    $BackupDir =
      Join-Path `
        $ProjectRoot `
        "backup\automation-engine"

    Ensure-Dir $BackupDir

    $SafeName = $Path
    $SafeName = $SafeName.Replace("\", "__")
    $SafeName = $SafeName.Replace("/", "__")
    $SafeName = $SafeName.Replace(":", "")

    Copy-Item `
      -LiteralPath $FullPath `
      -Destination (
        Join-Path `
          $BackupDir `
          "$SafeName.bak"
      ) `
      -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host `
    "WRITTEN: $Path" `
    -ForegroundColor Green
}

Write-Host ""
Write-Host "AUTOMATION ENGINE + RUNTIME HOOKS" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\automation"
Ensure-Dir "src\runtime\automation\engine"
Ensure-Dir "src\runtime\automation\hooks"
Ensure-Dir "src\runtime\automation\notifications"
Ensure-Dir "src\runtime\automation\timeline"

Ensure-Dir "src\components\erp\automation"

Write-Utf8 "src\runtime\automation\engine\ERPAutomationRule.ts" @'
import type {
  ERPDomainEventType,
} from "@/runtime/events/ERPDomainEvent";

export type ERPAutomationActionType =
  | "NOTIFY"
  | "ALERT"
  | "WORKFLOW"
  | "AUDIT"
  | "WEBHOOK";

export type ERPAutomationRule = {

  id: string;

  module: string;

  trigger: ERPDomainEventType;

  action: ERPAutomationActionType;

  description?: string;
};
'@

Write-Utf8 "src\runtime\automation\engine\ERPAutomationRegistry.ts" @'
import type {
  ERPAutomationRule,
} from "./ERPAutomationRule";

export const ERPAutomationRegistry:
  ERPAutomationRule[] = [

    {
      id: "auto_1",
      module: "stocks",
      trigger: "ENTITY_UPDATED",
      action: "ALERT",
      description: "Declenchement alerte stock.",
    },

    {
      id: "auto_2",
      module: "maintenance",
      trigger: "WORKFLOW_STARTED",
      action: "NOTIFY",
      description: "Notification workflow maintenance.",
    },

    {
      id: "auto_3",
      module: "paiements",
      trigger: "ENTITY_CREATED",
      action: "AUDIT",
      description: "Audit creation paiement.",
    },

    {
      id: "auto_4",
      module: "interventions",
      trigger: "WORKFLOW_COMPLETED",
      action: "WEBHOOK",
      description: "Webhook intervention.",
    },
];
'@

Write-Utf8 "src\runtime\automation\timeline\ERPAutomationExecution.ts" @'
export type ERPAutomationExecution = {

  id: string;

  module: string;

  trigger: string;

  action: string;

  status:
    | "success"
    | "warning"
    | "error";

  timestamp: string;

  description?: string;
};
'@

Write-Utf8 "src\runtime\automation\timeline\ERPAutomationTimelineStore.ts" @'
import type {
  ERPAutomationExecution,
} from "./ERPAutomationExecution";

class ERPAutomationTimelineStoreClass {

  private executions:
    ERPAutomationExecution[] = [];

  add(
    execution: ERPAutomationExecution
  ) {

    this.executions.unshift(
      execution
    );

    this.executions =
      this.executions.slice(0, 200);
  }

  all() {

    return this.executions;
  }
}

export const ERPAutomationTimelineStore =
  new ERPAutomationTimelineStoreClass();
'@

Write-Utf8 "src\runtime\automation\notifications\ERPNotificationCenter.ts" @'
export type ERPNotification = {

  id: string;

  title: string;

  message: string;

  timestamp: string;
};

class ERPNotificationCenterClass {

  private notifications:
    ERPNotification[] = [];

  push(
    notification: ERPNotification
  ) {

    this.notifications.unshift(
      notification
    );

    this.notifications =
      this.notifications.slice(0, 100);
  }

  all() {

    return this.notifications;
  }
}

export const ERPNotificationCenter =
  new ERPNotificationCenterClass();
'@

Write-Utf8 "src\runtime\automation\hooks\ERPRuntimeHooks.ts" @'
import type {
  ERPDomainEvent,
} from "@/runtime/events/ERPDomainEvent";

type ERPRuntimeHook =
  (event: ERPDomainEvent) => void;

class ERPRuntimeHooksClass {

  private hooks:
    ERPRuntimeHook[] = [];

  register(
    hook: ERPRuntimeHook
  ) {

    this.hooks.push(hook);
  }

  trigger(
    event: ERPDomainEvent
  ) {

    for (
      const hook
      of this.hooks
    ) {

      hook(event);
    }
  }
}

export const ERPRuntimeHooks =
  new ERPRuntimeHooksClass();
'@

Write-Utf8 "src\runtime\automation\engine\ERPAutomationEngine.ts" @'
import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import type {
  ERPDomainEvent,
} from "@/runtime/events/ERPDomainEvent";

import {
  ERPAutomationRegistry,
} from "./ERPAutomationRegistry";

import {
  ERPAutomationTimelineStore,
} from "../timeline/ERPAutomationTimelineStore";

import {
  ERPNotificationCenter,
} from "../notifications/ERPNotificationCenter";

import {
  ERPAlertStore,
} from "@/runtime/observability";

import {
  ERPRuntimeHooks,
} from "../hooks/ERPRuntimeHooks";

let initialized = false;

function processEvent(
  event: ERPDomainEvent
) {

  const matchingRules =
    ERPAutomationRegistry.filter(
      (rule) =>
        rule.module === event.module &&
        rule.trigger === event.type
    );

  for (
    const rule
    of matchingRules
  ) {

    ERPAutomationTimelineStore.add({

      id:
        `${rule.id}_${Date.now()}`,

      module:
        event.module,

      trigger:
        event.type,

      action:
        rule.action,

      status:
        "success",

      timestamp:
        new Date().toISOString(),

      description:
        rule.description,
    });

    if (
      rule.action === "NOTIFY"
    ) {

      ERPNotificationCenter.push({

        id:
          `notif_${Date.now()}`,

        title:
          "Automation notification",

        message:
          `${event.module} -> ${event.type}`,

        timestamp:
          new Date().toISOString(),
      });
    }

    if (
      rule.action === "ALERT"
    ) {

      ERPAlertStore.add({

        id:
          `alert_${Date.now()}`,

        module:
          event.module,

        title:
          "Automation alert",

        description:
          `${event.type} detected`,

        level:
          "warning",

        timestamp:
          new Date().toISOString(),
      });
    }
  }

  ERPRuntimeHooks.trigger(
    event
  );
}

export function initializeERPAutomationEngine() {

  if (initialized) {
    return;
  }

  initialized = true;

  ERPEventBus.subscribe(
    processEvent
  );
}
'@

Write-Utf8 "src\runtime\automation\ERPRuntimeAutomationSeed.ts" @'
import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import {
  initializeERPAutomationEngine,
} from "./engine/ERPAutomationEngine";

let seeded = false;

export function seedERPRuntimeAutomation() {

  if (seeded) {
    return;
  }

  seeded = true;

  initializeERPAutomationEngine();

  ERPEventBus.emit({
    id: "auto_evt_1",
    type: "ENTITY_UPDATED",
    module: "stocks",
    timestamp: new Date().toISOString(),
    actor: "automation-runtime",
  });

  ERPEventBus.emit({
    id: "auto_evt_2",
    type: "WORKFLOW_STARTED",
    module: "maintenance",
    timestamp: new Date().toISOString(),
    actor: "workflow-engine",
  });

  ERPEventBus.emit({
    id: "auto_evt_3",
    type: "ENTITY_CREATED",
    module: "paiements",
    timestamp: new Date().toISOString(),
    actor: "payments-runtime",
  });
}
'@

Write-Utf8 "src\runtime\automation\index.ts" @'
export * from "./engine/ERPAutomationRule";

export * from "./engine/ERPAutomationRegistry";

export * from "./engine/ERPAutomationEngine";

export * from "./timeline/ERPAutomationExecution";

export * from "./timeline/ERPAutomationTimelineStore";

export * from "./notifications/ERPNotificationCenter";

export * from "./hooks/ERPRuntimeHooks";

export * from "./ERPRuntimeAutomationSeed";
'@

Write-Utf8 "src\components\erp\automation\ERPAutomationTimelinePanel.tsx" @'
import {
  ERPAutomationTimelineStore,
} from "@/runtime/automation";

export function ERPAutomationTimelinePanel() {

  const executions =
    ERPAutomationTimelineStore.all();

  return (
    <div className="space-y-4">

      {executions.map((execution) => (

        <div
          key={execution.id}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-900">
                {execution.action}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {execution.module}
              </p>

            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              {execution.status}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\automation\ERPNotificationsPanel.tsx" @'
import {
  ERPNotificationCenter,
} from "@/runtime/automation";

export function ERPNotificationsPanel() {

  const notifications =
    ERPNotificationCenter.all();

  return (
    <div className="space-y-4">

      {notifications.map((notification) => (

        <div
          key={notification.id}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <p className="text-sm font-semibold text-slate-900">
            {notification.title}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {notification.message}
          </p>

        </div>

      ))}

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\automation\ERPRuntimeAutomationDashboard.tsx" @'
import {
  ERPPageHeader,
  ERPSection,
} from "@/components/erp/ui";

import {
  seedERPRuntimeAutomation,
} from "@/runtime/automation";

import {
  ERPAutomationTimelinePanel,
} from "./ERPAutomationTimelinePanel";

import {
  ERPNotificationsPanel,
} from "./ERPNotificationsPanel";

seedERPRuntimeAutomation();

export function ERPRuntimeAutomationDashboard() {

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Automation"
        title="Automation Runtime Engine"
        description="Execution des automations, hooks runtime et notifications ERP."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ERPSection>

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-950">
              Automation timeline
            </h2>

          </div>

          <ERPAutomationTimelinePanel />

        </ERPSection>

        <ERPSection>

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-950">
              Notifications
            </h2>

          </div>

          <ERPNotificationsPanel />

        </ERPSection>

      </div>

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\automation\index.ts" @'
export * from "./ERPAutomationTimelinePanel";

export * from "./ERPNotificationsPanel";

export * from "./ERPRuntimeAutomationDashboard";
'@

Write-Utf8 "src\app\(private)\automation\page.tsx" @'
import {
  ERPRuntimeAutomationDashboard,
} from "@/components/erp/automation";

export default function Page() {

  return (
    <ERPRuntimeAutomationDashboard />
  );
}
'@

Write-Host ""
Write-Host "AUTOMATION ENGINE + RUNTIME HOOKS INSTALLE" -ForegroundColor Green
Write-Host ""
Write-Host "Executer : pnpm build" -ForegroundColor Yellow