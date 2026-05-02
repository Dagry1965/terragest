# =====================================================
# FIX STOCK TYPE NAME
# =====================================================

Write-Host ""
Write-Host "Fixing stock type naming..." `
-ForegroundColor Cyan

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# TARGET FILE
# =====================================================

$file =
"src\features\stocks\repositories\firestore\FirestoreStockRepository.ts"

if (!(Test-Path $file)) {

  Write-Host "File not found." `
  -ForegroundColor Red

  exit
}

$content =
Get-Content `
  -LiteralPath $file `
  -Raw

# =====================================================
# FIX IMPORT
# =====================================================

$content =
$content -replace `
'import\s*\{\s*MouvementStock\s*\}',
'import { MOUVEMENT_STOCK }'

# =====================================================
# FIX TYPES
# =====================================================

$content =
$content -replace `
'MouvementStock',
'MOUVEMENT_STOCK'

# =====================================================
# SAVE
# =====================================================

Set-Content `
  -LiteralPath $file `
  -Value $content

Write-Host ""
Write-Host "Stock type fixed." `
-ForegroundColor Green

Write-Host ""
Write-Host "Run now:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""