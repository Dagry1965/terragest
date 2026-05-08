import type { ReactNode } from "react";

export interface ERPTableColumn<T> {
  key: keyof T | string | number;
  label: string;
  render?: (row: T) => ReactNode;
}

type ERPTableColumnInput<T> = ERPTableColumn<T> | string;
type ERPTableRow = Record<string, unknown> | unknown[];

interface ERPTableProps<T extends ERPTableRow = Record<string, unknown>> {
  columns: ERPTableColumnInput<T>[];
  data?: T[];
  rows?: T[];
  emptyLabel?: string;
}

function normalizeColumn<T>(
  column: ERPTableColumnInput<T>,
  index: number
): ERPTableColumn<T> {
  if (typeof column === "string") {
    return {
      key: index,
      label: column,
    };
  }

  return column;
}

function getCellValue<T extends ERPTableRow>(
  row: T,
  column: ERPTableColumn<T>
) {
  if (Array.isArray(row)) {
    return row[Number(column.key)] ?? "";
  }

  return row[column.key as keyof T] ?? "";
}

export function ERPTable<T extends ERPTableRow = Record<string, unknown>>({
  columns,
  data,
  rows,
  emptyLabel = "Aucune donnée disponible",
}: ERPTableProps<T>) {
  const tableRows = data ?? rows ?? [];
  const normalizedColumns = columns.map(normalizeColumn);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-900 text-slate-300">
          <tr>
            {normalizedColumns.map((column) => (
              <th key={String(column.key)} className="px-4 py-3 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800 bg-slate-950">
          {tableRows.length === 0 ? (
            <tr>
              <td
                className="px-4 py-8 text-center text-slate-400"
                colSpan={normalizedColumns.length}
              >
                {emptyLabel}
              </td>
            </tr>
          ) : (
            tableRows.map((row, index) => (
              <tr key={index} className="hover:bg-slate-900/60">
                {normalizedColumns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-3 text-slate-200">
                    {column.render
                      ? column.render(row)
                      : String(getCellValue(row, column))}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
