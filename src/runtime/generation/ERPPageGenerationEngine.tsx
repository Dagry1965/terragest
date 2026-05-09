"use client";

import {
  ERPPage,
  ERPPanel,
} from "@/components/erp/ui";

import {
  ERPDynamicFormFactory,
  ERPDynamicTableFactory,
} from "../ui";

import type {
  ERPBusinessSchema,
} from "../schemas";

interface ERPGeneratedPageProps {

  schema:
    ERPBusinessSchema;

  type:
    | "list"
    | "create"
    | "details"
    | "edit";

  rows?:
    Record<string, unknown>[];
}

export function ERPGeneratedPage({
  schema,
  type,
  rows = [],
}: ERPGeneratedPageProps) {

  return (

    <ERPPage
      title={`${schema.label} - ${type}`}
      description="Page générée automatiquement par le runtime ERP."
    >

      <ERPPanel>

        {
          (
            type === "create"
            || type === "edit"
          ) && (

            <ERPDynamicFormFactory
              schema={schema}
            />
          )
        }

        {
          type === "list"
          && (

            <ERPDynamicTableFactory
              schema={schema}
              rows={rows}
            />
          )
        }

      </ERPPanel>

    </ERPPage>
  );
}