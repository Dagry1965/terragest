# =====================================================
# WIRE FIRESTORE PRODUIT REPOSITORY
# =====================================================

Write-Host ""
Write-Host "Wiring FirestoreProduitRepository..." `
-ForegroundColor Cyan

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# TARGET FILE
# =====================================================

$file =
"src\features\produits\services\ProduitService.ts"

if (!(Test-Path $file)) {

  Write-Host "ProduitService.ts not found." `
  -ForegroundColor Red

  exit
}

$content =
Get-Content `
  -LiteralPath $file `
  -Raw

# =====================================================
# REMOVE OLD IMPORT
# =====================================================

$content =
$content -replace `
'import\s*\{?\s*ProduitRepository\s*\}?\s*from\s*".*?";',
''

# =====================================================
# ADD NEW IMPORT
# =====================================================

if ($content -notmatch
'FirestoreProduitRepository') {

  $import = @'
import {
  FirestoreProduitRepository
}
from "../repositories/firestore/FirestoreProduitRepository";

'@

  $content =
    $import + $content
}

# =====================================================
# REPLACE create
# =====================================================

$content =
$content -replace `
'ProduitRepository\.create',
'FirestoreProduitRepository.create'

# =====================================================
# REPLACE getAllByOrganisation
# =====================================================

$content =
$content -replace `
'ProduitRepository\.getAllByOrganisation\(\s*organisationId\s*\)',
'FirestoreProduitRepository.getAll()'

# =====================================================
# REPLACE getById
# =====================================================

$content =
$content -replace `
'ProduitRepository\.getById',
'FirestoreProduitRepository.getById'

# =====================================================
# REPLACE update
# =====================================================

$content =
$content -replace `
'ProduitRepository\.update',
'FirestoreProduitRepository.update'

# =====================================================
# SAVE
# =====================================================

Set-Content `
  -LiteralPath $file `
  -Value $content

Write-Host ""
Write-Host "ProduitService wired successfully." `
-ForegroundColor Green

Write-Host ""
Write-Host "Run now:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""
Write-Host "Then:" `
-ForegroundColor Cyan

Write-Host "firebase deploy" `
-ForegroundColor White

Write-Host ""