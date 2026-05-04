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
