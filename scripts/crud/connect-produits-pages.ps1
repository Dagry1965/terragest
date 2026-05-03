$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " CONNECT PRODUITS PAGES"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# CREATE DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\app\(private)\produits",
  "$ProjectRoot\src\app\(private)\produits\nouveau"
)

foreach ($dir in $dirs) {

  if (!(Test-Path $dir)) {

    New-Item `
      -ItemType Directory `
      -Path $dir `
      -Force | Out-Null

    Write-Host "Created: $dir"
  }
}



# -------------------------------------------------
# PRODUITS PAGE
# -------------------------------------------------

$produitsPage = @'
import Link from "next/link";

import { ProductsTable }
from "@/features/produits/components/ProductsTable";

export default function ProduitsPage() {

  return (
    <div className="space-y-6">

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Produits
          </h1>

          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Gestion des produits
          </p>
        </div>

        <Link
          href="/produits/nouveau"
          className="
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
          "
        >
          Nouveau Produit
        </Link>
      </div>

      <ProductsTable />
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\produits\page.tsx",
  $produitsPage
)

Write-Host "Connected: produits/page.tsx"

# -------------------------------------------------
# NOUVEAU PRODUIT PAGE
# -------------------------------------------------

$newProductPage = @'
import { ProductForm }
from "@/features/produits/components/ProductForm";

export default function NouveauProduitPage() {

  return (
    <div className="space-y-6">

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Nouveau Produit
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Ajouter un produit
        </p>
      </div>

      <ProductForm />
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\produits\nouveau\page.tsx",
  $newProductPage
)

Write-Host "Connected: produits/nouveau/page.tsx"

Write-Host ""
Write-Host "======================================="
Write-Host " PRODUITS PAGES CONNECTED"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. firebase deploy"
Write-Host ""