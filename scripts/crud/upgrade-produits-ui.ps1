$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " UPGRADE PRODUITS UI"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# PRODUCTS TABLE
# -------------------------------------------------

$productsTable = @'
"use client";

import {
  useMemo,
  useState,
} from "react";

import { DataTable }
from "@/components/crud/DataTable";

import { SearchBar }
from "@/components/crud/SearchBar";

import { EmptyState }
from "@/components/crud/EmptyState";

import { useProducts }
from "@/features/produits/hooks/useProducts";

export const ProductsTable =
() => {

  const {
    data,
    loading,
  } = useProducts();

  const [search, setSearch] =
    useState("");

  const filteredData =
    useMemo(() => {

      return data.filter(
        (item: any) => {

          const text = `
            ${item.nom}
            ${item.categorie}
          `
            .toLowerCase();

          return text.includes(
            search.toLowerCase()
          );
        }
      );

    }, [data, search]);

  if (loading) {

    return (
      <p>
        Chargement des produits...
      </p>
    );
  }

  return (
    <div className="space-y-4">

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      {filteredData.length === 0 ? (

        <EmptyState
          title="Aucun produit"
          description="
            Aucun produit disponible
          "
        />

      ) : (

        <DataTable
          data={filteredData}
          columns={[
            {
              key: "nom",
              label: "Nom",
            },
            {
              key: "categorie",
              label: "Catégorie",
            },
            {
              key: "quantite",
              label: "Quantité",
            },
            {
              key: "prix",
              label: "Prix",
            },
          ]}
        />
      )}
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\produits\components\ProductsTable.tsx",
  $productsTable
)

Write-Host "Updated: ProductsTable.tsx"

# -------------------------------------------------
# PRODUITS PAGE
# -------------------------------------------------

$produitsPage = @'
import { PageHeader }
from "@/components/crud/PageHeader";

import { ProductsTable }
from "@/features/produits/components/ProductsTable";

export default function ProduitsPage() {

  return (
    <div className="space-y-6">

      <PageHeader
        title="Produits"
        description="
          Gestion des produits agricoles
        "
        buttonLabel="Nouveau Produit"
        buttonHref="/produits/nouveau"
      />

      <ProductsTable />
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\produits\page.tsx",
  $produitsPage
)

Write-Host "Updated: produits/page.tsx"

Write-Host ""
Write-Host "======================================="
Write-Host " PRODUITS UI UPGRADED"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. firebase deploy"
Write-Host ""