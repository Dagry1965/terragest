// src/components/stock/StockForm.tsx

"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import { ERPFormSection }
from "@/components/erp/ui";

import { ModuleRuntime }
from "@/platform/modules/runtime/ModuleRuntime";

import { ExecutionMode }
from "@/platform/modules/types/ExecutionMode";

import { StockStore }
from "@/domains/stock/store/StockStore";

export function StockForm() {

  const router =
    useRouter();

  const [produit, setProduit] =
    useState("");

  const [quantite, setQuantite] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {

    setLoading(true);

    try {

      await ModuleRuntime.create({

        domain:
          "stock",

        action:
          "create",

        mode:
          ExecutionMode.INTERACTIVE,

        user:
          "admin",

        tenant:
          "default",

        payload: {

          produit,

          quantite:
            Number(
              quantite
            )
        }
      });

      const id =
        crypto.randomUUID();

      StockStore.add({

        id,

        produit,

        quantite:
          Number(
            quantite
          ),

        workflow:
          "DRAFT",

        timeline: [

          {

            id:
              crypto.randomUUID(),

            label:
              "Stock créé",

            date:
              new Date()
                .toLocaleString()
          }
        ]
      });

      router.push(
        `/stocks/${id}`
      );

    } catch (error) {

      console.error(
        error
      );

    } finally {

      setLoading(false);
    }
  }

  return (

    <ERPFormSection
      title="Informations stock"
    >

      <div>

        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Produit
        </label>

        <input

          value={produit}

          onChange={event =>
            setProduit(
              event.target.value
            )
          }

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />
      </div>

      <div>

        <label
          className="
            block
            mb-2
            font-medium
          "
        >
          Quantité
        </label>

        <input

          value={quantite}

          onChange={event =>
            setQuantite(
              event.target.value
            )
          }

          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
          "
        />
      </div>

      <button

        onClick={
          handleSubmit
        }

        disabled={
          loading
        }

        className="
          bg-black
          text-white
          rounded-xl
          py-3
        "
      >

        {loading

          ? "Création..."

          : "Enregistrer"}
      </button>

    </ERPFormSection>
  );
}
