$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$corePath =
  Join-Path $root "src\runtime\modules\definitions\coreModules.ts"

$fieldsPath =
  Join-Path $root "src\runtime\modules\factory\businessFields.ts"

$core =
  [System.IO.File]::ReadAllText($corePath)

$fields =
  [System.IO.File]::ReadAllText($fieldsPath)

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " SAFE ERP NORMALIZATION ENGINE" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

# ----------------------------------------------------------
# HELPERS
# ----------------------------------------------------------

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
# FACTORIES TO CREATE
# ----------------------------------------------------------

$missingFactories = @(

  @{
    Name = "fournisseurFields"
    Label = "Fournisseur"
  },

  @{
    Name = "interventionFields"
    Label = "Intervention"
  },

  @{
    Name = "maintenanceFields"
    Label = "Maintenance"
  },

  @{
    Name = "incidentFields"
    Label = "Incident"
  },

  @{
    Name = "tacheFields"
    Label = "Tâche"
  },

  @{
    Name = "utilisateurFields"
    Label = "Utilisateur"
  }

)

# ----------------------------------------------------------
# CREATE ONLY MISSING FACTORIES
# ----------------------------------------------------------

Write-Host ""
Write-Host "PHASE 1 : CREATE ONLY MISSING FACTORIES" -ForegroundColor Yellow
Write-Host ""

foreach ($factory in $missingFactories) {

  $name =
    $factory.Name

  $label =
    $factory.Label

  if ($fields -match "export const $name") {

    Write-Host "SKIP already exists : $name" -ForegroundColor DarkYellow
  }
  else {

    Write-Host "CREATE : $name" -ForegroundColor Green

    $definition = @"

export const $name = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
  {
    key: "description",
    label: "Description",
    type: "textarea",
  },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: [
      "Actif",
      "Inactif",
    ],
  },
];

"@

    $fields += $definition
  }
}

# ----------------------------------------------------------
# MODULES TO NORMALIZE
# ----------------------------------------------------------

$modules = @(

  @{
    Key = "produits"
    Label = "Produits"
    Fields = "produitFields"
  },

  @{
    Key = "stocks"
    Label = "Stocks"
    Fields = "stockFields"
  },

  @{
    Key = "mouvements"
    Label = "Mouvements"
    Fields = "mouvementFields"
  },

  @{
    Key = "intrants"
    Label = "Intrants"
    Fields = "intrantFields"
  },

  @{
    Key = "parcelles"
    Label = "Parcelles"
    Fields = "parcelleFields"
  },

  @{
    Key = "recoltes"
    Label = "Récoltes"
    Fields = "recolteFields"
  },

  @{
    Key = "terrains"
    Label = "Terrains"
    Fields = "terrainFields"
  },

  @{
    Key = "fournisseurs"
    Label = "Fournisseurs"
    Fields = "fournisseurFields"
  },

  @{
    Key = "interventions"
    Label = "Interventions"
    Fields = "interventionFields"
  },

  @{
    Key = "maintenance"
    Label = "Maintenance"
    Fields = "maintenanceFields"
  },

  @{
    Key = "incidents"
    Label = "Incidents"
    Fields = "incidentFields"
  },

  @{
    Key = "taches"
    Label = "Tâches"
    Fields = "tacheFields"
  },

  @{
    Key = "utilisateurs"
    Label = "Utilisateurs"
    Fields = "utilisateurFields"
  }

)

# ----------------------------------------------------------
# IMPORT ONLY MISSING
# ----------------------------------------------------------

Write-Host ""
Write-Host "PHASE 2 : IMPORTS" -ForegroundColor Yellow
Write-Host ""

foreach ($module in $modules) {

  $fieldsName =
    $module.Fields

  if ($core -notmatch $fieldsName) {

    $core =
      $core -replace
      "commandeFields",
      "commandeFields, $fieldsName"

    Write-Host "IMPORT : $fieldsName" -ForegroundColor Green
  }
  else {

    Write-Host "SKIP import exists : $fieldsName" -ForegroundColor DarkYellow
  }
}

# ----------------------------------------------------------
# NORMALIZE ONLY LEGACY MODULES
# ----------------------------------------------------------

Write-Host ""
Write-Host "PHASE 3 : NORMALIZATION" -ForegroundColor Yellow
Write-Host ""

foreach ($module in $modules) {

  $key =
    $module.Key

  $label =
    $module.Label

  $fieldsName =
    $module.Fields

  if ($core -match "createBusinessModule\(\s*\{\s*key:\s*`"$key`"") {

    Write-Host "SKIP already normalized : $key" -ForegroundColor DarkYellow
    continue
  }

  $replacement = @"
  createBusinessModule({
    key: "$key",
    label: "$label",
    fields: $fieldsName,
  }),

"@

  $pattern =
    "(?s)\s*\{\s*metadata:\s*\{\s*key:\s*`"$key`".*?\n\s*\},\s*(?=\n\s*\{|\n\];)"

  if ($core -match $pattern) {

    $core =
      [regex]::Replace(
        $core,
        $pattern,
        "`n$replacement",
        1
      )

    Write-Host "NORMALIZED : $key" -ForegroundColor Green
  }
  else {

    Write-Host "SKIP block not found : $key" -ForegroundColor Red
  }
}

# ----------------------------------------------------------
# SAVE
# ----------------------------------------------------------

Write-Utf8File `
  -Path $fieldsPath `
  -Content $fields

Write-Utf8File `
  -Path $corePath `
  -Content $core

# ----------------------------------------------------------
# FINAL REPORT
# ----------------------------------------------------------

$totalNormalized =
  ([regex]::Matches(
    $core,
    'createBusinessModule'
  )).Count

$totalLegacy =
  ([regex]::Matches(
    $core,
    'metadata:\s*\{'
  )).Count

Write-Host ""
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host " NORMALIZATION COMPLETE" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Modules normalisés : $totalNormalized" -ForegroundColor Green
Write-Host "Modules legacy restants : $totalLegacy" -ForegroundColor Yellow

Write-Host ""
Write-Host "COMMANDES :" -ForegroundColor Cyan
Write-Host ""
Write-Host "pnpm build" -ForegroundColor White
Write-Host ""
Write-Host "git add ." -ForegroundColor White
Write-Host 'git commit -m "Normalize remaining ERP business modules"' -ForegroundColor White
Write-Host ""