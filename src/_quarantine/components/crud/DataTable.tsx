type Props<T> = {
  data: T[];

  columns: {
    key: keyof T;
    label: string;
  }[];
};

export function DataTable<T>({
  data,
  columns,
}: Props<T>) {

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        overflow-hidden
      "
    >
      <table className="w-full">

        <thead
          className="
            bg-gray-100
          "
        >
          <tr>

            {columns.map(
              (column) => (

              <th
                key={String(column.key)}
                className="
                  text-left
                  p-4
                  font-semibold
                "
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>

          {data.map(
            (item, index) => (

            <tr
              key={index}
              className="
                border-t
              "
            >

              {columns.map(
                (column) => (

                <td
                  key={String(column.key)}
                  className="p-4"
                >
                  {
                    String(
                      item[column.key]
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