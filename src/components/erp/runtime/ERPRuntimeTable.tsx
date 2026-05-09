import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";
import type { ERPModuleField } from "@/runtime/modules/schemas/ERPModuleSchema";

interface ERPRuntimeTableProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

function createDemoRows(module: ERPModule): Record<string, unknown>[] {
  return Array.from({ length: 8 }).map((_, index) => {
    const row: Record<string, unknown> = {};

    module.schema.fields.forEach((field: ERPModuleField) => {
      if (field.type === "number") {
        row[field.key] = index * 10 + 5;
      } else if (field.type === "status") {
        row[field.key] =
          index % 3 === 0
            ? "Actif"
            : index % 3 === 1
              ? "En suivi"
              : "A controler";
      } else if (field.type === "relation") {
        row[field.key] = "REF-" + String(index + 1).padStart(3, "0");
      } else {
        row[field.key] = `${field.label} ${index + 1}`;
      }
    });

    return row;
  });
}

export function ERPRuntimeTable({
  module,
  data,
}: ERPRuntimeTableProps) {
  const table = ERPModuleBuilder.buildTable(module);
  const rows = data && data.length > 0 ? data : createDemoRows(module);

  const columns = table.columns.map((column) => {
    const field = module.schema.fields.find((item: ERPModuleField) => item.key === column.key);

    return {
      key: column.key,
      label: column.label,
      render: (row: Record<string, unknown>) =>
        field ? (
          <ERPRuntimeFieldValue field={field} value={row[column.key]} />
        ) : (
          String(row[column.key] ?? "")
        ),
    };
  });

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Liste operationnelle
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Donnees metier du module {module.metadata.label}.
          </p>
        </div>

        <div className="flex gap-2">
          <ERPBadge tone="success">{rows.length} lignes</ERPBadge>
          <ERPBadge tone="info">Synchronise</ERPBadge>
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
              <tr key={index} className="transition hover:bg-blue-50/70">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="whitespace-nowrap px-6 py-4 font-medium text-slate-700"
                  >
                    {column.render(row)}
                  </td>
                ))}

                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-blue-400 hover:text-blue-700">
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
