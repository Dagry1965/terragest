# ==========================================
# TERRAGEST V2
# LIVE OBSERVABILITY PLATFORM
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " LIVE OBSERVABILITY SETUP "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Observability = Join-Path `
    $Src `
    "features\observability"

$Runtime = Join-Path `
    $Src `
    "runtime"

$ReportRoot = Join-Path `
    $Root `
    "reports\observability"

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
# STRUCTURE
# ==========================================

Write-Host ""
Write-Host "Preparing live observability..." -ForegroundColor Cyan
Write-Host ""

Ensure-Directory $ReportRoot

$Folders = @(
    "components/live",
    "services/live",
    "stores/live",
    "widgets/live"
)

foreach ($Folder in $Folders) {

    Ensure-Directory `
        (Join-Path `
            $Observability `
            $Folder
        )
}

# ==========================================
# LIVE EVENT STORE
# ==========================================

Write-Host ""
Write-Host "Creating live event store..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Observability `
        "stores/live/liveEventStore.ts"
    ) `
@"
export type LiveRuntimeEvent = {

  type: string;

  timestamp: number;

  payload?: unknown;
};

class LiveEventStore {

  private events:
    LiveRuntimeEvent[] = [];

  push(
    event: LiveRuntimeEvent
  ) {

    this.events.unshift(event);

    console.log(
      "[LiveEvent]",
      event.type
    );
  }

  getAll() {

    return this.events;
  }
}

export const liveEventStore =
  new LiveEventStore();
"@

# ==========================================
# LIVE OBSERVABILITY SERVICE
# ==========================================

Write-Host ""
Write-Host "Creating live observability service..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Observability `
        "services/live/LiveObservabilityService.ts"
    ) `
@"
import {
  liveEventStore
}
from "../../stores/live/liveEventStore";

export class
LiveObservabilityService {

  publish(
    type: string,
    payload?: unknown
  ) {

    liveEventStore.push({
      type,
      timestamp:
        Date.now(),
      payload,
    });
  }
}
"@

# ==========================================
# LIVE EVENT STREAM
# ==========================================

Write-Host ""
Write-Host "Creating LiveEventStream..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Observability `
        "widgets/live/LiveEventStream.tsx"
    ) `
@"
import {
  liveEventStore
}
from "../../stores/live/liveEventStore";

export default function
LiveEventStream() {

  const events =
    liveEventStore.getAll();

  return (

    <div
      className="
        bg-black
        text-green-400
        rounded-2xl
        p-6
        overflow-auto
      "
    >

      <h2
        className="
          text-xl
          font-bold
          mb-4
        "
      >
        Live Event Stream
      </h2>

      <div
        className="
          flex
          flex-col
          gap-2
        "
      >

        {events.map(
          (
            event,
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
                {event.type}
              </div>

              <div
                className="
                  text-xs
                  opacity-70
                "
              >
                {
                  new Date(
                    event.timestamp
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
# WORKFLOW EXECUTION PANEL
# ==========================================

Write-Host ""
Write-Host "Creating WorkflowExecutionPanel..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Observability `
        "widgets/live/WorkflowExecutionPanel.tsx"
    ) `
@"
export default function
WorkflowExecutionPanel() {

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
        Workflow Executions
      </h2>

      <p className="mt-4">
        Live workflow executions
        will appear here.
      </p>

    </div>
  );
}
"@

# ==========================================
# RETRY ACTIVITY PANEL
# ==========================================

Write-Host ""
Write-Host "Creating RetryActivityPanel..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Observability `
        "widgets/live/RetryActivityPanel.tsx"
    ) `
@"
export default function
RetryActivityPanel() {

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
        Retry Activity
      </h2>

      <p className="mt-4">
        Retry activity
        will appear here.
      </p>

    </div>
  );
}
"@

# ==========================================
# DEAD LETTER FEED
# ==========================================

Write-Host ""
Write-Host "Creating DeadLetterFeed..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Observability `
        "widgets/live/DeadLetterFeed.tsx"
    ) `
@"
export default function
DeadLetterFeed() {

  return (

    <div
      className="
        bg-red-50
        rounded-2xl
        p-6
      "
    >

      <h2
        className="
          text-lg
          font-semibold
          text-red-700
        "
      >
        Dead Letters
      </h2>

      <p className="mt-4">
        Failed runtime events
        will appear here.
      </p>

    </div>
  );
}
"@

# ==========================================
# EVENT REPLAY CONSOLE
# ==========================================

Write-Host ""
Write-Host "Creating EventReplayConsole..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Observability `
        "widgets/live/EventReplayConsole.tsx"
    ) `
@"
export default function
EventReplayConsole() {

  return (

    <div
      className="
        bg-slate-900
        text-white
        rounded-2xl
        p-6
      "
    >

      <h2
        className="
          text-lg
          font-semibold
        "
      >
        Event Replay Console
      </h2>

      <p className="mt-4">
        Replay engine monitoring
        will appear here.
      </p>

    </div>
  );
}
"@

# ==========================================
# LIVE DASHBOARD
# ==========================================

Write-Host ""
Write-Host "Creating LiveRuntimeDashboard..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Observability `
        "dashboards/LiveRuntimeDashboard.tsx"
    ) `
@"
import LiveEventStream
from "../widgets/live/LiveEventStream";

import WorkflowExecutionPanel
from "../widgets/live/WorkflowExecutionPanel";

import RetryActivityPanel
from "../widgets/live/RetryActivityPanel";

import DeadLetterFeed
from "../widgets/live/DeadLetterFeed";

import EventReplayConsole
from "../widgets/live/EventReplayConsole";

export default function
LiveRuntimeDashboard() {

  return (

    <div
      className="
        grid
        gap-6
      "
    >

      <LiveEventStream />

      <WorkflowExecutionPanel />

      <RetryActivityPanel />

      <DeadLetterFeed />

      <EventReplayConsole />

    </div>
  );
}
"@

# ==========================================
# RUNTIME EVENT PUBLISHER
# ==========================================

Write-Host ""
Write-Host "Creating runtime event publisher..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Runtime `
        "monitoring/RuntimeEventPublisher.ts"
    ) `
@"
import {
  LiveObservabilityService
}
from "../../features/observability/services/live/LiveObservabilityService";

export class
RuntimeEventPublisher {

  private service =
    new LiveObservabilityService();

  publish(
    type: string,
    payload?: unknown
  ) {

    this.service.publish(
      type,
      payload
    );
  }
}
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating live observability report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "live-observability.md"

$Report = @"
# LIVE OBSERVABILITY PLATFORM

Generated : $(Get-Date)

## CREATED

- liveEventStore.ts
- LiveObservabilityService.ts
- LiveEventStream.tsx
- WorkflowExecutionPanel.tsx
- RetryActivityPanel.tsx
- DeadLetterFeed.tsx
- EventReplayConsole.tsx
- LiveRuntimeDashboard.tsx
- RuntimeEventPublisher.ts

## OBJECTIVE

Introduce real-time runtime observability.

## LIVE EVENTS

- workflows
- retries
- dead letters
- replay
- runtime activity

## STATUS

Live observability initialized successfully.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " LIVE OBSERVABILITY READY "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""