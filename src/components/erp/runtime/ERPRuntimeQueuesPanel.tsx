"use client";

import type { ReactNode } from "react";

interface ERPTableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], record: T) => ReactNode;
}

interface ERPTableProps<T> {
  columns: ERPTableColumn<T>[];
  rows: T[];
}

export function ERPTable<T>({
  columns,
  rows,
}: ERPTableProps<T>) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              style={{
                textAlign: "left",
                padding: "8px",
                borderBottom: "1px solid #ddd",
                fontWeight: 600,
              }}
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((record, index) => (
          <tr key={index}>
            {columns.map((col) => {
              const value = record[col.key];

              return (
                <td
                  key={String(col.key)}
                  style={{
                    padding: "8px",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {col.render
                    ? col.render(value, record)
                    : String(value)}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
