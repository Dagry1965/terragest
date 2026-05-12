$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$resolverFile =
  Join-Path $root `
  "src\runtime\ui-generation\ERPGeneratedSchemaResolver.ts"

$defaultSchemasFile =
  Join-Path $root `
  "src\runtime\ui-generation\ERPDefaultSchemas.ts"

if (!(Test-Path $resolverFile)) {
  throw "Resolver introuvable"
}

if (!(Test-Path $defaultSchemasFile)) {
  throw "ERPDefaultSchemas introuvable"
}

Copy-Item `
  $resolverFile `
  "$resolverFile.bak" `
  -Force

Copy-Item `
  $defaultSchemasFile `
  "$defaultSchemasFile.bak" `
  -Force

$resolverContent = @'
import {
  CoreModuleRuntimeAdapter,
} from "@/runtime/modules/adapters/CoreModuleRuntimeAdapter";

import type {
  ERPGeneratedSchema,
} from "./ERPGeneratedSchema";

const generatedSchemas =
  CoreModuleRuntimeAdapter
    .toGeneratedSchemas();

export function
resolveERPGeneratedSchema(
  moduleKey: string
): ERPGeneratedSchema {

  const schema =
    generatedSchemas.find(
      (item) =>
        item.moduleKey === moduleKey
    );

  if (!schema) {

    throw new Error(
      `Generated schema introuvable: ${moduleKey}`
    );
  }

  return schema;
}
'@

[System.IO.File]::WriteAllText(
  $resolverFile,
  $resolverContent,
  [System.Text.UTF8Encoding]::new($false)
)

$defaultSchemasContent = @'
import type {
  ERPGeneratedSchema,
} from "./ERPGeneratedSchema";

/*
  LEGACY FALLBACK FILE

  Les schemas sont maintenant
  générés depuis :

  CoreModuleRuntimeAdapter
    .toGeneratedSchemas()

  Ce fichier reste présent
  temporairement pour éviter
  les imports cassés.
*/

export const ERPDefaultSchemas:
  ERPGeneratedSchema[] = [];
'@

[System.IO.File]::WriteAllText(
  $defaultSchemasFile,
  $defaultSchemasContent,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "OK - ERPGeneratedSchemaResolver convergé"
Write-Host "OK - ERPDefaultSchemas neutralisé"
Write-Host ""
Write-Host "Backups créés:"
Write-Host " - $resolverFile.bak"
Write-Host " - $defaultSchemasFile.bak"
Write-Host ""
Write-Host "Lance maintenant:"
Write-Host "pnpm build"