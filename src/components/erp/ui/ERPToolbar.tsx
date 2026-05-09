"use client";

import type {
  PropsWithChildren,
} from "react";

import {
  ERPTheme,
} from "./ERPTheme";

export function ERPToolbar({
  children,
}: PropsWithChildren) {

  return (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent:
          "space-between",

        gap:
          ERPTheme.spacing.md,

        marginBottom:
          ERPTheme.spacing.lg,

        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}