# =========================================================
# TERRAGEST - FIX ERP SCAFFOLDER
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " FIX ERP SCAFFOLDER"
Write-Host "========================================="
Write-Host ""

$scaffolderPath =
  ".\scripts\create-erp-module.ps1"

$content =
  Get-Content `
    $scaffolderPath `
    -Raw

# =========================================================
# FIX ESCAPED QUOTES
# =========================================================

$content =
  $content.Replace(
    '\"',
    '"'
  )

# =========================================================
# FIX ROUTER PUSH
# =========================================================

$content =
  $content.Replace(
    '"/$module/\${id}"',
    '``/$module/${id}``'
  )

# =========================================================
# FIX WORKFLOW LABEL
# =========================================================

$content =
  $content.Replace(
    'label:
        `Workflow ${workflow}`,',
    'label:
        ``Workflow ${workflow}``,'
  )

# =========================================================
# SAVE
# =========================================================

Set-Content `
  $scaffolderPath `
  $content

Write-Host ""
Write-Host "[UPDATED] create-erp-module.ps1"

Write-Host ""
Write-Host "========================================="
Write-Host " ERP SCAFFOLDER FIXED"
Write-Host "========================================="
Write-Host ""