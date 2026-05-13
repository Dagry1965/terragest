// src/components/erp/datatable/ERPDataTable.tsx

interface ERPColumn {

  key: string;

  label: string;
}

interface ERPDataTableProps {

  columns:
    ERPColumn[];

  data:
    Record<string, unknown>[];
}

export function ERPDataTable({

  columns,

  data
}: ERPDataTableProps) {

  return (

    <div
      className="
        bg-white
        rounded-2xl
        shadow-sm
        overflow-hidden
      "
    >

      <table
        className="
          w-full
        "
      >

        <thead
          className="
            bg-zinc-100
          "
        >

          <tr>

            {columns.map(column => (

              <th

                key={column.key}

                className="
                  p-4
                  text-left
                "
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {data.map((row, index) => (

            <tr

              key={index}

              className="
                border-t
              "
            >

              {columns.map(column => (

                <td

                  key={column.key}

                  className="
                    p-4
                  "
                >
                  {
                    String(
                      row[
                        column.key
                      ] ?? ""
                    )
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
