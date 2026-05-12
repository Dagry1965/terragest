$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$src = Join-Path $root "src"

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " ERP UI RUNTIME CONVERGENCE AUDIT" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

function Find-Pattern {
  param(
    [string]$Title,
    [string]$Pattern
  )

  Write-Host ""
  Write-Host "----- $Title -----" -ForegroundColor Yellow

  $results =
    Get-ChildItem `
      $src `
      -Recurse `
      -File |
    Where-Object {
      $_.Extension -in ".ts", ".tsx"
    } |
    Select-String `
      -Pattern $Pattern `
      -SimpleMatch

  foreach ($r in $results) {
    Write-Host (
      $r.Path +
      ":" +
      $r.LineNumber
    ) -ForegroundColor Gray

    Write-Host (
      "  " +
      $r.Line.Trim()
    )
  }

  Write-Host ""
  Write-Host "TOTAL :" `
    $results.Count `
    -ForegroundColor Green
}

Find-Pattern `
  "GenericListPage usages" `
  "GenericListPage"

Find-Pattern `
  "GenericCreatePage usages" `
  "GenericCreatePage"

Find-Pattern `
  "GenericEditPage usages" `
  "GenericEditPage"

Find-Pattern `
  "GenericDetailPage usages" `
  "GenericDetailPage"

Find-Pattern `
  "ERPEnterpriseForm usages" `
  "ERPEnterpriseForm"

Find-Pattern `
  "ERPRuntimeTable usages" `
  "ERPRuntimeTable"

Find-Pattern `
  "Legacy HTML tables" `
  "<table"

Find-Pattern `
  "Legacy custom forms" `
  "useState({"

Find-Pattern `
  "Legacy manual inputs" `
  "<input"

Find-Pattern `
  "Legacy manual selects" `
  "<select"

Write-Host ""
Write-Host "AUDIT COMPLETE" -ForegroundColor Green
Write-Host ""