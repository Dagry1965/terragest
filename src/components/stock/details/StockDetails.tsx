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
