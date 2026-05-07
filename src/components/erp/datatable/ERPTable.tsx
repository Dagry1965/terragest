"use client";

export function ERPTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {

  return (

    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
      "
    >

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              {columns.map((column) => (

                <th
                  key={column}
                  className="
                    px-6
                    py-4
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-slate-500
                  "
                >
                  {column}
                </th>

              ))}

            </tr>

          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">

            {rows.map((row, index) => (

              <tr
                key={index}
                className="hover:bg-slate-50"
              >

                {row.map((cell, cellIndex) => (

                  <td
                    key={cellIndex}
                    className="
                      whitespace-nowrap
                      px-6
                      py-4
                      text-sm
                      text-slate-700
                    "
                  >
                    {cell}
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
