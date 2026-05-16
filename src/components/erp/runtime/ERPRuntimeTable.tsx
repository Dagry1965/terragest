"use client";

import Link from "next/link";
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

export function ERPRuntimeTable({
  module,
  data,
}: ERPRuntimeTableProps) {
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

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Liste opérationnelle
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Données métier du module {module.metadata.label}
          </p>
        </div>

        <div className="flex gap-2">
          <ERPBadge tone="success">
            {total} lignes
          </ERPBadge>

          <ERPBadge tone="info">
            Synchronisé
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
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="whitespace-nowrap px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500"
                >
                  {column.label}
                </th>
              ))}

              <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="px-6 py-10 text-center text-sm text-slate-500"
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
                className="transition hover:bg-blue-50/70"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="whitespace-nowrap px-6 py-4 font-medium text-slate-700"
                  >
                    {column.render(row)}
                  </td>
                ))}

                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/${module.metadata.key}/${row.id}`}
                      className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-blue-400 hover:text-blue-700"
                    >
                      Voir
                    </Link>

                    <Link
                      href={`/${module.metadata.key}/${row.id}/edit`}
                      className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700"
                    >
                      Modifier
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4 text-sm text-slate-500">
        <div>
          {total} éléments
        </div>

        <div className="flex gap-2">
          <button
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