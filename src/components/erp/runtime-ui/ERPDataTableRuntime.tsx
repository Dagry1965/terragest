import type { ERPGeneratedSchema } from "@/runtime/ui-generation";
import { ERPEmptyState } from "@/components/erp/ui";

type ERPDataTableRuntimeProps = {
  schema: ERPGeneratedSchema;
  rows?: Record<string, unknown>[];
};

export function ERPDataTableRuntime({
  schema,
  rows = [],
}: ERPDataTableRuntimeProps) {
  if (rows.length === 0) {
    return (
      <ERPEmptyState
        title={`${schema.moduleLabel} pret`}
        description="Aucune donnee pour le moment. La table runtime est prete a recevoir les donnees reelles."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {schema.fields.map((field) => (
              <th
                key={field.key}
                className="px-4 py-3 text-left font-semibold text-slate-600"
              >
                {field.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map((row, index) => (
            <tr key={String(row.id ?? index)}>
              {schema.fields.map((field) => (
                <td key={field.key} className="px-4 py-3 text-slate-700">
                  {String(row[field.key] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}