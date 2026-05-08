Set-Location "C:\Users\Admin\terragest"

mkdir ".\src\components\erp\ui\table" -Force

@'
"use client";

export function ERPTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: Record<string, any>[];
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white/80 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 bg-slate-50/90 backdrop-blur-xl">
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
                  className="
                    border-b border-slate-200
                    px-6 py-4 text-left text-xs
                    font-semibold uppercase tracking-wider
                    text-slate-500
                  "
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="
                  transition-all duration-200
                  hover:bg-slate-50
                "
              >
                {columns.map((column) => (
                  <td
                    key={column}
                    className="
                      border-b border-slate-100
                      px-6 py-4 text-sm text-slate-700
                    "
                  >
                    {row[column]}
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
'@ | Set-Content ".\src\components\erp\ui\table\ERPTable.tsx" -Encoding UTF8

@'
export { ERPTable } from "./ERPTable";
'@ | Set-Content ".\src\components\erp\ui\table\index.ts" -Encoding UTF8

Write-Host ""
Write-Host "Premium ERP Table system created."
Write-Host ""