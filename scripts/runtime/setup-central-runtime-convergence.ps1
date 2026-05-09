$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "========================================="
Write-Host " TERRAGEST ERP RUNTIME CONVERGENCE"
Write-Host "========================================="
Write-Host ""

# =========================================================
# PATHS
# =========================================================

$ProjectRoot =
  "C:\\Users\\Admin\\terragest"

$Timestamp =
  Get-Date -Format "yyyyMMdd-HHmm"

$BackupRoot =
  Join-Path `
    $ProjectRoot `
    "backup/runtime-convergence-$Timestamp"

$ReportsRoot =
  Join-Path `
    $ProjectRoot `
    "reports/runtime"

# =========================================================
# CREATE DIRECTORIES
# =========================================================

New-Item `
  -ItemType Directory `
  -Force `
  -Path $BackupRoot | Out-Null

New-Item `
  -ItemType Directory `
  -Force `
  -Path $ReportsRoot | Out-Null

# =========================================================
# BACKUP
# =========================================================

Write-Host ""
Write-Host "Creating backups..." `
  -ForegroundColor Cyan

$FoldersToBackup = @(
  "src/runtime",
  "src/app",
  "src/components",
  "src/modules",
  "src/platform",
  "scripts"
)

foreach ($folder in $FoldersToBackup) {

    $Source =
      Join-Path $ProjectRoot $folder

    if (Test-Path $Source) {

        $Destination =
          Join-Path `
            $BackupRoot `
            ($folder -replace "/", "_")

        Copy-Item `
          -Path $Source `
          -Destination $Destination `
          -Recurse `
          -Force
    }
}

# =========================================================
# CREATE RUNTIME CORE
# =========================================================

Write-Host ""
Write-Host "Creating runtime core..." `
  -ForegroundColor Cyan

$RuntimeCore =
  Join-Path `
    $ProjectRoot `
    "src/runtime/core"

New-Item `
  -ItemType Directory `
  -Force `
  -Path $RuntimeCore | Out-Null

$CoreFiles = @(
  "CentralRuntimeRegistry.ts",
  "RuntimeBindings.ts",
  "RuntimeCapabilities.ts",
  "RuntimeContracts.ts",
  "RuntimeLifecycle.ts",
  "RuntimePipeline.ts",
  "RuntimeModuleConnector.ts",
  "RuntimeHealthRegistry.ts",
  "RuntimeEventTopology.ts",
  "index.ts"
)

foreach ($file in $CoreFiles) {

    $FullPath =
      Join-Path `
        $RuntimeCore `
        $file

    if (!(Test-Path $FullPath)) {

        Set-Content `
          -Path $FullPath `
          -Value "// TERRAGEST ERP RUNTIME CORE" `
          -Encoding UTF8
    }
}

# =========================================================
# GENERATE REPORTS
# =========================================================

Write-Host ""
Write-Host "Generating reports..." `
  -ForegroundColor Cyan

$Reports = @(
  "runtime-convergence.md",
  "runtime-duplicates.md",
  "runtime-health.md"
)

foreach ($report in $Reports) {

    $ReportPath =
      Join-Path `
        $ReportsRoot `
        $report

    Set-Content `
      -Path $ReportPath `
      -Value "# TERRAGEST ERP REPORT" `
      -Encoding UTF8
}

# =========================================================
# FINISHED
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RUNTIME CONVERGENCE INITIALIZED"
Write-Host "========================================="
Write-Host ""

Write-Host "Backup :" `
  -ForegroundColor Yellow

Write-Host $BackupRoot

Write-Host ""

Write-Host "Reports :" `
  -ForegroundColor Yellow

Write-Host $ReportsRoot

Write-Host ""
