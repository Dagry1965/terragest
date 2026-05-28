"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";

import type { ERPModule } from "@/runtime/modules/ERPModule";
import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";

type OperationalColumn = {
  key: string;
  field: ERPModuleField;
};

function hasOperationalField(
  column: {
    key: string;
    field: ERPModuleField | undefined;
  }
): column is OperationalColumn {
  return Boolean(column.field);
}

type ERPOperationalTableProps = {
  module: ERPModule;
  data: Record<string, unknown>[];
};

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "");
}

function getField(module: ERPModule, key: string): ERPModuleField | undefined {
  return module.schema.fields.find((field) => field.key === key);
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

export function ERPOperationalTable({
  module,
  data,
}: ERPOperationalTableProps) {
  const router = useRouter();

  const tableConfig = module.operational?.table;
  const fieldKeys = tableConfig?.fields?.length
    ? tableConfig.fields
    : module.schema.fields
        .filter((field) => field.list?.visible)
        .sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
        .map((field) => field.key);

  const columns = useMemo(
    () =>
      fieldKeys
        .map((key) => ({
          key,
          field: getField(module, key),
        }))
        .filter(hasOperationalField),
    [fieldKeys.join("|"), module]
  );

  function openRecord(record: Record<string, unknown>) {
    const id = getRecordId(record);

    if (!id) {
      return;
    }

    router.push("/" + module.metadata.key + "/" + id + "/edit");
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
      <div className="flex flex-col gap-3 border-b border-[var(--erp-border)] px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-xl font-black text-[var(--erp-text)]">
            {tableConfig?.title ?? "Liste opérationnelle"}
          </h2>
          <p className="mt-1 text-sm font-semibold text-[var(--erp-text-muted)]">
            {tableConfig?.description ?? "Données métier du module."}
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-700">
          {data.length} enregistrement(s)
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[var(--erp-border)] bg-slate-50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="whitespace-nowrap px-5 py-4 text-xs font-black uppercase tracking-wide text-slate-500"
                >
                  {column.field?.label ?? column.key}
                </th>
              ))}

              <th className="whitespace-nowrap px-5 py-4 text-right text-xs font-black uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-5 py-12 text-center text-sm font-semibold text-[var(--erp-text-muted)]"
                >
                  Aucun enregistrement ne correspond aux filtres.
                </td>
              </tr>
            ) : null}

            {data.map((record) => (
              <tr
                key={getRecordId(record)}
                onClick={() => openRecord(record)}
                className="cursor-pointer border-b border-slate-100 transition hover:bg-emerald-50/40"
              >
                {columns.map((column) => {
                  const value = record[column.key];
                  const isStatus = column.key === "statut" || column.key === "status";

                  return (
                    <td
                      key={column.key}
                      className="whitespace-nowrap px-5 py-4 font-semibold text-[var(--erp-text)]"
                    >
                      {isStatus ? (
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
                      ) : (
                        <ERPRuntimeFieldValue
                          field={column.field}
                          value={value}
                        />
                      )}
                    </td>
                  );
                })}

                <td className="whitespace-nowrap px-5 py-4 text-right">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openRecord(record);
                    }}
                    className="rounded-2xl border border-[var(--erp-border)] bg-white px-3 py-2 text-xs font-black text-[var(--erp-text)] transition hover:bg-slate-50"
                  >
                    Ouvrir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
