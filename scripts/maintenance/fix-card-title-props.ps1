Write-Host ""
Write-Host "Fixing missing Card title props..." -ForegroundColor Cyan
Write-Host ""

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# FILES
# =====================================================

$files =
Get-ChildItem `
  -Path "src" `
  -Recurse `
  -File `
  -Include *.tsx

# =====================================================
# PROCESS
# =====================================================

foreach ($file in $files) {

  $content =
    Get-Content `
      -LiteralPath $file.FullName `
      -Raw

  $updated =
    $content -replace '<Card>', '<Card title="Section">'

  if ($updated -ne $content) {

    Set-Content `
      -LiteralPath $file.FullName `
      -Value $updated

    Write-Host "Updated:" `
      $file.FullName `
      -ForegroundColor Yellow
  }
}

Write-Host ""
Write-Host "Card props fix completed." `
  -ForegroundColor Green
Write-Host ""