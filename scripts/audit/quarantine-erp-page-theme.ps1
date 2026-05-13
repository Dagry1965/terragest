$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

$Targets = @(
  "src\components\erp\page",
  "src\components\erp\theme"
)

foreach ($Target in $Targets) {
  $FullPath = Join-Path $Root $Target

  if (-not (Test-Path $FullPath)) {
    Write-Host "ABSENT $Target" -ForegroundColor DarkGray
    continue
  }

  $ImportPattern = "@/" + ($Target -replace "\\", "/")

  $Matches =
    Get-ChildItem -LiteralPath "$Root\src" -Recurse -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
    Select-String -Pattern $ImportPattern -ErrorAction SilentlyContinue

  if ($Matches) {
    Write-Host "STOP - encore importe : $Target" -ForegroundColor Red
    foreach ($Match in $Matches) {
      Write-Host ("{0}:{1}" -f $Match.Path, $Match.LineNumber)
    }
    exit 1
  }

  $QuarantineRoot = "$Root\src\_quarantine\components\erp"
  if (-not (Test-Path $QuarantineRoot)) {
    New-Item -ItemType Directory -Path $QuarantineRoot -Force | Out-Null
  }

  $Name = Split-Path $FullPath -Leaf
  $Destination = Join-Path $QuarantineRoot $Name

  if (Test-Path $Destination) {
    Remove-Item $Destination -Recurse -Force
  }

  Move-Item -LiteralPath $FullPath -Destination $Destination -Force

  Write-Host "MOVED TO QUARANTINE $Target" -ForegroundColor Green
}

Write-Host ""
Write-Host "Done. Now run pnpm build." -ForegroundColor Cyan