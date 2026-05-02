Write-Host ""
Write-Host "Fixing useAuth SSR null issues..." `
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
  -Path "src\app" `
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

  $original = $content

  # -------------------------------------------------
  # Replace destructuring
  # -------------------------------------------------

  $content =
    $content -replace `
'const\s*\{\s*user\s*\}\s*=\s*useAuth\(\);',
@'
const auth = useAuth();

const user = auth?.user;
'@

  # -------------------------------------------------
  # SAVE
  # -------------------------------------------------

  if ($content -ne $original) {

    Set-Content `
      -LiteralPath $file.FullName `
      -Value $content

    Write-Host "Updated:" `
      $file.FullName `
      -ForegroundColor Yellow
  }
}

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "SSR auth fix completed." `
-ForegroundColor Green

Write-Host ""
Write-Host "Now run:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""