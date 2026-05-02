"use client";

import {
  useMemo,
  useState,
} from "react";

interface Column {
  key: string;
  label: string;
}

interface Action {
  label: string;
  onClick: (row: any) => void;
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  actions?: Action[];
}

export const DataTable = ({
  columns,
  data,
  actions = [],
}: DataTableProps) => {

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const pageSize = 10;

  const filteredData = useMemo(() => {

    return data.filter((item) =>

      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  }, [data, search]);

  const paginatedData = useMemo(() => {

    const start =
      (page - 1) * pageSize;

    return filteredData.slice(
      start,
      start + pageSize
    );

  }, [filteredData, page]);

  const totalPages =
    Math.ceil(
      filteredData.length / pageSize
    );

  return (

    <div className="space-y-4">

      <div className="flex items-center justify-between">

        <input
          type="text"
          placeholder="Recherche..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="border rounded-xl p-3 w-80"
        />

      </div>

      <div className="bg-white rounded-2xl shadow-md overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              {columns.map((column) => (

                <th
                  key={column.key}
                  className="text-left p-4 font-semibold"
                >
                  {column.label}
                </th>

              ))}

              {actions.length > 0 && (

                <th className="text-left p-4 font-semibold">
                  Actions
                </th>

              )}

            </tr>

          </thead>

          <tbody>

            {paginatedData.map((row, index) => (

              <tr
                key={index}
                className="border-t"
              >

                {columns.map((column) => (

                  <td
                    key={column.key}
                    className="p-4"
                  >
                    {String(
                      row[column.key] ?? ""
                    )}
                  </td>

                ))}

                {actions.length > 0 && (

                  <td className="p-4">

                    <div className="flex items-center gap-2">

                      {actions.map((action) => (

                        <button
                          key={action.label}
                          onClick={() =>
                            action.onClick(row)
                          }
                          className={
                            action.className ??
                            "px-3 py-2 rounded-lg bg-black text-white"
                          }
                        >
                          {action.label}
                        </button>

                      ))}

                    </div>

                  </td>

                )}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="flex items-center justify-between">

        <p className="text-sm text-gray-500">

          {filteredData.length} résultat(s)

        </p>

        <div className="flex items-center gap-2">

          <button
            onClick={() =>
              setPage((p) =>
                Math.max(p - 1, 1)
              )
            }
            className="px-4 py-2 rounded-lg bg-gray-200"
          >
            Précédent
          </button>

          <span className="text-sm">

            Page {page} / {totalPages || 1}

          </span>

          <button
            onClick={() =>
              setPage((p) =>
                Math.min(
                  p + 1,
                  totalPages
                )
              )
            }
            className="px-4 py-2 rounded-lg bg-gray-200"
          >
            Suivant
          </button>

        </div>

      </div>

    </div>
  );
}
