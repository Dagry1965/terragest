param(
  [Parameter(Mandatory = $true)]
  [string]$Key,

  [Parameter(Mandatory = $true)]
  [string]$Label,

  [Parameter(Mandatory = $true)]
  [string]$Description,

  [Parameter(Mandatory = $true)]
  [string]$FieldsName
)

$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$coreModulesPath =
  Join-Path $root "src\runtime\modules\definitions\coreModules.ts"

$businessFieldsPath =
  Join-Path $root "src\runtime\modules\factory\businessFields.ts"

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host " ERP MODULE NORMALIZER" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Module : $Key" -ForegroundColor Yellow

# -------------------------------------------------------
# HELPERS
# -------------------------------------------------------

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

# -------------------------------------------------------
# LOAD FILES
# -------------------------------------------------------

$core =
  [System.IO.File]::ReadAllText($coreModulesPath)

$fields =
  [System.IO.File]::ReadAllText($businessFieldsPath)

# -------------------------------------------------------
# CHECK FIELDS EXPORT
# -------------------------------------------------------

if ($fields -notmatch "export const $FieldsName") {

  Write-Host ""
  Write-Host "Ajout du placeholder fields..." -ForegroundColor Yellow

  $append = @"

export const $FieldsName = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
];

"@

  $fields += $append

  Write-Utf8File `
    -Path $businessFieldsPath `
    -Content $fields

  Write-Host "OK fields ajoutés." -ForegroundColor Green
}
else {

  Write-Host "Fields déjà présents." -ForegroundColor DarkYellow
}

# -------------------------------------------------------
# IMPORTS
# -------------------------------------------------------

if ($core -notmatch $FieldsName) {

  $core =
    $core -replace
    "clientFields",
    "clientFields, $FieldsName"

  Write-Host "Import fields ajouté." -ForegroundColor Green
}

# -------------------------------------------------------
# CREATE BUSINESS MODULE
# -------------------------------------------------------

$replacement = @"
  createBusinessModule({
    key: "$Key",
    label: "$Label",
    description: "$Description",
    fields: $FieldsName,
  }),

"@

$pattern =
  "(?s)\s*\{\s*metadata:\s*\{\s*key:\s*`"$Key`".*?\n\s*\},\s*(?=\n\s*\{|\n\];)"

if ($core -match $pattern) {

  Write-Host ""
  Write-Host "Migration du module..." -ForegroundColor Yellow

  $core =
    [regex]::Replace(
      $core,
      $pattern,
      "`n$replacement",
      1
    )

  Write-Utf8File `
    -Path $coreModulesPath `
    -Content $core

  Write-Host "OK module migré." -ForegroundColor Green
}
else {

  Write-Host ""
  Write-Host "Bloc manuel non trouvé." -ForegroundColor Red
  Write-Host "Migration manuelle nécessaire." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host " NORMALISATION TERMINEE" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Commande suivante :" -ForegroundColor Yellow
Write-Host "pnpm build" -ForegroundColor White
Write-Host ""