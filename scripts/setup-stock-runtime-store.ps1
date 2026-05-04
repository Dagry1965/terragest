# =========================================================
# TERRAGEST - STOCK RUNTIME STORE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK RUNTIME STORE"
Write-Host "========================================="
Write-Host ""

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\domains\stock\store"
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
# STOCK STORE
# =========================================================

$stockStore = @'
// src/domains/stock/store/StockStore.ts

export interface StockItem {

  id: string;

  produit: string;

  quantite: number;

  workflow: string;
}

class StockStoreManager {

  private items:
    StockItem[] = [];

  add(
    item: StockItem
  ) {

    this.items.unshift(
      item
    );

    console.log(
      "[STOCK STORE ADD]",
      item.produit
    );
  }

  all() {

    return this.items;
  }
}

export const StockStore =
  new StockStoreManager();
'@

Set-Content `
  ".\src\domains\stock\store\StockStore.ts" `
  $stockStore

Write-Host ""
Write-Host "[CREATED] StockStore.ts"

# =========================================================
# UPDATE STOCK FORM
# =========================================================

$stockForm = @'
// src/components/stock/StockForm.tsx

"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import { ModuleRuntime }
from "@/platform/modules/runtime/ModuleRuntime";

import { ExecutionMode }
from "@/platform/modules/types/ExecutionMode";

import { StockStore }
from "@/domains/stock/store/StockStore";

export function StockForm() {

  const router =
    useRouter();

  const [produit, setProduit] =
    useState("");

  const [quantite, setQuantite] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {

    setLoading(true);

    try {

      await ModuleRuntime.create({

        domain:
          "stock",

        action:
          "create",

        mode:
          ExecutionMode.INTERACTIVE,

        user:
          "admin",

        tenant:
          "default",

        payload: {

          produit,

          quantite:
            Number(
              quantite
            )
        }
      });

      StockStore.add({

        id:
          crypto.randomUUID(),

        produit,

        quantite:
          Number(
            quantite
          ),

        workflow:
          "DRAFT"
      });

      console.log(
        "[STOCK CREATED]"
      );

      router.push(
        "/stocks"
      );

    } catch (error) {

      console.error(
        error
      );

    } finally {

      setLoading(false);
    }
  }

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

        onClick={
          handleSubmit
        }

        disabled={
          loading
        }

        className="
          bg-black
          text-white
          rounded-xl
          py-3
        "
      >

        {loading

          ? "Création..."

          : "Enregistrer"}
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
# UPDATE STOCK PAGE
# =========================================================

$stockPage = @'
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

Write-Host "[UPDATED] Stocks page"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK STORE READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-stock-runtime-store.ps1"
Write-Host "pnpm build"
Write-Host ""