Write-Host ""
Write-Host "Adding missing repository methods..." `
-ForegroundColor Cyan

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# TARGET
# =====================================================

$repositoryFile =
"src\features\produits\repositories\ProduitRepository.ts"

if (!(Test-Path $repositoryFile)) {

  Write-Host "ProduitRepository.ts not found." `
  -ForegroundColor Red

  exit
}

$content =
Get-Content `
  -LiteralPath $repositoryFile `
  -Raw

# =====================================================
# ADD updateStock METHOD
# =====================================================

if ($content -notmatch 'updateStock') {

  $method = @'

  static async updateStock(

    id: string,

    stockActuel: number

  ) {

    return true;
  }

'@

  $content =
    $content -replace `
    'static async getAllByOrganisation',
    "$method`r`n  static async getAllByOrganisation"

  Set-Content `
    -LiteralPath $repositoryFile `
    -Value $content

  Write-Host "Added updateStock()" `
    -ForegroundColor Yellow
}

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Repository patch completed." `
-ForegroundColor Green

Write-Host ""
Write-Host "Now run:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""