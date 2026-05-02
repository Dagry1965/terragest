Write-Host "Generating Terragest Export Engine..." -ForegroundColor Cyan

# =====================================================
# DIRECTORIES
# =====================================================

mkdir "src\features\exports" -Force
mkdir "src\features\exports\services" -Force
mkdir "src\features\exports\components" -Force

# =====================================================
# EXPORT SERVICE
# =====================================================

$exportService = @'
"use client";

import * as XLSX from "xlsx";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

export const ExportService = {

  exportExcel(
    data: any[],
    fileName: string
  ) {

    const worksheet =
      XLSX.utils.json_to_sheet(
        data
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Data"
    );

    XLSX.writeFile(
      workbook,
      `${fileName}.xlsx`
    );
  },

  exportPdf(
    data: any[],
    fileName: string
  ) {

    const doc = new jsPDF();

    if (data.length === 0) {

      doc.text(
        "Aucune donnée",
        20,
        20
      );

      doc.save(
        `${fileName}.pdf`
      );

      return;
    }

    const headers =
      Object.keys(data[0]);

    const rows =
      data.map(
        (item) =>
          headers.map(
            (header) =>
              String(
                item[header] ?? ""
              )
          )
      );

    autoTable(doc, {

      head: [headers],

      body: rows,
    });

    doc.save(
      `${fileName}.pdf`
    );
  },
};
'@

Set-Content `
"src\features\exports\services\ExportService.ts" `
$exportService

# =====================================================
# EXPORT BUTTONS COMPONENT
# =====================================================

$exportButtons = @'
"use client";

import { ExportService } from "@/features/exports/services/ExportService";

interface ExportButtonsProps {

  data: any[];

  fileName: string;
}

export const ExportButtons = ({
  data,
  fileName,
}: ExportButtonsProps) => {

  return (

    <div className="
      flex
      items-center
      gap-3
    ">

      <button
        onClick={() =>
          ExportService.exportExcel(
            data,
            fileName
          )
        }
        className="
          px-4
          py-3
          rounded-xl
          bg-green-600
          text-white
        "
      >
        Export Excel
      </button>

      <button
        onClick={() =>
          ExportService.exportPdf(
            data,
            fileName
          )
        }
        className="
          px-4
          py-3
          rounded-xl
          bg-red-600
          text-white
        "
      >
        Export PDF
      </button>

    </div>
  );
}
'@

Set-Content `
"src\features\exports\components\ExportButtons.tsx" `
$exportButtons

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

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { DataTable } from "@/components/data-table/DataTable";

import { ExportButtons } from "@/features/exports/components/ExportButtons";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { AuditService } from "@/features/audit/services/AuditService";

import { RoleGuard } from "@/features/auth/components/RoleGuard";

import { Produit } from "@/features/produits/types/Produit";

export default function ProduitsPage() {

  const router = useRouter();

  const { user } = useAuth();

  const [utilisateur,
    setUtilisateur] =
    useState<any>(null);

  const [produits, setProduits] =
    useState<Produit[]>([]);

  const [loading, setLoading] =
    useState(true);

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

      const utilisateurData =
        await UtilisateurService.getById(
          user.uid
        );

      if (!utilisateurData) {
        return;
      }

      setUtilisateur(
        utilisateurData
      );

      const data =
        await ProduitService.getAllByOrganisation(
          utilisateurData.organisationId
        );

      setProduits(data as Produit[]);

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur chargement produits"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async (
    produitId: string
  ) => {

    if (!user || !utilisateur) {
      return;
    }

    const confirmed =
      window.confirm(
        "Supprimer ce produit ?"
      );

    if (!confirmed) {
      return;
    }

    try {

      const produit =
        produits.find(
          (item) =>
            item.id === produitId
        );

      await ProduitService.delete(
        produitId
      );

      await AuditService.log({

        organisationId:
          utilisateur.organisationId,

        utilisateurId:
          utilisateur.id,

        utilisateurNom:
          utilisateur.nom,

        action: "DELETE",

        module: "PRODUITS",

        cibleId: produitId,

        cibleNom:
          produit?.nom ?? "",

        createdAt:
          new Date().toISOString(),
      });

      toast.success(
        "Produit supprimé"
      );

      setProduits((prev) =>
        prev.filter(
          (item) =>
            item.id !== produitId
        )
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur suppression"
      );
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

    <div className="p-10 space-y-6">

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <h1 className="text-3xl font-bold">
            Produits
          </h1>

          <p className="text-gray-500 mt-2">
            Gestion des produits
          </p>

        </div>

        <div className="
          flex
          items-center
          gap-3
        ">

          <ExportButtons
            data={produits}
            fileName="produits"
          />

          <RoleGuard
            role={utilisateur?.role}
            permission="CAN_CREATE"
          >

            <Link
              href="/produits/nouveau"
              className="
                bg-black
                text-white
                px-4
                py-3
                rounded-xl
              "
            >
              Nouveau produit
            </Link>

          </RoleGuard>

        </div>

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
        actions={[
          {
            label: "Voir",
            onClick: (row) =>
              router.push(
                `/produits/${row.id}`
              ),
          },
          {
            label: "Modifier",
            onClick: (row) =>
              router.push(
                `/produits/${row.id}/edit`
              ),
            className:
              "px-3 py-2 rounded-lg bg-blue-600 text-white",
          },
          ...(utilisateur?.role ===
            "ADMIN" ||

            utilisateur?.role ===
            "SUPERVISEUR"

            ? [
                {
                  label: "Supprimer",

                  onClick: (row: any) =>
                    handleDelete(
                      row.id
                    ),

                  className:
                    "px-3 py-2 rounded-lg bg-red-600 text-white",
                },
              ]

            : []),
        ]}
      />

    </div>
  );
}
'@

Set-Content `
"src\app\(private)\produits\page.tsx" `
$produitsPage

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Export Engine generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- ExportService"
Write-Host "- ExportButtons"
Write-Host "- Excel export"
Write-Host "- PDF export"
Write-Host "- ERP reporting engine"
Write-Host ""