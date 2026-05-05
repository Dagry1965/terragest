# ==========================================
# TERRAGEST V2
# QUARANTINE LEGACY ARCHITECTURE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " QUARANTINE LEGACY ARCHITECTURE "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root =
    Resolve-Path "."

$Src =
    Join-Path `
        $Root `
        "src"

$QuarantineRoot =
    Join-Path `
        $Src `
        "_quarantine"

$ReportRoot =
    Join-Path `
        $Root `
        "reports/stabilization"

# ==========================================
# HELPERS
# ==========================================

function Ensure-Directory {

    param([string]$Path)

    if (!(Test-Path $Path)) {

        New-Item `
            -ItemType Directory `
            -Path $Path `
            -Force | Out-Null
    }
}

function Move-ToQuarantine {

    param(
        [string]$Source
    )

    if (!(Test-Path $Source)) {
        return
    }

    $Name =
        Split-Path `
            $Source `
            -Leaf

    $Destination =
        Join-Path `
            $QuarantineRoot `
            $Name

    if (Test-Path $Destination) {

        Write-Host `
            "ALREADY QUARANTINED : $Name" `
            -ForegroundColor Yellow

        return
    }

    Move-Item `
        $Source `
        $Destination

    Write-Host `
        "QUARANTINED : $Name" `
        -ForegroundColor Green
}

Ensure-Directory $QuarantineRoot
Ensure-Directory $ReportRoot

# ==========================================
# QUARANTINE TARGETS
# ==========================================

$Targets = @(
    "workflow",
    "modules",
    "experimental",
    "legacy",
    "deprecated"
)

$Quarantined = @()

foreach ($Target in $Targets) {

    $Path =
        Join-Path `
            $Src `
            $Target

    if (Test-Path $Path) {

        Move-ToQuarantine `
            $Path

        $Quarantined += $Target
    }
}

# ==========================================
# REPORT
# ==========================================

$ReportFile =
    Join-Path `
        $ReportRoot `
        "legacy-quarantine.md"

$Report = @"
# LEGACY QUARANTINE

Generated :
$(Get-Date)

# QUARANTINED

$(($Quarantined | ForEach-Object { "- $_" }) -join "`n")

# ACTIVE TARGET ARCHITECTURE

- src/app
- src/core
- src/features
- src/infrastructure
- src/platform
- src/runtime
- src/shared
- src/ui

# OBJECTIVE

Reduce architecture divergence
and stabilize enterprise runtime.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " LEGACY ARCHITECTURE QUARANTINED "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""