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
