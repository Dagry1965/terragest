"use client";

import { useRouter } from "next/navigation";

import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";
import { useRuntimeTable } from "@/runtime/table/hooks/useRuntimeTable";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";

interface ERPRuntimeTableProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

function getModuleItemLabel(
  module: ERPModule,
  total: number
) {
  const label =
    module.metadata.label
      .toLowerCase()
      .trim();

  if (total <= 1) {
    return label.endsWith("s")
      ? label.slice(0, -1)
      : label;
  }

  return label;
}

export function ERPRuntimeTable({
  module,
  data,
}: ERPRuntimeTableProps) {
  const router = useRouter();

  const table =
    ERPModuleBuilder.buildTable(module);

  const runtimeRows =
    data ?? [];

  const {
    rows,
    total,
    state,
    setState,
  } = useRuntimeTable(runtimeRows);

  const itemLabel =
    getModuleItemLabel(
      module,
      total
    );

  const columns =
    table.columns
      .sort((a, b) => {
        const fieldA =
          module.schema.fields.find(
            (field: ERPModuleField) =>
              field.key === a.key
          );

        const fieldB =
          module.schema.fields.find(
            (field: ERPModuleField) =>
              field.key === b.key
          );

        return (
          (fieldA?.list?.order ?? 9999) -
          (fieldB?.list?.order ?? 9999)
        );
      })
      .map((column) => {
        const field =
          module.schema.fields.find(
            (item: ERPModuleField) =>
              item.key === column.key
          );

        return {
          key: column.key,
          label: column.label,

          render: (
            row: Record<string, unknown>
          ) => {
            if (!field) {
              return String(
                row[column.key] ?? ""
              );
            }

            return (
              <ERPRuntimeFieldValue
                field={field}
                value={row[column.key]}
              />
            );
          },
        };
      });

  function openRow(
    row: Record<string, unknown>
  ) {
    const id =
      String(row.id ?? "");

    if (!id) {
      return;
    }

    router.push(
      `/${module.metadata.key}/${id}/edit`
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl sm:overflow-hidden rounded-3xl border border-[var(--erp-border)] bg-[var(--erp-surface)] shadow-[0_14px_40px_rgba(15,23,42,0.06)]">
      <div className="flex flex-col gap-4 border-b border-[var(--erp-border)] px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-black text-[var(--erp-text)]">
            Liste opérationnelle
          </h3>

          <p className="mt-1 text-xs sm:text-sm text-[var(--erp-text-muted)]">
            Données métier du module {module.metadata.label}
          </p>
        </div>

        <div className="flex gap-2">
          <ERPBadge tone="success">
            {total} {itemLabel}
          </ERPBadge>

          <ERPBadge tone="info">
            Données à jour
          </ERPBadge>
        </div>
      </div>

      <div className="px-6 pt-4">
        <input
          value={state.search}
          onChange={(event) =>
            setState((current) => ({
              ...current,
              search: event.target.value,
              page: 1,
            }))
          }
          placeholder="Recherche..."
          className="w-full rounded-2xl border border-[var(--erp-border)] bg-[var(--erp-surface)] px-4 py-3 text-xs sm:text-sm outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-[var(--erp-border)] bg-[var(--erp-bg)]">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4 text-[11px] sm:text-xs font-black uppercase tracking-wide text-[var(--erp-text-muted)]"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-10 text-center text-xs sm:text-sm text-[var(--erp-text-muted)]"
                >
                  Aucune donnée enregistrée pour ce module.
                </td>
              </tr>
            ) : null}

            {rows.map((
              row: Record<string, unknown>,
              index: number
            ) => (
              <tr
                key={String(row.id ?? index)}
                onClick={() => openRow(row)}
                className="cursor-pointer transition hover:bg-blue-50/70"
                title="Cliquer pour modifier"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="whitespace-nowrap px-4 py-3 sm:px-6 sm:py-4 font-medium text-[var(--erp-text)]"
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[var(--erp-border)] px-4 py-3 sm:px-6 sm:py-4 text-xs sm:text-sm text-[var(--erp-text-muted)]">
        <div>
          {total} élément{total > 1 ? "s" : ""}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() =>
              setState((current) => ({
                ...current,
                page: Math.max(current.page - 1, 1),
              }))
            }
            className="rounded-xl border px-3 py-2"
          >
            Précédent
          </button>

          <button
            type="button"
            onClick={() =>
              setState((current) => ({
                ...current,
                page: current.page + 1,
              }))
            }
            className="rounded-xl border px-3 py-2"
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
}