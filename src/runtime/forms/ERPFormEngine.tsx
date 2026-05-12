"use client";

import { useEffect, useMemo, useState } from "react";
import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";

type ERPFieldOption = {
  label: string;
  value: string;
};

type ERPField = {
  key: string;
  label: string;
  type?: string;
  required?: boolean;
  relation?:
    | string
    | {
        module: string;
        collection?: string;
        labelField?: string;
      };
  options?: ERPFieldOption[];
};

type RelationOption = {
  id: string;
  label: string;
};

type RuntimeFormModule = {
  metadata?: {
    key?: string;
  };
  schema?: {
    fields?: ERPField[];
  };
  fields?: ERPField[];
};

type Props = {
  module: RuntimeFormModule;
  initialData?: Record<string, unknown>;
  onSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
};

export function ERPFormEngine({
  module,
  initialData = {},
  onSubmit,
}: Props) {
  const fields = useMemo(() => {
    return module?.schema?.fields ?? module?.fields ?? [];
  }, [module]);

  const [values, setValues] = useState<Record<string, unknown>>(initialData);

  const [relationOptions, setRelationOptions] = useState<
    Record<string, RelationOption[]>
  >({});

  useEffect(() => {
    async function loadRelations() {
      const relationFields = fields.filter(
        (field) => field.type === "relation"
      );

      const loadedOptions: Record<string, RelationOption[]> = {};

      for (const field of relationFields) {
        const targetModule = field.relation;

        if (!targetModule) {
          loadedOptions[field.key] = [];
          continue;
        }

        try {
          loadedOptions[field.key] =
            await ERPRelationDataLoader.load(typeof targetModule === "string" ? targetModule : targetModule.module);
        } catch (error) {
          console.error(
            "Erreur chargement relation",
            field.key,
            targetModule,
            error
          );

          loadedOptions[field.key] = [];
        }
      }

      setRelationOptions(loadedOptions);
    }

    loadRelations();
  }, [fields]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await onSubmit?.(values);

    console.log("ERP FORM SUBMIT", {
      module: module?.metadata?.key,
      data: values,
    });
  }

  if (fields.length === 0) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Aucun champ trouvé dans le schéma du module.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="rounded-xl bg-gray-100 p-4 text-sm">
        Champs détectés : {fields.length}
      </div>

      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required ? " *" : ""}
          </label>

          {field.type === "relation" ? (
            <select
              name={field.key}
              required={field.required}
              value={String(values[field.key] ?? "")}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.key]: event.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="">Sélectionner</option>

              {(relationOptions[field.key] ?? []).map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : field.type === "select" || field.type === "status" ? (
            <select
              name={field.key}
              required={field.required}
              value={String(values[field.key] ?? "")}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.key]: event.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3"
            >
              <option value="">Sélectionner</option>

              {(field.options ?? []).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              name={field.key}
              type={
                field.type === "number"
                  ? "number"
                  : field.type === "date"
                  ? "date"
                  : "text"
              }
              required={field.required}
              value={String(values[field.key] ?? "")}
              onChange={(event) =>
                setValues((current) => ({
                  ...current,
                  [field.key]: event.target.value,
                }))
              }
              className="w-full rounded-xl border px-4 py-3"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="rounded-xl bg-black px-5 py-3 font-medium text-white"
      >
        Enregistrer
      </button>
    </form>
  );
}