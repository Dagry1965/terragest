Write-Host ""
Write-Host "Fixing mouvement-stock.type..." `
-ForegroundColor Cyan

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# TYPES DIRECTORY
# =====================================================

New-Item `
  -ItemType Directory `
  -Force `
  -Path "src\types" | Out-Null

# =====================================================
# CREATE mouvement-stock.type.ts
# =====================================================

$typeFile =
"src\types\mouvement-stock.type.ts"

$typeContent = @'
export enum MouvementStockType {

  ENTREE = "ENTREE",

  SORTIE = "SORTIE",

  AJUSTEMENT = "AJUSTEMENT",

  TRANSFERT = "TRANSFERT",
}
'@

Set-Content `
  -LiteralPath $typeFile `
  -Value $typeContent

Write-Host "Created mouvement-stock.type.ts" `
-ForegroundColor Yellow

# =====================================================
# VERIFY MOUVEMENT_STOCK.ts
# =====================================================

$stockFile =
"src\types\MOUVEMENT_STOCK.ts"

if (Test-Path $stockFile) {

  $content =
    Get-Content `
      -LiteralPath $stockFile `
      -Raw

  if ($content -notmatch 'MouvementStockType') {

    $fixed = @'
import { MouvementStockType }
from "./mouvement-stock.type";

export interface MouvementStock {

  id: string;

  produitId: string;

  organisationId: string;

  type: MouvementStockType;

  quantite: number;

  commentaire?: string;

  createdAt: Date;

  createdBy: string;
}
'@

    Set-Content `
      -LiteralPath $stockFile `
      -Value $fixed

    Write-Host "Fixed MOUVEMENT_STOCK.ts" `
    -ForegroundColor Yellow
  }
}

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Mouvement stock type fix completed." `
-ForegroundColor Green

Write-Host ""
Write-Host "Now run:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""