"use client";

import type { ERPModuleDefinition } from "@/runtime/modules/ERPModuleDefinition";

type Props = {
  module: ERPModuleDefinition;
  data?: Record<string, unknown>[];
};

export function ERPModuleListRenderer({
  module,
  data = [],
}: Props) {
  const visibleFields = module.fields.slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{module.label}</h1>
        <p className="text-muted-foreground">{module.description}</p>
      </div>

      <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              {visibleFields.map((field) => (
                <th
                  key={field.name}
                  className="text-left px-4 py-3 font-medium"
                >
                  {field.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={visibleFields.length || 1}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  Aucune donnÃƒÂ©e disponible.
                </td>
              </tr>
            )}

            {data.map((row, index) => (
              <tr key={index} className="border-t">
                {visibleFields.map((field) => (
                  <td key={field.name} className="px-4 py-3">
                    {String(row[field.name] ?? "-")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}