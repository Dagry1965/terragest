Write-Host "=== TERRAGEST_V2 - SETUP ERP DYNAMIC FORM ENGINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/components/erp/dynamic-form" | Out-Null

@'
"use client";

import { useState } from "react";

import {
  validatePayload,
} from "@/core/validation/validation-engine";

type Field = {
  name: string;

  label: string;

  type?: string;

  required?: boolean;
};

type Props = {
  module: string;

  fields: Field[];

  initialValues?: any;

  onSubmit: (
    values: any
  ) => Promise<void>;
};

export function DynamicFormEngine({
  module,
  fields,
  initialValues = {},
  onSubmit,
}: Props) {
  const [values, setValues] =
    useState(initialValues);

  const [errors, setErrors] =
    useState<string[]>([]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const validation =
      validatePayload(
        module,
        values
      );

    if (!validation.valid) {
      setErrors(
        validation.errors
      );

      return;
    }

    setErrors([]);

    await onSubmit(values);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {errors.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="text-sm font-semibold text-red-700">
            Validation ERP
          </div>

          <ul className="mt-2 space-y-1 text-sm text-red-600">
            {errors.map(
              (error) => (
                <li key={error}>
                  • {error}
                </li>
              )
            )}
          </ul>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2">
        {fields.map((field) => (
          <div
            key={field.name}
            className="space-y-2"
          >
            <label className="text-sm font-medium text-slate-700">
              {field.label}
            </label>

            <input
              type={
                field.type ||
                "text"
              }
              value={
                values[
                  field.name
                ] || ""
              }
              onChange={(e) =>
                setValues({
                  ...values,
                  [field.name]:
                    e.target.value,
                })
              }
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-white
                px-4
                py-3
                text-sm
                shadow-sm
                outline-none
                transition
                focus:border-slate-400
              "
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="
            rounded-2xl
            bg-slate-950
            px-5
            py-3
            text-sm
            font-medium
            text-white
            shadow-sm
            transition
            hover:bg-slate-800
          "
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}
'@ | Set-Content "src/components/erp/dynamic-form/DynamicFormEngine.tsx"

Write-Host "=== ERP DYNAMIC FORM ENGINE créé avec succès ===" -ForegroundColor Green