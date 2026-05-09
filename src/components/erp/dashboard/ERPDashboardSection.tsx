"use client";

import type {
  PropsWithChildren,
} from "react";

import {
  ERPStack,
} from "../ui";

interface ERPDashboardSectionProps
  extends PropsWithChildren {

  title?: string;
}

export function ERPDashboardSection({
  title,
  children,
}: ERPDashboardSectionProps) {

  return (

    <ERPStack gap="20px">

      {
        title && (

          <h2
            style={{
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            {title}
          </h2>
        )
      }

      {children}

    </ERPStack>
  );
}