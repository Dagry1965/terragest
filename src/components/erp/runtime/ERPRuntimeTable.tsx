"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { ERPBadge } from "@/components/erp/ui";
import { RuntimeDataBinding } from "@/runtime/data-binding";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";
import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";

interface ERPRuntimeTableProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

export function ERPRuntimeTable({
  module,
  data = [],
}: ERPRuntimeTableProps) {
  const router = useRouter();

  const table = ERPModuleBuilder.buildTable(module);
  const rows = data;

  const columns = table.columns.map((column) => {
    const field = module.schema.fields.find(
      (item: ERPModuleField) => item.key === column.key
    );

    return {
      key: column.key,
      label: column.label,
      render: (row: Record<string, unknown>) =>
        field ? (
          <ERPRuntimeFieldValue
            field={field}
            value={row[column.key]}
          />
        ) : (
          String(row[column.key] ?? "")
        ),
    };
  });

  async function handleDelete(id: unknown) {
    if (!id) return;

    const confirmed = window.confirm(
      "Confirmer la suppression de cet enregistrement ?"
    );

    if (!confirmed) return;

    await RuntimeDataBinding.delete(
      module,
      String(id)
    );

    router.refresh();
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <h3 className="text-xl font-black text-slate-950">
          Aucun enregistrement
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Aucune donnée n’a encore été créée pour ce module.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Liste opérationnelle
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Données métier du module {module.metadata.label}.
          </p>
        </div>

        <div className="flex gap-2">
          <ERPBadge tone="success">
            {rows.length} lignes
          </ERPBadge>

          <ERPBadge tone="info">
            Synchronisé
          </ERPBadge>
        </div>
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
            {rows.map((row, index) => (
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

                    <button
                      type="button"
                      onClick={() => handleDelete(row.id)}
                      className="rounded-xl bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-700"
                    >
                      Supprimer
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}