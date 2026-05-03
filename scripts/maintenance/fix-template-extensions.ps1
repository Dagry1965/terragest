Write-Host ""
Write-Host "=== FIX TEMPLATE EXTENSIONS ==="
Write-Host ""

# ============================================
# TEMPLATE DIRECTORY
# ============================================

$templatePath = "scripts/templates"

# ============================================
# RENAME FILES
# ============================================

$templates = @(
    "dto.template.ts",
    "repository.template.ts",
    "service.template.ts",
    "test.template.ts",
    "index.template.ts",
    "list-page.template.tsx",
    "new-page.template.tsx",
    "details-page.template.tsx",
    "edit-page.template.tsx"
)

foreach ($template in $templates) {

    $oldPath = Join-Path $templatePath $template

    if (Test-Path $oldPath) {

        $newName = $template `
            -replace '\.tsx$', '.txt' `
            -replace '\.ts$', '.txt'

        $newPath = Join-Path $templatePath $newName

        Rename-Item -Path $oldPath -NewName $newName

        Write-Host "[OK] Renamed: $template -> $newName"
    }
}

# ============================================
# UPDATE GENERATOR
# ============================================

$generatorPath = "scripts/generators/Generate-EnterpriseModule.ps1"

if (Test-Path $generatorPath) {

    $content = Get-Content $generatorPath -Raw

    $content = $content `
        -replace 'dto\.template\.ts', 'dto.template.txt' `
        -replace 'repository\.template\.ts', 'repository.template.txt' `
        -replace 'service\.template\.ts', 'service.template.txt' `
        -replace 'test\.template\.ts', 'test.template.txt' `
        -replace 'index\.template\.ts', 'index.template.txt' `
        -replace 'list-page\.template\.tsx', 'list-page.template.txt' `
        -replace 'new-page\.template\.tsx', 'new-page.template.txt' `
        -replace 'details-page\.template\.tsx', 'details-page.template.txt' `
        -replace 'edit-page\.template\.tsx', 'edit-page.template.txt'

    Set-Content -Path $generatorPath -Value $content

    Write-Host ""
    Write-Host "[OK] Generator updated."
}

Write-Host ""
Write-Host "=== TEMPLATE FIX COMPLETED ==="
Write-Host ""