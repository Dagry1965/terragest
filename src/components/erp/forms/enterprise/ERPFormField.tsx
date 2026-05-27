"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import type { ERPModule, ERPModuleField } from "@/runtime/modules";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import { ERPRelationDataLoader } from "@/runtime/modules/lifecycle/ERPRelationDataLoader";
import { RuntimeRelationFilterEngine } from "@/runtime/relations";
import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { RuntimeSchedulingEngine } from "@/runtime/scheduling";
import {
  useAuth,
} from "@/providers/AuthProvider";

type RelationOption = {
  id: string;
  label: string;
  record?: Record<string, unknown>;
};

interface ERPFormRelationChangeContext {
  field: ERPModuleField;
  selectedOption?: RelationOption;
}

interface ERPFormFieldProps {
  module?: ERPModule;
  field: ERPModuleField;
  value?: unknown;
  formValues?: Record<string, unknown>;
  onChange?: (
    key: string,
    value: unknown,
    context?: ERPFormRelationChangeContext
  ) => void;
  error?: string;
  lockedFields?: string[];
  readOnlyFields?: string[];
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

function resolveRuntimeModuleByKey(moduleKey?: string) {
  if (!moduleKey) {
    return null;
  }

  return (
    coreERPModules.find((runtimeModule) => {
      const moduleRecord =
        runtimeModule as unknown as {
          key?: string;
          collection?: string;
          metadata?: {
            key?: string;
            collection?: string;
          };
        };

      return (
        moduleRecord.key === moduleKey ||
        moduleRecord.collection === moduleKey ||
        moduleRecord.metadata?.key === moduleKey ||
        moduleRecord.metadata?.collection === moduleKey
      );
    }) ?? null
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

function getRelationExcludeUsedByConfig(
  field: ERPModuleField
): {
  module?: string;
  field?: string;
} | null {
  if (
    !field.relation ||
    typeof field.relation === "string"
  ) {
    return null;
  }

  const relationWithExcludeUsedBy =
    field.relation as {
      excludeUsedBy?: {
        module?: string;
        field?: string;
      };
    };

  return relationWithExcludeUsedBy.excludeUsedBy ?? null;
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
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        text-slate-950
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
  module,
  field,
  value,
  formValues = {},
  onChange,
  error,
  lockedFields = [],
  readOnlyFields = [],
}: ERPFormFieldProps) {
  const router = useRouter();

  const {
    loading: authLoading,
    user: authUser,
  } = useAuth();

  const [relationOptions, setRelationOptions] = useState<RelationOption[]>([]);
  const [relationUsedRecords, setRelationUsedRecords] = useState<Record<string, unknown>[]>([]);
  const [relationSearch, setRelationSearch] = useState("");
  const [lockedRelationLabel, setLockedRelationLabel] = useState("");
  const [relationFilterSourceValue, setRelationFilterSourceValue] = useState("");
  const [schedulingSlots, setSchedulingSlots] = useState<
    Array<{
      start: string;
      end: string;
      label: string;
      available: boolean;
      capacity?: number;
      usedCapacity?: number;
      remainingCapacity?: number;
      reason?: string;
    }>
  >([]);
  const [schedulingSlotsLoading, setSchedulingSlotsLoading] = useState(false);

  // Q22D3B_MODULE_CONTEXT_READY
  // ERPFormField can now receive the module context for generic runtime capabilities.
  // Scheduling UI will consume module.scheduling in the next pass.
  const schedulingConfig = module?.scheduling;

  const currentValue = normalizeFormFieldValue(field, value);

  const isSchedulingTimeField =
    Boolean(
      schedulingConfig?.enabled &&
      schedulingConfig.timeField === field.key
    );

  const schedulingDateValue =
    schedulingConfig?.dateField
      ? formValues[schedulingConfig.dateField]
      : "";

  const schedulingDurationValue =
    schedulingConfig?.durationField
      ? formValues[schedulingConfig.durationField]
      : undefined;

  const isLocked =
    lockedFields.includes(field.key);

  const isReadOnly =
    readOnlyFields.includes(field.key);

  const isProtected =
    isLocked || isReadOnly;

  useEffect(() => {
    async function loadLockedRelationLabel() {
      if (field.type !== "relation" || !isProtected || !currentValue) {
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
  }, [field, isProtected, currentValue]);

  useEffect(() => {
    async function loadRelation() {
      if (field.type !== "relation") return;

      if (authLoading) {
        return;
      }

      const targetModule =
        getRelationTargetModule(field);

      if (!targetModule) return;

      try {
        const options =
          await ERPRelationDataLoader.load(targetModule);

        setRelationOptions(options as RelationOption[]);
      } catch (error) {
        console.error("ERP RELATION LOAD ERROR", error);
        setRelationOptions([]);
      }
    }

    loadRelation();
  }, [
    field,
    authLoading,
    authUser?.uid,
  ]);

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

    const sourceValue =
      formValues[filterConfig.sourceField];

    setRelationFilterSourceValue(
      sourceValue === undefined || sourceValue === null
        ? ""
        : String(sourceValue)
    );
  }, [field, formValues]);

  useEffect(() => {
    async function loadRelationUsedRecords() {
      if (field.type !== "relation") {
        setRelationUsedRecords([]);
        return;
      }

      if (authLoading) {
        return;
      }

      const excludeUsedBy =
        getRelationExcludeUsedByConfig(field);

      if (!excludeUsedBy?.module || !excludeUsedBy?.field) {
        setRelationUsedRecords([]);
        return;
      }

      try {
        const excludeUsedByModule =
          resolveRuntimeModuleByKey(excludeUsedBy.module);

        if (!excludeUsedByModule) {
          setRelationUsedRecords([]);
          return;
        }

        const usedRecords =
          await RuntimeDataBinding.list(excludeUsedByModule);

        setRelationUsedRecords(
          Array.isArray(usedRecords)
            ? usedRecords as Record<string, unknown>[]
            : []
        );
      } catch (error) {
        console.error("ERP RELATION USED RECORDS LOAD ERROR", error);
        setRelationUsedRecords([]);
      }
    }

    loadRelationUsedRecords();
  }, [
    field,
    authLoading,
    authUser?.uid,
  ]);

  useEffect(() => {
    async function loadSchedulingSlots() {
      // Q22D3C_SCHEDULING_SLOTS_FIELD
      // Generic ERP scheduling UI: any module declaring scheduling metadata
      // can expose availability slots on its configured time field.
      if (
        !module ||
        !schedulingConfig?.enabled ||
        !isSchedulingTimeField ||
        !schedulingDateValue
      ) {
        setSchedulingSlots([]);
        return;
      }

      setSchedulingSlotsLoading(true);

      try {
        const existingRecords =
          await RuntimeDataBinding.list(module);

        const startField =
          schedulingConfig.startField ?? "startAt";

        const endField =
          schedulingConfig.endField ?? "endAt";

        const resourceField =
          schedulingConfig.resourceField;

        const resourceValue =
          resourceField
            ? String(formValues[resourceField] ?? "").trim()
            : "";

        const blockingStatuses =
          schedulingConfig.blockingStatuses ?? [];

        const bookings =
          Array.isArray(existingRecords)
            ? existingRecords
                // Q22D4_RESOURCE_FIELD_BOOKING_FILTER
                // Generic ERP scheduling: only records sharing the configured resourceField
                // can block the current resource availability.
                .filter((record) => {
                  if (!resourceField) {
                    return true;
                  }

                  if (!resourceValue) {
                    return false;
                  }

                  return String(record[resourceField] ?? "").trim() === resourceValue;
                })
                .filter((record) => {
                  if (blockingStatuses.length === 0 || !schedulingConfig.statusField) {
                    return true;
                  }

                  return blockingStatuses.includes(
                    String(record[schedulingConfig.statusField] ?? "")
                  );
                })
                .map((record) => ({
                  id: String(record.id ?? record._id ?? ""),
                  startAt: String(record[startField] ?? ""),
                  endAt: String(record[endField] ?? ""),
                  status: schedulingConfig.statusField
                    ? String(record[schedulingConfig.statusField] ?? "")
                    : undefined,
                }))
                .filter((booking) =>
                  Boolean(booking.startAt && booking.endAt)
                )
            : [];

        const durationMinutes =
          Number(schedulingDurationValue ?? 0) ||
          undefined;

        const slots =
          RuntimeSchedulingEngine.getAvailableSlotsWithBookings({
            // Q22F1B_PASS_BUFFER_TO_SLOTS
            // Generic ERP scheduling: form passes metadata buffer to the runtime availability engine.
            date: String(schedulingDateValue),
            durationMinutes,
            bookings,
            bufferMinutes:
              schedulingConfig.bufferMinutes,
            // Q22F2B_PASS_CALENDAR_EXCEPTIONS_TO_SLOTS
            // Generic ERP scheduling: calendar exceptions can close or override a specific date.
            calendarExceptions:
              schedulingConfig.calendarExceptions,
            // Q22F3B_PASS_CAPACITY_TO_SLOTS
            // Generic ERP scheduling: capacity controls how many bookings can share a slot.
            capacity:
              schedulingConfig.capacity,
          });

        setSchedulingSlots(slots);
      } catch (error) {
        console.error(
          "ERP SCHEDULING SLOTS LOAD ERROR",
          error
        );
        setSchedulingSlots([]);
      } finally {
        setSchedulingSlotsLoading(false);
      }
    }

    loadSchedulingSlots();
  }, [
    module,
    schedulingConfig,
    isSchedulingTimeField,
    schedulingDateValue,
    schedulingDurationValue,
  ]);

  const label = (
    <span className="text-sm font-bold text-[var(--erp-text)]">
      {field.label}
      {field.required ? " *" : ""}
    </span>
  );

  const className =
    "w-full rounded-xl border border-[var(--erp-border)] bg-[var(--erp-input-bg)] px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-[var(--erp-text)] placeholder:text-slate-400 outline-none transition focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)] focus:border-[#64748B]";

  const lockedClassName =
    `${className} cursor-not-allowed bg-slate-100 text-[var(--erp-text-muted)]`;

  if (isSchedulingTimeField) {
    // Q22D5_SCHEDULING_SLOTS_UX_POLISH
    // Generic ERP scheduling UX: explain date/resource prerequisites and slot availability.
    const hasDate =
      Boolean(String(schedulingDateValue ?? "").trim());

    const schedulingResourceField =
      schedulingConfig?.resourceField;

    const schedulingResourceValue =
      schedulingResourceField
        ? String(formValues[schedulingResourceField] ?? "").trim()
        : "";

    const requiresResource =
      Boolean(schedulingResourceField);

    const hasRequiredResource =
      !requiresResource || Boolean(schedulingResourceValue);

    const disabledReason =
      !hasDate
        ? "Choisir d'abord une date"
        : !hasRequiredResource
          ? "Choisir d'abord la ressource"
          : schedulingSlotsLoading
            ? "Chargement des créneaux..."
            : field.placeholder ?? "Sélectionner un créneau";

    const availableSlotsCount =
      schedulingSlots.filter((slot) => slot.available).length;

    const unavailableSlotsCount =
      schedulingSlots.length - availableSlotsCount;

    const currentSchedulingValue =
      String(currentValue ?? "").trim();

    const currentValueInSchedulingSlots =
      schedulingSlots.some((slot) =>
        String(slot.start) === currentSchedulingValue
      );

    const safeSchedulingSlots =
      currentSchedulingValue && !currentValueInSchedulingSlots
        ? [
            {
              start: currentSchedulingValue,
              end: currentSchedulingValue,
              label: currentSchedulingValue + " · Créneau actuel",
              available: true,
              remainingCapacity: undefined,
              capacity: undefined,
              usedCapacity: undefined,
              reason: undefined,
            },
            ...schedulingSlots,
          ]
        : schedulingSlots;

    return (
      <FieldWrapper field={field} error={error}>
        <label className="block space-y-2">
          {label}

          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            disabled={
              isProtected ||
              !hasDate ||
              !hasRequiredResource ||
              schedulingSlotsLoading
            }
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={`${className} ${
              isProtected || !hasDate || !hasRequiredResource
                ? "cursor-not-allowed bg-slate-100 text-[var(--erp-text-muted)]"
                : ""
            }`}
          >
            <option value="">
              {disabledReason}
            </option>

            {safeSchedulingSlots.map((slot) => (
              <option
                key={slot.start + "-" + slot.end}
                value={slot.start}
                disabled={!slot.available}
              >
                {slot.available
                  ? slot.remainingCapacity !== undefined &&
                    slot.capacity !== undefined &&
                    slot.capacity > 1
                    ? slot.label + " · " + slot.remainingCapacity + " place(s) restante(s)"
                    : slot.label + " · Disponible"
                  : slot.reason ?? "Créneau complet"}
              </option>
            ))}
          </select>

          {!hasDate ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              Sélectionnez une date pour afficher les créneaux disponibles.
            </p>
          ) : null}

          {hasDate && !hasRequiredResource ? (
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              Sélectionnez la ressource concernée pour calculer les disponibilités.
            </p>
          ) : null}

          {hasDate && hasRequiredResource && schedulingSlots.length === 0 ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
              Aucun créneau disponible pour cette date selon les horaires configurés.
            </p>
          ) : null}

          {hasDate && hasRequiredResource && schedulingSlots.length > 0 ? (
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2 text-xs font-semibold text-emerald-900">
              {availableSlotsCount} créneau(x) disponible(s)
              {unavailableSlotsCount > 0
                ? " · " + unavailableSlotsCount + " complet(s)"
                : ""}
              {schedulingConfig?.capacity && schedulingConfig.capacity > 1
                ? " · capacité " + schedulingConfig.capacity + " par créneau"
                : ""}
              . Calcul ERP Scheduling Runtime.
            </div>
          ) : null}
        </label>
      </FieldWrapper>
    );
  }

  if (field.type === "relation") {
    const relationConfig =
      typeof field.relation === "string"
        ? null
        : field.relation;

    const canCreateRelation =
      Boolean(relationConfig?.create?.enabled) &&
      !isProtected;

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

    const excludeUsedByConfig =
      getRelationExcludeUsedByConfig(field);

    // Q21D3C3B_RELATION_EXCLUDE_USED_BY
    // Generic metadata-driven relation filtering.
    // ERPFormField provides UI context; RuntimeRelationFilterEngine applies filterBy/excludeUsedBy.
    const filteredByContext =
      RuntimeRelationFilterEngine.apply({
        options: relationOptions,
        filterBy: filterConfig,
        excludeUsedBy: excludeUsedByConfig,
        usedRecords: relationUsedRecords,
        currentValue,
        formValues,
      });

    const filteredOptions =
      filteredByContext.filter((option) =>
        option.label
          .toLowerCase()
          .includes(relationSearch.toLowerCase())
      );

      const hasActiveRelationFilter =
        Boolean(
          filterConfig?.sourceField &&
          filterConfig?.targetField
        );

      const currentOptionInFilteredList =
        filteredOptions.some((option) =>
          String(option.id) === String(currentValue)
        );

      const safeFilteredOptions =
        hasActiveRelationFilter
          ? filteredOptions
          : currentValue && !currentOptionInFilteredList
            ? [
                {
                  id: String(currentValue),
                  label:
                    selectedOption?.label &&
                    true
                      ? selectedOption.label
                      : "Relation actuelle conservee",
                  record:
                    selectedOption?.record,
                },
                ...filteredOptions,
              ]
            : filteredOptions;


    const lockedDisplayLabel =
      compactLockedRelationLabel(selectedLabel) ||
      selectedLabel;

    if (isProtected) {
      return (
        <FieldWrapper field={field} error={error}>
          <div className="block space-y-2">
            {label}

            <input
              type="hidden"
              name={field.key}
              value={currentValue}
            />

            <div className="rounded-xl border border-[var(--erp-border-strong)] bg-[var(--erp-primary-soft)] px-3 sm:px-4 py-2.5 sm:py-3">
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
            autoComplete="off"
            placeholder="Rechercher..."
            value={relationSearch}
            onChange={(event) => setRelationSearch(event.target.value)}
            className={className}
          />

          <select
            name={field.key}
            required={field.required}
            value={currentValue}
            onChange={(event) => {
              const nextValue =
                event.target.value;

              const selectedRelationOption =
                relationOptions.find((option) =>
                  String(option.id) === String(nextValue)
                );

              onChange?.(
                field.key,
                nextValue,
                {
                  field,
                  selectedOption: selectedRelationOption,
                }
              );
            }}
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
                border-[#D5E4E8]
                bg-[#F8FAFC]
                px-3 sm:px-4
                py-2
                text-sm
                font-bold
                text-[#334155]
                transition focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)]
                hover:bg-[#F1F5F9]
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
            disabled={isProtected}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={`${className} ${
              isProtected
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
                border-[#D5E4E8]
                bg-[#F8FAFC]
                px-3 sm:px-4
                py-2
                text-sm
                font-bold
                text-[#334155]
                transition focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)]
                hover:bg-[#F1F5F9]
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
            disabled={isProtected}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            className={`${className} ${
              isProtected
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
                border-[#D5E4E8]
                bg-[#F8FAFC]
                px-3 sm:px-4
                py-2
                text-sm
                font-bold
                text-[#334155]
                transition focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)]
                hover:bg-[#F1F5F9]
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
            readOnly={isReadOnly}
            disabled={isLocked}
            onChange={(event) => onChange?.(field.key, event.target.value)}
            placeholder={field.placeholder ?? field.label}
            className="
              min-h-32
              w-full
              rounded-xl
              border
              border-[var(--erp-border)]
              bg-[var(--erp-input-bg)]
              px-3 sm:px-4
              py-2.5 sm:py-3
              text-sm
              text-[var(--erp-text)]
              placeholder:text-slate-400
              outline-none
              transition focus:shadow-[0_0_0_4px_rgba(0,169,157,0.12)]
              focus:border-[#64748B]
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
          autoComplete="off"
          required={field.required}
          value={currentValue}
          disabled={isLocked}
          readOnly={isReadOnly}
          onChange={(event) => onChange?.(field.key, event.target.value)}
          type={primitiveInputType}
          placeholder={field.placeholder ?? field.label}
          className={isProtected ? lockedClassName : className}
        />
      </label>
    </FieldWrapper>
  );
}
