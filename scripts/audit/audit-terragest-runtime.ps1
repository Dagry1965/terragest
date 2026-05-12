$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$outDir = Join-Path $root "docs\audit"
$outFile = Join-Path $outDir "AUDIT_TERRAGEST_RUNTIME.md"

if (!(Test-Path $outDir)) {
  New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

if (Test-Path $outFile) {
  Remove-Item $outFile -Force
}

function Write-Utf8 {
  param([string]$Text = "")
  [System.IO.File]::AppendAllText(
    $outFile,
    $Text + [Environment]::NewLine,
    [System.Text.UTF8Encoding]::new($false)
  )
}

function Add-FileSection {
  param(
    [string]$Title,
    [string]$FilePath
  )

  Write-Utf8 ""
  Write-Utf8 "## $Title"
  Write-Utf8 ""

  if (Test-Path $FilePath) {
    Write-Utf8 '```ts'
    $content = [System.IO.File]::ReadAllText($FilePath)
    Write-Utf8 $content
    Write-Utf8 '```'
  } else {
    Write-Utf8 "**Fichier introuvable :** $FilePath"
  }
}

Write-Utf8 "# AUDIT TERRAGEST_V2 - ERP ENTERPRISE RUNTIME"
Write-Utf8 ""
Write-Utf8 "Date audit : $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Write-Utf8 ""
Write-Utf8 "Objectif : connaître l'état exact d'avancement de l'application."

Write-Utf8 ""
Write-Utf8 "# 1. Structure principale"
Write-Utf8 ""
Write-Utf8 '```txt'
$treeOutput = cmd /c "tree `"$root\src`" /F"
foreach ($line in $treeOutput) {
  Write-Utf8 $line
}
Write-Utf8 '```'

Write-Utf8 ""
Write-Utf8 "# 2. Factory runtime modules"

Add-FileSection "factory/index.ts" "$root\src\runtime\modules\factory\index.ts"
Add-FileSection "factory/createBusinessModule.ts" "$root\src\runtime\modules\factory\createBusinessModule.ts"
Add-FileSection "factory/businessFields.ts" "$root\src\runtime\modules\factory\businessFields.ts"

Write-Utf8 ""
Write-Utf8 "# 3. Définition centrale des modules"

Add-FileSection "coreModules.ts" "$root\src\runtime\modules\definitions\coreModules.ts"

Write-Utf8 ""
Write-Utf8 "# 4. Registry runtime"

Add-FileSection "ERPModule.ts" "$root\src\runtime\modules\ERPModule.ts"
Add-FileSection "ERPModuleRegistry.ts" "$root\src\runtime\modules\ERPModuleRegistry.ts"
Add-FileSection "ERPModuleBuilder.ts" "$root\src\runtime\modules\ERPModuleBuilder.ts"
Add-FileSection "registerCoreERPModules.ts" "$root\src\runtime\modules\registerCoreERPModules.ts"

Write-Utf8 ""
Write-Utf8 "# 5. Pages génériques runtime"

Add-FileSection "GenericListPage.tsx" "$root\src\runtime\modules\pages\GenericListPage.tsx"
Add-FileSection "GenericCreatePage.tsx" "$root\src\runtime\modules\pages\GenericCreatePage.tsx"
Add-FileSection "GenericEditPage.tsx" "$root\src\runtime\modules\pages\GenericEditPage.tsx"
Add-FileSection "GenericDetailPage.tsx" "$root\src\runtime\modules\pages\GenericDetailPage.tsx"

Write-Utf8 ""
Write-Utf8 "# 6. Forms runtime"

Add-FileSection "ERPEnterpriseForm.tsx" "$root\src\components\erp\forms\enterprise\ERPEnterpriseForm.tsx"
Add-FileSection "ERPFormTabs.tsx" "$root\src\components\erp\forms\enterprise\ERPFormTabs.tsx"
Add-FileSection "ERPFormField.tsx" "$root\src\components\erp\forms\enterprise\ERPFormField.tsx"

Write-Utf8 ""
Write-Utf8 "# 7. Data binding / Firestore runtime"

Add-FileSection "RuntimeDataBinding.ts" "$root\src\runtime\data-binding\RuntimeDataBinding.ts"
Add-FileSection "FirestoreRuntimeRepository.ts" "$root\src\runtime\firebase\runtime-firestore\FirestoreRuntimeRepository.ts"
Add-FileSection "FirestoreRuntimeMutation.ts" "$root\src\runtime\firebase\runtime-firestore\FirestoreRuntimeMutation.ts"

Write-Utf8 ""
Write-Utf8 "# 8. Recherche des mécanismes existants"

$patterns = @(
  "defaultFeatures",
  "features:",
  "routes:",
  "permissions",
  "workflow",
  "automation",
  "audit",
  "realtime",
  "observability",
  "createBusinessModule",
  "ERPModuleBuilder",
  "businessFields",
  "schema:",
  "collection:",
  "timestamps",
  "softDelete"
)

foreach ($p in $patterns) {
  Write-Utf8 ""
  Write-Utf8 "## Recherche : $p"
  Write-Utf8 ""
  Write-Utf8 '```txt'

  $matches = Get-ChildItem "$root\src" -Recurse -File |
    Where-Object { $_.Extension -eq ".ts" -or $_.Extension -eq ".tsx" } |
    Select-String -Pattern $p -SimpleMatch

  foreach ($m in $matches) {
    Write-Utf8 "$($m.Path):$($m.LineNumber) $($m.Line.Trim())"
  }

  Write-Utf8 '```'
}

Write-Utf8 ""
Write-Utf8 "# 9. Analyse automatique des modules"

$corePath = "$root\src\runtime\modules\definitions\coreModules.ts"

if (Test-Path $corePath) {
  $core = [System.IO.File]::ReadAllText($corePath)

  $manualMatches = [regex]::Matches($core, 'metadata:\s*\{\s*key:\s*"([^"]+)"')
  $factoryMatches = [regex]::Matches($core, 'createBusinessModule\s*\(\s*\{\s*key:\s*"([^"]+)"')

  Write-Utf8 ""
  Write-Utf8 "## Modules manuels détectés"
  Write-Utf8 ""

  foreach ($m in $manualMatches) {
    Write-Utf8 "- $($m.Groups[1].Value)"
  }

  Write-Utf8 ""
  Write-Utf8 "## Modules normalisés avec createBusinessModule"
  Write-Utf8 ""

  foreach ($m in $factoryMatches) {
    Write-Utf8 "- $($m.Groups[1].Value)"
  }
}

Write-Utf8 ""
Write-Utf8 "# 10. Synthèse"
Write-Utf8 ""
Write-Utf8 "- Ce qui existe déjà :"
Write-Utf8 "- Ce qui est dupliqué :"
Write-Utf8 "- Ce qui doit être consolidé :"
Write-Utf8 "- Ce qui ne doit pas être recréé :"
Write-Utf8 "- Prochaine migration recommandée :"

Write-Host ""
Write-Host "AUDIT TERMINE" -ForegroundColor Green
Write-Host $outFile -ForegroundColor Yellow
Write-Host ""