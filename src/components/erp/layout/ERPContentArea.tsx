"use client";

import type {
  PropsWithChildren,
} from "react";

import {
  ERPTheme,
} from "../ui";

export function ERPContentArea({
  children,
}: PropsWithChildren) {

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap:
          ERPTheme.spacing.lg,
      }}
    >
      {children}
    </div>
  );
}