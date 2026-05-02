Write-Host "Generating Terragest Produits Full CRUD..." -ForegroundColor Cyan

# =====================================================
# CREATE DIRECTORIES
# =====================================================

mkdir 'src\app\(private)\produits\[id]' -Force
mkdir 'src\app\(private)\produits\[id]\edit' -Force

# =====================================================
# PRODUIT DETAIL PAGE
# =====================================================

$detailPage = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import { useParams } from "next/navigation";

import toast from "react-hot-toast";

import { DeleteButton } from "@/components/dialogs/DeleteButton";

import { Card } from "@/components/ui/Card";

import { SkeletonCard } from "@/components/ui/SkeletonCard";

import { EmptyState } from "@/components/ui/EmptyState";

import { ProduitService } from "@/features/produits/services/ProduitService";

import { Produit } from "@/features/produits/types/Produit";

export default function ProduitDetailPage() {

  const params = useParams();

  const [produit, setProduit] =
    useState<Produit | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadProduit();

  }, []);

  const loadProduit = async () => {

    try {

      const data =
        await ProduitService.getById(
          params.id as string
        );

      setProduit(data);

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur chargement produit"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleDelete = async () => {

    if (!produit) {
      return;
    }

    await ProduitService.delete(
      produit.id
    );

    window.location.href =
      "/produits";
  };

  if (loading) {

    return (

      <div className="p-10">

        <SkeletonCard />

      </div>

    );
  }

  if (!produit) {

    return (

      <div className="p-10">

        <EmptyState
          title="Produit introuvable"
        />

      </div>

    );
  }

  return (

    <div className="p-10 space-y-6">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            {produit.nom}
          </h1>

          <p className="text-gray-500 mt-2">
            Détail produit ERP
          </p>

        </div>

        <div className="flex items-center gap-3">

          <Link
            href={`/produits/${produit.id}/edit`}
            className="px-4 py-3 rounded-xl bg-black text-white"
          >
            Modifier
          </Link>

          <DeleteButton
            itemName={produit.nom}
            onDelete={handleDelete}
          />

        </div>

      </div>

      <Card>

        <div className="space-y-4">

          <div>

            <p className="text-gray-500">
              Catégorie
            </p>

            <p className="font-semibold">
              {produit.categorie}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Unité
            </p>

            <p className="font-semibold">
              {produit.unite}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Stock actuel
            </p>

            <p className="font-semibold">
              {produit.stockActuel}
            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Prix unitaire
            </p>

            <p className="font-semibold">
              {produit.prixUnitaire}
            </p>

          </div>

        </div>

      </Card>

    </div>
  );
}
'@

Set-Content `
-LiteralPath 'src\app\(private)\produits\[id]\page.tsx' `
-Value $detailPage

# =====================================================
# PRODUIT EDIT PAGE
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

import { ProduitService } from "@/features/produits/services/ProduitService";

export default function EditProduitPage() {

  const params = useParams();

  const router = useRouter();

  const [nom, setNom] = useState("");

  const [categorie, setCategorie] =
    useState("");

  const [unite, setUnite] =
    useState("");

  const [prixUnitaire, setPrixUnitaire] =
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

      setCategorie(produit.categorie);

      setUnite(produit.unite);

      setPrixUnitaire(
        String(produit.prixUnitaire)
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

      <div className="max-w-xl bg-white rounded-2xl shadow-md p-6 space-y-6">

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
              setCategorie(e.target.value),
          }}
        />

        <FormField
          label="Unité"
          inputProps={{
            value: unite,
            onChange: (e) =>
              setUnite(e.target.value),
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
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Produits Full CRUD generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- Produit detail"
Write-Host "- Produit edit"
Write-Host "- Produit delete"
Write-Host "- CRUD workflow"
Write-Host ""