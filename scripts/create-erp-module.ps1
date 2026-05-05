param(

  [Parameter(Mandatory=$true)]

  [string]$ModuleName
)

# =========================================================
# TERRAGEST - ERP MODULE SCAFFOLDER
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " ERP MODULE SCAFFOLDER"
Write-Host "========================================="
Write-Host ""

$module =
  $ModuleName.ToLower()

$modulePascal =
  (Get-Culture).TextInfo.ToTitleCase(
    $module
  )

# =========================================================
# DIRECTORIES
# =========================================================

$directories = @(

  ".\src\app\(private)\$module",

  ".\src\app\(private)\$module\new",

  ".\src\app\(private)\$module\[id]",

  ".\src\components\$module",

  ".\src\components\$module\details",

  ".\src\domains\$module",

  ".\src\domains\$module\store"
)

foreach ($directory in $directories) {

  if (!(Test-Path $directory)) {

    New-Item `
      -ItemType Directory `
      -Path $directory `
      | Out-Null

    Write-Host "[CREATED] $directory"
  }
}

# =========================================================
# STORE
# =========================================================

$store = @"
// src/domains/$module/store/${modulePascal}Store.ts

export interface ${modulePascal}TimelineEntry {

  id: string;

  label: string;

  date: string;
}

export interface ${modulePascal}Item {

  id: string;

  nom: string;

  workflow: string;

  timeline:
    ${modulePascal}TimelineEntry[];
}

class ${modulePascal}StoreManager {

  private items:
    ${modulePascal}Item[] = [];

  add(
    item: ${modulePascal}Item
  ) {

    this.items.unshift(
      item
    );
  }

  all() {

    return this.items;
  }

  find(
    id: string
  ) {

    return this.items.find(
      item =>
        item.id === id
    );
  }

  transition(

    id: string,

    workflow: string
  ) {

    const item =
      this.find(id);

    if (!item) {

      return;
    }

    item.workflow =
      workflow;

    item.timeline.unshift({

      id:
        crypto.randomUUID(),

      label:
        ``Workflow ${workflow}``,

      date:
        new Date()
          .toLocaleString()
    });
  }
}

export const ${modulePascal}Store =
  new ${modulePascal}StoreManager();
"@

Set-Content `
  ".\src\domains\$module\store\${modulePascal}Store.ts" `
  $store

Write-Host ""
Write-Host "[CREATED] ${modulePascal}Store.ts"

# =========================================================
# FORM
# =========================================================

$form = @"
// src/components/$module/${modulePascal}Form.tsx

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
  ${modulePascal}Store
}
from "@/domains/$module/store/${modulePascal}Store";

export function ${modulePascal}Form() {

  const router =
    useRouter();

  const [nom, setNom] =
    useState("");
    
  async function handleSubmit() {

    await ModuleRuntime.create({

      domain:
        "$module",

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

    ${modulePascal}Store.add({

      id,

      nom,

      workflow:
        "DRAFT",

      timeline: [

        {

          id:
            crypto.randomUUID(),

          label:
            "$modulePascal créé",

          date:
            new Date()
              .toLocaleString()
        }
      ]
    });

    router.push(
      ``/$module/${id}``
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
"@

Set-Content `
  ".\src\components\$module\${modulePascal}Form.tsx" `
  $form

Write-Host "[CREATED] ${modulePascal}Form.tsx"

# =========================================================
# SUCCESS
# =========================================================

Write-Host ""
Write-Host "========================================="
Write-Host " MODULE READY"
Write-Host "========================================="
Write-Host ""

Write-Host "Usage:"
Write-Host ""
Write-Host ".\scripts\create-erp-module.ps1 maintenance"
Write-Host ""
