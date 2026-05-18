"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { ERPModuleField } from "@/runtime/modules";
import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";

type RelationOption = {
  id: string;
  label: string;
  record?: Record<string, unknown>;
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

function buildRelationCreateUrl({
  targetModule,
  fieldKey,
  prefill,
}: {
  targetModule: string;
  fieldKey: string;
  prefill?: Record<string, unknown>;
}) {
  const params =
    new URLSearchParams();

  Object.entries(prefill ?? {}).forEach(
    ([key, value]) => {
      if (
        value !== undefined &&
        value !== null
      ) {
        params.set(key, String(value));
      }
    }
  );

  if (typeof window !== "undefined") {
    params.set(
      "returnTo",
      window.location.pathname
    );

    const pathParts =
      window.location.pathname
        .split("/")
        .filter(Boolean);

    const parentModule =
      pathParts[0];

    const parentId =
      pathParts[1] ?? "";

    if (
      targetModule === "contrats" &&
      !params.has("dateDebut")
    ) {
      params.set(
        "dateDebut",
        new Date()
          .toISOString()
          .split("T")[0]
      );
    }

    if (
      fieldKey === "contratId" &&
      parentModule === "terrains" &&
      parentId
    ) {
      params.set("typeContrat", "terrain");
      params.set("terrainId", parentId);
      params.set("exploitationId", "");
      params.set(
        "lockFields",
        "typeContrat,terrainId,exploitationId"
      );
    }

    if (
      fieldKey === "contratId" &&
      parentModule === "exploitations" &&
      parentId
    ) {
      params.set("typeContrat", "exploitation");
      params.set("exploitationId", parentId);
      params.set("terrainId", "");
      params.set(
        "lockFields",
        "typeContrat,terrainId,exploitationId"
      );
    }
  }

  const query =
    params.toString();

  return query
    ? `/${targetModule}/nouveau?${query}`
    : `/${targetModule}/nouveau`;
}

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

function getRelationTargetModule(
  field: ERPModuleField
): string {
  return (
    field.references?.module ??
    (typeof field.relation === "string"
      ? field.relation
      : field.relation?.module) ??
    ""
  );
}

function getRelationFilterConfig(
  field: ERPModuleField
): {
  sourceField?: string;
  targetField?: string;
  includeEmptyTarget?: boolean;
} | null {
  if (
    !field.relation ||
    typeof field.relation === "string"
  ) {
    return null;
  }

  const relationWithFilter =
    field.relation as {
      filterBy?: {
        sourceField?: string;
        targetField?: string;
        includeEmptyTarget?: boolean;
      };
    };

  return relationWithFilter.filterBy ?? null;
}

function getCurrentFormValue(
  fieldKey: string
): string {
  if (typeof document === "undefined") {
    return "";
  }

  const element =
    document.querySelector(
      `[name="${fieldKey}"]`
    ) as HTMLInputElement | HTMLSelectElement | null;

  return String(element?.value ?? "");
}

function relationTargetIsEmpty(
  value: unknown
): boolean {
  return (
    value === undefined ||
    value === null ||
    String(value).trim() === ""
  );
}

function compactLockedRelationLabel(
  label: string
): string {
  const value =
    String(label || "").trim();

  if (!value) {
    return "";
  }

  return value
    .split("•")[0]
    .trim();
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
        <p className="text-xs text-[var(--erp-text-muted)]">
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
  const [lockedRelationLabel, setLockedRelationLabel] = useState("");
  const [relationFilterSourceValue, setRelationFilterSourceValue] = useState("");

  const currentValue = normalizeFormFieldValue(field, value);

  const isLocked =
    lockedFields.includes(field.key);

  useEffect(() => {
    async function loadLockedRelationLabel() {
      if (field.type !== "relation" || !isLocked || !currentValue) {
        setLockedRelationLabel("");
        return;
      }

      const targetModule =
        getRelationTargetModule(field);

      if (!targetModule) {
        setLockedRelationLabel("");
        return;
      }

      const label =
        await ERPRelationDataLoader.resolveLabel(
          targetModule,
          currentValue
        );

      setLockedRelationLabel(label);
    }

    loadLockedRelationLabel().catch(() => {
      setLockedRelationLabel("");
    });
  }, [field, isLocked, currentValue]);

  useEffect(() => {
    async function loadRelation() {
      if (field.type !== "relation") return;

      const targetModule =
        getRelationTargetModule(field);

      if (!targetModule) return;

      try {
        const options = await ERPRelationDataLoader.load(targetModule);
        setRelationOptions(options as RelationOption[]);
      } catch (error) {
        console.error("ERP RELATION LOAD ERROR", error);
        setRelationOptions([]);
      }
    }

    loadRelation();
  }, [field]);

  useEffect(() => {
    const filterConfig =
      getRelationFilterConfig(field);

    if (
      field.type !== "relation" ||
      !filterConfig?.sourceField
    ) {
      setRelationFilterSourceValue("");
      return;
    }

    const sourceField =
      filterConfig.sourceField;

    function refreshRelationFilterSourceValue() {
      setRelationFilterSourceValue(
        getCurrentFormValue(sourceField)
      );
    }

    refreshRelationFilterSourceValue();

    const sourceElement =
      typeof document === "undefined"
        ? null
        : document.querySelector(
            `[name="${sourceField}"]`
          );

    sourceElement?.addEventListener(
      "change",
      refreshRelationFilterSourceValue
    );

    sourceElement?.addEventListener(
      "input",
      refreshRelationFilterSourceValue
    );

    return () => {
      sourceElement?.removeEventListener(
        "change",
        refreshRelationFilterSourceValue
      );

      sourceElement?.removeEventListener(
        "input",
        refreshRelationFilterSourceValue
      );
    };
  }, [field]);

  const label = (
    <span className="text-sm font-bold text-[var(--erp-text)]">
      {field.label}
      {field.required ? " *" : ""}
    </span>
  );

  const className =
    "w-full rounded-xl border border-[var(--erp-border)] bg-[var(--erp-input-bg)] px-4 py-2.5 text-sm text-[var(--erp-text)] placeholder:text-slate-400 outline-none transition focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)] focus:border-blue-500";

  const lockedClassName =
    `${className} cursor-not-allowed bg-slate-100 text-[var(--erp-text-muted)]`;

  if (field.type === "relation") {
    const relationConfig =
      typeof field.relation === "string"
        ? null
        : field.relation;

    const canCreateRelation =
      Boolean(relationConfig?.create?.enabled) &&
      !isLocked;

    const selectedOption =
      relationOptions.find((option) =>
        String(option.id) === String(currentValue)
      );

    const selectedLabel =
      lockedRelationLabel ||
      selectedOption?.label ||
      (currentValue
        ? "Relation métier sélectionnée"
        : "Aucune relation renseignée");

    const filterConfig =
      getRelationFilterConfig(field);

    const filteredByContext =
      relationOptions.filter((option) => {
        if (
          !filterConfig?.sourceField ||
          !filterConfig?.targetField
        ) {
          return true;
        }

        const targetValue =
          option.record?.[filterConfig.targetField];

        if (!relationFilterSourceValue) {
          return filterConfig.includeEmptyTarget
            ? relationTargetIsEmpty(targetValue)
            : true;
        }

        return (
          String(targetValue ?? "") === String(relationFilterSourceValue) ||
          (
            Boolean(filterConfig.includeEmptyTarget) &&
            relationTargetIsEmpty(targetValue)
          )
        );
      });

    const filteredOptions =
      filteredByContext.filter((option) =>
        option.label
          .toLowerCase()
          .includes(relationSearch.toLowerCase())
      );

      const currentOptionInFilteredList =
        filteredOptions.some((option) =>
          String(option.id) === String(currentValue)
        );

      const safeFilteredOptions =
        currentValue && !currentOptionInFilteredList
          ? [
              {
                id: String(currentValue),
                label:
                  selectedOption?.label &&
                  true
                    ? selectedOption.label
                    : "Relation actuelle conservée",
                record: selectedOption?.record,
              },
              ...filteredOptions,
            ]
          : filteredOptions;


    const lockedDisplayLabel =
      compactLockedRelationLabel(selectedLabel) ||
      selectedLabel;

    if (isLocked) {
      return (
        <FieldWrapper field={field} error={error}>
          <div className="block space-y-2">
            {label}

            <input
              type="hidden"
              name={field.key}
              value={currentValue}
            />

            <div className="rounded-xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-4 py-2.5">
              <p className="text-xs font-black uppercase tracking-wide text-[var(--erp-primary)]">
                Relation métier verrouillée
              </p>

              <p className="mt-1 text-sm font-black text-[var(--erp-text)]">
                {lockedDisplayLabel}
              </p>

              <p className="mt-1 text-xs text-[var(--erp-text-muted)]">
                Cette relation vient du contexte d’origine et ne peut pas être modifiée ici.
              </p>
            </div>
          </div>
        </FieldWrapper>
      );
    }

    return (
      <FieldWrapper field={field} error={error}>
        <label className="block space-y-2">
          {label}

          <input
            type="text"
            placeholder="Rechercher..."
            value={relationSearch}
            onChange={(event) => setRelationSearch(event.target.value)}
            className={className}
          />

          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={className}
          >
            <option value="">
              {field.placeholder ?? "Sélectionner"}
            </option>

            {safeFilteredOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>

          {canCreateRelation ? (
            <button
              type="button"
              onClick={() => {
                const targetModule =
                  relationConfig?.module;

                if (!targetModule) {
                  return;
                }

                router.push(
                  buildRelationCreateUrl({
                    targetModule,
                    fieldKey: field.key,
                    prefill:
                      relationConfig?.create?.prefill ?? {},
                  })
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
                transition focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)]
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
                ? "cursor-not-allowed bg-slate-100 text-[var(--erp-text-muted)]"
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

                router.push(
                  buildRelationCreateUrl({
                    targetModule,
                    fieldKey: field.key,
                    prefill:
                      typeof field.relation === "string"
                        ? {}
                        : field.relation?.create?.prefill ?? {},
                  })
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
                transition focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)]
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
                ? "cursor-not-allowed bg-slate-100 text-[var(--erp-text-muted)]"
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

                router.push(
                  buildRelationCreateUrl({
                    targetModule,
                    fieldKey: field.key,
                    prefill:
                      typeof field.relation === "string"
                        ? {}
                        : field.relation?.create?.prefill ?? {},
                  })
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
                transition focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)]
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
              rounded-xl
              border
              border-[var(--erp-border)]
              bg-[var(--erp-input-bg)]
              px-4
              py-2.5
              text-sm
              text-[var(--erp-text)]
              placeholder:text-slate-400
              outline-none
              transition focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)]
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
