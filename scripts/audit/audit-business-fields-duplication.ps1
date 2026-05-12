$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$fieldsPath = Join-Path $root "src\runtime\modules\factory\businessFields.ts"
$corePath = Join-Path $root "src\runtime\modules\definitions\coreModules.ts"

$fields = [System.IO.File]::ReadAllText($fieldsPath)
$core = [System.IO.File]::ReadAllText($corePath)

$wanted = @(
  "produitFields",
  "stockFields",
  "mouvementFields",
  "intrantFields",
  "parcelleFields",
  "recolteFields",
  "terrainFields",
  "fournisseurFields",
  "interventionFields",
  "maintenanceFields",
  "incidentFields",
  "tacheFields",
  "utilisateurFields"
)

Write-Host ""
Write-Host "AUDIT ANTI-DUPLICATION BUSINESS FIELDS" -ForegroundColor Cyan
Write-Host ""

foreach ($name in $wanted) {
  $existsInFields = $fields -match "export const\s+$name\s*="
  $usedInCore = $core -match $name

  if ($existsInFields -and $usedInCore) {
    Write-Host "OK déjà créé et utilisé : $name" -ForegroundColor Green
  }
  elseif ($existsInFields -and -not $usedInCore) {
    Write-Host "EXISTE mais pas encore utilisé : $name" -ForegroundColor Yellow
  }
  elseif (-not $existsInFields -and $usedInCore) {
    Write-Host "UTILISÉ mais factory manquante : $name" -ForegroundColor Red
  }
  else {
    Write-Host "À créer : $name" -ForegroundColor DarkYellow
  }
}

Write-Host ""
Write-Host "Modules createBusinessModule déjà présents :" -ForegroundColor Cyan
[regex]::Matches($core, 'createBusinessModule\s*\(\s*\{\s*key:\s*"([^"]+)"') |
  ForEach-Object {
    Write-Host "- $($_.Groups[1].Value)" -ForegroundColor Green
  }

Write-Host ""
Write-Host "Modules encore manuels :" -ForegroundColor Cyan
[regex]::Matches($core, 'metadata:\s*\{\s*key:\s*"([^"]+)"') |
  ForEach-Object {
    Write-Host "- $($_.Groups[1].Value)" -ForegroundColor Yellow
  }