$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Target = "$Root\src\components\dialogs"
$Quarantine = "$Root\src\_quarantine\components\dialogs"

$Matches =
  Get-ChildItem -LiteralPath "$Root\src" -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
  Where-Object {
    $_.FullName -notlike "$Root\src\components\dialogs\*"
  } |
  Select-String -Pattern "@/components/dialogs" -ErrorAction SilentlyContinue

if ($Matches) {
  Write-Host "STOP - components/dialogs encore importe." -ForegroundColor Red
  foreach ($Match in $Matches) {
    Write-Host ("{0}:{1}" -f $Match.Path, $Match.LineNumber)
  }
  exit 1
}

if (-not (Test-Path $Target)) {
  Write-Host "ABSENT - components/dialogs deja retire." -ForegroundColor Yellow
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

Write-Host "OK - dialogs legacy en quarantaine." -ForegroundColor Green