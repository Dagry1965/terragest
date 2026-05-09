"use client";

import type {
  PropsWithChildren,
} from "react";

interface ERPStackProps
  extends PropsWithChildren {

  gap?: string;
}

export function ERPStack({
  gap = "16px",
  children,
}: ERPStackProps) {

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap,
      }}
    >
      {children}
    </div>
  );
}