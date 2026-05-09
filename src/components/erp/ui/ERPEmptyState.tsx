"use client";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPEmptyStateProps {

  title: string;

  description?: string;
}

export function ERPEmptyState({
  title,
  description,
}: ERPEmptyStateProps) {

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        padding:
          ERPTheme.spacing.xl,

        borderRadius:
          ERPTheme.radius.xl,

        background:
          ERPTheme.colors.surface,

        border:
          `1px dashed ${ERPTheme.colors.card}`,

        color:
          ERPTheme.colors.text,

        textAlign: "center",
      }}
    >

      <h3
        style={{
          fontSize: "20px",
          fontWeight: 700,
        }}
      >
        {title}
      </h3>

      {
        description && (

          <p
            style={{
              marginTop:
                ERPTheme.spacing.sm,

              color:
                ERPTheme.colors.muted,

              maxWidth: "520px",
            }}
          >
            {description}
          </p>
        )
      }

    </div>
  );
}