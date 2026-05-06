"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { db } from "@/infrastructure/firebase/firebase";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { formatDisplayValue }
from "@/core/utils/formatFirestoreDate";

import {
  ERPDynamicForm,
}
from "@/components/erp/forms/ERPDynamicForm";

export default function MaterielsPage() {

  const [
    materiels,
    setMateriels,
  ] = useState<any[]>([]);

  async function loadMateriels() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "materiels"
        )
      );

    setMateriels(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  }

  useEffect(() => {
    loadMateriels();
  }, []);

  return (

    <div className="p-10 space-y-8">

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
            Matériels
          </h1>

          <p
            className="
              mt-2
              text-gray-500
            "
          >
            Gestion des matériels ERP
          </p>

        </div>

        <Link
          href="/materiels/nouveau"

          className="
            rounded-xl
            bg-blue-600
            px-4
            py-2
            text-white
          "
        >
          Nouveau matériel
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
          module="materiels"

          context={{
            role:
              "gestionnaire",

            materielType:
              "tracteur",
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
          Liste matériels
        </h2>

        {materiels.length === 0 ? (

          <p className="text-gray-500">
            Aucun matériel trouvé.
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
                  Type
                </th>

                <th className="p-3">
                  Statut
                </th>

                <th className="p-3">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {materiels.map((item) => (

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
                      item.type
                    )}
                  </td>

                  <td className="p-3">
                    {formatDisplayValue(
                      item.statut
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
