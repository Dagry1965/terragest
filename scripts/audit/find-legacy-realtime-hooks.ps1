$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"
$src = Join-Path $root "src"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host " LEGACY REALTIME HOOKS AUDIT" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

$results =
  Get-ChildItem `
    $src `
    -Recurse `
    -File |
  Where-Object {
    $_.Extension -in ".ts", ".tsx"
  } |
  Select-String `
    -Pattern "useRealtimeCollection" `
    -SimpleMatch

foreach ($r in $results) {

  Write-Host (
    $r.Path +
    ":" +
    $r.LineNumber
  ) -ForegroundColor Yellow

  Write-Host (
    "  " +
    $r.Line.Trim()
  )
}

Write-Host ""
Write-Host "TOTAL :" `
  $results.Count `
  -ForegroundColor Green

Write-Host ""