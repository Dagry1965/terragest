"use client";

import type {
  PropsWithChildren,
} from "react";

interface ERPGridProps
  extends PropsWithChildren {

  columns?: number;

  gap?: string;
}

export function ERPGrid({
  columns = 3,
  gap = "16px",
  children,
}: ERPGridProps) {

  return (

    <div
      style={{
        display: "grid",

        gridTemplateColumns:
          `repeat(${columns}, minmax(0, 1fr))`,

        gap,
      }}
    >
      {children}
    </div>
  );
}