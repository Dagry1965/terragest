"use client";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPToastProps {

  title: string;

  message?: string;

  tone?:
    | "success"
    | "warning"
    | "danger"
    | "info";
}

export function ERPToast({
  title,
  message,
  tone = "info",
}: ERPToastProps) {

  const background =
    tone === "success"
      ? ERPTheme.colors.success
      : tone === "warning"
      ? ERPTheme.colors.warning
      : tone === "danger"
      ? ERPTheme.colors.danger
      : ERPTheme.colors.primary;

  return (

    <div
      style={{
        background,

        color:
          ERPTheme.colors.text,

        borderRadius:
          ERPTheme.radius.lg,

        padding:
          ERPTheme.spacing.md,

        boxShadow:
          ERPTheme.shadows.md,

        minWidth: "280px",
      }}
    >

      <strong
        style={{
          display: "block",
          marginBottom: "4px",
        }}
      >
        {title}
      </strong>

      {
        message && (

          <span
            style={{
              fontSize: "14px",
              opacity: 0.9,
            }}
          >
            {message}
          </span>
        )
      }

    </div>
  );
}