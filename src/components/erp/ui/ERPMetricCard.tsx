"use client";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPMetricCardProps {

  title: string;

  value: string | number;

  helper?: string;

  trend?: string;
}

export function ERPMetricCard({
  title,
  value,
  helper,
  trend,
}: ERPMetricCardProps) {

  return (

    <div
      style={{
        background:
          ERPTheme.colors.surface,

        border:
          `1px solid ${ERPTheme.colors.card}`,

        borderRadius:
          ERPTheme.radius.xl,

        padding:
          ERPTheme.spacing.lg,

        color:
          ERPTheme.colors.text,
      }}
    >

      <span
        style={{
          fontSize: "14px",
          color:
            ERPTheme.colors.muted,
        }}
      >
        {title}
      </span>

      <div
        style={{
          marginTop:
            ERPTheme.spacing.sm,

          fontSize: "36px",

          fontWeight: 800,
        }}
      >
        {value}
      </div>

      {
        (helper || trend) && (

          <div
            style={{
              marginTop:
                ERPTheme.spacing.sm,

              fontSize: "13px",

              color:
                ERPTheme.colors.muted,
            }}
          >
            {trend ?? helper}
          </div>
        )
      }

    </div>
  );
}