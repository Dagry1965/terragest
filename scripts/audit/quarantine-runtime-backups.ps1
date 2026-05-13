$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$QuarantineRoot = "$Root\src\_quarantine\runtime-backups"

$Backups =
  Get-ChildItem -LiteralPath "$Root\src\runtime" -Recurse -File |
  Where-Object {
    $_.Name -like "*.bak*" -or
    $_.Name -like "*.backup*" -or
    $_.Name -like "*.old*"
  }

if (-not (Test-Path $QuarantineRoot)) {
  New-Item -ItemType Directory -Path $QuarantineRoot -Force | Out-Null
}

foreach ($File in $Backups) {
  $Relative = $File.FullName.Replace("$Root\src\runtime\", "")
  $Destination = Join-Path $QuarantineRoot $Relative
  $Dir = Split-Path $Destination -Parent

  if (-not (Test-Path $Dir)) {
    New-Item -ItemType Directory -Path $Dir -Force | Out-Null
  }

  Move-Item -LiteralPath $File.FullName -Destination $Destination -Force

  Write-Host "MOVED $Relative" -ForegroundColor Green
}

Write-Host "Runtime backups mis en quarantaine." -ForegroundColor Cyan