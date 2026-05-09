"use client";

import type {
  PropsWithChildren,
} from "react";

import {
  ERPTheme,
} from "../ui";

interface ERPSidebarSectionProps
  extends PropsWithChildren {

  title: string;
}

export function ERPSidebarSection({
  title,
  children,
}: ERPSidebarSectionProps) {

  return (

    <div
      style={{
        marginBottom:
          ERPTheme.spacing.lg,
      }}
    >

      <h3
        style={{
          fontSize: "12px",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color:
            ERPTheme.colors.muted,

          marginBottom:
            ERPTheme.spacing.sm,
        }}
      >
        {title}
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap:
            ERPTheme.spacing.xs,
        }}
      >
        {children}
      </div>

    </div>
  );
}