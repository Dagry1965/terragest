"use client";

import type { PropsWithChildren } from "react";
import { ERPTheme } from "./ERPTheme";

interface ERPSectionProps extends PropsWithChildren {
  title?: string;
  description?: string;
}

export function ERPSection({
  title,
  description,
  children,
}: ERPSectionProps) {
  return (
    <section
      style={{
        marginBottom: ERPTheme.spacing.xl,
      }}
    >
      <div
        style={{
          marginBottom: ERPTheme.spacing.md,
        }}
      >
        {title && (
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: ERPTheme.colors.text,
            }}
          >
            {title}
          </h2>
        )}

        {description && (
          <p
            style={{
              marginTop: ERPTheme.spacing.xs,
              color: ERPTheme.colors.muted,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}
