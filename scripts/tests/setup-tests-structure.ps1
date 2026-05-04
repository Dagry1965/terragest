# ============================================
# ERP TERRAGEST - SETUP TEST STRUCTURE
# ============================================

Write-Host ""
Write-Host "====================================="
Write-Host "CREATION STRUCTURE TESTS TERRAGEST"
Write-Host "====================================="
Write-Host ""

# Racine projet
$root = "C:\Users\Admin\terragest"

# Liste dossiers à créer
$folders = @(

    "$root\tests",
    "$root\tests\unit",
    "$root\tests\integration",
    "$root\tests\e2e",

    "$root\playwright",

    "$root\lib",
    "$root\lib\testing",

    "$root\scripts",
    "$root\scripts\tests"
)

# Création dossiers
foreach ($folder in $folders) {

    if (!(Test-Path $folder)) {

        New-Item -ItemType Directory -Path $folder | Out-Null

        Write-Host "[CREATED] $folder" -ForegroundColor Green
    }
    else {

        Write-Host "[EXISTS ] $folder" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "====================================="
Write-Host "STRUCTURE TESTS PRETE"
Write-Host "====================================="
Write-Host ""