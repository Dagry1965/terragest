Write-Host "Generating Terragest Toast System..." -ForegroundColor Cyan

# =====================================================
# INSTALL PACKAGE
# =====================================================

pnpm add react-hot-toast

# =====================================================
# PROVIDER DIRECTORY
# =====================================================

New-Item -ItemType Directory -Force -Path "src\providers"

# =====================================================
# TOAST PROVIDER
# =====================================================

$toastProvider = @'
"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {

  return (

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: "12px",
          background: "#111",
          color: "#fff",
        },
      }}
    />
  );
};
'@

Set-Content `
"src\providers\ToastProvider.tsx" `
$toastProvider

# =====================================================
# UPDATE ROOT LAYOUT
# =====================================================

$rootLayout = @'
import type { Metadata } from "next";

import "./globals.css";

import { AuthProvider } from "@/providers/AuthProvider";

import { ToastProvider } from "@/providers/ToastProvider";

export const metadata: Metadata = {

  title: "Terragest",

  description:
    "ERP patrimonial rural intelligent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (

    <html lang="fr">

      <body>

        <AuthProvider>

          <ToastProvider />

          {children}

        </AuthProvider>

      </body>

    </html>
  );
}
'@

Set-Content `
"src\app\layout.tsx" `
$rootLayout

# =====================================================
# UPDATE PRODUIT FORM
# =====================================================

$produitForm = @'
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

import { FormField } from "@/components/form/FormField";

import { Button } from "@/components/ui/Button";

import { required } from "@/utils/validation/validators";

import { useAuth } from "@/providers/AuthProvider";

import { UtilisateurService } from "@/services/UtilisateurService";

import { ProduitService } from "@/features/produits/services/ProduitService";

export default function NouveauProduitPage() {

  const router = useRouter();

  const { user } = useAuth();

  const [nom, setNom] = useState("");

  const [categorie, setCategorie] = useState("");

  const [unite, setUnite] = useState("");

  const [prixUnitaire, setPrixUnitaire] = useState("");

  const [errors, setErrors] = useState<any>({});

  const [loading, setLoading] = useState(false);

  const validate = () => {

    const newErrors: any = {};

    if (!required(nom)) {
      newErrors.nom =
        "Nom obligatoire";
    }

    if (!required(categorie)) {
      newErrors.categorie =
        "Catégorie obligatoire";
    }

    if (!required(unite)) {
      newErrors.unite =
        "Unité obligatoire";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleCreate = async () => {

    try {

      if (!user) {
        return;
      }

      if (!validate()) {

        toast.error(
          "Veuillez corriger le formulaire"
        );

        return;
      }

      setLoading(true);

      const utilisateur =
        await UtilisateurService.getById(
          user.uid
        );

      if (!utilisateur) {
        return;
      }

      await ProduitService.create({

        id: "",

        organisationId:
          utilisateur.organisationId,

        nom,

        categorie,

        unite: unite as any,

        prixUnitaire:
          Number(prixUnitaire),

        stockActuel: 0,

        seuilAlerte: 0,

        statut: "ACTIF" as any,

        createdAt:
          new Date().toISOString(),
      });

      toast.success(
        "Produit créé avec succès"
      );

      router.push("/produits");

    } catch (err) {

      console.error(err);

      toast.error(
        "Erreur création produit"
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="p-10">

      <div className="max-w-xl bg-white rounded-2xl shadow-md p-6 space-y-6">

        <div>

          <h1 className="text-3xl font-bold">
            Nouveau Produit
          </h1>

          <p className="text-gray-500 mt-2">
            Création produit ERP
          </p>

        </div>

        <FormField
          label="Nom"
          error={errors.nom}
          inputProps={{
            value: nom,
            onChange: (e) =>
              setNom(e.target.value),
            placeholder: "Nom produit",
          }}
        />

        <FormField
          label="Catégorie"
          error={errors.categorie}
          inputProps={{
            value: categorie,
            onChange: (e) =>
              setCategorie(e.target.value),
            placeholder: "Catégorie",
          }}
        />

        <FormField
          label="Unité"
          error={errors.unite}
          inputProps={{
            value: unite,
            onChange: (e) =>
              setUnite(e.target.value),
            placeholder: "KG / LITRE / UNITE",
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
            placeholder: "Prix",
          }}
        />

        <Button
          onClick={handleCreate}
          disabled={loading}
          className="w-full"
        >
          {loading
            ? "Création..."
            : "Créer produit"}
        </Button>

      </div>

    </div>
  );
}
'@

Set-Content `
"src\app\(private)\produits\nouveau\page.tsx" `
$produitForm

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Toast System generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Features:" -ForegroundColor Yellow
Write-Host "- toast.success"
Write-Host "- toast.error"
Write-Host "- Global provider"
Write-Host "- Modern UX"
Write-Host ""