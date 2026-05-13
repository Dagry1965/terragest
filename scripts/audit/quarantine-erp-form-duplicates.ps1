$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

$Targets = @(
  "src\components\erp\forms\ERPButton.tsx",
  "src\components\erp\forms\ERPInput.tsx",
  "src\components\erp\forms\ERPFormSection.tsx"
)

foreach ($Target in $Targets) {
  $FullPath = Join-Path $Root $Target

  if (-not (Test-Path $FullPath)) {
    Write-Host "ABSENT $Target" -ForegroundColor DarkGray
    continue
  }

  $ImportPath = "@/" + ($Target -replace "\\", "/")
  $ImportPath = $ImportPath -replace ".tsx$", ""

  $Matches =
    Get-ChildItem -LiteralPath "$Root\src" -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
    Select-String -Pattern $ImportPath -ErrorAction SilentlyContinue

  if ($Matches) {
    Write-Host "STOP - encore importe : $Target" -ForegroundColor Red
    foreach ($Match in $Matches) {
      Write-Host ("{0}:{1}" -f $Match.Path, $Match.LineNumber)
    }
    continue
  }

  $QuarantineRoot = "$Root\src\_quarantine\components\erp\forms"

  if (-not (Test-Path $QuarantineRoot)) {
    New-Item -ItemType Directory -Path $QuarantineRoot -Force | Out-Null
  }

  $Destination = Join-Path $QuarantineRoot ([System.IO.Path]::GetFileName($FullPath))

  if (Test-Path $Destination) {
    Remove-Item $Destination -Force
  }

  Move-Item -LiteralPath $FullPath -Destination $Destination -Force

  Write-Host "MOVED TO QUARANTINE $Target" -ForegroundColor Green
}

Write-Host ""
Write-Host "Done. Run pnpm build." -ForegroundColor Cyan