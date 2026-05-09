"use client";

import type {
  PropsWithChildren,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPPageProps
  extends PropsWithChildren {

  title?: string;

  description?: string;
}

export function ERPPage({
  title,
  description,
  children,
}: ERPPageProps) {

  return (

    <div
      style={{
        minHeight: "100vh",

        background:
          ERPTheme.colors.background,

        padding:
          ERPTheme.spacing.xl,

        color:
          ERPTheme.colors.text,
      }}
    >

      {
        title && (

          <div
            style={{
              marginBottom:
                ERPTheme.spacing.xl,
            }}
          >

            <h1
              style={{
                fontSize: "32px",
                fontWeight: 800,
              }}
            >
              {title}
            </h1>

            {
              description && (

                <p
                  style={{
                    marginTop:
                      ERPTheme.spacing.sm,

                    color:
                      ERPTheme.colors.muted,
                  }}
                >
                  {description}
                </p>
              )
            }

          </div>
        )
      }

      {children}

    </div>
  );
}