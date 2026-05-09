"use client";

import type {
  InputHTMLAttributes,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPInputProps
  extends InputHTMLAttributes<
    HTMLInputElement
  > {

  label?: string;
}

export function ERPInput({
  label,
  ...props
}: ERPInputProps) {

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap:
          ERPTheme.spacing.xs,
      }}
    >

      {
        label && (

          <label
            style={{
              color:
                ERPTheme.colors.text,

              fontSize: "14px",
            }}
          >
            {label}
          </label>
        )
      }

      <input
        {...props}
        style={{
          background:
            ERPTheme.colors.surface,

          border:
            `1px solid ${ERPTheme.colors.card}`,

          borderRadius:
            ERPTheme.radius.md,

          padding:
            ERPTheme.spacing.md,

          color:
            ERPTheme.colors.text,
        }}
      />

    </div>
  );
}