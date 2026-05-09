"use client";

import {
  ERPGeneratedPage,
} from "./ERPPageGenerationEngine";

import {
  erpBusinessSchemaRegistry,
} from "../schemas";

interface ERPModuleRuntimeFactoryProps {

  module: string;

  type:
    | "list"
    | "create"
    | "details"
    | "edit";

  rows?:
    Record<string, unknown>[];
}

export function ERPModuleRuntimeFactory({
  module,
  type,
  rows = [],
}: ERPModuleRuntimeFactoryProps) {

  const schema =
    erpBusinessSchemaRegistry
      .getSchema(module);

  if (!schema) {

    return null;
  }

  return (

    <ERPGeneratedPage
      schema={schema}
      type={type}
      rows={rows}
    />
  );
}