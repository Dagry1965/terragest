$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Target = "$Root\src\components\crud"
$Quarantine = "$Root\src\_quarantine\components\crud"

$Matches =
  Get-ChildItem -LiteralPath "$Root\src" -Recurse -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
  Select-String -Pattern "@/components/crud" -ErrorAction SilentlyContinue

if ($Matches) {
  Write-Host "STOP - components/crud encore importe." -ForegroundColor Red
  $Matches | ForEach-Object {
    Write-Host ("{0}:{1}" -f $_.Path, $_.LineNumber)
  }
  exit 1
}

if (-not (Test-Path $Target)) {
  Write-Host "ABSENT - components/crud deja retire." -ForegroundColor Yellow
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

Write-Host "OK - components/crud deplace en quarantaine." -ForegroundColor Green