"use client";

import type {
  ReactNode,
} from "react";

import {
  ERPTheme,
} from "../ui";

interface ERPPageHeroProps {
  title: string;
  description?: string;
  category?: string;
  side?: ReactNode;
}

export function ERPPageHero({
  title,
  description,
  category,
  side,
}: ERPPageHeroProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: ERPTheme.spacing.lg,
        marginBottom: ERPTheme.spacing.xl,
      }}
    >
      <div>
        {category && (
          <p
            style={{
              color: ERPTheme.colors.muted,
              fontSize: "13px",
              marginBottom: ERPTheme.spacing.xs,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {category}
          </p>
        )}

        <h1
          style={{
            fontSize: "36px",
            fontWeight: 800,
            color: ERPTheme.colors.text,
          }}
        >
          {title}
        </h1>

        {description && (
          <p
            style={{
              marginTop: ERPTheme.spacing.sm,
              color: ERPTheme.colors.muted,
              maxWidth: "900px",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {side && <div>{side}</div>}
    </div>
  );
}