$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$coreModulesPath =
  Join-Path $root "src\runtime\modules\definitions\coreModules.ts"

$core =
  [System.IO.File]::ReadAllText($coreModulesPath)

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " ERP MASS MODULE MIGRATION" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$modules = @(
  @{
    Key = "clients"
    Label = "Clients"
    Description = "Gestion centralisée des clients."
    Fields = "clientFields"
  },
  @{
    Key = "factures"
    Label = "Factures"
    Description = "Gestion des factures."
    Fields = "factureFields"
  },
  @{
    Key = "devis"
    Label = "Devis"
    Description = "Gestion des devis."
    Fields = "devisFields"
  },
  @{
    Key = "depenses"
    Label = "Dépenses"
    Description = "Gestion des dépenses."
    Fields = "depenseFields"
  },
  @{
    Key = "recettes"
    Label = "Recettes"
    Description = "Gestion des recettes."
    Fields = "recetteFields"
  }
)

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

foreach ($module in $modules) {

  $key = $module.Key
  $label = $module.Label
  $description = $module.Description
  $fields = $module.Fields

  Write-Host ""
  Write-Host "Migration : $key" -ForegroundColor Yellow

  # ---------------------------------------------------
  # IMPORT FIELDS
  # ---------------------------------------------------

  if ($core -notmatch $fields) {

    $core =
      $core -replace
      "commandeFields",
      "commandeFields, $fields"

    Write-Host "Import ajouté : $fields" -ForegroundColor Green
  }

  # ---------------------------------------------------
  # REPLACEMENT
  # ---------------------------------------------------

  $replacement = @"
  createBusinessModule({
    key: "$key",
    label: "$label",
    description: "$description",
    fields: $fields,
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

    Write-Host "OK module migré." -ForegroundColor Green
  }
  else {

    Write-Host "SKIP : bloc manuel introuvable." -ForegroundColor DarkYellow
  }
}

Write-Utf8File `
  -Path $coreModulesPath `
  -Content $core

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " MIGRATION TERMINEE" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Commande suivante :" -ForegroundColor Yellow
Write-Host "pnpm build" -ForegroundColor White
Write-Host ""