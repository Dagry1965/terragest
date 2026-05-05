# =========================================================
# TERRAGEST - REFACTOR STOCK GENERIC UI
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " REFACTOR STOCK GENERIC UI"
Write-Host "========================================="
Write-Host ""

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

import { ERPDataTable }
from "@/components/erp/datatable/ERPDataTable";

import { ERPFilterBar }
from "@/components/erp/filters/ERPFilterBar";

import { StockStore }
from "@/domains/stock/store/StockStore";

export default function StocksPage() {

  const stocks =
    StockStore.all();

  const data =
    stocks.map(stock => ({

      produit:
        stock.produit,

      quantite:
        stock.quantite,

      workflow:
        stock.workflow
    }));

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
          flex
          flex-col
          gap-6
        "
      >

        <ERPFilterBar />

        <ERPDataTable

          columns={[

            {

              key:
                "produit",

              label:
                "Produit"
            },

            {

              key:
                "quantite",

              label:
                "Quantité"
            },

            {

              key:
                "workflow",

              label:
                "Workflow"
            }
          ]}

          data={data}
        />

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

import { useRouter }
from "next/navigation";

import { ERPFormSection }
from "@/components/erp/forms/ERPFormSection";

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

      const id =
        crypto.randomUUID();

      StockStore.add({

        id,

        produit,

        quantite:
          Number(
            quantite
          ),

        workflow:
          "DRAFT",

        timeline: [

          {

            id:
              crypto.randomUUID(),

            label:
              "Stock créé",

            date:
              new Date()
                .toLocaleString()
          }
        ]
      });

      router.push(
        `/stocks/${id}`
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

    <ERPFormSection
      title="Informations stock"
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

    </ERPFormSection>
  );
}
'@

Set-Content `
  ".\src\components\stock\StockForm.tsx" `
  $stockForm

Write-Host "[UPDATED] StockForm.tsx"

# =========================================================
# STOCK DETAILS
# =========================================================

$stockDetails = @'
// src/components/stock/details/StockDetails.tsx

"use client";

import { useRouter }
from "next/navigation";

import {
  StockItem,

  StockStore
}
from "@/domains/stock/store/StockStore";

import { WorkflowStatus }
from "@/components/workflow/WorkflowStatus";

import { Timeline }
from "@/components/timeline/Timeline";

import { WorkflowActions }
from "@/components/erp/workflow/WorkflowActions";

import { EntityDetailsLayout }
from "@/components/erp/details/EntityDetailsLayout";

interface StockDetailsProps {

  stock:
    StockItem;
}

export function StockDetails({

  stock
}: StockDetailsProps) {

  const router =
    useRouter();

  function validateWorkflow() {

    StockStore.transition(

      stock.id,

      "VALIDATED"
    );

    router.refresh();
  }

  function approveWorkflow() {

    StockStore.transition(

      stock.id,

      "APPROVED"
    );

    router.refresh();
  }

  return (

    <EntityDetailsLayout

      title={
        stock.produit
      }

      subtitle="
        Détail du stock ERP
      "
    >

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

        <div
          className="
            flex
            items-center
            justify-between
          "
        >

          <WorkflowStatus
            status={
              stock.workflow
            }
          />

          <WorkflowActions

            onValidate={
              validateWorkflow
            }

            onApprove={
              approveWorkflow
            }
          />

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

        </div>

      </div>

      <Timeline
        entries={
          stock.timeline
        }
      />

    </EntityDetailsLayout>
  );
}
'@

Set-Content `
  ".\src\components\stock\details\StockDetails.tsx" `
  $stockDetails

Write-Host "[UPDATED] StockDetails.tsx"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK GENERIC UI READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\refactor-stock-generic-ui.ps1"
Write-Host "pnpm build"
Write-Host ""