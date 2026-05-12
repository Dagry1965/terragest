$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$src = Join-Path $root "src"

$targets = @(
  "components/crud/DataTable",
  "components/data-table/DataTable",
  "components/erp/datatable/ERPDataTable",
  "components/erp/datatable/ERPTable",
  "components/erp/persistence/ERPPersistenceDashboard",
  "components/erp/runtime-ui/ERPDataTableRuntime",
  "components/erp/ui/ERPTable",
  "components/erp/ui/table/ERPTable",
  "components/ui/DataTable",
  "components/ui/Table",
  "features/exploitations/components/ExploitationsEnterpriseTable",
  "features/exploitations/components/ExploitationsTable",
  "features/observability/components/AuditTable",
  "features/produits/components/ProductsTable",
  "features/teams/components/TeamMembersTable",
  "runtime/modules/renderer/ERPModuleListRenderer"
)

Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " LEGACY TABLE USAGE AUDIT" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

foreach ($target in $targets) {
  Write-Host ""
  Write-Host "----- $target -----" -ForegroundColor Yellow

  $name =
    Split-Path $target -Leaf

  $results =
    Get-ChildItem $src -Recurse -File |
    Where-Object {
      $_.Extension -in ".ts", ".tsx"
    } |
    Select-String -Pattern $name -SimpleMatch |
    Where-Object {
      $_.Path -notlike "*$target.tsx"
    }

  foreach ($r in $results) {
    Write-Host "$($r.Path):$($r.LineNumber) $($r.Line.Trim())" -ForegroundColor Gray
  }

  Write-Host "TOTAL : $($results.Count)" -ForegroundColor Green
}

Write-Host ""
Write-Host "AUDIT COMPLETE" -ForegroundColor Green