// src/components/interventions/InterventionsForm.tsx

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
  InterventionsStore
}
from "@/domains/interventions/store/InterventionsStore";

export function InterventionsForm() {

  const router =
    useRouter();

  const [nom, setNom] =
    useState("");

  async function handleSubmit() {

    await ModuleRuntime.create({

      domain:
        "interventions",

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

    InterventionsStore.add({

      id,

      materielId:
        crypto.randomUUID(),

      description:
        nom,

      workflow:
        "OPEN"
    });

    router.push(
      `/interventions/${id}`
    );
  }

  return (

    <ERPFormSection
      title="Intervention"
    >

      <div>

        <label
          className="
            block
            mb-2
          "
        >
          Description
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
