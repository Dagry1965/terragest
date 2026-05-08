$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"
$reportDir = Join-Path $projectRoot "reports"
$reportFile = Join-Path $reportDir "erp-module-connections-audit.txt"

New-Item -ItemType Directory -Force $reportDir | Out-Null

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

function Test-PathRelative {
  param([string]$Path)
  return Test-Path -LiteralPath (Join-Path $projectRoot $Path)
}

function Search-InSrc {
  param([string]$Pattern)
  $files = Get-ChildItem -Path (Join-Path $projectRoot "src") -Recurse -Include *.ts,*.tsx -ErrorAction SilentlyContinue
  foreach ($file in $files) {
    $content = [System.IO.File]::ReadAllText($file.FullName)
    if ($content.Contains($Pattern)) {
      return $true
    }
  }
  return $false
}

foreach ($module in $modules) {
  $checks += [PSCustomObject]@{
    Module = $module
    Check = "Page liste"
    Status = if (Test-PathRelative "src\app\(private)\$module\page.tsx") { "OK" } else { "MANQUANT" }
  }

  $checks += [PSCustomObject]@{
    Module = $module
    Check = "Page creation"
    Status = if (Test-PathRelative "src\app\(private)\$module\nouveau\page.tsx") { "OK" } else { "MANQUANT" }
  }

  $checks += [PSCustomObject]@{
    Module = $module
    Check = "Page details dynamique"
    Status = if (Test-PathRelative "src\app\(private)\$module\[id]\page.tsx") { "OK" } else { "MANQUANT" }
  }

  $checks += [PSCustomObject]@{
    Module = $module
    Check = "Page edition dynamique"
    Status = if (Test-PathRelative "src\app\(private)\$module\[id]\edit\page.tsx") { "OK" } else { "MANQUANT" }
  }

  foreach ($action in @("workflows","audit","relations","import","export")) {
    $checks += [PSCustomObject]@{
      Module = $module
      Check = "Page action $action"
      Status = if (Test-PathRelative "src\app\(private)\$module\$action\page.tsx") { "OK" } else { "MANQUANT" }
    }
  }

  $checks += [PSCustomObject]@{
    Module = $module
    Check = "Module declare coreERPModules"
    Status = if (Search-InSrc "key: `"$module`"") { "OK" } else { "MANQUANT" }
  }

  $checks += [PSCustomObject]@{
    Module = $module
    Check = "Collection Firestore schema"
    Status = if (Search-InSrc "collection: `"$module`"") { "OK" } else { "MANQUANT" }
  }

  $checks += [PSCustomObject]@{
    Module = $module
    Check = "Workflow runtime"
    Status = if (Search-InSrc "moduleKey: `"$module`"") { "OK" } else { "A VERIFIER" }
  }

  $checks += [PSCustomObject]@{
    Module = $module
    Check = "Automation runtime"
    Status = if (Search-InSrc "moduleKey: `"$module`"") { "OK" } else { "A VERIFIER" }
  }

  $checks += [PSCustomObject]@{
    Module = $module
    Check = "Routes runtime"
    Status = if (Search-InSrc "list: `"/$module`"") { "OK" } else { "MANQUANT" }
  }
}

"=== ERP MODULE CONNECTIONS AUDIT ===" | Out-File $reportFile
"Generated: $(Get-Date)" | Out-File $reportFile -Append
"" | Out-File $reportFile -Append

$checks | Format-Table -AutoSize | Out-String | Out-File $reportFile -Append

$summary = $checks | Group-Object Status | Select-Object Name, Count

"" | Out-File $reportFile -Append
"=== SUMMARY ===" | Out-File $reportFile -Append
$summary | Format-Table -AutoSize | Out-String | Out-File $reportFile -Append

Write-Host ""
Write-Host "=== AUDIT TERMINE ===" -ForegroundColor Green
Write-Host "Rapport : $reportFile"
Write-Host ""

$checks | Format-Table -AutoSize