"use client";

import {
  useEffect,
  useState,
} from "react";

import Link
from "next/link";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db }
from "@/infrastructure/firebase/firebase";

import {
  formatDisplayValue,
}
from "@/core/utils/formatFirestoreDate";

import {
  ERPDynamicForm,
}
from "@/components/erp/forms/ERPDynamicForm";

export default function StocksPage() {

  const [
    stocks,
    setStocks,
  ] = useState<any[]>([]);

  async function loadStocks() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "stocks"
        )
      );

    setStocks(

      snapshot.docs.map(
        (doc) => ({

          id: doc.id,

          ...doc.data(),
        })
      )
    );
  }

  useEffect(() => {
    loadStocks();
  }, []);

  return (

    <div
      className="
        p-10
        space-y-8
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

          <h1
            className="
              text-4xl
              font-bold
            "
          >
            Stocks
          </h1>

          <p
            className="
              mt-2
              text-gray-500
            "
          >
            Gestion des stocks ERP
          </p>

        </div>

        <Link
          href="/stocks/nouveau"

          className="
            rounded-xl
            bg-amber-600
            px-4
            py-2
            text-white
          "
        >
          Nouveau stock
        </Link>

      </div>

      <div
        className="
          rounded-2xl
          bg-white
          p-6
          shadow-md
        "
      >

        <h2
          className="
            mb-4
            text-xl
            font-semibold
          "
        >
          Formulaire dynamique ERP
        </h2>

        <ERPDynamicForm
          module="stocks"

          context={{
            role:
              "gestionnaire",
          }}
        />

      </div>

      <div
        className="
          rounded-2xl
          bg-white
          p-6
          shadow-md
        "
      >

        <h2
          className="
            mb-4
            text-xl
            font-semibold
          "
        >
          Liste stocks
        </h2>

        {stocks.length === 0 ? (

          <p className="text-gray-500">
            Aucun stock trouvé.
          </p>

        ) : (

          <table
            className="
              w-full
              border-collapse
              text-left
            "
          >

            <thead>

              <tr className="border-b">

                <th className="p-3">
                  Produit
                </th>

                <th className="p-3">
                  Quantité
                </th>

                <th className="p-3">
                  Seuil
                </th>

                <th className="p-3">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {stocks.map(
                (item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-3">
                    {formatDisplayValue(
                      item.produit
                    )}
                  </td>

                  <td className="p-3">
                    {formatDisplayValue(
                      item.quantite
                    )}
                  </td>

                  <td className="p-3">
                    {formatDisplayValue(
                      item.seuilAlerte
                    )}
                  </td>

                  <td className="p-3">
                    {formatDisplayValue(
                      item.createdAt
                    )}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}

