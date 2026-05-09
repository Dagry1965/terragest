"use client";

import type {
  ReactNode,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPDataListItem {

  label: string;

  value: ReactNode;
}

interface ERPDataListProps {

  items:
    ERPDataListItem[];
}

export function ERPDataList({
  items,
}: ERPDataListProps) {

  return (

    <div
      style={{
        display: "grid",
        gap:
          ERPTheme.spacing.md,
      }}
    >

      {
        items.map(
          item => (

            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent:
                  "space-between",

                alignItems: "center",

                gap:
                  ERPTheme.spacing.md,

                paddingBottom:
                  ERPTheme.spacing.sm,

                borderBottom:
                  `1px solid ${ERPTheme.colors.card}`,
              }}
            >

              <span
                style={{
                  color:
                    ERPTheme.colors.muted,

                  fontSize: "14px",
                }}
              >
                {item.label}
              </span>

              <strong
                style={{
                  color:
                    ERPTheme.colors.text,
                }}
              >
                {item.value}
              </strong>

            </div>
          )
        )
      }

    </div>
  );
}