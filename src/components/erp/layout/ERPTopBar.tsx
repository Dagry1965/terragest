"use client";

import {
  ERPTheme,
} from "../ui";

interface ERPTopBarProps {

  title?: string;
}

export function ERPTopBar({
  title,
}: ERPTopBarProps) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",

        marginBottom:
          ERPTheme.spacing.xl,

        paddingBottom:
          ERPTheme.spacing.md,

        borderBottom:
          `1px solid ${ERPTheme.colors.card}`,
      }}
    >

      <div>

        <h1
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color:
              ERPTheme.colors.text,
          }}
        >
          {title ?? "Terragest ERP"}
        </h1>

      </div>

    </div>
  );
}