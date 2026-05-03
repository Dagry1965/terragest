param(
    [Parameter(Mandatory)]
    [string]$Domain,

    [switch]$Realtime,

    [switch]$Offline,

    [switch]$Analytics,

    [switch]$Monitoring
)

# ============================================
# NORMALIZATION
# ============================================

$Domain =
    $Domain.ToLower()

Write-Host ""
Write-Host "==================================="
Write-Host " DOMAIN GENERATOR"
Write-Host "==================================="
Write-Host ""

# ============================================
# DOMAIN ROOT
# ============================================

$domainRoot =
    "domains/$Domain"

# ============================================
# DOMAIN STRUCTURE
# ============================================

$folders = @(

    "$domainRoot/application",

    "$domainRoot/domain",

    "$domainRoot/infrastructure",

    "$domainRoot/presentation"
)

foreach ($folder in $folders) {

    New-Item `
        -ItemType Directory `
        -Force `
        -Path $folder | Out-Null
}

# ============================================
# RUNTIME PROVISIONING
# ============================================

if ($Realtime) {

    $realtimeFolders = @(

        "$domainRoot/infrastructure/realtime",

        "$domainRoot/infrastructure/realtime/listeners",

        "$domainRoot/infrastructure/realtime/subscriptions",

        "$domainRoot/infrastructure/realtime/synchronization"
    )

    foreach ($folder in $realtimeFolders) {

        New-Item `
            -ItemType Directory `
            -Force `
            -Path $folder | Out-Null
    }
}

if ($Offline) {

    $offlineFolders = @(

        "$domainRoot/infrastructure/offline",

        "$domainRoot/infrastructure/offline/queue",

        "$domainRoot/infrastructure/offline/persistence",

        "$domainRoot/infrastructure/offline/retry"
    )

    foreach ($folder in $offlineFolders) {

        New-Item `
            -ItemType Directory `
            -Force `
            -Path $folder | Out-Null
    }
}

if ($Analytics) {

    $analyticsFolders = @(

        "$domainRoot/infrastructure/analytics",

        "$domainRoot/infrastructure/analytics/dashboards",

        "$domainRoot/infrastructure/analytics/metrics",

        "$domainRoot/infrastructure/analytics/reporting"
    )

    foreach ($folder in $analyticsFolders) {

        New-Item `
            -ItemType Directory `
            -Force `
            -Path $folder | Out-Null
    }
}

if ($Monitoring) {

    $monitoringFolders = @(

        "$domainRoot/infrastructure/monitoring",

        "$domainRoot/infrastructure/monitoring/alerts",

        "$domainRoot/infrastructure/monitoring/health",

        "$domainRoot/infrastructure/monitoring/observability"
    )

    foreach ($folder in $monitoringFolders) {

        New-Item `
            -ItemType Directory `
            -Force `
            -Path $folder | Out-Null
    }
}

# ============================================
# DOMAIN REGISTRY AUTO-REGISTRATION
# ============================================

$registryPath =
    "platform/domains/registry.ts"

if (!(Test-Path $registryPath)) {

    Write-Host ""
    Write-Host "ERROR:"
    Write-Host "Domain registry not found:"
    Write-Host " - $registryPath"
    Write-Host ""

    exit
}

$registryContent =
    Get-Content `
        $registryPath `
        -Raw

# ============================================
# REGISTRY VALIDATION
# ============================================

if (!($registryContent.Contains("];"))) {

    Write-Host ""
    Write-Host "ERROR:"
    Write-Host "Invalid registry format"
    Write-Host ""

    exit
}

# ============================================
# DUPLICATE CHECK
# ============================================

if ($registryContent.Contains(
    "key: `"$Domain`""
)) {

    Write-Host ""
    Write-Host "Domain already registered:"
    Write-Host " - $Domain"
    Write-Host ""

    exit
}

# ============================================
# DOMAIN LABEL
# ============================================

$domainLabel =
    $Domain.Substring(0,1).ToUpper() +
    $Domain.Substring(1)

# ============================================
# CAPABILITIES
# ============================================

$capabilities = @()

if ($Realtime) {

    $capabilities += @'

      realtime: true,
'@
}

if ($Offline) {

    $capabilities += @'

      offline: true,
'@
}

if ($Analytics) {

    $capabilities += @'

      analytics: true,
'@
}

if ($Monitoring) {

    $capabilities += @'

      monitoring: true,
'@
}

$capabilitiesText =
    $capabilities -join ""

# ============================================
# DOMAIN ENTRY
# ============================================

$domainEntry = @"

    {
      key: "$Domain",

      label: "$domainLabel",

      enabled: true,
$capabilitiesText
    },

"@

# ============================================
# REGISTRY UPDATE
# ============================================

$updatedRegistry =
    $registryContent.Replace(
        "];",
@"
$domainEntry
];
"@
    )

Set-Content `
    -Path $registryPath `
    -Value $updatedRegistry

# ============================================
# SUCCESS
# ============================================

Write-Host ""
Write-Host "==================================="
Write-Host " DOMAIN GENERATED"
Write-Host "==================================="
Write-Host ""

Write-Host "Created:"
Write-Host " - $domainRoot"
Write-Host ""

Write-Host "Capabilities:"

if ($Realtime) {
    Write-Host " - realtime"
}

if ($Offline) {
    Write-Host " - offline"
}

if ($Analytics) {
    Write-Host " - analytics"
}

if ($Monitoring) {
    Write-Host " - monitoring"
}

Write-Host ""

Write-Host "Registered:"
Write-Host " - $Domain"
Write-Host ""

Write-Host "Next recommended steps:"
Write-Host ""
Write-Host "1. pnpm build"
Write-Host "2. git status"
Write-Host "3. git add ."
Write-Host "4. git commit -m 'feat(domains): generate domain $Domain'"
Write-Host "5. git push"
Write-Host ""