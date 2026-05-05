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
