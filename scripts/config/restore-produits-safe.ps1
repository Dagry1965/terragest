# =====================================================
# TERRAGEST
# RESTORE PRODUITS MODULE
# =====================================================

Set-Location `
"C:\Users\Admin\terragest"

# =====================================================
# PRODUITS PAGE
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\app\(private)\produits"

$produitsPage = @'
"use client";

import Link
from "next/link";

export default function ProduitsPage() {

  return (

    <div className="p-10">

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          Produits
        </h1>

        <Link
          href="/produits/nouveau"
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Nouveau
        </Link>

      </div>

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        Module Produits OK

      </div>

    </div>
  );
}
'@

Set-Content `
-Path `
"src\app\(private)\produits\page.tsx" `
-Value $produitsPage

# =====================================================
# PRODUIT NOUVEAU
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\app\(private)\produits\nouveau"

$nouveauProduit = @'
"use client";

export const dynamic =
  "force-dynamic";

export default function NouveauProduitPage() {

  return (

    <div className="p-10">

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Nouveau Produit
        </h1>

        <p>
          Formulaire sécurisé SSR OK
        </p>

      </div>

    </div>
  );
}
'@

Set-Content `
-Path `
"src\app\(private)\produits\nouveau\page.tsx" `
-Value $nouveauProduit

# =====================================================
# PRODUIT DETAIL
# =====================================================

New-Item `
-ItemType Directory `
-Force `
-Path `
"src\app\(private)\produits\[id]"

$produitDetail = @'
"use client";

import {
  useParams
}
from "next/navigation";

export default function ProduitDetailPage() {

  const params =
    useParams();

  return (

    <div className="p-10">

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Produit
        </h1>

        <p>
          ID :
          {params.id}
        </p>

      </div>

    </div>
  );
}
'@

Set-Content `
-Path `
"src\app\(private)\produits\[id]\page.tsx" `
-Value $produitDetail

# =====================================================
# BUILD
# =====================================================

Write-Host ""
Write-Host "Running build..." `
-ForegroundColor Cyan

pnpm build

Write-Host ""
Write-Host "Deploy after success:" `
-ForegroundColor Green

Write-Host "firebase deploy"

Write-Host ""