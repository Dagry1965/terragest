$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$ReportPath = Join-Path $Root "AMARKHYS_V1_AUDIT_REPORT.txt"

function Add-Line {
  param([string]$Text = "")
  Add-Content -Path $ReportPath -Value $Text -Encoding UTF8
}

if (Test-Path $ReportPath) {
  Remove-Item $ReportPath -Force
}

Add-Line "============================================================"
Add-Line "AMARKHYS V1 - AUDIT PRODUIT"
Add-Line "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
Add-Line "Root: $Root"
Add-Line "============================================================"
Add-Line ""

Set-Location $Root

$Checks = @(
  "clientsauto",
  "vehicules",
  "rendezvous",
  "interventionsauto",
  "facturesauto",
  "rappelsauto",
  "stocksauto",
  "produitsauto"
)

Add-Line "============================================================"
Add-Line "1. MODULES AMARKHYS"
Add-Line "============================================================"

foreach ($module in $Checks) {
  $modulePath = Join-Path $Root "src\runtime\modules\generated\$module\$module.module.ts"
  $routePath = Join-Path $Root "src\app\(private)\$module\page.tsx"

  Add-Line ""
  Add-Line "MODULE: $module"
  Add-Line "  Module definition : $(if (Test-Path $modulePath) { 'OK' } else { 'MISSING' })"
  Add-Line "  Private route      : $(if (Test-Path $routePath) { 'OK' } else { 'MISSING' })"

  foreach ($sub in @("nouveau","analytics","dashboard","audit","export","import","relations","workflows")) {
    $subPath = Join-Path $Root "src\app\(private)\$module\$sub\page.tsx"
    Add-Line "  Route /$sub        : $(if (Test-Path $subPath) { 'OK' } else { 'MISSING' })"
  }

  $detailPath = Join-Path $Root "src\app\(private)\$module\[id]\page.tsx"
  $editPath = Join-Path $Root "src\app\(private)\$module\[id]\edit\page.tsx"

  Add-Line "  Detail route       : $(if (Test-Path $detailPath) { 'OK' } else { 'MISSING' })"
  Add-Line "  Edit route         : $(if (Test-Path $editPath) { 'OK' } else { 'MISSING' })"
}

Add-Line ""
Add-Line "============================================================"
Add-Line "2. ROUTES PUBLIQUES"
Add-Line "============================================================"

$PublicRoutes = @(
  "",
  "services",
  "a-propos",
  "contact",
  "rdv",
  "devis",
  "blog",
  "espace-client"
)

foreach ($route in $PublicRoutes) {
  if ($route -eq "") {
    $path = Join-Path $Root "src\app\page.tsx"
    Add-Line "  /                  : $(if (Test-Path $path) { 'OK' } else { 'MISSING' })"
  } else {
    $path = Join-Path $Root "src\app\$route\page.tsx"
    Add-Line "  /$route            : $(if (Test-Path $path) { 'OK' } else { 'MISSING' })"
  }
}

Add-Line ""
Add-Line "============================================================"
Add-Line "3. AUTH / SECURITY"
Add-Line "============================================================"

$AuthPaths = @(
  "src\app\(auth)",
  "src\runtime\security",
  "src\runtime\security\sessions",
  "src\runtime\security\permissions"
)

foreach ($path in $AuthPaths) {
  $full = Join-Path $Root $path
  Add-Line "  $path : $(if (Test-Path $full) { 'OK' } else { 'MISSING' })"
}

Add-Line ""
Add-Line "============================================================"
Add-Line "4. DASHBOARD / KPI / REALTIME"
Add-Line "============================================================"

$DashPaths = @(
  "src\runtime\dashboard\ERPBusinessMetricsEngine.ts",
  "src\components\erp\realtime\ERPRuntimeRealtimeDashboard.tsx",
  "src\components\erp\realtime\ERPRealtimeMetrics.tsx",
  "src\runtime\metrics\RuntimeMetrics.ts",
  "src\runtime\realtime\metrics\LiveMetricsStream.ts"
)

foreach ($path in $DashPaths) {
  $full = Join-Path $Root $path
  Add-Line "  $path : $(if (Test-Path $full) { 'OK' } else { 'MISSING' })"
}

Add-Line ""
Add-Line "============================================================"
Add-Line "5. ENCODAGE UTF8 - SIGNES MOJIBAKE"
Add-Line "============================================================"

$patterns = @("Ãƒ", "Ã‚", "Ã¢â‚¬â„¢", "Ã¢â‚¬Å“", "Ã¢â‚¬", "ÃƒÂ©", "ÃƒÂ¨", "ÃƒÂ´", "ÃƒÂª")
$files = Get-ChildItem (Join-Path $Root "src") -Recurse -Include *.ts,*.tsx -File

$badFiles = @()

foreach ($file in $files) {
  $content = [System.IO.File]::ReadAllText($file.FullName)
  foreach ($pattern in $patterns) {
    if ($content.Contains($pattern)) {
      $badFiles += $file.FullName
      break
    }
  }
}

if ($badFiles.Count -eq 0) {
  Add-Line "  OK - Aucun signe mojibake dÃ©tectÃ©."
} else {
  Add-Line "  WARNING - Fichiers avec signes mojibake dÃ©tectÃ©s:"
  foreach ($bad in ($badFiles | Sort-Object -Unique)) {
    Add-Line "  - $bad"
  }
}

Add-Line ""
Add-Line "============================================================"
Add-Line "6. BOUTONS / ACTIONS - INDICES"
Add-Line "============================================================"

$actionPatterns = @("ERPButton", "actions", "workflow", "transition", "Facturer", "Confirmer", "Terminer")
foreach ($pattern in $actionPatterns) {
  Add-Line ""
  Add-Line "Pattern: $pattern"
  $matches = Select-String -Path (Join-Path $Root "src\**\*.tsx"),(Join-Path $Root "src\**\*.ts") -Pattern $pattern -ErrorAction SilentlyContinue | Select-Object -First 30
  if ($matches) {
    foreach ($match in $matches) {
      Add-Line "  $($match.Path):$($match.LineNumber) $($match.Line.Trim())"
    }
  } else {
    Add-Line "  Aucun rÃ©sultat"
  }
}

Add-Line ""
Add-Line "============================================================"
Add-Line "7. SYNTHESE AMARKHYS V1"
Add-Line "============================================================"
Add-Line "Back-office garage:"
Add-Line "  clientsauto / vehicules / rendezvous / interventionsauto / facturesauto / rappelsauto : vÃ©rifier OK ci-dessus."
Add-Line ""
Add-Line "Bloqueurs identifiÃ©s:"
Add-Line "  1. Site public absent ou incomplet"
Add-Line "  2. Encodage UTF8 / mojibake"
Add-Line "  3. Dashboard Ã  enrichir"
Add-Line "  4. Auth / rÃ´les Ã  verrouiller"
Add-Line "  5. Boutons actions manquants ou peu visibles"
Add-Line ""
Add-Line "PrioritÃ© recommandÃ©e:"
Add-Line "  Livrer AMARKHYS v1 exploitable avant nouveaux moteurs runtime."
Add-Line ""

Add-Line "============================================================"
Add-Line "END OF REPORT"
Add-Line "============================================================"

Write-Host "OK - Rapport gÃ©nÃ©rÃ© : $ReportPath"