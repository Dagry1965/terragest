"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type {
  ERPModule,
  ERPOperationalChildTotalConfig,
} from "@/runtime/modules/ERPModule";
import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
import { allERPModules } from "@/runtime/modules/definitions/coreModules";
import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";
import { ERPOperationalExpandedChildren } from "./ERPOperationalExpandedChildren";
import { operationalUiTokens } from "./operationalUiTokens";
import {
  RuntimeOperationalDataResolver,
} from "@/runtime/operational";

type OperationalColumn =
  | {
      kind: "field";
      key: string;
      field: ERPModuleField;
    }
  | {
      kind: "childTotal";
      key: string;
      label: string;
      currency?: string;
    };

type ERPOperationalTableProps = {
  module: ERPModule;
  data: Record<string, unknown>[];
};

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "").trim();
}

function getField(module: ERPModule, key: string): ERPModuleField | undefined {
  return module.schema.fields.find((field) => field.key === key);
}


function getRelationModuleKey(field: ERPModuleField): string {
  const relation = field.relation;

  if (!relation) {
    return "";
  }

  if (typeof relation === "string") {
    return relation;
  }

  return String(relation.module ?? relation.collection ?? "").trim();
}

function getModule(moduleKey: string): ERPModule | undefined {
  return allERPModules.find((module) => module.metadata.key === moduleKey);
}

function isVisibleRuntimeRecord(record: Record<string, unknown>): boolean {
  if (record.removedAt) return false;

  const status = String(record.statut ?? record.status ?? "").toLowerCase();

  return status !== "retiree";
}

function isOperationalColumnHidden(
  module: ERPModule,
  fieldKey: string
): boolean {
  const tableConfig = module.operational?.table as
    | {
        hiddenFields?: string[];
        hiddenOperationalFields?: string[];
      }
    | undefined;

  const hiddenFields =
    tableConfig?.hiddenFields ??
    tableConfig?.hiddenOperationalFields ??
    [];

  if (hiddenFields.includes(fieldKey)) {
    return true;
  }

  return false;
}

function getRelationLabelFields(
  module: ERPModule,
  fieldKey: string,
  targetModule?: ERPModule
): string[] {
  const tableConfig = module.operational?.table as
    | {
        relationLabelFields?: Record<string, string[]>;
      }
    | undefined;

  const configured = tableConfig?.relationLabelFields?.[fieldKey];

  if (configured?.length) {
    return configured;
  }

  const composition = targetModule?.composition as
    | {
        labelFields?: string[];
      }
    | undefined;

  if (composition?.labelFields?.length) {
    return composition.labelFields;
  }

  return (
    targetModule?.schema.fields
      .filter((field) => field.list?.visible || field.list?.order !== undefined)
      .sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
      .map((field) => field.key)
      .slice(0, 3) ?? []
  );
}

function buildRelationLabel(
  record: Record<string, unknown>,
  fields: string[]
): string {
  return fields
    .map((field) => record[field])
    .filter((value) => value !== undefined && value !== null && String(value).trim() !== "")
    .map((value) => String(value).trim())
    .join(" · ");
}

function getStatusBadgeClass(value: unknown): string {
  const status = String(value ?? "").toLowerCase();

  if (["confirme", "validee", "payee"].includes(status)) {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }

  if (["en_cours", "diagnostic", "partiel"].includes(status)) {
    return "border-amber-200 bg-amber-50 text-amber-800";
  }

  if (["annule", "annulee", "retard"].includes(status)) {
    return "border-red-200 bg-red-50 text-red-800";
  }

  if (["termine", "terminee"].includes(status)) {
    return "border-slate-200 bg-slate-50 text-slate-700";
  }

  return "border-sky-200 bg-sky-50 text-sky-800";
}

function formatMoney(value: unknown, currency?: string): string {
  const amount = Number(value ?? 0);

  if (!Number.isFinite(amount)) {
    return "0" + (currency ? " " + currency : "");
  }

  return amount.toLocaleString("fr-FR") + (currency ? " " + currency : "");
}

export function ERPOperationalTable({
  module,
  data,
}: ERPOperationalTableProps) {
  const router = useRouter();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [relationLabels, setRelationLabels] = useState<Record<string, Record<string, string>>>({});
  const [childTotals, setChildTotals] = useState<Record<string, Record<string, number>>>({});

  const tableConfig = module.operational?.table;
  const hasExpandableChildren = Boolean(module.composition?.children?.length);

  const fieldKeys = tableConfig?.fields?.length
    ? tableConfig.fields
    : module.schema.fields
        .filter((field) => field.list?.visible)
        .sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
        .map((field) => field.key);

  const fieldColumns = useMemo(
    () =>
      fieldKeys
        .filter((key) => !isOperationalColumnHidden(module, key))
        .map((key) => ({
          kind: "field" as const,
          key,
          field: getField(module, key),
        }))
        .filter(
          (column): column is Extract<OperationalColumn, { kind: "field" }> =>
            Boolean(column.field)
        ),
    [fieldKeys.join("|"), module]
  );

  const childTotalColumns = useMemo(
    () =>
      ((tableConfig as { childTotals?: Array<{ key: string; label: string; currency?: string }> } | undefined)
        ?.childTotals ?? []
      ).map((total) => ({
        kind: "childTotal" as const,
        key: total.key,
        label: total.label,
        currency: total.currency,
      })),
    [tableConfig]
  );

  const columns: OperationalColumn[] = useMemo(
    () => [...fieldColumns, ...childTotalColumns],
    [fieldColumns, childTotalColumns]
  );

  useEffect(() => {
    async function loadRelationLabels() {
      const fieldColumns = columns.filter((column) => column.kind === "field");
      const fieldKeys = fieldColumns.map((column) => column.key);

      if (fieldKeys.length === 0) {
        setRelationLabels({});
        return;
      }

      try {
        const next =
          await RuntimeOperationalDataResolver.resolveRelationLabels({
            module,
            fieldKeys,
          });

        setRelationLabels(next);
      } catch (error) {
        console.error("[OPERATIONAL RELATION LABELS ERROR]", error);
        setRelationLabels({});
      }
    }

    loadRelationLabels();
  }, [columns, module]);

  useEffect(() => {
    async function loadChildTotals() {
      const totalsConfig =
        (tableConfig as
          | {
              childTotals?: ERPOperationalChildTotalConfig[];
            }
          | undefined)?.childTotals ?? [];

      if (totalsConfig.length === 0) {
        setChildTotals({});
        return;
      }

      try {
        const next =
          await RuntimeOperationalDataResolver.resolveChildTotals({
            parentModule: module,
            totals: totalsConfig,
          });

        setChildTotals(next);
      } catch (error) {
        console.error("[OPERATIONAL CHILD TOTALS ERROR]", error);
        setChildTotals({});
      }
    }

    loadChildTotals();
  }, [module, tableConfig]);

  function openRecord(record: Record<string, unknown>) {
    const id = getRecordId(record);

    if (!id) {
      return;
    }

    router.push("/" + module.metadata.key + "/" + id + "/edit");
  }

  function toggleExpanded(record: Record<string, unknown>) {
    const id = getRecordId(record);

    if (!id) return;

    setExpandedRows((current) => ({
      ...current,
      [id]: !current[id],
    }));
  }

  function renderCell(column: OperationalColumn, record: Record<string, unknown>) {
    if (column.kind === "childTotal") {
      const recordId = getRecordId(record);
      const value = childTotals[column.key]?.[recordId] ?? 0;

      return (
        <span className="font-black text-[#10251C]">
          {formatMoney(value, column.currency)}
        </span>
      );
    }

    const value = record[column.key];
    const isStatus = column.key === "statut" || column.key === "status";
    const relationLabel = relationLabels[column.key]?.[String(value ?? "")];

    if (isStatus) {
      return (
        <span
          className={[
            "inline-flex rounded-full border px-3 py-1 text-xs font-black",
            getStatusBadgeClass(value),
          ].join(" ")}
        >
          <ERPRuntimeFieldValue
            field={column.field}
            value={value}
          />
        </span>
      );
    }

    if (relationLabel) {
      return (
        <span className="font-semibold text-[#10251C]">
          {relationLabel}
        </span>
      );
    }

    return (
      <ERPRuntimeFieldValue
        field={column.field}
        value={value}
      />
    );
  }

  return (
    <div className={operationalUiTokens.table.wrapper}>
      <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-black text-[#10251C]">
            {tableConfig?.title ?? "Liste opérationnelle"}
          </h2>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            {tableConfig?.description ?? "Données métier du module."}
          </p>
        </div>

        <div className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
          {data.length} ligne(s)
        </div>
      </div>

      <div className="overflow-x-auto bg-white">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/80">
              {hasExpandableChildren ? (
                <th className="w-12 px-4 py-3.5" />
              ) : null}

              {columns.map((column) => (
                <th
                  key={column.key}
                  className={operationalUiTokens.table.headerCell}
                >
                  {column.kind === "field" ? column.field.label : column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (hasExpandableChildren ? 1 : 0)}
                  className="px-5 py-12 text-center text-sm font-semibold text-slate-500"
                >
                  Aucun enregistrement ne correspond aux filtres.
                </td>
              </tr>
            ) : null}

            {data.map((record) => {
              const recordId = getRecordId(record);
              const expanded = Boolean(expandedRows[recordId]);

              return (
                <Fragment key={recordId}>
                  <tr
                    onClick={() => openRecord(record)}
                    className={operationalUiTokens.table.row}
                  >
                    {hasExpandableChildren ? (
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleExpanded(record);
                          }}
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-black text-slate-600 transition hover:bg-slate-50"
                          aria-label={expanded ? "Replier" : "Déplier"}
                        >
                          {expanded ? "−" : "+"}
                        </button>
                      </td>
                    ) : null}

                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={operationalUiTokens.table.bodyCell}
                      >
                        {renderCell(column, record)}
                      </td>
                    ))}
                  </tr>

                  {expanded ? (
                    <tr className="border-b border-slate-100">
                      <td
                        colSpan={columns.length + (hasExpandableChildren ? 1 : 0)}
                        className="bg-slate-50 px-5 py-4"
                      >
                        <ERPOperationalExpandedChildren
                          parentModule={module}
                          parentRecord={record}
                        />
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
