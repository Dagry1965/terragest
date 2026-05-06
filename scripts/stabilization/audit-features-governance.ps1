$featuresPath =
  ".\src\features"

$reportPath =
  ".\reports\features-governance-report.md"

$active = @(
  "materiels",
  "produits",
  "stocks",
  "exploitations",
  "interventions",
  "terrains",
  "observability",
  "platform",
  "dashboard",
  "auth",
  "notifications",
  "organisations",
  "teams",
  "billing",
  "invitations",
  "pwa",
  "offline"
)

$merge = @{
  "products" = "produits"
  "equipments" = "materiels"
  "organizations" = "organisations"
  "payments" = "billing"
  "platform-monitoring" = "observability/platform"
}

$quarantine = @(
  "workflow",
  "workflow-engine",
  "api",
  "audit",
  "alerts",
  "memberships",
  "organization-analytics"
)

$directories =
  Get-ChildItem $featuresPath -Directory |
  Sort-Object Name

$content = @()

$content += "# ERP Features Governance Report"
$content += ""
$content += "Generated: $(Get-Date)"
$content += ""

$content += "## ACTIVE MODULES"
$content += ""

foreach ($item in $active) {

  $content += "- $item"
}

$content += ""
$content += "## MERGE CANDIDATES"
$content += ""

foreach ($key in $merge.Keys) {

  $content += "- $key → $($merge[$key])"
}

$content += ""
$content += "## QUARANTINE CANDIDATES"
$content += ""

foreach ($item in $quarantine) {

  $content += "- $item"
}

$content += ""
$content += "## CURRENT FEATURES"
$content += ""

foreach ($dir in $directories) {

  $content += "- $($dir.Name)"
}

New-Item `
  -ItemType Directory `
  -Path ".\reports" `
  -Force | Out-Null

Set-Content `
  -Path $reportPath `
  -Value $content

Write-Host ""
Write-Host "Governance report generated" `
  -ForegroundColor Green

Write-Host $reportPath `
  -ForegroundColor Yellow