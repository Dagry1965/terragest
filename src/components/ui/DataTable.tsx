interface DataTableProps {

  columns: string[];

  data: any[];
}

export const DataTable = ({
  columns,
  data,
}: DataTableProps) => {

  return (

    <div className="
      bg-white
      rounded-2xl
      shadow-md
      overflow-hidden
    ">

      <table className="
        w-full
      ">

        <thead className="
          bg-gray-100
        ">

          <tr>

            {columns.map(
              (column) => (

                <th
                  key={column}
                  className="
                    text-left
                    px-6
                    py-4
                  "
                >

                  {column}

                </th>

              )
            )}

          </tr>

        </thead>

        <tbody>

          {data.map(
            (
              row,
              index
            ) => (

              <tr
                key={index}
                className="
                  border-t
                "
              >

                {columns.map(
                  (column) => (

                    <td
                      key={column}
                      className="
                        px-6
                        py-4
                      "
                    >

                      {row[column]}

                    </td>

                  )
                )}

              </tr>

            )
          )}

        </tbody>

      </table>

    </div>
  );
}
