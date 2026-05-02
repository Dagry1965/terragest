# =====================================================
# ADD DELETE SUPPORT TO PRODUITS
# =====================================================

Write-Host ""
Write-Host "Adding delete support..." `
-ForegroundColor Cyan

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# FILES
# =====================================================

$repoFile =
"src\features\produits\repositories\firestore\FirestoreProduitRepository.ts"

$serviceFile =
"src\features\produits\services\ProduitService.ts"

# =====================================================
# REPOSITORY
# =====================================================

if (Test-Path $repoFile) {

  $repoContent =
    Get-Content `
      -LiteralPath $repoFile `
      -Raw

  # -------------------------------------------------
  # ADD deleteDoc IMPORT
  # -------------------------------------------------

  if ($repoContent -notmatch
    'deleteDoc') {

    $repoContent =
      $repoContent -replace `
'updateDoc',
'updateDoc,
  deleteDoc'
  }

  # -------------------------------------------------
  # ADD delete METHOD
  # -------------------------------------------------

  if ($repoContent -notmatch
    'static async delete') {

    $method = @'

  static async delete(
    id: string
  ) {

    await deleteDoc(

      doc(
        db,
        COLLECTION,
        id
      )
    );
  }
'@

    $repoContent =
      $repoContent -replace `
'\}\s*$',
"$method`r`n}"
  }

  Set-Content `
    -LiteralPath $repoFile `
    -Value $repoContent

  Write-Host `
  "Repository updated." `
  -ForegroundColor Yellow
}

# =====================================================
# SERVICE
# =====================================================

if (Test-Path $serviceFile) {

  $serviceContent =
    Get-Content `
      -LiteralPath $serviceFile `
      -Raw

  if ($serviceContent -notmatch
    'async delete') {

    $serviceMethod = @'

  async delete(
    id: string
  ) {

    return FirestoreProduitRepository
      .delete(id);
  },
'@

    $serviceContent =
      $serviceContent -replace `
'\}\s*;$',
"$serviceMethod`r`n};"
  }

  Set-Content `
    -LiteralPath $serviceFile `
    -Value $serviceContent

  Write-Host `
  "Service updated." `
  -ForegroundColor Yellow
}

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Delete support added." `
-ForegroundColor Green

Write-Host ""
Write-Host "Run now:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""