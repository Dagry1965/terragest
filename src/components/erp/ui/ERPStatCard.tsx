"use client";

import {
  ERPCard,
} from "./ERPCard";

interface ERPStatCardProps {
  label: string;
  value: string | number;
  trend?: string;
  helper?: string;
}

export function ERPStatCard({
  label,
  value,
  trend,
  helper,
}: ERPStatCardProps) {
  return (
    <ERPCard>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "14px", opacity: 0.7 }}>
          {label}
        </span>

        <strong style={{ fontSize: "32px", fontWeight: 700 }}>
          {value}
        </strong>

        {(trend || helper) && (
          <span style={{ fontSize: "13px", opacity: 0.8 }}>
            {trend ?? helper}
          </span>
        )}
      </div>
    </ERPCard>
  );
}