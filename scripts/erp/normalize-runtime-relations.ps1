$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$coreModulesPath =
  Join-Path $root "src\runtime\modules\definitions\coreModules.ts"

$businessFieldsPath =
  Join-Path $root "src\runtime\modules\factory\businessFields.ts"

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " TERRAGEST ERP RELATION NORMALIZATION ENGINE" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

function Write-Utf8File {

  param(
    [string]$Path,
    [string]$Content
  )

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )
}

# ----------------------------------------------------------
# LOAD FILES
# ----------------------------------------------------------

$core =
  [System.IO.File]::ReadAllText($coreModulesPath)

$fields =
  [System.IO.File]::ReadAllText($businessFieldsPath)

# ----------------------------------------------------------
# RELATION LABEL MAP
# ----------------------------------------------------------

$labelMap = @{
  "clients" = "nom"
  "fournisseurs" = "nom"
  "produits" = "nom"
  "stocks" = "nom"
  "mouvements" = "id"
  "terrains" = "nom"
  "parcelles" = "nom"
  "recoltes" = "id"
  "intrants" = "nom"
  "utilisateurs" = "nom"
  "commandes" = "reference"
  "factures" = "reference"
  "devis" = "reference"
  "livraisons" = "reference"
  "vehicules" = "immatriculation"
  "employes" = "nom"
}

# ----------------------------------------------------------
# NORMALIZE FUNCTION
# ----------------------------------------------------------

function Normalize-Relations {

  param(
    [string]$Content,
    [string]$SourceName
  )

  Write-Host ""
  Write-Host "Analyse : $SourceName" -ForegroundColor Yellow

  $matches =
    [regex]::Matches(
      $Content,
      'relation:\s*"([^"]+)"'
    )

  $count = 0

  foreach ($match in $matches) {

    $module =
      $match.Groups[1].Value

    $labelField =
      $labelMap[$module]

    if (!$labelField) {
      $labelField = "nom"
    }

    $old =
      'relation: "' + $module + '"'

    $new = @"
relation: {
      module: "$module",
      collection: "$module",
      labelField: "$labelField",
    }
"@

    $Content =
      $Content.Replace($old, $new)

    $count++
  }

  Write-Host "Relations normalisées : $count" -ForegroundColor Green

  return $Content
}

# ----------------------------------------------------------
# EXECUTION
# ----------------------------------------------------------

$core =
  Normalize-Relations `
    -Content $core `
    -SourceName "coreModules.ts"

$fields =
  Normalize-Relations `
    -Content $fields `
    -SourceName "businessFields.ts"

# ----------------------------------------------------------
# SAVE
# ----------------------------------------------------------

Write-Utf8File `
  -Path $coreModulesPath `
  -Content $core

Write-Utf8File `
  -Path $businessFieldsPath `
  -Content $fields

# ----------------------------------------------------------
# VALIDATION
# ----------------------------------------------------------

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " VALIDATION" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

$totalStructured =
  ([regex]::Matches(
    $core + "`n" + $fields,
    'relation:\s*\{'
  )).Count

$totalLegacy =
  ([regex]::Matches(
    $core + "`n" + $fields,
    'relation:\s*"'
  )).Count

Write-Host "Relations structurées : $totalStructured" -ForegroundColor Green
Write-Host "Relations legacy : $totalLegacy" -ForegroundColor Yellow

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " RELATION NORMALIZATION COMPLETE" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "COMMANDES SUIVANTES :" -ForegroundColor Yellow
Write-Host ""
Write-Host "pnpm build" -ForegroundColor White
Write-Host ""
Write-Host "git add ." -ForegroundColor White
Write-Host 'git commit -m "Normalize ERP runtime relations"' -ForegroundColor White
Write-Host ""