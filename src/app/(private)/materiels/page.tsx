"use client";

import { formatDisplayValue } from "@/core/utils/formatFirestoreDate";
import { useEffect, useState }
from "react";

import Link
from "next/link";

import { MaterielService }
from "@/features/materiels/services/MaterielService";

import type { Materiel }
from "@/features/materiels/types/Materiel";

export default function MaterielsPage() {

  const [
    materiels,
    setMateriels
  ] = useState<Materiel[]>([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  useEffect(() => {

    async function load() {

      try {

        const data =
          await MaterielService.getAll();

        setMateriels(data);

      } catch (error) {

        console.error(
          "Erreur chargement matÃ©riels",
          error
        );

      } finally {

        setLoading(false);
      }
    }

    load();

  }, []);

  return (

    <div className="p-10">

      <div
        className="
          flex
          justify-between
          items-center
          mb-8
        "
      >

        <h1
          className="
            text-4xl
            font-bold
          "
        >
          MatÃ©riels
        </h1>

        <Link
          href="/materiels/nouveau"
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded-xl
          "
        >
          Nouveau
        </Link>

      </div>

      <div
        className="
          bg-white
          rounded-2xl
          shadow-md
          p-6
        "
      >

        {loading && (
          <p>Chargement...</p>
        )}

        {!loading && materiels.length === 0 && (
          <p>
            Aucun matÃ©riel enregistrÃ©
          </p>
        )}

        <div
          className="
            grid
            gap-4
          "
        >

          {materiels.map(
            materiel => (

              <div
                key={materiel.id}
                className="
                  border
                  rounded-xl
                  p-4
                "
              >

                <h2
                  className="
                    text-xl
                    font-semibold
                  "
                >
                  {materiel.nom}
                </h2>

                <p>
                  CatÃ©gorie :
                  {" "}
                  {materiel.categorie}
                </p>

                <p
                  className="
                    text-sm
                    text-zinc-500
                  "
                >
                  {formatDisplayValue(materiel.createdAt)}
                </p>

              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}

