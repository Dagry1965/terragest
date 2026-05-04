# =========================================================
# TERRAGEST - STOCK DETAILS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK DETAILS SETUP"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\app\(private)\stocks\[id]",

  ".\src\components\stock\details"
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
# STOCK DETAILS COMPONENT
# =========================================================

$stockDetails = @'
// src/components/stock/details/StockDetails.tsx

"use client";

import {
  StockItem
}
from "@/domains/stock/store/StockStore";

interface StockDetailsProps {

  stock:
    StockItem;
}

export function StockDetails({

  stock
}: StockDetailsProps) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        p-6
        flex
        flex-col
        gap-6
      "
    >

      <div>

        <h2
          className="
            text-2xl
            font-bold
            mb-2
          "
        >
          {stock.produit}
        </h2>

        <p
          className="
            text-zinc-500
          "
        >
          Détail du stock ERP
        </p>
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-6
        "
      >

        <div>

          <div
            className="
              text-sm
              text-zinc-500
              mb-1
            "
          >
            Produit
          </div>

          <div
            className="
              font-medium
            "
          >
            {stock.produit}
          </div>
        </div>

        <div>

          <div
            className="
              text-sm
              text-zinc-500
              mb-1
            "
          >
            Quantité
          </div>

          <div
            className="
              font-medium
            "
          >
            {stock.quantite}
          </div>
        </div>

        <div>

          <div
            className="
              text-sm
              text-zinc-500
              mb-1
            "
          >
            Workflow
          </div>

          <div
            className="
              inline-flex
              px-3
              py-1
              rounded-full
              bg-zinc-100
            "
          >
            {stock.workflow}
          </div>
        </div>
      </div>

    </div>
  );
}
'@

Set-Content `
  ".\src\components\stock\details\StockDetails.tsx" `
  $stockDetails

Write-Host ""
Write-Host "[CREATED] StockDetails.tsx"

# =========================================================
# STOCK DETAILS PAGE
# =========================================================

$stockPage = @'
// src/app/(private)/stocks/[id]/page.tsx

import { ERPLayout }
from "@/components/layout/ERPLayout";

import { StockDetails }
from "@/components/stock/details/StockDetails";

import { StockStore }
from "@/domains/stock/store/StockStore";

interface StockPageProps {

  params: {

    id: string;
  };
}

export default function StockPage({

  params
}: StockPageProps) {

  const stock =
    StockStore
      .all()
      .find(
        item =>
          item.id
          === params.id
      );

  if (!stock) {

    return (

      <ERPLayout>

        <div>
          Stock introuvable
        </div>

      </ERPLayout>
    );
  }

  return (

    <ERPLayout>

      <div
        className="
          max-w-4xl
        "
      >

        <StockDetails
          stock={stock}
        />

      </div>

    </ERPLayout>
  );
}
'@

Set-Content `
  ".\src\app\(private)\stocks\[id]\page.tsx" `
  $stockPage

Write-Host "[CREATED] Stock details page"

# =========================================================
# UPDATE STOCK LIST
# =========================================================

$stocksPage = @'
// src/app/(private)/stocks/page.tsx

"use client";

import Link
from "next/link";

import { ERPLayout }
from "@/components/layout/ERPLayout";

import { StockStore }
from "@/domains/stock/store/StockStore";

export default function StocksPage() {

  const stocks =
    StockStore.all();

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

              <th
                className="
                  p-4
                  text-left
                "
              >
                Actions
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

                <td
                  className="p-4"
                >

                  <Link

                    href={`/stocks/${stock.id}`}

                    className="
                      text-blue-600
                    "
                  >
                    Ouvrir
                  </Link>

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
  $stocksPage

Write-Host "[UPDATED] Stocks page"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK DETAILS READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-stock-details.ps1"
Write-Host "pnpm build"
Write-Host ""