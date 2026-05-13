$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path
$OutDir = Join-Path $Root "docs\audit"
$OutFile = Join-Path $OutDir "ERP_CORE_MODULES_REGISTRY.md"
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (-not (Test-Path $OutDir)) {
  New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

$businessModulesFile = Join-Path $Root "scripts\erp\erp-business-modules.json"
$coreModulesPath = Join-Path $Root "src\runtime\modules\definitions\coreModules.ts"

if (-not (Test-Path $businessModulesFile)) {
  throw "Fichier introuvable: $businessModulesFile"
}

if (-not (Test-Path $coreModulesPath)) {
  throw "Fichier introuvable: $coreModulesPath"
}

$businessModules = Get-Content $businessModulesFile | ConvertFrom-Json | Sort-Object
$coreContent = [System.IO.File]::ReadAllText($coreModulesPath)

$lines = @()

function Add-Line {
  param([string]$Text = "")
  $script:lines += $Text
}

Add-Line "# TERRAGEST_V2 - AUDIT CORE MODULES REGISTRY"
Add-Line ""
Add-Line "Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line ""
Add-Line "## Modules metier attendus"
Add-Line ""

foreach ($module in $businessModules) {
  $declared = $coreContent.Contains("key: `"$module`"")

  if ($declared) {
    Add-Line "- OK - $module"
  } else {
    Add-Line "- MISSING - $module"
  }
}

Add-Line ""
Add-Line "## Modules declares dans coreModules.ts"
Add-Line ""

$matches = [regex]::Matches(
  $coreContent,
  'metadata:\s*\{[\s\S]*?key:\s*"([^"]+)"'
)
foreach ($match in $matches) {
  Add-Line "- $($match.Groups[1].Value)"
}

[System.IO.File]::WriteAllText(
  $OutFile,
  ($lines -join [Environment]::NewLine),
  $Utf8NoBom
)

Write-Host "AUDIT GENERATED: $OutFile"