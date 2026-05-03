$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " PRODUITS CRUD ACTIONS"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# CREATE DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\app\(private)\produits\[id]\edit"
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
# PRODUCTS TABLE
# -------------------------------------------------

$productsTable = @'
"use client";

import Link from "next/link";

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

import { ConfirmDialog }
from "@/components/crud/ConfirmDialog";

import { useProducts }
from "@/features/produits/hooks/useProducts";

import { ProductsRepository }
from "@/features/produits/repositories/ProductsRepository";

export const ProductsTable =
() => {

  const {
    data,
    loading,
  } = useProducts();

  const [search, setSearch] =
    useState("");

  const [selectedId, setSelectedId] =
    useState<string | null>(null);

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

  async function handleDelete() {

    if (!selectedId) {

      return;
    }

    await ProductsRepository.delete(
      selectedId
    );

    setSelectedId(null);
  }

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

        <div
          className="
            bg-white
            rounded-2xl
            border
            overflow-hidden
          "
        >
          <table className="w-full">

            <thead
              className="
                bg-gray-100
              "
            >
              <tr>

                <th className="p-4">
                  Nom
                </th>

                <th className="p-4">
                  Catégorie
                </th>

                <th className="p-4">
                  Quantité
                </th>

                <th className="p-4">
                  Prix
                </th>

                <th className="p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredData.map(
                (item: any) => (

                <tr
                  key={item.id}
                  className="
                    border-t
                  "
                >
                  <td className="p-4">
                    {item.nom}
                  </td>

                  <td className="p-4">
                    {item.categorie}
                  </td>

                  <td className="p-4">
                    {item.quantite}
                  </td>

                  <td className="p-4">
                    {item.prix}
                  </td>

                  <td className="p-4">

                    <div
                      className="
                        flex
                        gap-2
                      "
                    >
                      <Link
                        href={`
                          /produits/
                          ${item.id}
                          /edit
                        `}
                        className="
                          px-3
                          py-2
                          rounded-lg
                          border
                        "
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          setSelectedId(
                            item.id
                          )
                        }
                        className="
                          px-3
                          py-2
                          rounded-lg
                          bg-red-600
                          text-white
                        "
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        open={!!selectedId}
        title="Supprimer produit"
        description="
          Confirmer la suppression ?
        "
        onConfirm={handleDelete}
        onCancel={() =>
          setSelectedId(null)
        }
      />
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
# EDIT PAGE
# -------------------------------------------------

$editPage = @'
type Props = {
  params: {
    id: string;
  };
};

export default function EditProduitPage({
  params,
}: Props) {

  return (
    <div className="space-y-6">

      <h1
        className="
          text-3xl
          font-bold
        "
      >
        Modifier Produit
      </h1>

      <p>
        Produit ID :
        {params.id}
      </p>

      <p>
        Formulaire édition
        à connecter
      </p>
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\produits\[id]\edit\page.tsx",
  $editPage
)

Write-Host "Created: edit page"

Write-Host ""
Write-Host "======================================="
Write-Host " PRODUITS ACTIONS COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. firebase deploy"
Write-Host ""
