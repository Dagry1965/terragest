"use client";

import { useState } from "react";

import { getSchema } from "@/core/schemas/schema-registry";
import { getModuleByKey } from "@/core/modules/module-registry";
import { executeERPAction } from "@/core/actions/erp-action-engine";


type Props = {
  moduleKey: string;
};

export function GenericCreatePage({
  moduleKey,
}: Props) {
  const schema = getSchema(moduleKey);

  const module = getModuleByKey(moduleKey);

  const [formData, setFormData] =
    useState<Record<string, any>>({});

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

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    console.log("ERP CREATE", {
      module: moduleKey,
      data: formData,
    });

    alert(
  `Création ${module?.label ?? moduleKey} simulée`
);
  }

  return (
    <div className="space-y-6">
      <section className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">
            Nouveau {module.label}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Formulaire généré automatiquement depuis le schema ERP.
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
            Créer
          </button>
        </div>
      </form>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          Capacités ERP
        </h2>

        <div className="mt-4 flex flex-wrap gap-2">
          {module.features?.workflow && (
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Workflow
            </span>
          )}

          {module.features?.audit && (
            <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              Audit
            </span>
          )}

          {module.features?.supervision && (
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              Supervision
            </span>
          )}

          {module.features?.notifications && (
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Notifications
            </span>
          )}
        </div>
      </section>
    </div>
  );
}


