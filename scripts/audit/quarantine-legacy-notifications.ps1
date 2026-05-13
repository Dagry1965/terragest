$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Target = "$Root\src\components\notifications"
$Quarantine = "$Root\src\_quarantine\components\notifications"

$Matches =
  Get-ChildItem -LiteralPath "$Root\src" -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
  Where-Object {
    $_.FullName -notlike "$Root\src\_quarantine\*"
  } |
  Select-String -Pattern "@/components/notifications" -ErrorAction SilentlyContinue

if ($Matches) {
  Write-Host "STOP - components/notifications encore importe." -ForegroundColor Red
  exit 1
}

if (-not (Test-Path $Target)) {
  Write-Host "ABSENT - components/notifications deja retire." -ForegroundColor Yellow
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

Write-Host "OK - notifications legacy en quarantaine." -ForegroundColor Green