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
