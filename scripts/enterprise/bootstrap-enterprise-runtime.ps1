# ==========================================
# TERRAGEST V2
# ENTERPRISE RUNTIME BOOTSTRAP
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " ENTERPRISE RUNTIME BOOTSTRAP "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$Runtime = Join-Path `
    $Src `
    "runtime"

$ReportRoot = Join-Path `
    $Root `
    "reports\enterprise"

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
    Write-Host "Runtime folder not found." -ForegroundColor Red
    Write-Host ""

    exit
}

# ==========================================
# PREPARE
# ==========================================

Ensure-Directory `
    (Join-Path $Runtime "bootstrap")

Ensure-Directory $ReportRoot

# ==========================================
# ENTERPRISE BOOTSTRAP
# ==========================================

Write-Host ""
Write-Host "Creating enterprise bootstrap..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Runtime `
        "bootstrap\bootstrapEnterpriseRuntime.ts"
    ) `
@"
import { EventBus }
from "../events/EventBus";

import { WorkflowRegistry }
from "../registry/WorkflowRegistry";

import { RuleRegistry }
from "../rules/registry/RuleRegistry";

import { RuntimeMetrics }
from "../metrics/RuntimeMetrics";

import { AnalyticsEngine }
from "../data/analytics/AnalyticsEngine";

import { IntegrationBus }
from "../integrations/bridges/IntegrationBus";

import { GovernanceEngine }
from "../os/governance/GovernanceEngine";

import { WorkflowSupervisor }
from "../supervision/WorkflowSupervisor";

import { registerMaterielWorkflows }
from "./registerMaterielWorkflows";

import { registerDomainEvents }
from "./registerDomainEvents";

export async function
bootstrapEnterpriseRuntime() {

  console.log(
    "[EnterpriseRuntime] bootstrapping..."
  );

  const eventBus =
    new EventBus();

  const workflowRegistry =
    new WorkflowRegistry();

  const ruleRegistry =
    new RuleRegistry();

  const metrics =
    new RuntimeMetrics();

  const analytics =
    new AnalyticsEngine();

  const integrations =
    new IntegrationBus();

  const governance =
    new GovernanceEngine();

  const supervision =
    new WorkflowSupervisor();

  registerMaterielWorkflows(
    workflowRegistry
  );

  registerDomainEvents(
    eventBus
  );

  console.log(
    "[EnterpriseRuntime] initialized"
  );

  return {

    eventBus,

    workflowRegistry,

    ruleRegistry,

    metrics,

    analytics,

    integrations,

    governance,

    supervision,
  };
}
"@

# ==========================================
# ENTERPRISE STARTER
# ==========================================

Write-Host ""
Write-Host "Creating enterprise starter..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Runtime `
        "bootstrap\startEnterpriseRuntime.ts"
    ) `
@"
import {
  bootstrapEnterpriseRuntime
}
from "./bootstrapEnterpriseRuntime";

async function start() {

  const runtime =
    await bootstrapEnterpriseRuntime();

  console.log(
    "[Terragest Runtime Started]",
    runtime
  );
}

start();
"@

# ==========================================
# RUNTIME HEALTH CHECK
# ==========================================

Write-Host ""
Write-Host "Creating runtime health check..." -ForegroundColor Cyan
Write-Host ""

Ensure-File `
    (Join-Path `
        $Runtime `
        "bootstrap\runtimeHealthCheck.ts"
    ) `
@"
import {
  bootstrapEnterpriseRuntime
}
from "./bootstrapEnterpriseRuntime";

async function check() {

  const runtime =
    await bootstrapEnterpriseRuntime();

  console.log(
    "[HealthCheck]",
    {
      eventBus:
        !!runtime.eventBus,

      workflowRegistry:
        !!runtime.workflowRegistry,

      ruleRegistry:
        !!runtime.ruleRegistry,

      metrics:
        !!runtime.metrics,

      analytics:
        !!runtime.analytics,

      integrations:
        !!runtime.integrations,

      governance:
        !!runtime.governance,

      supervision:
        !!runtime.supervision,
    }
  );
}

check();
"@

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating enterprise bootstrap report..." -ForegroundColor Cyan
Write-Host ""

$ReportFile = Join-Path `
    $ReportRoot `
    "enterprise-runtime-bootstrap.md"

$Report = @"
# ENTERPRISE RUNTIME BOOTSTRAP

Generated : $(Get-Date)

## CREATED

- bootstrapEnterpriseRuntime.ts
- startEnterpriseRuntime.ts
- runtimeHealthCheck.ts

## OBJECTIVE

Centralize full ERP runtime orchestration.

## BOOTSTRAP COMPONENTS

- EventBus
- WorkflowRegistry
- RuleRegistry
- Metrics
- Analytics
- Integrations
- Governance
- Supervision

## STATUS

Enterprise runtime bootstrap initialized successfully.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " ENTERPRISE BOOTSTRAP READY "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""