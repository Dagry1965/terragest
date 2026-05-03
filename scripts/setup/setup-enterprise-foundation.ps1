Write-Host ""
Write-Host "=== TERRAGEST ENTERPRISE FOUNDATION SETUP ==="
Write-Host ""

# ============================================
# DIRECTORIES
# ============================================

$directories = @(

    # CORE
    "src/core",
    "src/core/dto",
    "src/core/errors",
    "src/core/types",
    "src/core/constants",
    "src/core/config",
    "src/core/permissions",
    "src/core/hooks",
    "src/core/utils",
    "src/core/services",

    # INFRASTRUCTURE
    "src/infrastructure",
    "src/infrastructure/firebase",
    "src/infrastructure/offline",
    "src/infrastructure/cache",
    "src/infrastructure/realtime",
    "src/infrastructure/analytics",
    "src/infrastructure/monitoring",
    "src/infrastructure/api",

    # SHARED
    "src/shared",
    "src/shared/components",
    "src/shared/ui",
    "src/shared/forms",
    "src/shared/tables",
    "src/shared/layouts",
    "src/shared/navigation",
    "src/shared/hooks",
    "src/shared/lib",
    "src/shared/styles"
)

foreach ($dir in $directories) {

    if (-not (Test-Path $dir)) {

        New-Item -ItemType Directory -Force -Path $dir | Out-Null

        Write-Host "[OK] Created: $dir"
    }
}

Write-Host ""
Write-Host "=== FOUNDATION SETUP COMPLETED ==="
Write-Host ""