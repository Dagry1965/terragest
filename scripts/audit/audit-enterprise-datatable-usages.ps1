Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " ERP ENTERPRISE DATATABLE AUDIT" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

$root = "C:\Users\Admin\terragest"

Get-ChildItem $root -Recurse `
  -Include *.ts,*.tsx |
Where-Object {
  $_.FullName -notmatch "\\node_modules\\" -and
  $_.FullName -notmatch "\\.next\\"
} |
ForEach-Object {

  $matches = Select-String `
    -Path $_.FullName `
    -Pattern "ERPEnterpriseDataTable"

  if ($matches) {

    Write-Host $_.FullName -ForegroundColor Yellow

    $matches | ForEach-Object {
      Write-Host ("  line " + $_.LineNumber + " -> " + $_.Line.Trim())
    }

    Write-Host ""
  }
}

Write-Host "AUDIT COMPLETE" -ForegroundColor Green