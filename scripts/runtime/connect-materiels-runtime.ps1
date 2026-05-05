# ==========================================
# TERRAGEST V2
# CONNECT MATERIELS TO RUNTIME
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " CONNECT MATERIELS TO RUNTIME "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Runtime = Join-Path `
    $Src `
    "runtime"

$Materiels = Join-Path `
    $Src `
    "features\materiels"

$ReportRoot = Join-Path `
    $Root `
    "reports\runtime"

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
# VALIDATION
# ==========================================

if (!(Test-Path $Runtime)) {

    Write-Host ""
    Write-Host "Runtime not found." -ForegroundColor Red
    Write-Host ""

    exit
}

if (!(Test-Path $Materiels)) {

    Write-Host ""
    Write-Host "Materiels feature not found." -ForegroundColor Red
    Write-Host ""

    exit
}

# ==========================================
# PREPARE
# ==========================================

Ensure-Directory $ReportRoot
Ensure-Directory `
    (Join-Path $Runtime "bootstrap")

# ==========================================
# REGISTER MATERIEL WORKFLOWS
# ==========================================

Write-Host ""
Write-Host "Creating workflow registration..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Runtime `
        "bootstrap\registerMaterielWorkflows.ts"
    ) `
@"
import { WorkflowRegistry }
from "../registry/WorkflowRegistry";

import { MaterielMaintenanceWorkflow }
from "../../features/materiels/workflows/MaterielMaintenanceWorkflow";

export function
registerMaterielWorkflows(
  registry: WorkflowRegistry
) {

  registry.register(
    "materiel-maintenance",
    new MaterielMaintenanceWorkflow()
  );

  console.log(
    "[Runtime] materiel workflows registered"
  );
}
"@

# ==========================================
# REGISTER DOMAIN EVENTS
# ==========================================

Write-Host ""
Write-Host "Creating event registration..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Runtime `
        "bootstrap\registerDomainEvents.ts"
    ) `
@"
import { EventBus }
from "../events/EventBus";

import {
  MATERIEL_BREAKDOWN_DECLARED
}
from "../../features/materiels/events/MaterielEvents";

export function
registerDomainEvents(
  eventBus: EventBus
) {

  eventBus.on(
    MATERIEL_BREAKDOWN_DECLARED,
    payload => {

      console.log(
        "[Runtime] handling breakdown",
        payload
      );
    }
  );

  console.log(
    "[Runtime] domain events registered"
  );
}
"@

# ==========================================
# RUNTIME INITIALIZER
# ==========================================

Write-Host ""
Write-Host "Creating runtime initializer..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Runtime `
        "bootstrap\initializeRuntime.ts"
    ) `
@"
import { WorkflowRegistry }
from "../registry/WorkflowRegistry";

import { EventBus }
from "../events/EventBus";

import {
  registerMaterielWorkflows
}
from "./registerMaterielWorkflows";

import {
  registerDomainEvents
}
from "./registerDomainEvents";

export async function
initializeRuntime() {

  const registry =
    new WorkflowRegistry();

  const eventBus =
    new EventBus();

  registerMaterielWorkflows(
    registry
  );

  registerDomainEvents(
    eventBus
  );

  console.log(
    "[Runtime] fully initialized"
  );

  return {
    registry,
    eventBus,
  };
}
"@

# ==========================================
# BREAKDOWN EVENT SIMULATOR
# ==========================================

Write-Host ""
Write-Host "Creating runtime simulation..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Runtime `
        "bootstrap\simulateBreakdown.ts"
    ) `
@"
import { initializeRuntime }
from "./initializeRuntime";

import {
  MATERIEL_BREAKDOWN_DECLARED
}
from "../../features/materiels/events/MaterielEvents";

async function simulate() {

  const runtime =
    await initializeRuntime();

  runtime.eventBus.emit(
    MATERIEL_BREAKDOWN_DECLARED,
    {
      materielId: "MAT-001",
      severity: "HIGH",
    }
  );
}

simulate();
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating runtime integration report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "materiels-runtime-connection.md"

$Report = @"
# MATERIELS RUNTIME CONNECTION

Generated : $(Get-Date)

## CREATED

- registerMaterielWorkflows.ts
- registerDomainEvents.ts
- initializeRuntime.ts
- simulateBreakdown.ts

## OBJECTIVE

Connect materiels domain to runtime orchestration.

## EVENT FLOW

MATERIEL_BREAKDOWN_DECLARED
→ EventBus
→ Runtime
→ Workflow

## STATUS

Runtime integration initialized successfully.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " RUNTIME CONNECTION READY "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""