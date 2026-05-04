# =========================================================
# TERRAGEST - CONNECT STOCK RUNTIME
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " CONNECT STOCK RUNTIME"
Write-Host "========================================="
Write-Host ""

# =========================================================
# STOCK FORM
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

Write-Host ""
Write-Host "[UPDATED] StockForm.tsx"

# =========================================================
# UPDATE STOCK PAGE
# =========================================================

$stocksPage = @'
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
  $stocksPage

Write-Host "[UPDATED] Stocks page"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK RUNTIME CONNECTED"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\connect-stock-runtime.ps1"
Write-Host "pnpm build"
Write-Host ""