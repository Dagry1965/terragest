Write-Host "Generating Terragest ERP DataTable..." -ForegroundColor Cyan

# =====================================================
# COMPONENT DIRECTORY
# =====================================================

New-Item -ItemType Directory -Force -Path "src\components\data-table"

# =====================================================
# DATA TABLE COMPONENT
# =====================================================

$dataTable = @'
"use client";

import {
  useMemo,
  useState,
} from "react";

interface Column {
  key: string;
  label: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

export const DataTable = ({
  columns,
  data,
}: DataTableProps) => {

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredData = useMemo(() => {

    return data.filter((item) =>

      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [data, search]);

  const paginatedData = useMemo(() => {

    const start =
      (page - 1) * pageSize;

    return filteredData.slice(
      start,
      start + pageSize
    );

  }, [filteredData, page]);

  const totalPages =
    Math.ceil(
      filteredData.length / pageSize
    );

  return (

    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <input
          type="text"
          placeholder="Recherche..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded-xl p-3 w-80"
        />

      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              {columns.map((column) => (

                <th
                  key={column.key}
                  className="text-left p-4 font-semibold"
                >
                  {column.label}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {paginatedData.map((row, index) => (

              <tr
                key={index}
                className="border-t"
              >

                {columns.map((column) => (

                  <td
                    key={column.key}
                    className="p-4"
                  >
                    {String(
                      row[column.key] ?? ""
                    )}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-500">

          {filteredData.length} résultat(s)

        </p>

        <div className="flex items-center gap-2">

          <button
            onClick={() =>
              setPage((p) =>
                Math.max(p - 1, 1)
              )
            }
            className="px-4 py-2 rounded-lg bg-gray-200"
          >
            Précédent
          </button>

          <span className="text-sm">

            Page {page} / {totalPages || 1}

          </span>

          <button
            onClick={() =>
              setPage((p) =>
                Math.min(
                  p + 1,
                  totalPages
                )
              )
            }
            className="px-4 py-2 rounded-lg bg-gray-200"
          >
            Suivant
          </button>

        </div>

      </div>

    </div>
  );
}
'@

Set-Content `
"src\components\data-table\DataTable.tsx" `
$dataTable

# =====================================================
# UPDATE PRODUITS PAGE
# =====================================================

$produitsPage = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import AppLayout from "@/components/layout/AppLayout";

import { DataTable } from "@/components/data-table/DataTable";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { Produit } from "@/features/produits/types/Produit";

export default function ProduitsPage() {

  const { user } = useAuth();

  const [produits, setProduits] = useState<Produit[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) {
      loadProduits();
    }

  }, [user]);

  const loadProduits = async () => {

    try {

      if (!user) {
        return;
      }

      const utilisateur =
        await UtilisateurService.getById(
          user.uid
        );

      if (!utilisateur) {
        return;
      }

      const data =
        await ProduitService.getAllByOrganisation(
          utilisateur.organisationId
        );

      setProduits(data as Produit[]);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {

    return (
      <main className="p-10">
        Chargement...
      </main>
    );
  }

  return (

    <AppLayout>

      <div className="p-10 space-y-6">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Produits
            </h1>

            <p className="text-gray-500 mt-2">
              Gestion des produits
            </p>

          </div>

          <Link
            href="/produits/nouveau"
            className="bg-black text-white px-4 py-3 rounded-xl"
          >
            Nouveau produit
          </Link>

        </div>

        <DataTable
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
              key: "unite",
              label: "Unité",
            },
            {
              key: "stockActuel",
              label: "Stock",
            },
            {
              key: "prixUnitaire",
              label: "Prix",
            },
          ]}
          data={produits}
        />

      </div>

    </AppLayout>
  );
}
'@

Set-Content `
"src\app\produits\page.tsx" `
$produitsPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest ERP DataTable generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Next:" -ForegroundColor Yellow
Write-Host "1. pnpm dev"
Write-Host "2. Open /produits"
Write-Host "3. Test search & pagination"
Write-Host ""