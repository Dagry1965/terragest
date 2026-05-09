"use client";

import {
  ERPTable,
} from "@/components/erp/ui";

import type {
  ERPBusinessSchema,
} from "../schemas";

interface ERPDynamicTableFactoryProps {
  schema: ERPBusinessSchema;
  rows: Record<string, unknown>[];
}

export function ERPDynamicTableFactory({
  schema,
  rows,
}: ERPDynamicTableFactoryProps) {
  return (
    <ERPTable
      columns={schema.fields.map(field => ({
        key: field.key,
        label: field.label,
      }))}
      rows={rows}
    />
  );
}