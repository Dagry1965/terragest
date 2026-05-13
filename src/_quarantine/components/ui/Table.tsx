import React from "react";

interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export const Table = ({
  headers,
  children,
}: TableProps) => {

  return (

    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            {headers.map((header) => (

              <th
                key={header}
                className="text-left p-4 font-semibold"
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

    </div>
  );
};
