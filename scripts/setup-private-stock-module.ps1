# =========================================================
# TERRAGEST - PRIVATE STOCK MODULE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " PRIVATE STOCK MODULE"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\app\(private)\stocks",

  ".\src\app\(private)\stocks\new",

  ".\src\components\stock"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"

  } else {

    Write-Host "[EXISTS]  $directory"
  }
}

# =========================================================
# STOCK PAGE
# =========================================================

$stockPage = @'
// src/app/(private)/stocks/page.tsx

"use client";

import Link
from "next/link";

import { ERPLayout }
from "@/components/layout/ERPLayout";

const stocks = [

  {

    id: 1,

    produit:
      "Engrais NPK",

    quantite:
      120,

    workflow:
      "APPROVED"
  },

  {

    id: 2,

    produit:
      "Semences Maïs",

    quantite:
      45,

    workflow:
      "DRAFT"
  }
];

export default function StocksPage() {

  return (

    <ERPLayout>

      <div
        className="
          flex
          items-center
          justify-between
          mb-6
        "
      >

        <div>

          <h1
            className="
              text-3xl
              font-bold
            "
          >
            Stocks
          </h1>

          <p
            className="
              text-zinc-500
            "
          >
            Gestion des stocks ERP
          </p>
        </div>

        <Link

          href="/stocks/new"

          className="
            bg-black
            text-white
            px-4
            py-3
            rounded-xl
          "
        >
          Nouveau stock
        </Link>
      </div>

      <div
        className="
          bg-white
          rounded-2xl
          shadow-sm
          overflow-hidden
        "
      >

        <table
          className="w-full"
        >

          <thead
            className="
              bg-zinc-100
            "
          >

            <tr>

              <th
                className="
                  p-4
                  text-left
                "
              >
                Produit
              </th>

              <th
                className="
                  p-4
                  text-left
                "
              >
                Quantité
              </th>

              <th
                className="
                  p-4
                  text-left
                "
              >
                Workflow
              </th>
            </tr>
          </thead>

          <tbody>

            {stocks.map(stock => (

              <tr

                key={stock.id}

                className="
                  border-t
                "
              >

                <td
                  className="p-4"
                >
                  {stock.produit}
                </td>

                <td
                  className="p-4"
                >
                  {stock.quantite}
                </td>

                <td
                  className="p-4"
                >
                  {stock.workflow}
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </ERPLayout>
  );
}
'@

Set-Content `
  ".\src\app\(private)\stocks\page.tsx" `
  $stockPage

Write-Host ""
Write-Host "[UPDATED] Stocks page"

# =========================================================
# STOCK FORM
# =========================================================

$stockForm = @'
// src/components/stock/StockForm.tsx

"use client";

import { useState }
from "react";

export function StockForm() {

  const [produit, setProduit] =
    useState("");

  const [quantite, setQuantite] =
    useState("");

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
        flex
        flex-col
        gap-4
      "
    >

      <div>

        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Produit
        </label>

        <input

          value={produit}

          onChange={event =>
            setProduit(
              event.target.value
            )
          }

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />
      </div>

      <div>

        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Quantité
        </label>

        <input

          value={quantite}

          onChange={event =>
            setQuantite(
              event.target.value
            )
          }

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />
      </div>

      <button
        className="
          bg-black
          text-white
          rounded-xl
          py-3
        "
      >
        Enregistrer
      </button>

    </div>
  );
}
'@

Set-Content `
  ".\src\components\stock\StockForm.tsx" `
  $stockForm

Write-Host "[UPDATED] StockForm.tsx"

# =========================================================
# NEW STOCK PAGE
# =========================================================

$newStockPage = @'
// src/app/(private)/stocks/new/page.tsx

import { ERPLayout }
from "@/components/layout/ERPLayout";

import { StockForm }
from "@/components/stock/StockForm";

export default function NewStockPage() {

  return (

    <ERPLayout>

      <div
        className="
          max-w-2xl
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Nouveau stock
        </h1>

        <StockForm />

      </div>

    </ERPLayout>
  );
}
'@

Set-Content `
  ".\src\app\(private)\stocks\new\page.tsx" `
  $newStockPage

Write-Host "[UPDATED] New stock page"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " PRIVATE STOCK MODULE READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-private-stock-module.ps1"
Write-Host "pnpm build"
Write-Host ""