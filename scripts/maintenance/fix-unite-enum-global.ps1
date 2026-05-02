Write-Host ""
Write-Host "Fixing UNITE enum typing globally..." `
-ForegroundColor Cyan

# =====================================================
# ROOT
# =====================================================

$ROOT =
"C:\Users\Admin\terragest"

Set-Location $ROOT

# =====================================================
# TARGET FILES
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
  # ADD IMPORT
  # -------------------------------------------------

  if (
    $content -notmatch 'UNITE'
  ) {

    $content =
      $content -replace `
      'from "@/features/produits/services/ProduitService";',
@'
from "@/features/produits/services/ProduitService";

import { UNITE }
from "@/features/produits/types/UNITE";
'@
  }

  # -------------------------------------------------
  # FIX useState("")
  # -------------------------------------------------

  $content =
    $content -replace `
    'const \[unite,\s*setUnite\]\s*=\s*useState\(""\);',
@'
const [unite, setUnite] =
  useState<UNITE>(UNITE.KG);
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
Write-Host "UNITE enum typing fix completed." `
-ForegroundColor Green

Write-Host ""
Write-Host "Now run:" `
-ForegroundColor Cyan

Write-Host "pnpm build" `
-ForegroundColor White

Write-Host ""