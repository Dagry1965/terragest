"use client";

import {
  ERPGeneratedPage,
} from "./ERPPageGenerationEngine";

import {
  erpBusinessSchemaRegistry,
} from "../schemas";

import {
  erpModuleRuntimeDataBridge,
} from "../data";

interface ERPModuleRuntimeFactoryProps {

  module: string;

  type:
    | "list"
    | "create"
    | "details"
    | "edit";
}

export function ERPModuleRuntimeFactory({
  module,
  type,
}: ERPModuleRuntimeFactoryProps) {

  const schema =
    erpBusinessSchemaRegistry
      .getSchema(module);

  if (!schema) {

    return null;
  }

  const rows =
    erpModuleRuntimeDataBridge
      .getModuleData(module);

  return (

    <ERPGeneratedPage
      schema={schema}
      type={type}
      rows={rows}
    />
  );
}