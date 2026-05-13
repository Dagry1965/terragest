$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Target = "$Root\src\components\erp\lists"
$Quarantine = "$Root\src\_quarantine\components\erp\lists"

$Matches =
  Get-ChildItem -LiteralPath "$Root\src" -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
  Select-String -Pattern "@/components/erp/lists" -ErrorAction SilentlyContinue

if ($Matches) {
  Write-Host "STOP - erp/lists encore importe." -ForegroundColor Red
  exit 1
}

if (-not (Test-Path $Target)) {
  Write-Host "ABSENT - erp/lists deja retire." -ForegroundColor Yellow
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

Write-Host "OK - erp/lists en quarantaine." -ForegroundColor Green