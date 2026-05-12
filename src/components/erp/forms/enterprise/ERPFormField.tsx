"use client";

import { useEffect, useState } from "react";
import type { ERPModuleField } from "@/runtime/modules";
import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";

type RelationOption = {
  id: string;
  label: string;
};

interface ERPFormFieldProps {
  field: ERPModuleField;
  initialValue?: unknown;
}

export function ERPFormField({
  field,
  initialValue,
}: ERPFormFieldProps) {
  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);

  useEffect(() => {
    async function loadRelation() {
      if (field.type !== "relation") {
        return;
      }

    const targetModule =
  field.references?.module ??
  (
    typeof field.relation === "string"
      ? field.relation
      : field.relation?.module
  );

      if (!targetModule) {
        return;
      }

      try {
        const options =
          await ERPRelationDataLoader.load(
            targetModule
          );

        setRelationOptions(options);
      } catch (error) {
        console.error(
          "ERP RELATION LOAD ERROR",
          error
        );

        setRelationOptions([]);
      }
    }

    loadRelation();
  }, [field]);

  const label = (
    <span className="text-sm font-bold text-slate-700">
      {field.label}
      {field.required ? " *" : ""}
    </span>
  );

  const className =
    "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500";

  /*
   * RELATION
   */

  if (field.type === "relation") {
    return (
      <label className="block space-y-2">
        {label}

        <select
          key={`${field.key}-${String(initialValue ?? "")}-${relationOptions.length}`}
          name={field.key}
          required={field.required}
          defaultValue={String(initialValue ?? "")}
          className={className}
        >
          <option value="">
            Sélectionner
          </option>

          {relationOptions.map((option) => (
            <option
              key={option.id}
              value={option.id}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  /*
   * SELECT / STATUS
   */

  if (
    field.type === "select" ||
    field.type === "status"
  ) {
    return (
      <label className="block space-y-2">
        {label}

        <select
          name={field.key}
          required={field.required}
          defaultValue={String(initialValue ?? "")}
          className={className}
        >
          <option value="">
            Sélectionner
          </option>

          {(field.options ?? [
            {
              label: "Actif",
              value: "actif",
            },
            {
              label: "En suivi",
              value: "en-suivi",
            },
            {
              label: "À contrôler",
              value: "a-controler",
            },
          ]).map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </label>
    );
  }

  /*
   * BOOLEAN
   */

  if (field.type === "boolean") {
    return (
      <label className="block space-y-2">
        {label}

        <select
          name={field.key}
          required={field.required}
          defaultValue={String(initialValue ?? "")}
          className={className}
        >
          <option value="">
            Sélectionner
          </option>

          <option value="true">
            Oui
          </option>

          <option value="false">
            Non
          </option>
        </select>
      </label>
    );
  }

  /*
   * TEXTAREA
   */

  if (field.type === "textarea") {
    return (
      <label className="block space-y-2">
        {label}

        <textarea
          name={field.key}
          required={field.required}
          defaultValue={String(initialValue ?? "")}
          placeholder={field.label}
          className="
            min-h-32
            w-full
            rounded-2xl
            border
            border-slate-300
            bg-white
            px-4
            py-3
            text-sm
            text-slate-900
            placeholder:text-slate-400
            outline-none
            transition
            focus:border-blue-500
          "
        />
      </label>
    );
  }

  /*
   * INPUTS
   */

  return (
    <label className="block space-y-2">
      {label}

      <input
        name={field.key}
        required={field.required}
        defaultValue={String(initialValue ?? "")}
        type={
          field.type === "number"
            ? "number"
            : field.type === "date"
              ? "date"
              : field.type === "email"
                ? "email"
                : "text"
        }
        placeholder={field.label}
        className={className}
      />
    </label>
  );
}