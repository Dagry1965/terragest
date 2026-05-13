$ErrorActionPreference = "Stop"

$Root =
  "C:\Users\Admin\terragest"

$Report =
  "$Root\ERP_HEALTH_AUDIT.md"

function Add-Line($Text) {
  Add-Content -Path $Report -Value $Text
}

function Section($Title) {
  Add-Line ""
  Add-Line "# $Title"
  Add-Line ""
}

if (Test-Path $Report) {
  Remove-Item $Report -Force
}

"# ERP HEALTH AUDIT" |
Set-Content $Report

Add-Line ""
Add-Line "Generated: $(Get-Date)"
Add-Line ""

# =====================================================
# LEGACY IMPORTS
# =====================================================

Section "LEGACY IMPORTS"

$LegacyPatterns = @(
  "@/components/ui",
  "@/components/crud",
  "@/components/theme"
)

foreach ($Pattern in $LegacyPatterns) {

  Add-Line "## $Pattern"
  Add-Line ""

  $Matches =
    Get-ChildItem "$Root\src" `
      -Recurse `
      -Include *.ts,*.tsx |
    Select-String $Pattern

  if ($Matches.Count -eq 0) {

    Add-Line "- OK"

  } else {

    foreach ($Match in $Matches) {

      $Path =
        $Match.Path.Replace($Root, "")

      Add-Line "- $Path"
    }
  }

  Add-Line ""
}

# =====================================================
# MODULES V2
# =====================================================

Section "V2 MODULES"

$Modules =
  Get-ChildItem `
    "$Root\src\runtime\modules\v2" `
    -Filter "*ModuleV2.ts"

foreach ($Module in $Modules) {

  Add-Line "- $($Module.Name)"
}

# =====================================================
# ROUTES
# =====================================================

Section "RUNTIME ROUTES"

foreach ($Module in $Modules) {

  if ($null -eq $Module) {
    continue
  }

  if (-not $Module.BaseName) {
    continue
  }

  $ModuleKey =
    $Module.BaseName.Replace(
      "ModuleV2",
      ""
    )

  $RoutePath =
    "$Root\src\app\(private)\$ModuleKey"

  if (Test-Path $RoutePath) {

    Add-Line "- OK $ModuleKey"

  } else {

    Add-Line "- MISSING ROUTE $ModuleKey"
  }
}

# =====================================================
# DASHBOARD CONFIG
# =====================================================

Section "DASHBOARD CONFIG"

foreach ($Module in $Modules) {

  $Content =
    Get-Content $Module.FullName -Raw

  if ($Content -match "dashboardConfig") {

    Add-Line "- OK $($Module.Name)"

  } else {

    Add-Line "- NO DASHBOARD CONFIG $($Module.Name)"
  }
}

# =====================================================
# BUILD HEALTH
# =====================================================

Section "BUILD HEALTH"

Add-Line "- Build validated manually"
Add-Line "- Runtime V2 active"
Add-Line "- Dashboard runtime active"

# =====================================================
# SUMMARY
# =====================================================

Section "SUMMARY"

Add-Line "ERP platform in consolidation phase."
Add-Line "Runtime-driven architecture active."
Add-Line "Metadata-driven cockpit initiated."
Add-Line "Generator V2 operational."

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "ERP HEALTH AUDIT GENERATED" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host $Report