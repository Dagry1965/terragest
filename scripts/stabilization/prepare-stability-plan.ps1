# ==========================================
# TERRAGEST V2
# STABILITY PREPARATION PLAN
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host " TERRAGEST STABILITY PREPARATION "
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

$Root =
    Resolve-Path "."

$Src =
    Join-Path $Root "src"

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

Ensure-Directory $ReportRoot

# ==========================================
# TARGET ARCHITECTURE
# ==========================================

$TargetFolders = @(
    "app",
    "core",
    "features",
    "runtime",
    "shared",
    "ui",
    "infrastructure",
    "platform"
)

# ==========================================
# DETECT LEGACY
# ==========================================

$LegacyCandidates = @(
    "modules",
    "workflow",
    "experimental",
    "legacy",
    "deprecated"
)

$DetectedLegacy = @()

foreach ($Folder in $LegacyCandidates) {

    $Path =
        Join-Path `
            $Src `
            $Folder

    if (Test-Path $Path) {

        $DetectedLegacy += $Path
    }
}

# ==========================================
# DETECT DUPLICATES
# ==========================================

$DuplicateCandidates = @()

$FeatureNames = @()

$FeaturesPath =
    Join-Path `
        $Src `
        "features"

if (Test-Path $FeaturesPath) {

    Get-ChildItem `
        $FeaturesPath `
        -Directory |
    ForEach-Object {

        $FeatureNames += $_.Name
    }
}

$ModulesPath =
    Join-Path `
        $Src `
        "modules"

if (Test-Path $ModulesPath) {

    Get-ChildItem `
        $ModulesPath `
        -Directory |
    ForEach-Object {

        if (
            $FeatureNames `
                -contains `
                $_.Name
        ) {

            $DuplicateCandidates += $_.Name
        }
    }
}

# ==========================================
# DETECT TEST ZONES
# ==========================================

$TestZones = @()

Get-ChildItem `
    $Root `
    -Directory |
ForEach-Object {

    if (
        $_.Name -match
        "test|tests|backup|coverage"
    ) {

        $TestZones += $_.FullName
    }
}

# ==========================================
# REPORT
# ==========================================

$ReportFile =
    Join-Path `
        $ReportRoot `
        "stability-plan.md"

$Report = @"
# TERRAGEST STABILITY PLAN

Generated :
$(Get-Date)

# TARGET ARCHITECTURE

$(($TargetFolders | ForEach-Object { "- $_" }) -join "`n")

# LEGACY CANDIDATES

$(($DetectedLegacy | ForEach-Object { "- $_" }) -join "`n")

# DUPLICATE DOMAINS

$(($DuplicateCandidates | ForEach-Object { "- $_" }) -join "`n")

# TEST / BACKUP ZONES

$(($TestZones | ForEach-Object { "- $_" }) -join "`n")

# NEXT PHASE

- quarantine legacy
- consolidate runtime
- normalize modules
- remove duplicates
- stabilize imports
- stabilize contracts
- stabilize repositories
- stabilize workflows

# OBJECTIVE

Prepare Terragest
for enterprise stabilization.
"@

$Report | Out-File `
    $ReportFile `
    -Encoding UTF8

# ==========================================
# DONE
# ==========================================

Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host " STABILITY PLAN GENERATED "
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""