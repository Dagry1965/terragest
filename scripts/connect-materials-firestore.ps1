# =========================================================
# TERRAGEST - CONNECT MATERIALS FIRESTORE
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " CONNECT MATERIALS FIRESTORE"
Write-Host "========================================="
Write-Host ""

# =========================================================
# UPDATE MATERIAL STORE
# =========================================================

$materialStore = @'
// src/domains/materiels/store/MaterielsStore.ts

import {
  materielsRepository
}
from "@/domains/materiels/repositories/MaterielsRepository";

export interface MaterielItem {

  id: string;

  nom: string;

  statut: string;

  historique:
    string[];
}

class MaterielsStoreManager {

  private items:
    MaterielItem[] = [];

  async load() {

    const data =
      await materielsRepository
        .findAll();

    this.items =
      data as MaterielItem[];

    console.log(
      "[MATERIELS LOADED]",
      this.items.length
    );
  }

  async add(
    item: MaterielItem
  ) {

    this.items.unshift(
      item
    );

    await materielsRepository
      .create(item);

    console.log(
      "[MATERIEL CREATED]",
      item.nom
    );
  }

  find(
    id: string
  ) {

    return this.items.find(
      item =>
        item.id === id
    );
  }

  async setStatus(

    id: string,

    statut: string
  ) {

    const item =
      this.find(id);

    if (!item) {

      return;
    }

    item.statut =
      statut;

    item.historique.unshift(

      `${new Date().toLocaleString()} - ${statut}`
    );

    await materielsRepository
      .update(id, {

        statut,

        historique:
          item.historique
      });
  }

  all() {

    return this.items;
  }
}

export const MaterielsStore =
  new MaterielsStoreManager();
'@

Set-Content `
  ".\src\domains\materiels\store\MaterielsStore.ts" `
  $materialStore

Write-Host ""
Write-Host "[UPDATED] MaterielsStore.ts"

# =========================================================
# UPDATE MATERIAL FORM
# =========================================================

$materialForm = @'
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
'@

Set-Content `
  ".\src\components\materiels\MaterielsForm.tsx" `
  $materialForm

Write-Host "[UPDATED] MaterielsForm.tsx"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " MATERIALS FIRESTORE CONNECTED"
Write-Host "========================================="
Write-Host ""

Write-Host "Next:"
Write-Host ""
Write-Host ".\scripts\connect-materials-firestore.ps1"
Write-Host "pnpm build"
Write-Host ""