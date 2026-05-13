$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"
$Target = "$Root\src\components\erp\shell\ErpTopbar.tsx"
$Quarantine = "$Root\src\_quarantine\components\erp\shell\ErpTopbar.tsx"

$Matches =
  Get-ChildItem -LiteralPath "$Root\src" -Recurse -File -Include *.ts,*.tsx -ErrorAction SilentlyContinue |
  Where-Object {
    $_.FullName -notlike "$Root\src\_quarantine\*" -and
    $_.FullName -ne $Target
  } |
  Select-String -Pattern "./ErpTopbar","/ErpTopbar","ErpTopbar.tsx" -ErrorAction SilentlyContinue

$Dir = Split-Path $Quarantine -Parent

if (-not (Test-Path $Dir)) {
  New-Item -ItemType Directory -Path $Dir -Force | Out-Null
}

Move-Item -LiteralPath $Target -Destination $Quarantine -Force

Write-Host "OK - ErpTopbar duplicate en quarantaine." -ForegroundColor Green