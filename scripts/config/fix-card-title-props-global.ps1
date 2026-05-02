Write-Host ""
Write-Host "Fixing Card title props globally..." `
-ForegroundColor Cyan

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# FIND TSX FILES
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

  # Replace only bare <Card>

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

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Card title fix completed." `
-ForegroundColor Green

Write-Host ""
Write-Host "Now run:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""