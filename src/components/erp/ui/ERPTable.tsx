"use client";

import type {
  ReactNode,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPTableColumn<T> {

  key: keyof T;

  label: string;

  render?: (
    value: unknown,
    row: T
  ) => ReactNode;
}

interface ERPTableProps<T> {

  columns:
    ERPTableColumn<T>[];

  rows: T[];
}

export function ERPTable<T extends Record<string, unknown>>({
  columns,
  rows,
}: ERPTableProps<T>) {

  return (

    <div
      style={{
        overflowX: "auto",
        borderRadius:
          ERPTheme.radius.lg,
        border:
          `1px solid ${ERPTheme.colors.card}`,
      }}
    >

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background:
            ERPTheme.colors.surface,
          color:
            ERPTheme.colors.text,
        }}
      >

        <thead
          style={{
            background:
              ERPTheme.colors.card,
          }}
        >

          <tr>

            {
              columns.map(
                column => (

                  <th
                    key={String(column.key)}
                    style={{
                      textAlign: "left",
                      padding:
                        ERPTheme.spacing.md,
                      fontSize: "14px",
                    }}
                  >
                    {column.label}
                  </th>
                )
              )
            }

          </tr>

        </thead>

        <tbody>

          {
            rows.map(
              (row, rowIndex) => (

                <tr
                  key={rowIndex}
                  style={{
                    borderTop:
                      `1px solid ${ERPTheme.colors.card}`,
                  }}
                >

                  {
                    columns.map(
                      column => {

                        const value =
                          row[column.key];

                        return (

                          <td
                            key={String(column.key)}
                            style={{
                              padding:
                                ERPTheme.spacing.md,
                            }}
                          >

                            {
                              column.render
                                ? column.render(
                                    value,
                                    row
                                  )
                                : String(value)
                            }

                          </td>
                        );
                      }
                    )
                  }

                </tr>
              )
            )
          }

        </tbody>

      </table>

    </div>
  );
}