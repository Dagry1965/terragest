$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$QuarantineRoot = "$Root\src\_quarantine\app-backups"

$Backups =
  Get-ChildItem -LiteralPath "$Root\src\app" -Recurse -File |
  Where-Object {
    $_.Name -like "*.bak*" -or
    $_.Name -like "*.backup*" -or
    $_.Name -like "*.old*"
  }

if (-not (Test-Path $QuarantineRoot)) {
  New-Item -ItemType Directory -Path $QuarantineRoot -Force | Out-Null
}

foreach ($File in $Backups) {
  $Relative =
    $File.FullName.Replace("$Root\src\app\", "")

  $Destination =
    Join-Path $QuarantineRoot $Relative

  $DestinationDir =
    Split-Path $Destination -Parent

  if (-not (Test-Path $DestinationDir)) {
    New-Item -ItemType Directory -Path $DestinationDir -Force | Out-Null
  }

  Move-Item `
    -LiteralPath $File.FullName `
    -Destination $Destination `
    -Force

  Write-Host "MOVED $Relative" -ForegroundColor Green
}

Write-Host ""
Write-Host "Backups app mis en quarantaine." -ForegroundColor Cyan
Write-Host "Run: pnpm build" -ForegroundColor Cyan