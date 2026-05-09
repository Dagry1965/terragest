"use client";

import type {
  PropsWithChildren,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPCardProps
  extends PropsWithChildren {

  title?: string;

  description?: string;
}

export function ERPCard({
  title,
  description,
  children,
}: ERPCardProps) {

  return (

    <div
      style={{
        background:
          ERPTheme.colors.card,

        borderRadius:
          ERPTheme.radius.lg,

        padding:
          ERPTheme.spacing.lg,

        boxShadow:
          ERPTheme.shadows.md,

        color:
          ERPTheme.colors.text,
      }}
    >

      {
        title && (

          <h2
            style={{
              marginBottom:
                description
                  ? ERPTheme.spacing.xs
                  : ERPTheme.spacing.md,

              fontSize: "18px",

              fontWeight: 700,
            }}
          >
            {title}
          </h2>
        )
      }

      {
        description && (

          <p
            style={{
              marginBottom:
                ERPTheme.spacing.md,

              color:
                ERPTheme.colors.muted,

              fontSize: "14px",
            }}
          >
            {description}
          </p>
        )
      }

      {children}

    </div>
  );
}