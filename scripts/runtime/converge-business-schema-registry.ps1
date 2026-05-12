$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$file = Join-Path $root "src\runtime\schemas\ERPBusinessSchemaRegistry.ts"

if (!(Test-Path $file)) {
  throw "Fichier introuvable: $file"
}

Copy-Item $file "$file.bak" -Force

$content = @'
import {
  CoreModuleRuntimeAdapter,
} from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";

import type {
  ERPBusinessSchema,
} from "./ERPBusinessSchema";

function toBusinessFieldType(
  type: string | undefined
): "text" | "number" | "date" | "boolean" | "select" {
  switch (type) {
    case "number":
    case "date":
    case "boolean":
    case "select":
      return type;

    case "status":
    case "currency":
    case "email":
    case "relation":
    case "text":
    default:
      return "text";
  }
}

function toBusinessSchemas():
  ERPBusinessSchema[] {
  return CoreModuleRuntimeAdapter
    .toGeneratedSchemas()
    .map((schema) => ({
      module: schema.moduleKey,
      label: schema.moduleLabel,
      fields: schema.fields.map((field) => ({
        key: field.key,
        label: field.label,
        type: toBusinessFieldType(
          String(field.type)
        ),
        required: field.required,
      })),
    }));
}

export class ERPBusinessSchemaRegistry {
  private schemas:
    ERPBusinessSchema[] = [];

  registerSchema(
    schema: ERPBusinessSchema
  ) {
    this.schemas.push(schema);
  }

  getSchemas() {
    const generated =
      toBusinessSchemas();

    const legacyOnly =
      this.schemas.filter(
        (schema) =>
          !generated.some(
            (item) =>
              item.module === schema.module
          )
      );

    return [
      ...generated,
      ...legacyOnly,
    ];
  }

  getSchema(
    module: string
  ) {
    return this.getSchemas().find(
      schema =>
        schema.module === module
    );
  }
}

export const erpBusinessSchemaRegistry =
  new ERPBusinessSchemaRegistry();
'@

[System.IO.File]::WriteAllText(
  $file,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - ERPBusinessSchemaRegistry converge vers coreERPModules"
Write-Host "Backup créé: $file.bak"
Write-Host ""
Write-Host "Lance maintenant: pnpm build"