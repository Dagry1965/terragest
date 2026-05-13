$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$OutDir = Join-Path $Root "docs\audit"
$OutFile = Join-Path $OutDir "TERRAGEST_UI_SYSTEM_AUDIT.md"

function Ensure-Dir($Path) {
  if (-not (Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Add-Line($Text = "") {
  [System.IO.File]::AppendAllText($OutFile, "$Text`r`n", [System.Text.Encoding]::UTF8)
}

function Add-Tree($Title, $Path) {
  Add-Line ""
  Add-Line "## $Title"
  Add-Line ""
  if (Test-Path $Path) {
    Add-Line '```text'
    cmd /c "tree `"$Path`" /F" | ForEach-Object { Add-Line $_ }
    Add-Line '```'
  } else {
    Add-Line "Dossier introuvable : $Path"
  }
}

function Add-Search($Title, $Pattern) {
  Add-Line ""
  Add-Line "## $Title"
  Add-Line ""
  Add-Line '```text'

  Get-ChildItem -LiteralPath "$Root\src" -Recurse -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
    Select-String -Pattern $Pattern -ErrorAction SilentlyContinue |
    ForEach-Object {
      Add-Line "$($_.Path):$($_.LineNumber) $($_.Line.Trim())"
    }

  Add-Line '```'
}

Ensure-Dir $OutDir

[System.IO.File]::WriteAllText(
  $OutFile,
  "# TERRAGEST V2 - AUDIT UI SYSTEM`r`n",
  [System.Text.Encoding]::UTF8
)

Set-Location $Root

Add-Line ""
Add-Line "Date audit : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line "Racine projet : $Root"

Add-Tree "UI officielle cible - src/components/erp/ui" "$Root\src\components\erp\ui"
Add-Tree "Theme ERP" "$Root\src\components\erp\theme"
Add-Tree "Page components ERP" "$Root\src\components\erp\page"
Add-Tree "Forms ERP" "$Root\src\components\erp\forms"
Add-Tree "CRUD legacy" "$Root\src\components\crud"
Add-Tree "UI legacy" "$Root\src\components\ui"
Add-Tree "Layout legacy" "$Root\src\components\layout"
Add-Tree "Shell legacy" "$Root\src\components\shell"

Add-Line ""
Add-Line "# Indicateurs"
Add-Line ""

$erpUiCount = 0
$legacyUiCount = 0
$crudCount = 0
$themeCount = 0
$pageCount = 0

if (Test-Path "$Root\src\components\erp\ui") {
  $erpUiCount = (Get-ChildItem -LiteralPath "$Root\src\components\erp\ui" -Recurse -Include *.ts,*.tsx).Count
}

if (Test-Path "$Root\src\components\ui") {
  $legacyUiCount = (Get-ChildItem -LiteralPath "$Root\src\components\ui" -Recurse -Include *.ts,*.tsx).Count
}

if (Test-Path "$Root\src\components\crud") {
  $crudCount = (Get-ChildItem -LiteralPath "$Root\src\components\crud" -Recurse -Include *.ts,*.tsx).Count
}

if (Test-Path "$Root\src\components\erp\theme") {
  $themeCount = (Get-ChildItem -LiteralPath "$Root\src\components\erp\theme" -Recurse -Include *.ts,*.tsx).Count
}

if (Test-Path "$Root\src\components\erp\page") {
  $pageCount = (Get-ChildItem -LiteralPath "$Root\src\components\erp\page" -Recurse -Include *.ts,*.tsx).Count
}

Add-Line "| Zone | Nombre fichiers |"
Add-Line "|---|---:|"
Add-Line "| components/erp/ui | $erpUiCount |"
Add-Line "| components/ui legacy | $legacyUiCount |"
Add-Line "| components/crud legacy | $crudCount |"
Add-Line "| components/erp/theme | $themeCount |"
Add-Line "| components/erp/page | $pageCount |"

Add-Search "Imports depuis components/ui legacy" "@/components/ui"
Add-Search "Imports depuis components/crud legacy" "@/components/crud"
Add-Search "Imports depuis components/layout legacy" "@/components/layout"
Add-Search "Imports depuis components/shell legacy" "@/components/shell"
Add-Search "Imports depuis components/erp/theme" "@/components/erp/theme"
Add-Search "Imports depuis components/erp/page" "@/components/erp/page"
Add-Search "Imports depuis components/erp/ui officiel" "@/components/erp/ui"

Add-Line ""
Add-Line "# Diagnostic"
Add-Line ""
Add-Line "But : faire converger progressivement tous les imports UI vers src/components/erp/ui."
Add-Line "Ne rien supprimer avant migration."
Add-Line "Les dossiers legacy doivent etre conserves temporairement mais ne plus etre utilises dans les nouveaux modules."

Write-Host ""
Write-Host "OK - Audit UI genere :" -ForegroundColor Green
Write-Host $OutFile -ForegroundColor Cyan