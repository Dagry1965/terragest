"use client";

import type {
  ButtonHTMLAttributes,
  PropsWithChildren,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPButtonProps
  extends
    ButtonHTMLAttributes<
      HTMLButtonElement
    >,
    PropsWithChildren {

  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "ghost";
}

export function ERPButton({
  children,
  variant = "primary",
  ...props
}: ERPButtonProps) {

  const background =
    variant === "primary"
      ? ERPTheme.colors.primary
      : variant === "secondary"
      ? ERPTheme.colors.secondary
      : variant === "danger"
      ? ERPTheme.colors.danger
      : "transparent";

  const border =
    variant === "ghost"
      ? `1px solid ${ERPTheme.colors.muted}`
      : "none";

  return (

    <button
      {...props}
      style={{
        background,
        border,
        borderRadius:
          ERPTheme.radius.md,
        padding:
          `${ERPTheme.spacing.sm} ${ERPTheme.spacing.md}`,
        color:
          ERPTheme.colors.text,
        cursor: "pointer",
        fontWeight: 600,
      }}
    >
      {children}
    </button>
  );
}