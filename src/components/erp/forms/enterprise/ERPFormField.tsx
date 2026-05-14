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
  const [relationSearch, setRelationSearch] = useState(""); // --- AJOUT ---

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
   * GRID MAP
   */
  const gridClassMap: Record<number, string> = {
    1: "xl:col-span-1",
    2: "xl:col-span-2",
    3: "xl:col-span-3",
    4: "xl:col-span-4",
    5: "xl:col-span-5",
    6: "xl:col-span-6",
    7: "xl:col-span-7",
    8: "xl:col-span-8",
    9: "xl:col-span-9",
    10: "xl:col-span-10",
    11: "xl:col-span-11",
    12: "xl:col-span-12",
  };

  /*
   * WRAPPER GRID
   */
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <div
      className={`
        space-y-2
        col-span-12
        ${field.grid?.cols ? gridClassMap[field.grid.cols] : ""}
      `}
    >
      {children}

      {field.helperText && (
        <p className="text-xs text-slate-500">
          {field.helperText}
        </p>
      )}
    </div>
  );

  /*
   * RELATION
   */
  if (field.type === "relation") {
    // --- AJOUT : FILTRAGE DES OPTIONS ---
    const filteredOptions =
      relationOptions.filter((option) =>
        option.label
          .toLowerCase()
          .includes(relationSearch.toLowerCase())
      );

    return (
      <Wrapper>
        <label className="block space-y-2">
          {label}

          {/* --- AJOUT : INPUT DE RECHERCHE --- */}
          <input
            type="text"
            placeholder="Rechercher..."
            value={relationSearch}
            onChange={(event) =>
              setRelationSearch(event.target.value)
            }
            className={className}
          />

          <select
            key={`${field.key}-${String(initialValue ?? "")}-${relationOptions.length}`}
            name={field.key}
            required={field.required}
            defaultValue={String(initialValue ?? "")}
            className={className}
          >
            <option value="">
              {field.placeholder ?? "Sélectionner"}
            </option>

            {/* --- AJOUT : UTILISATION DES OPTIONS FILTRÉES --- */}
            {filteredOptions.map((option) => (
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
            <option value="">
              {field.placeholder ?? "Sélectionner"}
            </option>

            {(field.options ?? []).map((option, index) => (
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
            <option value="">
              {field.placeholder ?? "Sélectionner"}
            </option>

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
            placeholder={field.placeholder ?? field.label}
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
              : field.type === "phone"
              ? "tel"
              : "text"
          }
          placeholder={field.placeholder ?? field.label}
          className={className}
        />
      </label>
    </Wrapper>
  );
}
