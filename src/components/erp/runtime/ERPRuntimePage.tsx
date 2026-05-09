"use client";

import {
  ERPPage,
  ERPEmptyState,
} from "../ui";

interface ERPRuntimePageProps {
  title?: string;
  description?: string;
  module?: {
    metadata?: {
      label?: string;
      key?: string;
    };
  };
  type?: string;
  record?: Record<string, unknown>;
  data?: Record<string, unknown>[];
}

export function ERPRuntimePage({
  title,
  description,
  module,
  type = "list",
}: ERPRuntimePageProps) {
  const moduleLabel =
    module?.metadata?.label ?? "Module ERP";

  const resolvedTitle =
    title ?? `${moduleLabel} — ${type}`;

  return (
    <ERPPage
      title={resolvedTitle}
      description={
        description ??
        "Page générée automatiquement par le Runtime ERP."
      }
    >
      <ERPEmptyState
        title={resolvedTitle}
        description="Cette page est branchée sur le runtime ERP central."
      />
    </ERPPage>
  );
}