"use client";

import type { PropsWithChildren } from "react";

import {
  ERPSection,
}
from "@/components/erp/ui";

interface PublicSectionProps extends PropsWithChildren {
  title?: string;
  description?: string;
}

export function PublicSection({
  title,
  description,
  children,
}: PublicSectionProps) {
  return (
    <ERPSection
      title={title}
      description={description}
    >
      {children}
    </ERPSection>
  );
}