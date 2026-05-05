# ==========================================
# TERRAGEST V2
# RUNTIME OBSERVABILITY SETUP
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " RUNTIME OBSERVABILITY SETUP "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Feature = Join-Path `
    $Src `
    "features\observability"

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
Write-Host "Preparing observability structure..." -ForegroundColor Cyan
Write-Host ""

Ensure-Directory $Feature
Ensure-Directory $ReportRoot

$Folders = @(
    "components",
    "hooks",
    "services",
    "stores",
    "dashboards",
    "widgets",
    "types"
)

foreach ($Folder in $Folders) {

    Ensure-Directory `
        (Join-Path $Feature $Folder)
}

# ==========================================
# TYPES
# ==========================================

Write-Host ""
Write-Host "Creating observability types..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "types\RuntimeHealth.ts"
    ) `
@"
export type RuntimeHealth = {

  status: string;

  uptime: number;

  workflows: number;

  retries: number;

  deadLetters: number;
};
"@

# ==========================================
# SERVICES
# ==========================================

Write-Host ""
Write-Host "Creating observability services..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "services\RuntimeObservabilityService.ts"
    ) `
@"
import type { RuntimeHealth }
from "../types/RuntimeHealth";

export class RuntimeObservabilityService {

  async getRuntimeHealth():
  Promise<RuntimeHealth> {

    return {
      status: "HEALTHY",
      uptime: 0,
      workflows: 0,
      retries: 0,
      deadLetters: 0,
    };
  }
}
"@

# ==========================================
# STORE
# ==========================================

Write-Host ""
Write-Host "Creating observability store..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "stores\observabilityStore.ts"
    ) `
@"
export const observabilityStore = {

  runtimeStatus: "HEALTHY",
};
"@

# ==========================================
# HOOK
# ==========================================

Write-Host ""
Write-Host "Creating observability hook..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "hooks\useRuntimeHealth.ts"
    ) `
@"
import { useEffect, useState }
from "react";

import type { RuntimeHealth }
from "../types/RuntimeHealth";

import { RuntimeObservabilityService }
from "../services/RuntimeObservabilityService";

export function useRuntimeHealth() {

  const [health, setHealth] =
    useState<RuntimeHealth | null>(
      null
    );

  useEffect(() => {

    const service =
      new RuntimeObservabilityService();

    service
      .getRuntimeHealth()
      .then(setHealth);

  }, []);

  return health;
}
"@

# ==========================================
# RUNTIME STATUS CARD
# ==========================================

Write-Host ""
Write-Host "Creating RuntimeStatusCard..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "components\RuntimeStatusCard.tsx"
    ) `
@"
import { useRuntimeHealth }
from "../hooks/useRuntimeHealth";

export default function
RuntimeStatusCard() {

  const health =
    useRuntimeHealth();

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2 className="text-xl font-bold">
        Runtime Status
      </h2>

      <p className="mt-4">
        Status :
        {health?.status}
      </p>

    </div>
  );
}
"@

# ==========================================
# EVENT STREAM
# ==========================================

Write-Host ""
Write-Host "Creating EventStream..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "widgets\EventStream.tsx"
    ) `
@"
export default function EventStream() {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2 className="text-lg font-semibold">
        Event Stream
      </h2>

      <p className="mt-4">
        Runtime events will appear here.
      </p>

    </div>
  );
}
"@

# ==========================================
# DEAD LETTER PANEL
# ==========================================

Write-Host ""
Write-Host "Creating DeadLetterPanel..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "widgets\DeadLetterPanel.tsx"
    ) `
@"
export default function
DeadLetterPanel() {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2 className="text-lg font-semibold">
        Dead Letters
      </h2>

      <p className="mt-4">
        Failed workflows will appear here.
      </p>

    </div>
  );
}
"@

# ==========================================
# RETRY MONITOR
# ==========================================

Write-Host ""
Write-Host "Creating RetryMonitor..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "widgets\RetryMonitor.tsx"
    ) `
@"
export default function RetryMonitor() {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
      "
    >

      <h2 className="text-lg font-semibold">
        Retry Monitor
      </h2>

      <p className="mt-4">
        Retry activity will appear here.
      </p>

    </div>
  );
}
"@

# ==========================================
# DASHBOARD
# ==========================================

Write-Host ""
Write-Host "Creating RuntimeHealthDashboard..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Feature `
        "dashboards\RuntimeHealthDashboard.tsx"
    ) `
@"
import RuntimeStatusCard
from "../components/RuntimeStatusCard";

import EventStream
from "../widgets/EventStream";

import DeadLetterPanel
from "../widgets/DeadLetterPanel";

import RetryMonitor
from "../widgets/RetryMonitor";

export default function
RuntimeHealthDashboard() {

  return (

    <div
      className="
        grid
        gap-6
      "
    >

      <RuntimeStatusCard />

      <EventStream />

      <DeadLetterPanel />

      <RetryMonitor />

    </div>
  );
}
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating observability report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "runtime-observability.md"

$Report = @"
# RUNTIME OBSERVABILITY SETUP

Generated : $(Get-Date)

## CREATED

- RuntimeStatusCard.tsx
- EventStream.tsx
- DeadLetterPanel.tsx
- RetryMonitor.tsx
- RuntimeHealthDashboard.tsx

## OBJECTIVE

Visualize runtime health and orchestration.

## FEATURES

- runtime status
- workflow monitoring
- retries
- dead letters
- event stream

## STATUS

Runtime observability initialized successfully.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " OBSERVABILITY READY "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""