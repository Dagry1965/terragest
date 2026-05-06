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

export default function TerrainsPage() {

  const [
    terrains,
    setTerrains,
  ] = useState<any[]>([]);

  async function loadTerrains() {

    const snapshot =
      await getDocs(
        collection(
          db,
          "terrains"
        )
      );

    setTerrains(

      snapshot.docs.map(
        (doc) => ({

          id: doc.id,

          ...doc.data(),
        })
      )
    );
  }

  useEffect(() => {
    loadTerrains();
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
            Terrains
          </h1>

          <p
            className="
              mt-2
              text-gray-500
            "
          >
            Gestion des terrains ERP
          </p>

        </div>

        <Link
          href="/terrains/nouveau"

          className="
            rounded-xl
            bg-emerald-600
            px-4
            py-2
            text-white
          "
        >
          Nouveau terrain
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
          module="terrains"

          context={{
            role:
              "gestionnaire",

            exploitationType:
              "agricole",
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
          Liste terrains
        </h2>

        {terrains.length === 0 ? (

          <p className="text-gray-500">
            Aucun terrain trouvé.
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
                  Surface
                </th>

                <th className="p-3">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {terrains.map(
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
                      item.type
                    )}
                  </td>

                  <td className="p-3">
                    {formatDisplayValue(
                      item.surface
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
