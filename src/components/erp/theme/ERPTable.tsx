interface Props {
  headers: string[];
  children: React.ReactNode;
}

export function ERPTable({
  headers,
  children,
}: Props) {

  return (
    <table
      className="
        w-full
        border-collapse
        text-left
      "
    >
      <thead>
        <tr className="border-b">
          {headers.map((header) => (
            <th
              key={header}
              className="p-3"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {children}
      </tbody>
    </table>
  );
}
