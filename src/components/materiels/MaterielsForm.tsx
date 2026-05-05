// src/components/materiels/MaterielsForm.tsx

"use client";

import { useState }
from "react";

import { useRouter }
from "next/navigation";

import { ERPFormSection }
from "@/components/erp/forms/ERPFormSection";

import { ModuleRuntime }
from "@/platform/modules/runtime/ModuleRuntime";

import { ExecutionMode }
from "@/platform/modules/types/ExecutionMode";

import {
  MaterielsStore
}
from "@/domains/materiels/store/MaterielsStore";

export function MaterielsForm() {

  const router =
    useRouter();

  const [nom, setNom] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSubmit() {

    setLoading(true);

    try {

      await ModuleRuntime.create({

        domain:
          "materiels",

        action:
          "create",

        mode:
          ExecutionMode.INTERACTIVE,

        user:
          "admin",

        tenant:
          "default",

        payload: {

          nom
        }
      });

      const id =
        crypto.randomUUID();

      await MaterielsStore.add({

        id,

        nom,

        statut:
          "OPERATIONNEL",

        historique: [

          `${new Date().toLocaleString()} - Création matériel`
        ]
      });

      router.push(
        `/materiels/${id}`
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
      title="Matériel"
    >

      <div>

        <label
          className="
            block
            mb-2
          "
        >
          Nom
        </label>

        <input

          value={nom}

          onChange={event =>
            setNom(
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
