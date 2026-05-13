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
      if (field.type !== "relation") return;

      const targetModule =
        field.references?.module ??
        (typeof field.relation === "string"
          ? field.relation
          : field.relation?.module);

      if (!targetModule) return;

      try {
        const options = await ERPRelationDataLoader.load(targetModule);
        setRelationOptions(options);
      } catch (error) {
        console.error("ERP RELATION LOAD ERROR", error);
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
   * WRAPPER GRID
   */
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`
        space-y-2
        col-span-12
        ${field.grid?.cols ? `xl:col-span-${field.grid.cols}` : ""}
      `}
    >
      {children}

      {field.ui?.help && (
        <p className="text-xs text-slate-500">
          {field.ui.help}
        </p>
      )}
    </div>
  );

  /*
   * RELATION
   */
  if (field.type === "relation") {
    return (
      <Wrapper>
        <label className="block space-y-2">
          {label}

          <select
            key={`${field.key}-${String(initialValue ?? "")}-${relationOptions.length}`}
            name={field.key}
            required={field.required}
            defaultValue={String(initialValue ?? "")}
            className={className}
          >
            <option value="">Sélectionner</option>

            {relationOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </Wrapper>
    );
  }

  /*
   * SELECT / STATUS
   */
  if (field.type === "select" || field.type === "status") {
    return (
      <Wrapper>
        <label className="block space-y-2">
          {label}

          <select
            name={field.key}
            required={field.required}
            defaultValue={String(initialValue ?? "")}
            className={className}
          >
            <option value="">Sélectionner</option>

            {(field.options ?? [
              { label: "Actif", value: "actif" },
              { label: "En suivi", value: "en-suivi" },
              { label: "À contrôler", value: "a-controler" },
            ]).map((option, index) => (
              <option
                key={option.value ?? option.label ?? index}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </Wrapper>
    );
  }

  /*
   * BOOLEAN
   */
  if (field.type === "boolean") {
    return (
      <Wrapper>
        <label className="block space-y-2">
          {label}

          <select
            name={field.key}
            required={field.required}
            defaultValue={String(initialValue ?? "")}
            className={className}
          >
            <option value="">Sélectionner</option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>
        </label>
      </Wrapper>
    );
  }

  /*
   * TEXTAREA
   */
  if (field.type === "textarea") {
    return (
      <Wrapper>
        <label className="block space-y-2">
          {label}

          <textarea
            name={field.key}
            required={field.required}
            defaultValue={String(initialValue ?? "")}
            placeholder={field.ui?.placeholder ?? field.label}
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
      </Wrapper>
    );
  }

  /*
   * INPUTS
   */
  return (
    <Wrapper>
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
          placeholder={field.ui?.placeholder ?? field.label}
          className={className}
        />
      </label>
    </Wrapper>
  );
}
