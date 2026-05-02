Write-Host "Generating Terragest Form Engine..." -ForegroundColor Cyan

# =====================================================
# FORM DIRECTORY
# =====================================================

New-Item -ItemType Directory -Force -Path "src\components\form"

# =====================================================
# FORM FIELD
# =====================================================

$formField = @'
interface FormFieldProps {

  label: string;

  error?: string;

  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const FormField = ({
  label,
  error,
  inputProps,
}: FormFieldProps) => {

  return (

    <div className="space-y-2">

      <label className="block text-sm font-medium">

        {label}

      </label>

      <input
        {...inputProps}
        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
      />

      {error && (

        <p className="text-sm text-red-500">

          {error}

        </p>

      )}

    </div>
  );
};
'@

Set-Content `
"src\components\form\FormField.tsx" `
$formField

# =====================================================
# SELECT FIELD
# =====================================================

$selectField = @'
interface SelectOption {

  label: string;

  value: string;
}

interface SelectFieldProps {

  label: string;

  value: string;

  error?: string;

  options: SelectOption[];

  onChange: (
    value: string
  ) => void;
}

export const SelectField = ({
  label,
  value,
  error,
  options,
  onChange,
}: SelectFieldProps) => {

  return (

    <div className="space-y-2">

      <label className="block text-sm font-medium">

        {label}

      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-black"
      >

        <option value="">
          Sélectionner
        </option>

        {options.map((option) => (

          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>

        ))}

      </select>

      {error && (

        <p className="text-sm text-red-500">

          {error}

        </p>

      )}

    </div>
  );
};
'@

Set-Content `
"src\components\form\SelectField.tsx" `
$selectField

# =====================================================
# TEXTAREA FIELD
# =====================================================

$textAreaField = @'
interface TextAreaFieldProps {

  label: string;

  value: string;

  error?: string;

  onChange: (
    value: string
  ) => void;
}

export const TextAreaField = ({
  label,
  value,
  error,
  onChange,
}: TextAreaFieldProps) => {

  return (

    <div className="space-y-2">

      <label className="block text-sm font-medium">

        {label}

      </label>

      <textarea
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full border rounded-xl p-3 min-h-32 outline-none focus:ring-2 focus:ring-black"
      />

      {error && (

        <p className="text-sm text-red-500">

          {error}

        </p>

      )}

    </div>
  );
};
'@

Set-Content `
"src\components\form\TextAreaField.tsx" `
$textAreaField

# =====================================================
# SIMPLE VALIDATOR
# =====================================================

New-Item -ItemType Directory -Force -Path "src\utils\validation"

$validator = @'
export const required = (
  value: string
) => {

  return value.trim() !== "";
};

export const minLength = (
  value: string,
  length: number
) => {

  return value.trim().length >= length;
};
'@

Set-Content `
"src\utils\validation\validators.ts" `
$validator

# =====================================================
# UPDATE PRODUIT FORM PAGE
# =====================================================

$produitForm = @'
"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import AppLayout from "@/components/layout/AppLayout";

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

        unite,

        prixUnitaire:
          Number(prixUnitaire),

        stockActuel: 0,

        seuilAlerte: 0,

        statut: "ACTIF",

        createdAt:
          new Date().toISOString(),
      });

      router.push("/produits");

    } catch (err) {

      console.error(err);

      alert("Erreur création produit");

    } finally {

      setLoading(false);

    }
  };

  return (

    <AppLayout>

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

    </AppLayout>
  );
}
'@

Set-Content `
"src\app\produits\nouveau\page.tsx" `
$produitForm

# =====================================================
# DONE
# =====================================================

Write-Host ""
Write-Host "Terragest Form Engine generated successfully." -ForegroundColor Green
Write-Host ""
Write-Host "Generated:" -ForegroundColor Yellow
Write-Host "- FormField"
Write-Host "- SelectField"
Write-Host "- TextAreaField"
Write-Host "- Validation utils"
Write-Host "- Updated Produit form"
Write-Host ""