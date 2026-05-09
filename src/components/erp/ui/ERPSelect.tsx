"use client";

import type {
  SelectHTMLAttributes,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPSelectOption {

  label: string;

  value: string;
}

interface ERPSelectProps
  extends SelectHTMLAttributes<
    HTMLSelectElement
  > {

  label?: string;

  options:
    ERPSelectOption[];
}

export function ERPSelect({
  label,
  options,
  ...props
}: ERPSelectProps) {

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

      <select
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
      >

        {
          options.map(
            option => (

              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            )
          )
        }

      </select>

    </div>
  );
}