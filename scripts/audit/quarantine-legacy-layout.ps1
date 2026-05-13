$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Target = "$Root\src\components\layout"
$Quarantine = "$Root\src\_quarantine\components\layout"

$Matches =
  Get-ChildItem -LiteralPath "$Root\src" -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
  Select-String -Pattern "@/components/layout" -ErrorAction SilentlyContinue

if ($Matches) {
  Write-Host "STOP - components/layout encore importe." -ForegroundColor Red
  exit 1
}

$Dir = Split-Path $Quarantine -Parent
if (-not (Test-Path $Dir)) {
  New-Item -ItemType Directory -Path $Dir -Force | Out-Null
}

if (Test-Path $Quarantine) {
  Remove-Item $Quarantine -Recurse -Force
}

Move-Item -LiteralPath $Target -Destination $Quarantine -Force

Write-Host "OK - layout legacy en quarantaine." -ForegroundColor Green