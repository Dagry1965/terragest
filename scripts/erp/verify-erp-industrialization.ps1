$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$corePath = Join-Path $root "src\runtime\modules\definitions\coreModules.ts"
$fieldsPath = Join-Path $root "src\runtime\modules\factory\businessFields.ts"
$outDir = Join-Path $root "docs\audit"
$outFile = Join-Path $outDir "ERP_INDUSTRIALIZATION_STATUS.md"

if (!(Test-Path $outDir)) {
  New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

if (Test-Path $outFile) {
  Remove-Item $outFile -Force
}

function Add-Line {
  param([string]$Text = "")
  [System.IO.File]::AppendAllText(
    $outFile,
    $Text + [Environment]::NewLine,
    [System.Text.UTF8Encoding]::new($false)
  )
}

$core = [System.IO.File]::ReadAllText($corePath)
$fields = [System.IO.File]::ReadAllText($fieldsPath)

$manualModules = [regex]::Matches(
  $core,
  'metadata:\s*\{\s*key:\s*"([^"]+)"'
) | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique

$factoryModules = [regex]::Matches(
  $core,
  'createBusinessModule\s*\(\s*\{\s*key:\s*"([^"]+)"'
) | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique

$fieldFactories = [regex]::Matches(
  $fields,
  'export const\s+([a-zA-Z0-9_]+Fields)\s*='
) | ForEach-Object { $_.Groups[1].Value } | Sort-Object -Unique

$nameFields = [regex]::Matches($core + "`n" + $fields, 'name:\s*"').Count
$keyFields = [regex]::Matches($core + "`n" + $fields, 'key:\s*"').Count

Add-Line "# ERP INDUSTRIALIZATION STATUS"
Add-Line ""
Add-Line "Date : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line ""

Add-Line "## Synthèse"
Add-Line ""
Add-Line "- Modules normalisés avec createBusinessModule : $($factoryModules.Count)"
Add-Line "- Modules encore manuels : $($manualModules.Count)"
Add-Line "- Field factories disponibles : $($fieldFactories.Count)"
Add-Line "- Occurrences field key: $keyFields"
Add-Line "- Occurrences field name: $nameFields"
Add-Line ""

Add-Line "## Modules normalisés"
Add-Line ""
foreach ($m in $factoryModules) {
  Add-Line "- $m"
}

Add-Line ""
Add-Line "## Modules encore manuels"
Add-Line ""
foreach ($m in $manualModules) {
  Add-Line "- $m"
}

Add-Line ""
Add-Line "## Field factories"
Add-Line ""
foreach ($f in $fieldFactories) {
  Add-Line "- $f"
}

Add-Line ""
Add-Line "## Alertes"
Add-Line ""

if ($nameFields -gt 0) {
  Add-Line "- ATTENTION : des champs utilisent encore name: au lieu de key:"
} else {
  Add-Line "- OK : aucun name: détecté dans coreModules.ts ou businessFields.ts"
}

foreach ($m in $manualModules) {
  $singular = $m.TrimEnd("s")
  $expected = "$singular`Fields"

  if ($fieldFactories -contains $expected) {
    Add-Line "- $m : field factory probable déjà disponible : $expected"
  } else {
    Add-Line "- $m : field factory non évidente à créer ou confirmer"
  }
}

Add-Line ""
Add-Line "## Recommandation"
Add-Line ""
Add-Line "1. Ne pas créer de nouvelle architecture parallèle."
Add-Line "2. Continuer à renforcer createBusinessModule."
Add-Line "3. Migrer les modules encore manuels par lots."
Add-Line "4. Enrichir businessFields.ts uniquement pour les modules sans fields."
Add-Line "5. Lancer pnpm build après chaque lot."

Write-Host ""
Write-Host "VERIFICATION TERMINEE" -ForegroundColor Green
Write-Host $outFile -ForegroundColor Yellow
Write-Host ""
Write-Host "Ouvre le rapport :" -ForegroundColor Cyan
Write-Host "notepad .\docs\audit\ERP_INDUSTRIALIZATION_STATUS.md"
Write-Host ""