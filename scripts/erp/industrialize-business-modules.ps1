$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$coreModulesPath =
  Join-Path $root "src\runtime\modules\definitions\coreModules.ts"

$businessFieldsPath =
  Join-Path $root "src\runtime\modules\factory\businessFields.ts"

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " TERRAGEST ERP INDUSTRIALIZATION ENGINE" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
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
# LOAD FILES
# ----------------------------------------------------------

$core =
  [System.IO.File]::ReadAllText($coreModulesPath)

$fields =
  [System.IO.File]::ReadAllText($businessFieldsPath)

# ----------------------------------------------------------
# MODULE DEFINITIONS
# ----------------------------------------------------------

$modules = @(

  @{
    Key = "clients"
    Label = "Clients"
    Description = "Gestion des clients."
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
  },

  @{
    Key = "livraisons"
    Label = "Livraisons"
    Description = "Gestion des livraisons."
    Fields = "livraisonFields"
  },

  @{
    Key = "achats"
    Label = "Achats"
    Description = "Gestion des achats."
    Fields = "achatFields"
  },

  @{
    Key = "employes"
    Label = "Employés"
    Description = "Gestion des employés."
    Fields = "employeFields"
  },

  @{
    Key = "vehicules"
    Label = "Véhicules"
    Description = "Gestion des véhicules."
    Fields = "vehiculeFields"
  }

)

# ----------------------------------------------------------
# GENERATE MISSING FIELDS
# ----------------------------------------------------------

Write-Host ""
Write-Host "PHASE 1 : FIELD FACTORIES" -ForegroundColor Yellow
Write-Host ""

foreach ($module in $modules) {

  $fieldsName = $module.Fields

  if ($fields -notmatch "export const $fieldsName") {

    Write-Host "Création : $fieldsName" -ForegroundColor Green

    $append = @"

export const $fieldsName = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
];

"@

    $fields += $append
  }
  else {

    Write-Host "OK : $fieldsName déjà présent" -ForegroundColor DarkYellow
  }
}

Write-Utf8File `
  -Path $businessFieldsPath `
  -Content $fields

# ----------------------------------------------------------
# IMPORTS
# ----------------------------------------------------------

Write-Host ""
Write-Host "PHASE 2 : IMPORTS" -ForegroundColor Yellow
Write-Host ""

foreach ($module in $modules) {

  $fieldsName = $module.Fields

  if ($core -notmatch $fieldsName) {

    $core =
      $core -replace
      "commandeFields",
      "commandeFields, $fieldsName"

    Write-Host "Import ajouté : $fieldsName" -ForegroundColor Green
  }
}

# ----------------------------------------------------------
# MODULE MIGRATION
# ----------------------------------------------------------

Write-Host ""
Write-Host "PHASE 3 : MODULE NORMALIZATION" -ForegroundColor Yellow
Write-Host ""

foreach ($module in $modules) {

  $key = $module.Key
  $label = $module.Label
  $description = $module.Description
  $fieldsName = $module.Fields

  Write-Host ""
  Write-Host "Migration : $key" -ForegroundColor Cyan

  $replacement = @"
  createBusinessModule({
    key: "$key",
    label: "$label",
    description: "$description",
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

    Write-Host "OK : module normalisé" -ForegroundColor Green
  }
  else {

    Write-Host "SKIP : bloc manuel non trouvé" -ForegroundColor DarkYellow
  }
}

# ----------------------------------------------------------
# VALIDATION
# ----------------------------------------------------------

Write-Host ""
Write-Host "PHASE 4 : VALIDATION" -ForegroundColor Yellow
Write-Host ""

$keyMatches =
  ([regex]::Matches($core, 'key:\s*"')).Count

$nameMatches =
  ([regex]::Matches($core, 'name:\s*"')).Count

Write-Host "Fields key : $keyMatches" -ForegroundColor Green
Write-Host "Fields name : $nameMatches" -ForegroundColor Yellow

# ----------------------------------------------------------
# SAVE
# ----------------------------------------------------------

Write-Utf8File `
  -Path $coreModulesPath `
  -Content $core

# ----------------------------------------------------------
# DONE
# ----------------------------------------------------------

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " ERP INDUSTRIALIZATION COMPLETE" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "COMMANDES SUIVANTES :" -ForegroundColor Yellow
Write-Host ""
Write-Host "pnpm build" -ForegroundColor White
Write-Host ""
Write-Host "git add ." -ForegroundColor White
Write-Host 'git commit -m "Industrialize ERP business modules"' -ForegroundColor White
Write-Host ""