# ==========================================
# TERRAGEST V2
# WORKFLOW ENGINE MIGRATION
# ==========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " WORKFLOW ENGINE MIGRATION "
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$LegacyWorkflow = Join-Path $Src "features\workflow-engine"
$Runtime = Join-Path $Src "runtime"

$RuntimeWorkflows = Join-Path $Runtime "workflows"
$RuntimeEvents = Join-Path $Runtime "events"
$RuntimeOrchestration = Join-Path $Runtime "orchestration"
$RuntimeMonitoring = Join-Path $Runtime "monitoring"

$BackupDir = Join-Path $Root "backups\workflow-engine"

# ==========================================
# HELPERS
# ==========================================

function Ensure-Directory {

    param([string]$Path)

    if (!(Test-Path $Path)) {

        New-Item -ItemType Directory -Path $Path -Force | Out-Null

        Write-Host "CREATED : $Path" -ForegroundColor Green
    }
    else {

        Write-Host "EXISTS  : $Path" -ForegroundColor Yellow
    }
}

function Safe-Copy {

    param(
        [string]$Source,
        [string]$Destination
    )

    if (!(Test-Path $Source)) {

        Write-Host "MISSING : $Source" -ForegroundColor Red
        return
    }

    if (Test-Path $Destination) {

        Write-Host "SKIPPED (already exists) : $Destination" -ForegroundColor Yellow
        return
    }

    Copy-Item $Source $Destination -Force

    Write-Host "COPIED : $Destination" -ForegroundColor Green
}

# ==========================================
# VALIDATION
# ==========================================

if (!(Test-Path $LegacyWorkflow)) {

    Write-Host ""
    Write-Host "Legacy workflow-engine not found." -ForegroundColor Red
    Write-Host ""

    exit
}

# ==========================================
# BACKUP
# ==========================================

Write-Host ""
Write-Host "Creating backup..." -ForegroundColor Cyan
Write-Host ""

Ensure-Directory $BackupDir

$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

$BackupTarget = Join-Path `
    $BackupDir `
    "workflow-engine-$Timestamp"

Copy-Item `
    $LegacyWorkflow `
    $BackupTarget `
    -Recurse `
    -Force

Write-Host "BACKUP CREATED : $BackupTarget" -ForegroundColor Green

# ==========================================
# ENSURE RUNTIME
# ==========================================

Write-Host ""
Write-Host "Preparing runtime..." -ForegroundColor Cyan
Write-Host ""

Ensure-Directory $Runtime
Ensure-Directory $RuntimeWorkflows
Ensure-Directory $RuntimeEvents
Ensure-Directory $RuntimeOrchestration
Ensure-Directory $RuntimeMonitoring

# ==========================================
# MIGRATION MAP
# ==========================================

Write-Host ""
Write-Host "Migrating workflow engine..." -ForegroundColor Cyan
Write-Host ""

$WorkflowEngineFile = Join-Path `
    $LegacyWorkflow `
    "services\WorkflowEngine.ts"

$EventBusFile = Join-Path `
    $LegacyWorkflow `
    "services\EventBus.ts"

$OrchestratorFile = Join-Path `
    $LegacyWorkflow `
    "services\ProcessOrchestrator.ts"

$AnalyticsFile = Join-Path `
    $LegacyWorkflow `
    "services\WorkflowAnalytics.ts"

# ==========================================
# COPY CORE FILES
# ==========================================

Safe-Copy `
    $WorkflowEngineFile `
    (Join-Path $RuntimeWorkflows "WorkflowEngine.ts")

Safe-Copy `
    $EventBusFile `
    (Join-Path $RuntimeEvents "EventBus.ts")

Safe-Copy `
    $OrchestratorFile `
    (Join-Path $RuntimeOrchestration "ProcessOrchestrator.ts")

Safe-Copy `
    $AnalyticsFile `
    (Join-Path $RuntimeMonitoring "WorkflowAnalytics.ts")

# ==========================================
# REPORT
# ==========================================

Write-Host ""
Write-Host "Generating report..." -ForegroundColor Cyan
Write-Host ""

$ReportDir = Join-Path $Root "reports\architecture"

Ensure-Directory $ReportDir

$ReportFile = Join-Path `
    $ReportDir `
    "workflow-engine-migration.md"

$Report = @"
# WORKFLOW ENGINE MIGRATION

Generated : $(Get-Date)

## SOURCE

features/workflow-engine

## TARGET

runtime/

## MIGRATED FILES

- WorkflowEngine.ts
- EventBus.ts
- ProcessOrchestrator.ts
- WorkflowAnalytics.ts

## BACKUP

$BackupTarget

## STATUS

Migration prepared successfully.

IMPORTANT:
- legacy workflow-engine not removed
- imports not yet updated
- migration is progressive
"@

$Report | Out-File $ReportFile -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " MIGRATION COMPLETED "
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""