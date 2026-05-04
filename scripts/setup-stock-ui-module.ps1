# =========================================================
# TERRAGEST - STOCK UI MODULE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK UI MODULE SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\app\stocks",

  ".\src\app\stocks\new",

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
# STOCK LIST PAGE
# =========================================================

$stockPage = @'
// src/app/stocks/page.tsx

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

    statut:
      "Disponible"
  },

  {

    id: 2,

    produit:
      "Semences Maïs",

    quantite:
      45,

    statut:
      "Faible"
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
            Gestion des stocks
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
          className="
            w-full
          "
        >

          <thead
            className="
              bg-zinc-100
            "
          >

            <tr>

              <th
                className="p-4 text-left"
              >
                Produit
              </th>

              <th
                className="p-4 text-left"
              >
                Quantité
              </th>

              <th
                className="p-4 text-left"
              >
                Statut
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
                  {stock.statut}
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
  ".\src\app\stocks\page.tsx" `
  $stockPage

Write-Host ""
Write-Host "[CREATED] Stocks page"

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

      <input

        placeholder="Produit"

        value={produit}

        onChange={event =>
          setProduit(
            event.target.value
          )
        }

        className="
          border
          rounded-xl
          px-4
          py-3
        "
      />

      <input

        placeholder="Quantité"

        value={quantite}

        onChange={event =>
          setQuantite(
            event.target.value
          )
        }

        className="
          border
          rounded-xl
          px-4
          py-3
        "
      />

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

Write-Host "[CREATED] StockForm.tsx"

# =========================================================
# STOCK CREATE PAGE
# =========================================================

$stockNewPage = @'
// src/app/stocks/new/page.tsx

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
  ".\src\app\stocks\new\page.tsx" `
  $stockNewPage

Write-Host "[CREATED] New stock page"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK UI READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-stock-ui-module.ps1"
Write-Host "pnpm build"
Write-Host ""