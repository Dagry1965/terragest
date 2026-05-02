Write-Host "Generating Terragest UPDATE + DELETE Audit..." -ForegroundColor Cyan

# =====================================================
# UPDATE PRODUIT EDIT PAGE
# =====================================================

$editPage = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import toast from "react-hot-toast";

import { FormField } from "@/components/form/FormField";

import { Button } from "@/components/ui/Button";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { AuditService } from "@/features/audit/services/AuditService";

export default function EditProduitPage() {

  const params = useParams();

  const router = useRouter();

  const { user } = useAuth();

  const [nom, setNom] =
    useState("");

  const [categorie, setCategorie] =
    useState("");

  const [unite, setUnite] =
    useState("");

  const [prixUnitaire,
    setPrixUnitaire] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {

    loadProduit();

  }, []);

  const loadProduit = async () => {

    try {

      const produit =
        await ProduitService.getById(
          params.id as string
        );

      if (!produit) {
        return;
      }

      setNom(produit.nom);

      setCategorie(
        produit.categorie
      );

      setUnite(produit.unite);

      setPrixUnitaire(
        String(
          produit.prixUnitaire
        )
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur chargement produit"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleSave = async () => {

    try {

      if (!user) {
        return;
      }

      setSaving(true);

      await ProduitService.update(
        params.id as string,
        {
          nom,
          categorie,
          unite,
          prixUnitaire:
            Number(prixUnitaire),
        }
      );

      const utilisateur =
        await UtilisateurService.getById(
          user.uid
        );

      if (utilisateur) {

        await AuditService.log({

          organisationId:
            utilisateur.organisationId,

          utilisateurId:
            utilisateur.id,

          utilisateurNom:
            utilisateur.nom,

          action: "UPDATE",

          module: "PRODUITS",

          cibleId:
            params.id as string,

          cibleNom: nom,

          metadata: {
            categorie,
            unite,
          },

          createdAt:
            new Date().toISOString(),
        });
      }

      toast.success(
        "Produit modifié"
      );

      router.push(
        `/produits/${params.id}`
      );

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur modification"
      );

    } finally {

      setSaving(false);

    }
  };

  if (loading) {

    return (
      <div className="p-10">
        Chargement...
      </div>
    );
  }

  return (

    <div className="p-10">

      <div className="
        max-w-xl
        bg-white
        rounded-2xl
        shadow-md
        p-6
        space-y-6
      ">

        <div>

          <h1 className="text-3xl font-bold">
            Modifier Produit
          </h1>

        </div>

        <FormField
          label="Nom"
          inputProps={{
            value: nom,
            onChange: (e) =>
              setNom(e.target.value),
          }}
        />

        <FormField
          label="Catégorie"
          inputProps={{
            value: categorie,
            onChange: (e) =>
              setCategorie(
                e.target.value
              ),
          }}
        />

        <FormField
          label="Unité"
          inputProps={{
            value: unite,
            onChange: (e) =>
              setUnite(
                e.target.value
              ),
          }}
        />

        <FormField
          label="Prix unitaire"
          inputProps={{
            type: "number",
            value: prixUnitaire,
            onChange: (e) =>
              setPrixUnitaire(
                e.target.value
              ),
          }}
        />

        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full"
        >
          {saving
            ? "Sauvegarde..."
            : "Sauvegarder"}
        </Button>

      </div>

    </div>
  );
}
'@

Set-Content `
-LiteralPath 'src\app\(private)\produits\[id]\edit\page.tsx' `
-Value $editPage

# =====================================================
# UPDATE PRODUITS LIST PAGE
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

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { AuditService } from "@/features/audit/services/AuditService";

import { Produit } from "@/features/produits/types/Produit";

export default function ProduitsPage() {

  const router = useRouter();

  const { user } = useAuth();

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

    if (!user) {
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

      const utilisateur =
        await UtilisateurService.getById(
          user.uid
        );

      if (utilisateur) {

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
      }

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
          {
            label: "Supprimer",
            onClick: (row) =>
              handleDelete(row.id),
            className:
              "px-3 py-2 rounded-lg bg-red-600 text-white",
          },
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
Write-Host "Terragest UPDATE + DELETE Audit generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- UPDATE audit"
Write-Host "- DELETE audit"
Write-Host "- ERP traceability"
Write-Host "- Timeline activity"
Write-Host ""