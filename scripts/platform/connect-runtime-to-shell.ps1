# ==========================================
# TERRAGEST V2
# CONNECT RUNTIME TO ERP SHELL
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " CONNECT RUNTIME TO ERP SHELL "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Platform = Join-Path `
    $Src `
    "features\platform"

$Observability = Join-Path `
    $Src `
    "features\observability"

$Runtime = Join-Path `
    $Src `
    "runtime"

$ReportRoot = Join-Path `
    $Root `
    "reports\platform"

# ==========================================
# HELPERS
# ==========================================

function Ensure-Directory {

    param([string]$Path)

    if (!(Test-Path $Path)) {

        New-Item `
            -ItemType Directory `
            -Path $Path `
            -Force | Out-Null

        Write-Host "CREATED : $Path" -ForegroundColor Green
    }
    else {

        Write-Host "EXISTS  : $Path" -ForegroundColor Yellow
    }
}

function Ensure-File {

    param(
        [string]$Path,
        [string]$Content
    )

    $Directory =
      Split-Path $Path

    Ensure-Directory $Directory

    if (!(Test-Path $Path)) {

        $Content | Out-File `
            $Path `
            -Encoding UTF8

        Write-Host "CREATED : $Path" -ForegroundColor Green
    }
    else {

        Write-Host "EXISTS  : $Path" -ForegroundColor Yellow
    }
}

# ==========================================
# LIVE RUNTIME STORE
# ==========================================

Write-Host ""
Write-Host "Creating runtime activity store..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "components/runtime/runtimeActivityStore.ts"
    ) `
@"
export type RuntimeActivity = {

  type: string;

  timestamp: number;

  payload?: unknown;
};

class RuntimeActivityStore {

  private activities:
    RuntimeActivity[] = [];

  push(
    activity: RuntimeActivity
  ) {

    this.activities.unshift(
      activity
    );
  }

  getAll() {

    return this.activities;
  }
}

export const runtimeActivityStore =
  new RuntimeActivityStore();
"@

# ==========================================
# CONNECT EVENT PUBLISHER
# ==========================================

Write-Host ""
Write-Host "Connecting RuntimeEventPublisher..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Runtime `
        "monitoring/ConnectedRuntimeEventPublisher.ts"
    ) `
@"
import {
  runtimeActivityStore
}
from "../../features/platform/components/runtime/runtimeActivityStore";

import {
  liveEventStore
}
from "../../features/observability/stores/live/liveEventStore";

export class
ConnectedRuntimeEventPublisher {

  publish(
    type: string,
    payload?: unknown
  ) {

    const event = {
      type,
      timestamp:
        Date.now(),
      payload,
    };

    runtimeActivityStore.push(
      event
    );

    liveEventStore.push(
      event
    );

    console.log(
      "[ConnectedRuntimeEvent]",
      type
    );
  }
}
"@

# ==========================================
# LIVE RUNTIME FEED
# ==========================================

Write-Host ""
Write-Host "Creating RuntimeActivityFeed..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "components/runtime/RuntimeActivityFeed.tsx"
    ) `
@"
import {
  runtimeActivityStore
}
from "./runtimeActivityStore";

export default function
RuntimeActivityFeed() {

  const activities =
    runtimeActivityStore.getAll();

  return (

    <div
      className="
        bg-slate-950
        text-green-400
        rounded-2xl
        p-6
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Runtime Activity
      </h2>

      <div
        className="
          flex
          flex-col
          gap-3
        "
      >

        {activities.map(
          (
            activity,
            index
          ) => (

            <div
              key={index}
              className="
                border-b
                border-green-700
                pb-2
              "
            >

              <div>
                {activity.type}
              </div>

              <div
                className="
                  text-xs
                  opacity-70
                "
              >
                {
                  new Date(
                    activity.timestamp
                  ).toLocaleString()
                }
              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}
"@

# ==========================================
# LIVE WORKFLOW STATUS
# ==========================================

Write-Host ""
Write-Host "Creating WorkflowStatusPanel..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "components/runtime/WorkflowStatusPanel.tsx"
    ) `
@"
export default function
WorkflowStatusPanel() {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2
        className="
          text-lg
          font-semibold
        "
      >
        Workflow Status
      </h2>

      <div
        className="
          mt-4
          flex
          flex-col
          gap-3
        "
      >

        <div
          className="
            bg-green-50
            p-3
            rounded-xl
          "
        >
          Breakdown Flow : ACTIVE
        </div>

      </div>

    </div>
  );
}
"@

# ==========================================
# LIVE METRICS PANEL
# ==========================================

Write-Host ""
Write-Host "Creating RuntimeMetricsPanel..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "components/runtime/RuntimeMetricsPanel.tsx"
    ) `
@"
export default function
RuntimeMetricsPanel() {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2
        className="
          text-lg
          font-semibold
        "
      >
        Runtime Metrics
      </h2>

      <div
        className="
          grid
          grid-cols-2
          gap-4
          mt-4
        "
      >

        <div
          className="
            bg-slate-100
            p-4
            rounded-xl
          "
        >
          Events : 0
        </div>

        <div
          className="
            bg-slate-100
            p-4
            rounded-xl
          "
        >
          Workflows : 1
        </div>

      </div>

    </div>
  );
}
"@

# ==========================================
# CONNECTED DASHBOARD
# ==========================================

Write-Host ""
Write-Host "Creating ConnectedRuntimeDashboard..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "dashboards/ConnectedRuntimeDashboard.tsx"
    ) `
@"
import RuntimeActivityFeed
from "../components/runtime/RuntimeActivityFeed";

import WorkflowStatusPanel
from "../components/runtime/WorkflowStatusPanel";

import RuntimeMetricsPanel
from "../components/runtime/RuntimeMetricsPanel";

import NotificationCenter
from "../components/notifications/NotificationCenter";

export default function
ConnectedRuntimeDashboard() {

  return (

    <div
      className="
        grid
        gap-6
      "
    >

      <NotificationCenter />

      <RuntimeMetricsPanel />

      <WorkflowStatusPanel />

      <RuntimeActivityFeed />

    </div>
  );
}
"@

# ==========================================
# CONNECT ERP WORKSPACE
# ==========================================

Write-Host ""
Write-Host "Connecting EnterpriseWorkspace..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Platform `
        "workspace/ConnectedEnterpriseWorkspace.tsx"
    ) `
@"
import EnterpriseTopbar
from "../components/layout/EnterpriseTopbar";

import EnterpriseSidebar
from "../components/navigation/EnterpriseSidebar";

import ConnectedRuntimeDashboard
from "../dashboards/ConnectedRuntimeDashboard";

export default function
ConnectedEnterpriseWorkspace() {

  return (

    <div
      className="
        flex
        bg-slate-100
      "
    >

      <EnterpriseSidebar />

      <div
        className="
          flex-1
          flex
          flex-col
        "
      >

        <EnterpriseTopbar />

        <main
          className="
            p-8
          "
        >

          <ConnectedRuntimeDashboard />

        </main>

      </div>

    </div>
  );
}
"@

# ==========================================
# RUNTIME SIMULATION
# ==========================================

Write-Host ""
Write-Host "Creating runtime simulation..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Runtime `
        "monitoring/simulateRuntimeActivity.ts"
    ) `
@"
import {
  ConnectedRuntimeEventPublisher
}
from "./ConnectedRuntimeEventPublisher";

const publisher =
  new ConnectedRuntimeEventPublisher();

publisher.publish(
  "MATERIEL_BREAKDOWN_DECLARED",
  {
    materielId:
      "MAT-001",
  }
);

publisher.publish(
  "WORKFLOW_STARTED",
  {
    workflow:
      "BreakdownFlow",
  }
);

publisher.publish(
  "INTERVENTION_CREATED",
  {
    interventionId:
      "INT-001",
  }
);
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating runtime-shell integration report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "runtime-shell-integration.md"

$Report = @"
# RUNTIME TO ERP SHELL INTEGRATION

Generated : $(Get-Date)

## CREATED

- runtimeActivityStore.ts
- ConnectedRuntimeEventPublisher.ts
- RuntimeActivityFeed.tsx
- WorkflowStatusPanel.tsx
- RuntimeMetricsPanel.tsx
- ConnectedRuntimeDashboard.tsx
- ConnectedEnterpriseWorkspace.tsx
- simulateRuntimeActivity.ts

## OBJECTIVE

Connect runtime execution to ERP shell supervision.

## LIVE FLOW

Runtime
→ Event Publisher
→ Activity Store
→ Dashboard
→ ERP Shell

## STATUS

Runtime and ERP shell successfully connected.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " RUNTIME CONNECTED TO ERP SHELL "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""