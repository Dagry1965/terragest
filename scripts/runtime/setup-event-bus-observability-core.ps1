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
        "backup\event-bus-observability"

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
Write-Host "ERP EVENT BUS + OBSERVABILITY CORE" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\events"
Ensure-Dir "src\runtime\events\bus"
Ensure-Dir "src\runtime\events\store"

Ensure-Dir "src\runtime\observability"
Ensure-Dir "src\runtime\observability\timeline"
Ensure-Dir "src\runtime\observability\traces"
Ensure-Dir "src\runtime\observability\alerts"

Ensure-Dir "src\components\erp\observability"

Write-Utf8 "src\runtime\events\ERPDomainEvent.ts" @'
export type ERPDomainEventType =
  | "ENTITY_CREATED"
  | "ENTITY_UPDATED"
  | "ENTITY_DELETED"
  | "WORKFLOW_STARTED"
  | "WORKFLOW_COMPLETED"
  | "AUTOMATION_TRIGGERED"
  | "RULE_TRIGGERED"
  | "ALERT_TRIGGERED";

export type ERPDomainEvent = {
  id: string;

  type: ERPDomainEventType;

  module: string;

  entityId?: string;

  timestamp: string;

  actor?: string;

  payload?: Record<string, unknown>;
};
'@

Write-Utf8 "src\runtime\events\bus\ERPEventBus.ts" @'
import type {
  ERPDomainEvent,
} from "../ERPDomainEvent";

type ERPEventHandler = (
  event: ERPDomainEvent
) => void;

class ERPEventBusClass {

  private handlers:
    ERPEventHandler[] = [];

  private events:
    ERPDomainEvent[] = [];

  emit(
    event: ERPDomainEvent
  ) {

    this.events.unshift(event);

    this.events =
      this.events.slice(0, 200);

    for (
      const handler
      of this.handlers
    ) {

      handler(event);
    }
  }

  subscribe(
    handler: ERPEventHandler
  ) {

    this.handlers.push(handler);

    return () => {

      this.handlers =
        this.handlers.filter(
          (item) =>
            item !== handler
        );
    };
  }

  getEvents() {

    return this.events;
  }
}

export const ERPEventBus =
  new ERPEventBusClass();
'@

Write-Utf8 "src\runtime\observability\traces\ERPTrace.ts" @'
export type ERPTrace = {
  traceId: string;

  module: string;

  action: string;

  status:
    | "success"
    | "warning"
    | "error";

  duration: number;

  timestamp: string;

  metadata?: Record<string, unknown>;
};
'@

Write-Utf8 "src\runtime\observability\traces\ERPTraceStore.ts" @'
import type {
  ERPTrace,
} from "./ERPTrace";

class ERPTraceStoreClass {

  private traces:
    ERPTrace[] = [];

  add(
    trace: ERPTrace
  ) {

    this.traces.unshift(trace);

    this.traces =
      this.traces.slice(0, 200);
  }

  all() {

    return this.traces;
  }
}

export const ERPTraceStore =
  new ERPTraceStoreClass();
'@

Write-Utf8 "src\runtime\observability\alerts\ERPAlert.ts" @'
export type ERPAlertLevel =
  | "info"
  | "warning"
  | "critical";

export type ERPAlert = {

  id: string;

  module: string;

  title: string;

  description?: string;

  level: ERPAlertLevel;

  timestamp: string;
};
'@

Write-Utf8 "src\runtime\observability\alerts\ERPAlertStore.ts" @'
import type {
  ERPAlert,
} from "./ERPAlert";

class ERPAlertStoreClass {

  private alerts:
    ERPAlert[] = [];

  add(
    alert: ERPAlert
  ) {

    this.alerts.unshift(alert);

    this.alerts =
      this.alerts.slice(0, 100);
  }

  all() {

    return this.alerts;
  }
}

export const ERPAlertStore =
  new ERPAlertStoreClass();
'@

Write-Utf8 "src\runtime\observability\timeline\ERPObservabilityTimeline.ts" @'
import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import {
  ERPTraceStore,
} from "../traces/ERPTraceStore";

import {
  ERPAlertStore,
} from "../alerts/ERPAlertStore";

export const ERPObservabilityTimeline = {

  events() {

    return ERPEventBus.getEvents();
  },

  traces() {

    return ERPTraceStore.all();
  },

  alerts() {

    return ERPAlertStore.all();
  },
};
'@

Write-Utf8 "src\runtime\observability\ERPRuntimeSeed.ts" @'
import {
  ERPEventBus,
} from "@/runtime/events/bus/ERPEventBus";

import {
  ERPTraceStore,
} from "./traces/ERPTraceStore";

import {
  ERPAlertStore,
} from "./alerts/ERPAlertStore";

let seeded = false;

export function seedERPRuntimeObservability() {

  if (seeded) {
    return;
  }

  seeded = true;

  ERPEventBus.emit({
    id: "evt_1",
    type: "ENTITY_CREATED",
    module: "materiels",
    entityId: "MAT-001",
    timestamp: new Date().toISOString(),
    actor: "runtime",
  });

  ERPEventBus.emit({
    id: "evt_2",
    type: "WORKFLOW_STARTED",
    module: "maintenance",
    timestamp: new Date().toISOString(),
    actor: "workflow-engine",
  });

  ERPTraceStore.add({
    traceId: "trace_1",
    module: "paiements",
    action: "PAYMENT_VALIDATION",
    status: "success",
    duration: 182,
    timestamp: new Date().toISOString(),
  });

  ERPTraceStore.add({
    traceId: "trace_2",
    module: "stocks",
    action: "LOW_STOCK_ANALYSIS",
    status: "warning",
    duration: 391,
    timestamp: new Date().toISOString(),
  });

  ERPAlertStore.add({
    id: "alert_1",
    module: "maintenance",
    title: "Maintenance critique",
    description: "Intervention prioritaire detectee.",
    level: "critical",
    timestamp: new Date().toISOString(),
  });

  ERPAlertStore.add({
    id: "alert_2",
    module: "stocks",
    title: "Stock faible",
    description: "Seuil minimum atteint.",
    level: "warning",
    timestamp: new Date().toISOString(),
  });
}
'@

Write-Utf8 "src\runtime\observability\index.ts" @'
export * from "./timeline/ERPObservabilityTimeline";

export * from "./traces/ERPTrace";

export * from "./traces/ERPTraceStore";

export * from "./alerts/ERPAlert";

export * from "./alerts/ERPAlertStore";

export * from "./ERPRuntimeSeed";
'@

Write-Utf8 "src\components\erp\observability\ERPEventsTimeline.tsx" @'
import {
  ERPObservabilityTimeline,
} from "@/runtime/observability";

export function ERPEventsTimeline() {

  const events =
    ERPObservabilityTimeline.events();

  return (
    <div className="space-y-4">

      {events.map((event) => (

        <div
          key={event.id}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-900">
                {event.type}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Module : {event.module}
              </p>

            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
              {event.actor ?? "system"}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\observability\ERPTracesPanel.tsx" @'
import {
  ERPObservabilityTimeline,
} from "@/runtime/observability";

export function ERPTracesPanel() {

  const traces =
    ERPObservabilityTimeline.traces();

  return (
    <div className="space-y-4">

      {traces.map((trace) => (

        <div
          key={trace.traceId}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-900">
                {trace.action}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {trace.module}
              </p>

            </div>

            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-medium",

                trace.status === "success"
                  ? "bg-emerald-50 text-emerald-700"
                  : trace.status === "warning"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700",

              ].join(" ")}
            >
              {trace.status}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\observability\ERPAlertsPanel.tsx" @'
import {
  ERPObservabilityTimeline,
} from "@/runtime/observability";

export function ERPAlertsPanel() {

  const alerts =
    ERPObservabilityTimeline.alerts();

  return (
    <div className="space-y-4">

      {alerts.map((alert) => (

        <div
          key={alert.id}
          className="rounded-2xl border border-slate-200 bg-white p-5"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-semibold text-slate-900">
                {alert.title}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {alert.description}
              </p>

            </div>

            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-medium",

                alert.level === "critical"
                  ? "bg-red-50 text-red-700"
                  : alert.level === "warning"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-100 text-slate-700",

              ].join(" ")}
            >
              {alert.level}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\observability\ERPRuntimeObservabilityDashboard.tsx" @'
import {
  ERPPageHeader,
  ERPSection,
} from "@/components/erp/ui";

import {
  seedERPRuntimeObservability,
} from "@/runtime/observability";

import {
  ERPEventsTimeline,
} from "./ERPEventsTimeline";

import {
  ERPTracesPanel,
} from "./ERPTracesPanel";

import {
  ERPAlertsPanel,
} from "./ERPAlertsPanel";

seedERPRuntimeObservability();

export function ERPRuntimeObservabilityDashboard() {

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Observability"
        title="Runtime Timeline"
        description="Timeline centralisee des events, traces et alertes runtime."
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <ERPSection>

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-950">
              Events
            </h2>

          </div>

          <ERPEventsTimeline />

        </ERPSection>

        <ERPSection>

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-950">
              Traces
            </h2>

          </div>

          <ERPTracesPanel />

        </ERPSection>

        <ERPSection>

          <div className="mb-5">

            <h2 className="text-lg font-semibold text-slate-950">
              Alerts
            </h2>

          </div>

          <ERPAlertsPanel />

        </ERPSection>

      </div>

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\observability\index.ts" @'
export * from "./ERPEventsTimeline";

export * from "./ERPTracesPanel";

export * from "./ERPAlertsPanel";

export * from "./ERPRuntimeObservabilityDashboard";
'@

Write-Utf8 "src\app\(private)\observability\page.tsx" @'
import {
  ERPRuntimeObservabilityDashboard,
} from "@/components/erp/observability";

export default function Page() {

  return (
    <ERPRuntimeObservabilityDashboard />
  );
}
'@

Write-Host ""
Write-Host "EVENT BUS + OBSERVABILITY CORE INSTALLE" -ForegroundColor Green
Write-Host ""
Write-Host "Executer : pnpm build" -ForegroundColor Yellow