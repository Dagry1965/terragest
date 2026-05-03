param(
    [string]$Source = "src/app/_quarantine",

    [string]$Destination = "src/experimental"
)

Write-Host ""
Write-Host "============================================"
Write-Host " TERRAGEST QUARANTINE CLEANUP"
Write-Host "============================================"
Write-Host ""

if (!(Test-Path $Source)) {

    Write-Host "Quarantine folder not found: $Source"

    exit
}

# ============================================
# CREATE DESTINATION
# ============================================

New-Item `
    -ItemType Directory `
    -Force `
    -Path $Destination | Out-Null

# ============================================
# MOVE QUARANTINE
# ============================================

$targetPath = Join-Path `
    $Destination `
    "_quarantine"

Move-Item `
    -Path $Source `
    -Destination $targetPath `
    -Force

Write-Host ""
Write-Host "Quarantine moved successfully"
Write-Host ""
Write-Host "FROM: $Source"
Write-Host "TO:   $targetPath"
Write-Host ""

# ============================================
# OPTIONAL CLEANUP
# ============================================

Write-Host "Next recommended steps:"
Write-Host ""
Write-Host "1. pnpm build"
Write-Host "2. git status"
Write-Host "3. git add ."
Write-Host "4. git commit -m 'chore(cleanup): move experimental runtime out of app router'"
Write-Host "5. git push"
Write-Host ""
