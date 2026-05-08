# ============================================================
# TERRAGEST ERP - COHERENT AUDIT ORCHESTRATOR
# Objectif : auditer l'application sans créer de nouvelle logique parallèle.
# Le script réutilise les audits existants quand ils sont présents et complète
# uniquement avec des contrôles de lecture non destructifs.
# ============================================================

param(
  [string]$RootPath = "."
)

$ErrorActionPreference = "Stop"
$ProjectRoot = (Resolve-Path $RootPath).Path
$ScriptsRoot = Join-Path $ProjectRoot "scripts"
$SrcRoot = Join-Path $ProjectRoot "src"
$ReportRoot = Join-Path $ProjectRoot "reports\coherent-audit"
$Timestamp = Get-Date -Format "yyyyMMdd-HHmmss"
$ReportFile = Join-Path $ReportRoot "terragest-coherent-audit-$Timestamp.md"

New-Item -ItemType Directory -Force -Path $ReportRoot | Out-Null

$Lines = @()
function Add-Line { param([string]$Text) $script:Lines += $Text }
function Add-Section { param([string]$Title) Add-Line ""; Add-Line "## $Title"; Add-Line "" }
function RelPath { param([string]$Path) return $Path.Replace($ProjectRoot, "").TrimStart("\") }
function Test-RelPath { param([string]$Path) return Test-Path -LiteralPath (Join-Path $ProjectRoot $Path) }

function Find-Files {
  param([string]$Path, [string[]]$Include)
  if (!(Test-Path -LiteralPath $Path)) { return @() }
  return @(Get-ChildItem -Path $Path -Recurse -Include $Include -File -ErrorAction SilentlyContinue)
}

function Search-InSrc {
  param([string]$Pattern)
  if (!(Test-Path -LiteralPath $SrcRoot)) { return $false }
  $files = Find-Files $SrcRoot @("*.ts", "*.tsx")
  foreach ($file in $files) {
    try {
      $content = [System.IO.File]::ReadAllText($file.FullName)
      if ($content.Contains($Pattern)) { return $true }
    } catch {}
  }
  return $false
}

Write-Host "=== TERRAGEST ERP - COHERENT AUDIT ===" -ForegroundColor Cyan
Write-Host "Projet : $ProjectRoot" -ForegroundColor Yellow

Add-Line "# TERRAGEST ERP - Audit coherent"
Add-Line ""
Add-Line "Generated: $(Get-Date)"
Add-Line "ProjectRoot: $ProjectRoot"

# ------------------------------------------------------------
# 1. Inventaire scripts existants
# ------------------------------------------------------------
Add-Section "1. Inventaire des scripts existants"

$psScripts = Find-Files $ScriptsRoot @("*.ps1")
$scriptGroups = $psScripts | Group-Object { (RelPath $_.DirectoryName).Split("\")[1] } | Sort-Object Count -Descending

Add-Line "Scripts PowerShell detectes: **$($psScripts.Count)**"
Add-Line ""
Add-Line "| Famille | Nombre |"
Add-Line "|---|---:|"
foreach ($group in $scriptGroups) {
  if ([string]::IsNullOrWhiteSpace($group.Name)) { continue }
  Add-Line "| $($group.Name) | $($group.Count) |"
}

# ------------------------------------------------------------
# 2. Audits existants disponibles
# ------------------------------------------------------------
Add-Section "2. Audits existants reutilisables"

$knownAuditScripts = @(
  "scripts\audit\audit-terragest-architecture.ps1",
  "scripts\erp-audit\audit-module-connections.ps1",
  "scripts\maintenance\find-broken-imports.ps1"
)

foreach ($audit in $knownAuditScripts) {
  if (Test-RelPath $audit) {
    Add-Line "- OK: $audit"
  } else {
    Add-Line "- MANQUANT: $audit"
  }
}

# Lancement audit architecture existant si present, car il utilise Resolve-Path "."
$architectureAudit = Join-Path $ProjectRoot "scripts\audit\audit-terragest-architecture.ps1"
if (Test-Path -LiteralPath $architectureAudit) {
  Add-Line ""
  Add-Line "Audit architecture existant lance: scripts\\audit\\audit-terragest-architecture.ps1"
  Push-Location $ProjectRoot
  try { & $architectureAudit | Out-Null } catch { Add-Line "Erreur audit architecture: $($_.Exception.Message)" }
  Pop-Location
}

# ------------------------------------------------------------
# 3. Structure applicative reelle
# ------------------------------------------------------------
Add-Section "3. Structure applicative detectee"

$coreFolders = @(
  "src\app",
  "src\core",
  "src\runtime",
  "src\features",
  "src\components",
  "src\components\erp",
  "src\components\erp\ui",
  "src\components\erp\layout",
  "src\components\erp\generic"
)

Add-Line "| Dossier | Statut |"
Add-Line "|---|---|"
foreach ($folder in $coreFolders) {
  Add-Line "| $folder | $(if (Test-RelPath $folder) { 'OK' } else { 'MANQUANT' }) |"
}

$tsFiles = Find-Files $SrcRoot @("*.ts")
$tsxFiles = Find-Files $SrcRoot @("*.tsx")
$pageFiles = @($tsxFiles | Where-Object { $_.Name -eq "page.tsx" })

Add-Line ""
Add-Line "Volumetrie:"
Add-Line "- .ts: $($tsFiles.Count)"
Add-Line "- .tsx: $($tsxFiles.Count)"
Add-Line "- pages Next.js: $($pageFiles.Count)"

# ------------------------------------------------------------
# 4. Audit module par module, repris de la logique existante
# ------------------------------------------------------------
Add-Section "4. Audit module par module"

$modules = @(
  "exploitations",
  "materiels",
  "terrains",
  "stocks",
  "produits",
  "interventions",
  "maintenance",
  "contrats",
  "paiements"
)

$checks = @()
foreach ($module in $modules) {
  $checks += [PSCustomObject]@{ Module=$module; Check="liste"; Status=if (Test-RelPath "src\app\(private)\$module\page.tsx") {"OK"} else {"MANQUANT"} }
  $checks += [PSCustomObject]@{ Module=$module; Check="creation"; Status=if (Test-RelPath "src\app\(private)\$module\nouveau\page.tsx") {"OK"} else {"MANQUANT"} }
  $checks += [PSCustomObject]@{ Module=$module; Check="details"; Status=if (Test-RelPath "src\app\(private)\$module\[id]\page.tsx") {"OK"} else {"MANQUANT"} }
  $checks += [PSCustomObject]@{ Module=$module; Check="edition"; Status=if (Test-RelPath "src\app\(private)\$module\[id]\edit\page.tsx") {"OK"} else {"MANQUANT"} }
  $checks += [PSCustomObject]@{ Module=$module; Check="registry"; Status=if (Search-InSrc "key: `"$module`"") {"OK"} else {"MANQUANT"} }
  $checks += [PSCustomObject]@{ Module=$module; Check="schema collection"; Status=if (Search-InSrc "collection: `"$module`"") {"OK"} else {"MANQUANT"} }
  $checks += [PSCustomObject]@{ Module=$module; Check="runtime moduleKey"; Status=if (Search-InSrc "moduleKey: `"$module`"") {"OK"} else {"A VERIFIER"} }
}

Add-Line "| Module | Liste | Creation | Details | Edition | Registry | Schema | Runtime |"
Add-Line "|---|---|---|---|---|---|---|---|"
foreach ($module in $modules) {
  $m = $checks | Where-Object { $_.Module -eq $module }
  Add-Line "| $module | $(($m|Where Check -eq 'liste').Status) | $(($m|Where Check -eq 'creation').Status) | $(($m|Where Check -eq 'details').Status) | $(($m|Where Check -eq 'edition').Status) | $(($m|Where Check -eq 'registry').Status) | $(($m|Where Check -eq 'schema collection').Status) | $(($m|Where Check -eq 'runtime moduleKey').Status) |"
}

# ------------------------------------------------------------
# 5. Dette UI / duplication / coherence ERP
# ------------------------------------------------------------
Add-Section "5. Dette UI et coherence ERP"

$manualStyledPages = @($pageFiles | Where-Object {
  try { ([System.IO.File]::ReadAllText($_.FullName)) -match "className=" } catch { $false }
})
$sidebarFiles = @($tsxFiles | Where-Object { $_.Name -match "Sidebar" })
$topbarFiles = @($tsxFiles | Where-Object { $_.Name -match "Topbar|Header" })
$dataTableFiles = @($tsxFiles | Where-Object { $_.Name -match "DataTable|Table" })
$registryFiles = @($tsFiles + $tsxFiles | Where-Object { $_.Name -match "Registry|registry|ModuleRegistry" })
$schemaFiles = @($tsFiles | Where-Object { $_.FullName -match "schema|schemas" })
$runtimeFiles = Find-Files (Join-Path $SrcRoot "runtime") @("*.ts", "*.tsx")

Add-Line "| Indicateur | Nombre | Lecture |"
Add-Line "|---|---:|---|"
Add-Line "| Pages avec className manuel | $($manualStyledPages.Count) | A absorber progressivement par src/components/erp/ui |"
Add-Line "| Sidebar detectees | $($sidebarFiles.Count) | Une seule source cible: ERPAppShell + ModuleRegistry |"
Add-Line "| Topbar/Header detectes | $($topbarFiles.Count) | Eviter les variantes page par page |"
Add-Line "| Tables/DataTables detectees | $($dataTableFiles.Count) | Converger vers ERPDataTable |"
Add-Line "| Registry detectes | $($registryFiles.Count) | Doit piloter modules, navigation et pages |"
Add-Line "| Schemas detectes | $($schemaFiles.Count) | Doivent piloter formulaires/listes/details |"
Add-Line "| Runtime files | $($runtimeFiles.Count) | Colonne vertebrale ERP |"

# ------------------------------------------------------------
# 6. Scripts a reutiliser, pas a recreer
# ------------------------------------------------------------
Add-Section "6. Scripts existants a reutiliser dans l'ordre"

$reuseOrder = @(
  "scripts\audit\audit-terragest-architecture.ps1",
  "scripts\erp-audit\audit-module-connections.ps1",
  "scripts\erp\setup-erp-convergence-core.ps1",
  "scripts\erp\setup-erp-ui-core.ps1",
  "scripts\erp-layout\setup-enterprise-layout-system.ps1",
  "scripts\erp-alignment\erp-ui-architecture-alignment.ps1",
  "scripts\runtime-modules\finish-runtime-module-system.ps1",
  "scripts\erp-connect-all\connect-all-modules.ps1",
  "scripts\tests\setup-testing-environment.ps1"
)

foreach ($script in $reuseOrder) {
  Add-Line "- $(if (Test-RelPath $script) {'OK'} else {'MANQUANT'}) $script"
}

# ------------------------------------------------------------
# 7. Decision automatique
# ------------------------------------------------------------
Add-Section "7. Deduction des prochaines etapes"

if (!(Test-RelPath "src\components\erp\ui")) {
  Add-Line "1. PRIORITE: executer/renforcer scripts\\erp\\setup-erp-ui-core.ps1 pour creer le UI core central."
} else {
  Add-Line "1. UI core present: continuer la convergence des pages vers les composants ERP UI."
}

if ($manualStyledPages.Count -gt 0) {
  Add-Line "2. Remplacer progressivement les styles manuels des pages par ERPAppShell, ERPCard, ERPButton, ERPDataTable, ERPForm."
}

if ($registryFiles.Count -eq 0) {
  Add-Line "3. PRIORITE: renforcer ModuleRegistry avant de creer de nouveaux modules."
} else {
  Add-Line "3. Registry present: brancher navigation, dashboard et routes dessus."
}

$missingModuleChecks = @($checks | Where-Object { $_.Status -eq "MANQUANT" })
if ($missingModuleChecks.Count -gt 0) {
  Add-Line "4. Normaliser les modules incomplets avec les generateurs existants, pas avec des pages manuelles. Manquants detectes: $($missingModuleChecks.Count)."
} else {
  Add-Line "4. Modules de base complets sur les checks structurels. Passer aux tests fonctionnels et donnees demo."
}

Add-Line "5. Ajouter tests apres stabilisation UI/navigation: tests rules, workflows, runtime, modules, navigation."
Add-Line "6. Ne pas lancer les scripts setup massifs sans commit propre et build vert avant/apres."

$Lines | Set-Content -Path $ReportFile -Encoding UTF8

Write-Host "Audit coherent termine." -ForegroundColor Green
Write-Host "Rapport : $ReportFile" -ForegroundColor Yellow
