$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Target = "$Root\src\components\timeline"
$Quarantine = "$Root\src\_quarantine\components\timeline"

$Matches =
  Get-ChildItem -LiteralPath "$Root\src" -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
  Select-String -Pattern "@/components/timeline" -ErrorAction SilentlyContinue

if ($Matches) {
  Write-Host "STOP - components/timeline encore importe." -ForegroundColor Red
  foreach ($Match in $Matches) {
    Write-Host ("{0}:{1}" -f $Match.Path, $Match.LineNumber)
  }
  exit 1
}

if (-not (Test-Path $Target)) {
  Write-Host "ABSENT - components/timeline deja retire." -ForegroundColor Yellow
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

Write-Host "OK - timeline legacy en quarantaine." -ForegroundColor Green