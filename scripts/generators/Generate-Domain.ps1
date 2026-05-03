param(
    [Parameter(Mandatory)]
    [string]$Domain,

    [switch]$Realtime,

    [switch]$Offline,

    [switch]$Analytics,

    [switch]$Monitoring
)
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
# DOMAIN ENTRY
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