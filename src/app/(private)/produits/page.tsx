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

export default function ProduitsPage() {

  const [
    produits,
    setProduits,
  ] = useState<any[]>([]);

  async function loadProduits() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "produits"
        )
      );

    setProduits(

      snapshot.docs.map(
        (doc) => ({

          id: doc.id,

          ...doc.data(),
        })
      )
    );
  }

  useEffect(() => {
    loadProduits();
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
            Produits
          </h1>

          <p
            className="
              mt-2
              text-gray-500
            "
          >
            Gestion des produits ERP
          </p>

        </div>

        <Link
          href="/produits/nouveau"

          className="
            rounded-xl
            bg-emerald-600
            px-4
            py-2
            text-white
          "
        >
          Nouveau produit
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
          module="produits"

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
          Liste produits
        </h2>

        {produits.length === 0 ? (

          <p className="text-gray-500">
            Aucun produit trouvé.
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
                  Nom
                </th>

                <th className="p-3">
                  Catégorie
                </th>

                <th className="p-3">
                  Unité
                </th>

                <th className="p-3">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {produits.map(
                (item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-3">
                    {formatDisplayValue(
                      item.nom
                    )}
                  </td>

                  <td className="p-3">
                    {formatDisplayValue(
                      item.categorie
                    )}
                  </td>

                  <td className="p-3">
                    {formatDisplayValue(
                      item.unite
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
