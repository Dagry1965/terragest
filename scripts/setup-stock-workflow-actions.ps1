# =========================================================
# TERRAGEST - STOCK WORKFLOW ACTIONS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " STOCK WORKFLOW ACTIONS"
Write-Host "========================================="
Write-Host ""

# =========================================================
# UPDATE STOCK STORE
# =========================================================

$stockStore = @'
// src/domains/stock/store/StockStore.ts

export interface StockTimelineEntry {

  id: string;

  label: string;

  date: string;
}

export interface StockItem {

  id: string;

  produit: string;

  quantite: number;

  workflow: string;

  timeline:
    StockTimelineEntry[];
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

  find(
    id: string
  ) {

    return this.items.find(
      item =>
        item.id === id
    );
  }

  transition(

    id: string,

    workflow: string
  ) {

    const item =
      this.find(id);

    if (!item) {

      return;
    }

    item.workflow =
      workflow;

    item.timeline.unshift({

      id:
        crypto.randomUUID(),

      label:
        `Workflow ${workflow}`,

      date:
        new Date()
          .toLocaleString()
    });

    console.log(
      "[STOCK WORKFLOW]",
      workflow
    );
  }
}

export const StockStore =
  new StockStoreManager();
'@

Set-Content `
  ".\src\domains\stock\store\StockStore.ts" `
  $stockStore

Write-Host ""
Write-Host "[UPDATED] StockStore.ts"

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
# UPDATE STOCK DETAILS
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

    <div
      className="
        flex
        flex-col
        gap-6
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

          <WorkflowStatus
            status={
              stock.workflow
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

        <div
          className="
            flex
            gap-4
          "
        >

          <button

            onClick={
              validateWorkflow
            }

            className="
              bg-zinc-800
              text-white
              px-4
              py-3
              rounded-xl
            "
          >
            Valider
          </button>

          <button

            onClick={
              approveWorkflow
            }

            className="
              bg-black
              text-white
              px-4
              py-3
              rounded-xl
            "
          >
            Approuver
          </button>

        </div>

      </div>

      <Timeline
        entries={
          stock.timeline
        }
      />

    </div>
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
Write-Host " STOCK WORKFLOW ACTIONS READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\setup-stock-workflow-actions.ps1"
Write-Host "pnpm build"
Write-Host ""