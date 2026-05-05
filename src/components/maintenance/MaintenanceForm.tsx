// src/components/maintenance/MaintenanceForm.tsx

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
  MaintenanceStore
}
from "@/domains/maintenance/store/MaintenanceStore";

export function MaintenanceForm() {

  const router =
    useRouter();

  const [nom, setNom] =
    useState("");
    
  async function handleSubmit() {

    await ModuleRuntime.create({

      domain:
        "maintenance",

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

    MaintenanceStore.add({

      id,

      nom,

      workflow:
        "DRAFT",

      timeline: [

        {

          id:
            crypto.randomUUID(),

          label:
            "Maintenance créé",

          date:
            new Date()
              .toLocaleString()
        }
      ]
    });

   router.push(
  `/maintenance/${id}`
);
  }

  return (

    <ERPFormSection
      title="Informations"
    >

      <div>

        <label
          className="block mb-2"
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

        className="
          bg-black
          text-white
          rounded-xl
          py-3
        "
      >
        Enregistrer
      </button>

    </ERPFormSection>
  );
}
