Write-Host ""
Write-Host "Quarantining broken pages..." -ForegroundColor Cyan
Write-Host ""

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# QUARANTINE FOLDER
# =====================================================

$QUARANTINE =
"$ROOT\_quarantine"

New-Item `
  -ItemType Directory `
  -Force `
  -Path $QUARANTINE | Out-Null

# =====================================================
# MODULES TO DISABLE
# =====================================================

$folders = @(

  "src\app\(private)\ai-assistant",

  "src\app\(private)\analytics",

  "src\app\(private)\workflow-engine",

  "src\app\(private)\produits",

  "src\app\(private)\terrains",

  "src\app\(private)\ressources",

  "src\app\(private)\mouvements",

  "src\app\(private)\interventions",

  "src\app\(private)\materiels",

  "src\app\(private)\data-platform",

  "src\app\(private)\saas-platform",

  "src\app\(private)\realtime-products",

  "src\app\api\v1",

  "src\app\api\interventions",

  "src\app\api\organisations",

  "src\app\api\produits"
)

# =====================================================
# MOVE
# =====================================================

foreach ($folder in $folders) {

  $fullPath =
    Join-Path $ROOT $folder

  if (Test-Path $fullPath) {

    $destination =
      Join-Path `
        $QUARANTINE `
        (
          Split-Path `
            $folder `
            -Leaf
        )

    Move-Item `
      -Force `
      $fullPath `
      $destination

    Write-Host "Moved:" `
      $folder `
      -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "Quarantine completed." `
  -ForegroundColor Green
Write-Host ""