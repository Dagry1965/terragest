$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$src = Join-Path $root "src"

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " ERP LEGACY UI CLASSIFIER" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$legacyTables =
  Get-ChildItem $src -Recurse -File |
  Where-Object {
    $_.Extension -in ".ts", ".tsx"
  } |
  Select-String "<table"

$runtime = @()
$dashboard = @()
$quarantine = @()
$legacy = @()

foreach ($item in $legacyTables) {

  $path = $item.Path

  if ($path -match "\\_quarantine\\") {
    $quarantine += $path
    continue
  }

  if (
    $path -match "\\dashboard\\" -or
    $path -match "\\cockpit\\" -or
    $path -match "\\monitoring\\"
  ) {
    $dashboard += $path
    continue
  }

  if (
    $path -match "ERPRuntime" -or
    $path -match "ERPEnterprise"
  ) {
    $runtime += $path
    continue
  }

  $legacy += $path
}

function Show-Group {
  param(
    [string]$Title,
    [array]$Items
  )

  Write-Host ""
  Write-Host "----- $Title -----" -ForegroundColor Yellow

  $Items |
    Sort-Object -Unique |
    ForEach-Object {
      Write-Host $_ -ForegroundColor Gray
    }

  Write-Host ""
  Write-Host "TOTAL :" `
    ($Items | Sort-Object -Unique).Count `
    -ForegroundColor Green
}

Show-Group "RUNTIME" $runtime
Show-Group "DASHBOARD" $dashboard
Show-Group "QUARANTINE" $quarantine
Show-Group "REAL LEGACY TO MIGRATE" $legacy

Write-Host ""
Write-Host "CLASSIFICATION COMPLETE" -ForegroundColor Green
Write-Host ""