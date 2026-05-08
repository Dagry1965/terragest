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
  "C:\Users\Admin\terragest"

$Timestamp =
  Get-Date -Format "yyyyMMdd-HHmm"

$ExternalBackupRoot =
  "C:\Users\Admin\terragest-backups"

$BackupRoot =
  Join-Path `
    $ExternalBackupRoot `
    "runtime-convergence-$Timestamp"

$ReportsRoot =
  Join-Path `
    $ProjectRoot `
    "reports\runtime"

# =========================================================
# CREATE DIRECTORIES
# =========================================================

New-Item `
  -ItemType Directory `
  -Force `
  -Path $ExternalBackupRoot | Out-Null

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
Write-Host "Creating external backups..." `
  -ForegroundColor Cyan

$FoldersToBackup = @(
  "src\runtime",
  "src\app",
  "src\components",
  "src\modules",
  "platform",
  "modules",
  "scripts"
)

foreach ($folder in $FoldersToBackup) {

    $Source =
      Join-Path $ProjectRoot $folder

    if (Test-Path -LiteralPath $Source) {

        $SafeName =
          $folder -replace "\\", "__"

        $Destination =
          Join-Path `
            $BackupRoot `
            $SafeName

        Copy-Item `
          -LiteralPath $Source `
          -Destination $Destination `
          -Recurse `
          -Force

        Write-Host "Backup OK : $folder" `
          -ForegroundColor Green
    }
    else {

        Write-Host "Backup ignored, missing folder : $folder" `
          -ForegroundColor DarkYellow
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
    "src\runtime\core"

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

    if (!(Test-Path -LiteralPath $FullPath)) {

        Set-Content `
          -LiteralPath $FullPath `
          -Value "// TERRAGEST ERP RUNTIME CORE" `
          -Encoding UTF8

        Write-Host "Created : src\runtime\core\$file" `
          -ForegroundColor Green
    }
    else {

        Write-Host "Already exists : src\runtime\core\$file" `
          -ForegroundColor DarkYellow
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
      -LiteralPath $ReportPath `
      -Value "# TERRAGEST ERP REPORT" `
      -Encoding UTF8

    Write-Host "Report OK : reports\runtime\$report" `
      -ForegroundColor Green
}

# =========================================================
# CLEAN OLD INTERNAL BACKUPS FROM PROJECT BUILD SCOPE
# =========================================================

$InternalBackupRoot =
  Join-Path `
    $ProjectRoot `
    "backup"

if (Test-Path -LiteralPath $InternalBackupRoot) {

    $InternalRuntimeBackups =
      Get-ChildItem `
        -LiteralPath $InternalBackupRoot `
        -Directory `
        -Filter "runtime-convergence-*"

    foreach ($oldBackup in $InternalRuntimeBackups) {

        $Target =
          Join-Path `
            $ExternalBackupRoot `
            $oldBackup.Name

        if (!(Test-Path -LiteralPath $Target)) {

            Move-Item `
              -LiteralPath $oldBackup.FullName `
              -Destination $ExternalBackupRoot `
              -Force

            Write-Host "Moved old internal backup : $($oldBackup.Name)" `
              -ForegroundColor Yellow
        }
        else {

            Remove-Item `
              -LiteralPath $oldBackup.FullName `
              -Recurse `
              -Force

            Write-Host "Removed duplicate internal backup : $($oldBackup.Name)" `
              -ForegroundColor Yellow
        }
    }
}

# =========================================================
# FINISHED
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " RUNTIME CONVERGENCE INITIALIZED"
Write-Host "========================================="
Write-Host ""

Write-Host "External Backup :" `
  -ForegroundColor Yellow

Write-Host $BackupRoot

Write-Host ""

Write-Host "Reports :" `
  -ForegroundColor Yellow

Write-Host $ReportsRoot

Write-Host ""