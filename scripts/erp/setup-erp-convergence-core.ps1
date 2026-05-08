# ============================================================
# TERRAGEST ERP - CONVERGENCE CORE SETUP
# Compatible Windows PowerShell
# ============================================================

param(
  [string]$RootPath = "."
)

$ErrorActionPreference = "Stop"

function Write-Step {
  param([string]$Message)

  Write-Host ""
  Write-Host "============================================================" -ForegroundColor Cyan
  Write-Host $Message -ForegroundColor Cyan
  Write-Host "============================================================" -ForegroundColor Cyan
}

function Ensure-Dir {
  param([string]$Path)

  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
    Write-Host "CREATED DIR: $Path" -ForegroundColor Green
  }
  else {
    Write-Host "OK DIR: $Path" -ForegroundColor DarkGray
  }
}

function Write-File {
  param(
    [string]$Path,
    [string]$Content,
    [switch]$SkipIfExists
  )

  $dir = Split-Path $Path -Parent

  if ([string]::IsNullOrWhiteSpace($dir)) {
    $dir = "."
  }

  Ensure-Dir $dir

  $fileName = Split-Path $Path -Leaf
  $resolvedDir = (Resolve-Path -LiteralPath $dir).Path
  $fullPath = Join-Path -Path $resolvedDir -ChildPath $fileName

  if ($SkipIfExists -and (Test-Path -LiteralPath $fullPath)) {
    Write-Host "SKIPPED: $Path" -ForegroundColor Yellow
    return
  }

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)

  [System.IO.File]::WriteAllText(
    $fullPath,
    $Content,
    $utf8NoBom
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Set-Location $RootPath

Write-Step "TERRAGEST ERP - SETUP CONVERGENCE CORE"

$dirs = @(
  "src/runtime/compliance",
  "src/runtime/modules",
  "src/runtime/modules/renderer",
  "src/runtime/forms",
  "src/runtime/cockpit",
  "src/runtime/security/permissions",
  "src/components/erp/ui",
  "src/app/(private)/runtime-cockpit",
  "src/app/(private)/compliance",
  "src/app/(private)/modules/[module]",
  "tests/compliance",
  "tests/modules"
)

foreach ($dir in $dirs) {
  Ensure-Dir $dir
}

Write-Step "MODULE REGISTRY"