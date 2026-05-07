Set-Location "C:\Users\Admin\terragest"

$quarantine =
".\src\_quarantine"

New-Item `
-ItemType Directory `
-Force `
-Path $quarantine | Out-Null

$targets = @(
  ".\src\components\layout",
  ".\src\components\sidebar",
  ".\src\components\topbar",
  ".\src\components\navigation",
  ".\src\components\legacy",
  ".\src\components\deprecated",
  ".\src\components\prototype",
  ".\src\ui\sidebar",
  ".\src\ui\topbar"
)

foreach ($target in $targets) {

  if (Test-Path $target) {

    $name =
      Split-Path $target -Leaf

    $destination =
      Join-Path $quarantine $name

    Write-Host ""
    Write-Host "QUARANTINE : $target"

    Move-Item `
    -Force `
    $target `
    $destination
  }
}

Write-Host ""
Write-Host "ERP CLEANUP DONE"
Write-Host ""