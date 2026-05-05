# ==========================================
# TERRAGEST V2 - ARCHITECTURE AUDIT
# ==========================================

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " TERRAGEST V2 ARCHITECTURE AUDIT "
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$Root = Resolve-Path "."
$Src = Join-Path $Root "src"

$ReportDir = Join-Path $Root "reports\architecture"
$ReportFile = Join-Path $ReportDir "audit-terragest-v2.md"

if (!(Test-Path $ReportDir)) {
    New-Item -ItemType Directory -Path $ReportDir -Force | Out-Null
}

$Lines = @()

function Add-Section {
    param([string]$Title)

    $script:Lines += ""
    $script:Lines += "# $Title"
    $script:Lines += ""
}

function Add-Line {
    param([string]$Text)

    $script:Lines += $Text
}

# ==========================================
# HEADER
# ==========================================

Add-Line "# TERRAGEST V2 - AUDIT ARCHITECTURE"
Add-Line ""
Add-Line "Generated : $(Get-Date)"
Add-Line ""

# ==========================================
# CHECK STRUCTURE
# ==========================================

Add-Section "CANONICAL STRUCTURE"

$CanonicalFolders = @(
    "app",
    "core",
    "runtime",
    "infrastructure",
    "shared",
    "ui",
    "features"
)

foreach ($Folder in $CanonicalFolders) {

    $Path = Join-Path $Src $Folder

    if (Test-Path $Path) {
        Add-Line "✅ $Folder"
    }
    else {
        Add-Line "❌ Missing : $Folder"
    }
}

# ==========================================
# DUPLICATED STRUCTURES
# ==========================================

Add-Section "DUPLICATED STRUCTURES"

$Duplicates = @(
    "domains",
    "modules",
    "components\layout",
    "components\navigation",
    "components\sidebar",
    "components\topbar",
    "core\layout"
)

foreach ($Item in $Duplicates) {

    $Path = Join-Path $Src $Item

    if (Test-Path $Path) {
        Add-Line "⚠️ Duplicate structure detected : $Item"
    }
}

# ==========================================
# FIRESTORE DIRECT ACCESS
# ==========================================

Add-Section "FIRESTORE DIRECT ACCESS INSIDE UI"

$UIFolders = @(
    "app",
    "components",
    "features"
)

$FirestorePatterns = @(
    "firebase/firestore",
    'from "firebase/firestore"',
    "collection(",
    "doc(",
    "getDocs(",
    "addDoc(",
    "updateDoc("
)

foreach ($Folder in $UIFolders) {

    $FolderPath = Join-Path $Src $Folder

    if (Test-Path $FolderPath) {

        $Files = Get-ChildItem $FolderPath -Recurse `
            -Include *.ts,*.tsx `
            -File

        foreach ($File in $Files) {

            try {

                $Content = [System.IO.File]::ReadAllText($File.FullName)

                foreach ($Pattern in $FirestorePatterns) {

                    if ($Content.Contains($Pattern)) {

                        Add-Line "⚠️ Possible Firestore direct access : $($File.FullName)"
                        break
                    }
                }
            }
            catch {

                Add-Line "❌ Read error : $($File.FullName)"
            }
        }
    }
}

# ==========================================
# RUNTIME VIOLATIONS
# ==========================================

Add-Section "RUNTIME VIOLATIONS"

$RuntimePath = Join-Path $Src "runtime"

if (Test-Path $RuntimePath) {

    $RuntimeFiles = Get-ChildItem $RuntimePath -Recurse `
        -Include *.tsx `
        -File

    foreach ($File in $RuntimeFiles) {

        Add-Line "❌ JSX inside runtime : $($File.FullName)"
    }
}
else {

    Add-Line "⚠️ runtime folder not found"
}

# ==========================================
# WORKFLOW ENGINE LOCATION
# ==========================================

Add-Section "WORKFLOW ENGINE"

$WorkflowEnginePath = Join-Path $Src "features\workflow-engine"

if (Test-Path $WorkflowEnginePath) {

    Add-Line "⚠️ workflow-engine still inside features/"
    Add-Line "Target : src/runtime/"
}

# ==========================================
# MULTIPLE SIDEBARS
# ==========================================

Add-Section "SIDEBAR DUPLICATION"

$SidebarFiles = Get-ChildItem $Src -Recurse `
    -Include *Sidebar*.tsx `
    -File

foreach ($File in $SidebarFiles) {

    Add-Line "⚠️ Sidebar found : $($File.FullName)"
}

# ==========================================
# MULTIPLE TOPBARS
# ==========================================

Add-Section "TOPBAR DUPLICATION"

$TopbarFiles = Get-ChildItem $Src -Recurse `
    -Include *Topbar*.tsx `
    -File

foreach ($File in $TopbarFiles) {

    Add-Line "⚠️ Topbar found : $($File.FullName)"
}

# ==========================================
# DUPLICATED DATATABLES
# ==========================================

Add-Section "DATATABLE DUPLICATION"

$DataTables = Get-ChildItem $Src -Recurse `
    -Include *DataTable*.tsx `
    -File

foreach ($File in $DataTables) {

    Add-Line "⚠️ DataTable found : $($File.FullName)"
}

# ==========================================
# FEATURES HEALTH
# ==========================================

Add-Section "FEATURES HEALTH"

$FeaturesPath = Join-Path $Src "features"

if (Test-Path $FeaturesPath) {

    $Features = Get-ChildItem $FeaturesPath -Directory

    foreach ($Feature in $Features) {

        Add-Line ""
        Add-Line "## $($Feature.Name)"

        $Expected = @(
            "components",
            "hooks",
            "services",
            "repositories",
            "types"
        )

        foreach ($Folder in $Expected) {

            $FeatureFolder = Join-Path $Feature.FullName $Folder

            if (Test-Path $FeatureFolder) {
                Add-Line "✅ $Folder"
            }
            else {
                Add-Line "⚠️ Missing : $Folder"
            }
        }
    }
}

# ==========================================
# OUTPUT
# ==========================================

$Lines | Out-File $ReportFile -Encoding UTF8

Write-Host ""
Write-Host "===================================" -ForegroundColor Green
Write-Host " AUDIT COMPLETED "
Write-Host "===================================" -ForegroundColor Green
Write-Host ""

Write-Host "Report generated :" -ForegroundColor Yellow
Write-Host $ReportFile
Write-Host ""