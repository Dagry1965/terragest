$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Target = "$Root\src\components\dashboard"
$Quarantine = "$Root\src\_quarantine\components\dashboard"

$Matches =
  Get-ChildItem -LiteralPath "$Root\src" -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
  Where-Object {
    $_.FullName -notlike "$Root\src\components\dashboard\*"
  } |
  Select-String -Pattern "@/components/dashboard" -ErrorAction SilentlyContinue

if (-not (Test-Path $Target)) {
  Write-Host "ABSENT - components/dashboard deja retire." -ForegroundColor Yellow
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

Write-Host "OK - dashboard legacy en quarantaine." -ForegroundColor Green