"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { ERPModuleField } from "@/runtime/modules";
import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";

type RelationOption = {
  id: string;
  label: string;
};

interface ERPFormFieldProps {
  field: ERPModuleField;
  value?: unknown;
  onChange?: (key: string, value: unknown) => void;
  error?: string;
  lockedFields?: string[];
}

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

function normalizeFormFieldValue(
  field: ERPModuleField,
  value: unknown
): string {
  if (
    value === null ||
    value === undefined
  ) {
    return "";
  }

  if (
    field.type === "date" ||
    field.type === "datetime"
  ) {
    if (
      typeof value === "object" &&
      value &&
      "seconds" in value
    ) {
      const seconds =
        Number(
          (value as { seconds: number }).seconds
        );

      const date =
        new Date(seconds * 1000);

      if (Number.isNaN(date.getTime())) {
        return "";
      }

      if (field.type === "datetime") {
        return date.toISOString().slice(0, 16);
      }

      return date.toISOString().slice(0, 10);
    }

    if (value instanceof Date) {
      if (field.type === "datetime") {
        return value.toISOString().slice(0, 16);
      }

      return value.toISOString().slice(0, 10);
    }

    const date =
      new Date(String(value));

    if (!Number.isNaN(date.getTime())) {
      if (field.type === "datetime") {
        return date.toISOString().slice(0, 16);
      }

      return date.toISOString().slice(0, 10);
    }

    return String(value);
  }

  if (typeof value === "object") {
    return "";
  }

  return String(value);
}

function FieldWrapper({
  field,
  children,
  error,
}: {
  field: ERPModuleField;
  children: ReactNode;
  error?: string;
}) {
  return (
    <div
      data-field-key={field.key}
      className={`
        space-y-2
        col-span-12
        ${field.grid?.cols ? gridClassMap[field.grid.cols] : ""}
      `}
    >
      {children}

      {field.helperText ? (
        <p className="text-xs text-slate-500">
          {field.helperText}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ERPFormField({
  field,
  value,
  onChange,
  error,
  lockedFields = [],
}: ERPFormFieldProps) {
  const router = useRouter();

  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);
  const [relationSearch, setRelationSearch] = useState("");

  const currentValue = normalizeFormFieldValue(field, value);

  const isLocked =
    lockedFields.includes(field.key);

  useEffect(() => {
    async function loadRelation() {
      if (field.type !== "relation") return;

      const targetModule =
        field.references?.module ??
        (typeof field.relation === "string"
          ? field.relation
          : typeof field.relation === "string"
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

  const lockedClassName =
    `${className} cursor-not-allowed bg-slate-100 text-slate-500`;

  if (field.type === "relation") {
	  const relationConfig =
    typeof field.relation === "string"
      ? null
      : field.relation;

  const canCreateRelation =
    Boolean(relationConfig?.create?.enabled);
    const filteredOptions = relationOptions.filter((option) =>
      option.label.toLowerCase().includes(relationSearch.toLowerCase())
    );

    return (
      <FieldWrapper field={field} error={error}>
        <label className="block space-y-2">
          {label}

          <input
            type="text"
            placeholder="Rechercher..."
            value={relationSearch}
            disabled={isLocked}
            onChange={(event) => setRelationSearch(event.target.value)}
            className={`${className} ${
              isLocked
                ? "cursor-not-allowed bg-slate-100 text-slate-500"
                : ""
            }`}
          />

          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            disabled={isLocked}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={`${className} ${
              isLocked
                ? "cursor-not-allowed bg-slate-100 text-slate-500"
                : ""
            }`}
          >
            <option value="">
              {field.placeholder ?? "Sélectionner"}
            </option>

            {filteredOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          {canCreateRelation? (
            <button
              type="button"
              onClick={() => {
                const targetModule =
  		relationConfig?.module;

                if (!targetModule) {
                  return;
                }

                const params =
                  new URLSearchParams();

                const prefill =
                  relationConfig?.create?.prefill ?? {};

                Object.entries(prefill).forEach(([key, value]) => {
                  params.set(key, String(value));
                });

                const today =
  new Date()
    .toISOString()
    .split("T")[0];

params.set(
  "dateDebut",
  today
);

params.set(
  "returnTo",
  window.location.pathname
);

if (
  field.key ===
  "contratId"
) {
  const pathParts =
    window.location.pathname
      .split("/")
      .filter(Boolean);

  const parentModule =
    pathParts[0];

  const parentId =
    pathParts[1] ?? "";

  if (parentModule === "terrains") {
    params.set("typeContrat", "terrain");
    params.set("terrainId", parentId);
    params.set("exploitationId", "");
    params.set("lockFields", "typeContrat,terrainId,exploitationId");
  }

  if (parentModule === "exploitations") {
    params.set("typeContrat", "exploitation");
    params.set("exploitationId", parentId);
    params.set("terrainId", "");
    params.set("lockFields", "typeContrat,terrainId,exploitationId");
  }
}

const query =
  params.toString();

router.push(
`/${targetModule}/nouveau?${query}`
);
              }}
              className="
                mt-2
                inline-flex
                items-center
                rounded-xl
                border
                border-blue-200
                bg-blue-50
                px-4
                py-2
                text-sm
                font-bold
                text-blue-700
                transition
                hover:bg-blue-100
              "
            >
              + Créer {field.label}
            </button>
          ) : null}
        </label>
      </FieldWrapper>
    );
  }

  if (field.type === "select" || field.type === "status") {
    return (
      <FieldWrapper field={field} error={error}>
        <label className="block space-y-2">
          {label}

          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            disabled={isLocked}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={`${className} ${
              isLocked
                ? "cursor-not-allowed bg-slate-100 text-slate-500"
                : ""
            }`}
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

          {typeof field.relation !== "string" &&
          field.relation?.create?.enabled ? (
            <button
              type="button"
              onClick={() => {
                const targetModule =
                  typeof field.relation === "string"
  ? field.relation
  : field.relation?.module;

                if (!targetModule) {
                  return;
                }

                const params =
                  new URLSearchParams();

                const prefill =
                  typeof field.relation === "string"
  ? {}
  : field.relation?.create?.prefill ?? {};

                Object.entries(prefill).forEach(([key, value]) => {
                  params.set(key, String(value));
                });

const today =
  new Date()
    .toISOString()
    .split("T")[0];

params.set(
  "dateDebut",
  today
);

params.set(
  "returnTo",
  window.location.pathname
);

if (
  field.key ===
  "contratId"
) {
  const pathParts =
    window.location.pathname
      .split("/")
      .filter(Boolean);

  const parentModule =
    pathParts[0];

  const parentId =
    pathParts[1] ?? "";

  if (parentModule === "terrains") {
    params.set("typeContrat", "terrain");
    params.set("terrainId", parentId);
    params.set("exploitationId", "");
    params.set("lockFields", "typeContrat,terrainId,exploitationId");
  }

  if (parentModule === "exploitations") {
    params.set("typeContrat", "exploitation");
    params.set("exploitationId", parentId);
    params.set("terrainId", "");
    params.set("lockFields", "typeContrat,terrainId,exploitationId");
  }
}

const query =
  params.toString();

router.push(
`/${targetModule}/nouveau?${query}`
);
              }}
              className="
                mt-2
                inline-flex
                items-center
                rounded-xl
                border
                border-blue-200
                bg-blue-50
                px-4
                py-2
                text-sm
                font-bold
                text-blue-700
                transition
                hover:bg-blue-100
              "
            >
              + Créer {field.label}
            </button>
          ) : null}
        </label>
      </FieldWrapper>
    );
  }

  if (field.type === "boolean") {
    return (
      <FieldWrapper field={field} error={error}>
        <label className="block space-y-2">
          {label}

          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            disabled={isLocked}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={`${className} ${
              isLocked
                ? "cursor-not-allowed bg-slate-100 text-slate-500"
                : ""
            }`}
          >
            <option value="">
              {field.placeholder ?? "Sélectionner"}
            </option>
            <option value="true">Oui</option>
            <option value="false">Non</option>
          </select>

          {typeof field.relation !== "string" &&
          field.relation?.create?.enabled ? (
            <button
              type="button"
              onClick={() => {
                const targetModule =
                  typeof field.relation === "string"
  ? field.relation
  : field.relation?.module;

                if (!targetModule) {
                  return;
                }

                const params =
                  new URLSearchParams();

                const prefill =
                  typeof field.relation === "string"
  ? {}
  : field.relation?.create?.prefill ?? {};

                Object.entries(prefill).forEach(([key, value]) => {
                  params.set(key, String(value));
                });

             const today =
  new Date()
    .toISOString()
    .split("T")[0];

params.set(
  "dateDebut",
  today
);

params.set(
  "returnTo",
  window.location.pathname
);

if (
  field.key ===
  "contratId"
) {
  const pathParts =
    window.location.pathname
      .split("/")
      .filter(Boolean);

  const parentModule =
    pathParts[0];

  const parentId =
    pathParts[1] ?? "";

  if (parentModule === "terrains") {
    params.set("typeContrat", "terrain");
    params.set("terrainId", parentId);
    params.set("exploitationId", "");
    params.set("lockFields", "typeContrat,terrainId,exploitationId");
  }

  if (parentModule === "exploitations") {
    params.set("typeContrat", "exploitation");
    params.set("exploitationId", parentId);
    params.set("terrainId", "");
    params.set("lockFields", "typeContrat,terrainId,exploitationId");
  }
}

const query =
  params.toString();

router.push(
`/${targetModule}/nouveau?${query}`
);
              }}
              className="
                mt-2
                inline-flex
                items-center
                rounded-xl
                border
                border-blue-200
                bg-blue-50
                px-4
                py-2
                text-sm
                font-bold
                text-blue-700
                transition
                hover:bg-blue-100
              "
            >
              + Créer {field.label}
            </button>
          ) : null}
        </label>
      </FieldWrapper>
    );
  }

  if (field.type === "textarea") {
    return (
      <FieldWrapper field={field} error={error}>
        <label className="block space-y-2">
          {label}

          <textarea
            name={field.key}
            required={field.required}
            value={currentValue}
            onChange={(event) => onChange?.(field.key, event.target.value)}
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
      </FieldWrapper>
    );
  }

  const primitiveInputType =
    field.type === "text"
      ? "text"
      : field.type === "number"
        ? "number"
        : field.type === "date"
          ? "date"
          : field.type === "datetime"
            ? "datetime-local"
            : field.type === "email"
              ? "email"
              : field.type === "phone"
                ? "tel"
                : "text";

  return (
    <FieldWrapper field={field} error={error}>
      <label className="block space-y-2">
        {label}

        <input
          name={field.key}
          required={field.required}
          value={currentValue}
          disabled={isLocked}
          onChange={(event) => onChange?.(field.key, event.target.value)}
          type={primitiveInputType}
          placeholder={field.placeholder ?? field.label}
          className={isLocked ? lockedClassName : className}
        />
      </label>
    </FieldWrapper>
  );
}