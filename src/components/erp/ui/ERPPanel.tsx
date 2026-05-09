"use client";

import type {
  PropsWithChildren,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPPanelProps
  extends PropsWithChildren {

  title?: string;

  description?: string;

  actions?: React.ReactNode;
}

export function ERPPanel({
  title,
  description,
  actions,
  children,
}: ERPPanelProps) {

  return (

    <div
      style={{
        background:
          ERPTheme.colors.surface,

        border:
          `1px solid ${ERPTheme.colors.card}`,

        borderRadius:
          ERPTheme.radius.xl,

        padding:
          ERPTheme.spacing.lg,

        color:
          ERPTheme.colors.text,
      }}
    >

      {
        (title || actions) && (

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",

              alignItems: "flex-start",

              gap:
                ERPTheme.spacing.md,

              marginBottom:
                ERPTheme.spacing.lg,
            }}
          >

            <div>

              {
                title && (

                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    {title}
                  </h3>
                )
              }

              {
                description && (

                  <p
                    style={{
                      marginTop:
                        ERPTheme.spacing.xs,

                      color:
                        ERPTheme.colors.muted,

                      fontSize: "14px",
                    }}
                  >
                    {description}
                  </p>
                )
              }

            </div>

            {actions}

          </div>
        )
      }

      {children}

    </div>
  );
}