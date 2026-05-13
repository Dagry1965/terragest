$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Target = "$Root\src\components\erp\datatable"
$Quarantine = "$Root\src\_quarantine\components\erp\datatable"

$Matches =
  Get-ChildItem -LiteralPath "$Root\src" -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
  Select-String -Pattern "@/components/erp/datatable" -ErrorAction SilentlyContinue

if ($Matches) {
  Write-Host "STOP - erp/datatable encore importe." -ForegroundColor Red
  foreach ($Match in $Matches) {
    Write-Host ("{0}:{1}" -f $Match.Path, $Match.LineNumber)
  }
  exit 1
}

if (-not (Test-Path $Target)) {
  Write-Host "ABSENT - erp/datatable deja retire." -ForegroundColor Yellow
  exit 0
}

$Dir = Split-Path $Quarantine -Parent
if (-not (Test-Path $Dir)) {
  New-Item -ItemType Directory -Path $Dir -Force | Out-Null
}

if (Test-Path $Quarantine) {
  Remove-Item $Quarantine -Recurse -Force
}

Move-Item -LiteralPath $Target -Destination $Quarantine -Force

Write-Host "OK - erp/datatable deplace en quarantaine." -ForegroundColor Green