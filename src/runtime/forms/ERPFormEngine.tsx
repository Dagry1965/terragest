"use client";

import { useEffect, useMemo, useState } from "react";
import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader"; // ✅ Correction ajoutée

import type {
  ERPConditionalRule,
  ERPModuleField,
} from "@/runtime/modules/schemas/ERPModuleSchema";

type RuntimeFormModule = {
  fields?: ERPModuleField[];
  schema?: {
    fields?: ERPModuleField[];
  };
};

type RelationOption = {
  id: string;
  label: string;
};

type Props = {
  module: RuntimeFormModule;
  initialData?: Record<string, unknown>;
  onSubmit?: (data: Record<string, unknown>) => void | Promise<void>;
};

/* ---------------------------------------------------------
 * CONDITIONAL LOGIC
 * --------------------------------------------------------- */
function evaluateCondition(
  condition: ERPConditionalRule | undefined,
  data: Record<string, unknown>
) {
  if (!condition) return true;

  const currentValue = data[condition.field];

  switch (condition.operator) {
    case "equals":
      return currentValue === condition.value;
    case "notEquals":
      return currentValue !== condition.value;
    case "in":
      return condition.values?.includes(currentValue) ?? false;
    case "notIn":
      return !(condition.values?.includes(currentValue) ?? false);
    default:
      return true;
  }
}

export function ERPFormEngine({
  module,
  initialData = {},
  onSubmit,
}: Props) {
  const fields = useMemo(() => {
    return module.schema?.fields ?? module.fields ?? [];
  }, [module]);

  const [values, setValues] = useState<Record<string, unknown>>(initialData);
  const [relationOptions, setRelationOptions] = useState<
    Record<string, RelationOption[]>
  >({});

  /* ---------------------------------------------------------
   * LOAD RELATIONS
   * --------------------------------------------------------- */
  useEffect(() => {
    async function loadRelations() {
      const relationFields = fields.filter(
        (field: ERPModuleField) => field.type === "relation"
      );

      const loadedOptions: Record<string, RelationOption[]> = {};

      for (const field of relationFields) {
        const targetModule = field.references?.module ?? field.relation;

        if (!targetModule) {
          loadedOptions[field.key] = [];
          continue;
        }

        loadedOptions[field.key] =
          await ERPRelationDataLoader.load(targetModule);
      }

      setRelationOptions(loadedOptions);
    }

    loadRelations();
  }, [fields]);

  /* ---------------------------------------------------------
   * VALIDATION
   * --------------------------------------------------------- */
  function validateField(
    field: ERPModuleField,
    value: unknown,
    data: Record<string, unknown>
  ) {
    const errors: string[] = [];

    for (const validator of field.validators ?? []) {
      switch (validator.type) {
        case "min":
          if (
            typeof value === "number" &&
            typeof validator.value === "number" &&
            value < validator.value
          ) {
            errors.push(
              validator.message ??
                `${field.label} doit être ≥ ${validator.value}`
            );
          }
          break;

        case "max":
          if (
            typeof value === "number" &&
            typeof validator.value === "number" &&
            value > validator.value
          ) {
            errors.push(
              validator.message ??
                `${field.label} doit être ≤ ${validator.value}`
            );
          }
          break;
      }
    }

    return errors;
  }

  /* ---------------------------------------------------------
   * SUBMIT
   * --------------------------------------------------------- */
  async function handleSubmit(formData: FormData) {
    const payload: Record<string, unknown> = {};
    const validationErrors: string[] = [];

    for (const field of fields) {
      const value = formData.get(field.key);

      payload[field.key] = value;

      const fieldErrors = validateField(field, value, payload);
      validationErrors.push(...fieldErrors);
    }

    if (validationErrors.length > 0) {
      console.error(validationErrors);
      return;
    }

    await onSubmit?.(payload);
  }

  /* ---------------------------------------------------------
   * OPTIONS DYNAMIQUES
   * --------------------------------------------------------- */
  function getOptions(field: ERPModuleField) {
    if (field.dependsOn && field.optionsByValue) {
      const parentValue = String(values[field.dependsOn] ?? "");
      return field.optionsByValue[parentValue] ?? [];
    }

    return field.options ?? [];
  }

  /* ---------------------------------------------------------
   * RENDER
   * --------------------------------------------------------- */
  return (
    <form action={handleSubmit} className="space-y-6">
      {fields.map((field: ERPModuleField) => {
        const isVisible = evaluateCondition(field.visibleIf, values);
        if (!isVisible) return null;

        const isRequired =
          field.required ||
          !evaluateCondition(field.requiredIf, values)
            ? field.required
            : false;

        const isReadonly = !evaluateCondition(field.readonlyIf, values);

        const options = getOptions(field);

        return (
          <div key={field.key} className="space-y-2">
            <label className="text-sm font-medium">
              {field.label}
              {isRequired ? " *" : ""}
            </label>

            {field.type === "textarea" ? (
              <textarea
                name={field.key}
                value={String(values[field.key] ?? "")}
                className="w-full rounded-xl border px-4 py-3"
                required={isRequired}
                readOnly={isReadonly}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
              />
            ) : field.type === "relation" ? (
              <select
                name={field.key}
                value={String(values[field.key] ?? "")}
                className="w-full rounded-xl border px-4 py-3"
                required={isRequired}
                disabled={isReadonly}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
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
                value={String(values[field.key] ?? "")}
                className="w-full rounded-xl border px-4 py-3"
                required={isRequired}
                disabled={isReadonly}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
              >
                <option value="">Sélectionner</option>

                {options.map((option) => (
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
                value={String(values[field.key] ?? "")}
                className="w-full rounded-xl border px-4 py-3"
                required={isRequired}
                readOnly={isReadonly}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    [field.key]: event.target.value,
                  }))
                }
              />
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="rounded-xl bg-black px-5 py-3 font-medium text-white"
      >
        Enregistrer
      </button>
    </form>
  );
}
