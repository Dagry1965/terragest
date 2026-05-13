$ErrorActionPreference = "Stop"

$Root = (Get-Location).Path
$OutDir = Join-Path $Root "docs\audit"
$OutFile = Join-Path $OutDir "ERP_RUNTIME_MODULE_REGISTRY_USAGE.md"
$Utf8NoBom = New-Object System.Text.UTF8Encoding($false)

if (-not (Test-Path $OutDir)) {
  New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

$lines = @()

function Add-Line {
  param([string]$Text = "")
  $script:lines += $Text
}

Add-Line "# TERRAGEST_V2 - RUNTIME MODULE REGISTRY USAGE"
Add-Line ""
Add-Line "Date: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line ""

$targets = Get-ChildItem "$Root\src" -Recurse -File `
  -Include *.ts,*.tsx `
  -ErrorAction SilentlyContinue

$coreMatches = $targets | Select-String `
  -Pattern "coreERPModules" `
  -SimpleMatch `
  -ErrorAction SilentlyContinue

$allMatches = $targets | Select-String `
  -Pattern "allERPModules" `
  -SimpleMatch `
  -ErrorAction SilentlyContinue

Add-Line "## Utilisation de coreERPModules"
Add-Line ""

if ($coreMatches.Count -eq 0) {
  Add-Line "Aucune occurrence."
} else {
  foreach ($m in $coreMatches) {
    $rel = $m.Path.Replace($Root, ".")
    Add-Line ("- {0}:{1} - {2}" -f $rel, $m.LineNumber, $m.Line.Trim())
  }
}

Add-Line ""
Add-Line "## Utilisation de allERPModules"
Add-Line ""

if ($allMatches.Count -eq 0) {
  Add-Line "Aucune occurrence."
} else {
  foreach ($m in $allMatches) {
    $rel = $m.Path.Replace($Root, ".")
    Add-Line ("- {0}:{1} - {2}" -f $rel, $m.LineNumber, $m.Line.Trim())
  }
}

[System.IO.File]::WriteAllText(
  $OutFile,
  ($lines -join [Environment]::NewLine),
  $Utf8NoBom
)

Write-Host "AUDIT GENERATED: $OutFile"
