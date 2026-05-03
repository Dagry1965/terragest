$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"

Set-Location $ProjectRoot

Write-Host ""
Write-Host "======================================="
Write-Host " GENERIC CRUD SETUP"
Write-Host "======================================="
Write-Host ""

# -------------------------------------------------
# DIRECTORIES
# -------------------------------------------------

$dirs = @(
  "$ProjectRoot\src\components\crud",
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
# GENERIC DATA TABLE
# -------------------------------------------------

$dataTable = @'
type Props<T> = {
  data: T[];

  columns: {
    key: keyof T;
    label: string;
  }[];
};

export function DataTable<T>({
  data,
  columns,
}: Props<T>) {

  return (
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

            {columns.map(
              (column) => (

              <th
                key={String(column.key)}
                className="
                  text-left
                  p-4
                  font-semibold
                "
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {data.map(
            (item, index) => (

            <tr
              key={index}
              className="
                border-t
              "
            >

              {columns.map(
                (column) => (

                <td
                  key={String(column.key)}
                  className="p-4"
                >
                  {
                    String(
                      item[column.key]
                    )
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\crud\DataTable.tsx",
  $dataTable
)

Write-Host "Created: DataTable.tsx"

# -------------------------------------------------
# GENERIC ENTITY FORM
# -------------------------------------------------

$entityForm = @'
"use client";

type Field = {
  name: string;
  label: string;
  type?: string;
};

type Props = {
  fields: Field[];

  values: Record<string, any>;

  onChange: (
    name: string,
    value: any
  ) => void;

  onSubmit: () => void;
};

export const EntityForm = ({
  fields,
  values,
  onChange,
  onSubmit,
}: Props) => {

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        p-6
        space-y-4
      "
    >
      {fields.map((field) => (

        <div key={field.name}>

          <label
            className="
              block
              text-sm
              font-medium
              mb-2
            "
          >
            {field.label}
          </label>

          <input
            type={field.type || "text"}
            value={
              values[field.name] || ""
            }
            onChange={(e) =>
              onChange(
                field.name,
                e.target.value
              )
            }
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          />
        </div>
      ))}

      <button
        onClick={onSubmit}
        className="
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
        "
      >
        Enregistrer
      </button>
    </div>
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\components\crud\EntityForm.tsx",
  $entityForm
)

Write-Host "Created: EntityForm.tsx"

# -------------------------------------------------
# PRODUCT FORM
# -------------------------------------------------

$productForm = @'
"use client";

import { useState }
from "react";

import { EntityForm }
from "@/components/crud/EntityForm";

import { ProductService }
from "@/features/produits/services/ProductService";

export const ProductForm = () => {

  const [values, setValues] =
    useState({
      nom: "",
      categorie: "",
      unite: "",
      quantite: 0,
      prix: 0,
    });

  function handleChange(
    name: string,
    value: any
  ) {

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit() {

    await ProductService.create({
      ...values,
      actif: true,
    });

    alert("Produit créé");
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
  "$ProjectRoot\src\features\produits\components\ProductForm.tsx",
  $productForm
)

Write-Host "Created: ProductForm.tsx"

# -------------------------------------------------
# PRODUCTS TABLE
# -------------------------------------------------

$productsTable = @'
"use client";

import { DataTable }
from "@/components/crud/DataTable";

import { useProducts }
from "@/features/produits/hooks/useProducts";

export const ProductsTable =
() => {

  const {
    data,
    loading,
  } = useProducts();

  if (loading) {

    return <p>Chargement...</p>;
  }

  return (
    <DataTable
      data={data}
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
  );
};
'@

[System.IO.File]::WriteAllText(
  "$ProjectRoot\src\features\produits\components\ProductsTable.tsx",
  $productsTable
)

Write-Host "Created: ProductsTable.tsx"

Write-Host ""
Write-Host "======================================="
Write-Host " GENERIC CRUD COMPLETE"
Write-Host "======================================="
Write-Host ""
Write-Host "NEXT:"
Write-Host "1. Connect pages"
Write-Host "2. pnpm build"
Write-Host "3. firebase deploy"
Write-Host ""