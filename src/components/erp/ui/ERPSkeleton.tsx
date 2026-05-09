"use client";

import {
  ERPTheme,
} from "./ERPTheme";

interface ERPSkeletonProps {

  height?: string;

  width?: string;

  radius?: string;
}

export function ERPSkeleton({
  height = "16px",
  width = "100%",
  radius,
}: ERPSkeletonProps) {

  return (

    <div
      style={{
        height,
        width,

        borderRadius:
          radius
          ?? ERPTheme.radius.md,

        background:
          ERPTheme.colors.card,

        opacity: 0.5,

        animation:
          "pulse 1.5s infinite",
      }}
    />
  );
}