$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$OutDir = Join-Path $Root "docs\audit"
$OutFile = Join-Path $OutDir "TERRAGEST_ETAT_STRUCTURE_ACTUELLE.md"

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
  Add-Line "# $Title"
  Add-Line ""
  if (Test-Path $Path) {
    Add-Line '```text'
    cmd /c "tree `"$Path`" /F" | ForEach-Object { Add-Line $_ }
    Add-Line '```'
  } else {
    Add-Line "Dossier introuvable : $Path"
  }
}

function Add-FileContent($Title, $Path) {
  Add-Line ""
  Add-Line "## $Title"
  Add-Line ""
  if (Test-Path $Path) {
    Add-Line '```text'
    Get-Content -LiteralPath $Path | ForEach-Object { Add-Line $_ }
    Add-Line '```'
  } else {
    Add-Line "Fichier introuvable : $Path"
  }
}

Ensure-Dir $OutDir

[System.IO.File]::WriteAllText(
  $OutFile,
  "# TERRAGEST V2 - ETAT STRUCTURE ACTUELLE`r`n",
  [System.Text.Encoding]::UTF8
)

Set-Location $Root

Add-Line ""
Add-Line "Date export : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line "Racine projet : $Root"
Add-Line ""

Add-FileContent "package.json" "$Root\package.json"
Add-FileContent "tsconfig.json" "$Root\tsconfig.json"
Add-FileContent "next.config.ts" "$Root\next.config.ts"
Add-FileContent "tailwind.config.ts" "$Root\tailwind.config.ts"

Add-Tree "Structure globale src" "$Root\src"
Add-Tree "Structure runtime" "$Root\src\runtime"
Add-Tree "Structure composants ERP" "$Root\src\components\erp"
Add-Tree "Structure routes privees" "$Root\src\app\(private)"
Add-Tree "Structure scripts" "$Root\scripts"

Add-FileContent "coreModules.ts" "$Root\src\runtime\modules\definitions\coreModules.ts"
Add-FileContent "ERPModule.ts" "$Root\src\runtime\modules\ERPModule.ts"
Add-FileContent "ERPModuleDefinition.ts" "$Root\src\runtime\modules\ERPModuleDefinition.ts"
Add-FileContent "ERPModuleRegistry.ts" "$Root\src\runtime\modules\ERPModuleRegistry.ts"

Add-FileContent "GenericListPage" "$Root\src\components\erp\generic\GenericListPage.tsx"
Add-FileContent "GenericCreatePage" "$Root\src\components\erp\generic\GenericCreatePage.tsx"
Add-FileContent "GenericEditPage" "$Root\src\components\erp\generic\GenericEditPage.tsx"
Add-FileContent "GenericDetailPage" "$Root\src\components\erp\generic\GenericDetailPage.tsx"

Add-FileContent "ERPEnterpriseForm" "$Root\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx"
Add-FileContent "ERPFormTabs" "$Root\src\components\erp\forms\enterprise\ERPFormTabs.tsx"

Add-FileContent "RuntimeValidationEngine" "$Root\src\runtime\validation\RuntimeValidationEngine.ts"
Add-FileContent "RuntimeValidationTypes" "$Root\src\runtime\validation\RuntimeValidationTypes.ts"

Add-FileContent "RuntimeDataBinding" "$Root\src\runtime\data-binding\RuntimeDataBinding.ts"
Add-FileContent "FirestoreRuntimeRepository" "$Root\src\runtime\firebase\FirestoreRuntimeRepository.ts"
Add-FileContent "FirestoreRuntimeMutation" "$Root\src\runtime\firebase\FirestoreRuntimeMutation.ts"

Add-Line ""
Add-Line "# Indicateurs automatiques"
Add-Line ""

$moduleCount = 0
$routeCount = 0
$erpComponentCount = 0
$runtimeFileCount = 0
$scriptCount = 0

$coreModulesPath = "$Root\src\runtime\modules\definitions\coreModules.ts"

if (Test-Path $coreModulesPath) {
  $content = [System.IO.File]::ReadAllText($coreModulesPath)
  $moduleCount = ([regex]::Matches($content, 'key:\s*"')).Count
}

if (Test-Path "$Root\src\app\(private)") {
  $routeCount = (Get-ChildItem -LiteralPath "$Root\src\app\(private)" -Recurse -Include page.tsx -ErrorAction SilentlyContinue).Count
}

if (Test-Path "$Root\src\components\erp") {
  $erpComponentCount = (Get-ChildItem -LiteralPath "$Root\src\components\erp" -Recurse -Include *.tsx,*.ts -ErrorAction SilentlyContinue).Count
}

if (Test-Path "$Root\src\runtime") {
  $runtimeFileCount = (Get-ChildItem -LiteralPath "$Root\src\runtime" -Recurse -Include *.tsx,*.ts -ErrorAction SilentlyContinue).Count
}

if (Test-Path "$Root\scripts") {
  $scriptCount = (Get-ChildItem -LiteralPath "$Root\scripts" -Recurse -Include *.ps1 -ErrorAction SilentlyContinue).Count
}

Add-Line "| Indicateur | Valeur |"
Add-Line "|---|---:|"
Add-Line "| Modules declares dans coreModules.ts | $moduleCount |"
Add-Line "| Pages routes privees | $routeCount |"
Add-Line "| Fichiers composants ERP | $erpComponentCount |"
Add-Line "| Fichiers runtime | $runtimeFileCount |"
Add-Line "| Scripts PowerShell | $scriptCount |"

Add-Line ""
Add-Line "# Recherches utiles"
Add-Line ""

Add-Line "## moduleKey utilises dans les routes"
Add-Line '```text'
Get-ChildItem -LiteralPath "$Root\src\app" -Recurse -Include *.tsx -ErrorAction SilentlyContinue |
  Select-String -Pattern "moduleKey=" |
  ForEach-Object {
    Add-Line "$($_.Path):$($_.LineNumber) $($_.Line.Trim())"
  }
Add-Line '```'

Add-Line ""
Add-Line "## Imports runtime/modules"
Add-Line '```text'
Get-ChildItem -LiteralPath "$Root\src" -Recurse -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
  Select-String -Pattern "@/runtime/modules", "coreERPModules", "ERPModuleBuilder", "GenericCreatePage", "GenericEditPage" |
  ForEach-Object {
    Add-Line "$($_.Path):$($_.LineNumber) $($_.Line.Trim())"
  }
Add-Line '```'

Write-Host ""
Write-Host "OK - Rapport genere :" -ForegroundColor Green
Write-Host $OutFile -ForegroundColor Cyan