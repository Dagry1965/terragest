$folders = @(

    # ============================================
    # APPS
    # ============================================

    "apps/web-erp",
    "apps/mobile-erp",
    "apps/admin-portal",

    # ============================================
    # DOMAINS
    # ============================================

    "domains/stocks",
    "domains/paiements",
    "domains/exploitations",
    "domains/contrats",
    "domains/interventions",

    # ============================================
    # PLATFORM
    # ============================================

    "platform/auth",
    "platform/realtime",
    "platform/offline",
    "platform/analytics",
    "platform/monitoring",
    "platform/generators",
    "platform/ui",

    # ============================================
    # TOOLING
    # ============================================

    "tooling/scripts",
    "tooling/templates",
    "tooling/devtools"
)

foreach ($folder in $folders) {

    New-Item `
        -ItemType Directory `
        -Force `
        -Path $folder | Out-Null
}

Write-Host ""
Write-Host "===================================="
Write-Host " ERP PLATFORM INITIALIZED"
Write-Host "===================================="
Write-Host ""
