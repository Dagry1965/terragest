# =====================================================
# FIX NULL PRODUIT CHECK
# =====================================================

Write-Host ""
Write-Host "Fixing nullable produit..." `
-ForegroundColor Cyan

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# TARGET FILE
# =====================================================

$file =
"src\app\(private)\produits\[id]\edit\page.tsx"

if (!(Test-Path -LiteralPath $file)) {

  Write-Host "File not found." `
  -ForegroundColor Red

  exit
}

$content =
Get-Content `
  -LiteralPath $file `
  -Raw

# =====================================================
# ADD NULL CHECK
# =====================================================

$pattern = @'
const produit =
\s*await ProduitService\.getById\(
\s*params\.id as string
\s*\);
'@

$replacement = @'
const produit =
  await ProduitService.getById(
    params.id as string
  );

if (!produit) {

  toast.error(
    "Produit introuvable"
  );

  return;
}
'@

$content =
[regex]::Replace(
  $content,
  $pattern,
  $replacement
)

# =====================================================
# SAVE
# =====================================================

Set-Content `
  -LiteralPath $file `
  -Value $content

Write-Host ""
Write-Host "Null produit check added." `
-ForegroundColor Green

Write-Host ""
Write-Host "Run now:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""