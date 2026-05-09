"use client";

import type {
  PropsWithChildren,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

type ERPBadgeTone =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface ERPBadgeProps
  extends PropsWithChildren {

  label?: string;

  variant?: ERPBadgeTone;

  tone?: ERPBadgeTone;
}

export function ERPBadge({
  label,
  children,
  variant,
  tone = "info",
}: ERPBadgeProps) {

  const resolvedTone =
    variant ?? tone;

  const background =
    resolvedTone === "success"
      ? ERPTheme.colors.success
      : resolvedTone === "warning"
      ? ERPTheme.colors.warning
      : resolvedTone === "danger"
      ? ERPTheme.colors.danger
      : ERPTheme.colors.primary;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: ERPTheme.radius.xl,
        background,
        color: ERPTheme.colors.text,
        fontSize: "12px",
        fontWeight: 700,
      }}
    >
      {label ?? children}
    </span>
  );
}