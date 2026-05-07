Write-Host "=== TERRAGEST_V2 - SETUP GENERIC EDIT PAGE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/components/erp/generic" | Out-Null

cmd /c mkdir "src\app\(private)\exploitations\[id]\edit"
cmd /c mkdir "src\app\(private)\terrains\[id]\edit"
cmd /c mkdir "src\app\(private)\materiels\[id]\edit"

@'
"use client";

import { useEffect, useState } from "react";

import { getSchema } from "@/core/schemas/schema-registry";
import { getModuleByKey } from "@/core/modules/module-registry";

import { executeERPAction } from "@/core/actions/erp-action-engine";

type Props = {
  moduleKey: string;
  id: string;
};

const mockData: Record<string, any> = {
  exploitations: {
    nom: "Exploitation Nord",
    type: "Agricole",
    responsable: "Jean Dupont",
    surface: 120,
    status: "active",
  },

  terrains: {
    nom: "Terrain A1",
    localisation: "Bouaké",
    surface: 40,
    status: "disponible",
  },

  materiels: {
    nom: "Tracteur MF-240",
    categorie: "Tracteur",
    etat: "operationnel",
    cout: 15000000,
  },
};

export function GenericEditPage({
  moduleKey,
  id,
}: Props) {
  const schema = getSchema(moduleKey);

  const module = getModuleByKey(moduleKey);

  const [formData, setFormData] =
    useState<Record<string, any>>({});

  useEffect(() => {
    setFormData(
      mockData[moduleKey] || {}
    );
  }, [moduleKey]);

  if (!schema || !module) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        Module ERP introuvable : {moduleKey}
      </div>
    );
  }

  function handleChange(
    key: string,
    value: any
  ) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    await executeERPAction({
      module: moduleKey,
      action: "update",
      data: {
        id,
        ...formData,
      },
    });

    alert(
      `Mise à jour ERP exécutée : ${
        module?.label ?? moduleKey
      }`
    );
  }

  return (
    <div className="space-y-6">
      <section className="flex items-start justify-between">
        <div>
          <div className="text-sm font-medium uppercase tracking-wide text-slate-400">
            ERP EDIT
          </div>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Modifier {module.label}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Formulaire ERP généré automatiquement depuis le schema centralisé.
          </p>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
      >
        <div className="grid gap-6 md:grid-cols-2">
          {schema.fields.map((field) => {
            if (
              field.type === "status"
            ) {
              return (
                <div
                  key={field.key}
                  className="space-y-2"
                >
                  <label
                    className="
                      text-sm
                      font-medium
                      text-slate-700
                    "
                  >
                    {field.label}
                  </label>

                  <select
                    value={
                      formData[field.key] || ""
                    }
                    onChange={(event) =>
                      handleChange(
                        field.key,
                        event.target.value
                      )
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      px-4
                      py-3
                      text-sm
                      outline-none
                      transition
                      focus:border-slate-900
                    "
                  >
                    <option value="">
                      Sélectionner
                    </option>

                    {schema.statuses?.map(
                      (status) => (
                        <option
                          key={status.value}
                          value={status.value}
                        >
                          {status.label}
                        </option>
                      )
                    )}
                  </select>
                </div>
              );
            }

            const inputType =
              field.type === "number" ||
              field.type === "currency"
                ? "number"
                : "text";

            return (
              <div
                key={field.key}
                className="space-y-2"
              >
                <label
                  className="
                    text-sm
                    font-medium
                    text-slate-700
                  "
                >
                  {field.label}
                </label>

                <input
                  type={inputType}
                  required={
                    field.required
                  }
                  value={
                    formData[field.key] || ""
                  }
                  onChange={(event) =>
                    handleChange(
                      field.key,
                      event.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:border-slate-900
                  "
                />
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="
              rounded-xl
              bg-slate-900
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-slate-700
            "
          >
            Mettre à jour
          </button>
        </div>
      </form>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          Runtime ERP
        </h2>

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            Action Engine
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            Domain Events
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            Workflow Engine
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            Audit Runtime
          </div>
        </div>
      </section>
    </div>
  );
}
'@ | Set-Content "src/components/erp/generic/GenericEditPage.tsx"

@'
import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

type Props = {
  params: {
    id: string;
  };
};

export default function ExploitationEditPage({
  params,
}: Props) {
  return (
    <GenericEditPage
      moduleKey="exploitations"
      id={params.id}
    />
  );
}
'@ | Out-File -Encoding utf8 "src\app\(private)\exploitations\[id]\edit\page.tsx"

@'
import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

type Props = {
  params: {
    id: string;
  };
};

export default function TerrainEditPage({
  params,
}: Props) {
  return (
    <GenericEditPage
      moduleKey="terrains"
      id={params.id}
    />
  );
}
'@ | Out-File -Encoding utf8 "src\app\(private)\terrains\[id]\edit\page.tsx"

@'
import { GenericEditPage } from "@/components/erp/generic/GenericEditPage";

type Props = {
  params: {
    id: string;
  };
};

export default function MaterielEditPage({
  params,
}: Props) {
  return (
    <GenericEditPage
      moduleKey="materiels"
      id={params.id}
    />
  );
}
'@ | Out-File -Encoding utf8 "src\app\(private)\materiels\[id]\edit\page.tsx"

Write-Host "=== GENERIC EDIT PAGE créée avec succès ===" -ForegroundColor Green