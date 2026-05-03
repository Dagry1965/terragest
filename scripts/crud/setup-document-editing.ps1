$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " DOCUMENT EDITING SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# CREATE DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\hooks",
  "$ProjectRoot\src\features\produits\components"
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
# USE DOCUMENT HOOK
# -------------------------------------------------

$useDocument = @'
"use client";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";

import {
  useEffect,
  useState,
} from "react";

import { db }
from "@/lib/firebase/config";

export function useDocument<T>(
  collectionName: string,
  id: string
) {

  const [data, setData] =
    useState<T | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    if (!id) {

      return;
    }

    const unsubscribe =
      onSnapshot(
        doc(
          db,
          collectionName,
          id
        ),
        (snapshot) => {

          setData({
            id: snapshot.id,
            ...snapshot.data(),
          } as T);

          setLoading(false);
        }
      );

    return () => unsubscribe();

  }, [collectionName, id]);

  return {
    data,
    loading,
  };
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\hooks\useDocument.ts",
  $useDocument
)

Write-Host "Created: useDocument.ts"

# -------------------------------------------------
# PRODUCT EDIT FORM
# -------------------------------------------------

$productEditForm = @'
"use client";

import {
  useEffect,
  useState,
} from "react";

import { EntityForm }
from "@/components/crud/EntityForm";

import { useDocument }
from "@/hooks/useDocument";

import { Product }
from "@/features/produits/types/Product";

import { ProductsRepository }
from "@/features/produits/repositories/ProductsRepository";

type Props = {
  id: string;
};

export const ProductEditForm = ({
  id,
}: Props) => {

  const {
    data,
    loading,
  } = useDocument<Product>(
    "produits",
    id
  );

  const [values, setValues] =
    useState<any>(null);

  useEffect(() => {

    if (data) {

      setValues(data);
    }

  }, [data]);

  function handleChange(
    name: string,
    value: any
  ) {

    setValues((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {

    await ProductsRepository.update(
      id,
      values
    );

    alert("Produit modifié");
  }

  if (loading || !values) {

    return (
      <p>
        Chargement...
      </p>
    );
  }

  return (
    <EntityForm
      fields={[
        {
          name: "nom",
          label: "Nom",
        },
        {
          name: "categorie",
          label: "Catégorie",
        },
        {
          name: "unite",
          label: "Unité",
        },
        {
          name: "quantite",
          label: "Quantité",
          type: "number",
        },
        {
          name: "prix",
          label: "Prix",
          type: "number",
        },
      ]}
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\produits\components\ProductEditForm.tsx",
  $productEditForm
)

Write-Host "Created: ProductEditForm.tsx"

# -------------------------------------------------
# EDIT PAGE
# -------------------------------------------------

$editPage = @'
import { ProductEditForm }
from "@/features/produits/components/ProductEditForm";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProduitPage({
  params,
}: Props) {

  const { id } =
    await params;

  return (
    <div className="space-y-6">

      <div>

        <h1
          className="
            text-3xl
            font-bold
          "
        >
          Modifier Produit
        </h1>

        <p
          className="
            text-gray-500
            mt-2
          "
        >
          Mise à jour produit
        </p>
      </div>

      <ProductEditForm id={id} />
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\app\(private)\produits\[id]\edit\page.tsx",
  $editPage
)

Write-Host "Updated: edit page"

Write-Host ""
Write-Host "======================================="
Write-Host " DOCUMENT EDITING COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. pnpm build"
Write-Host "2. git commit"
Write-Host "3. firebase deploy"
Write-Host ""