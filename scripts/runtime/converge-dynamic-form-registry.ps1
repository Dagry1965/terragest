$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

$file =
  Join-Path $root `
  "src\runtime\forms\DynamicFormRegistry.ts"

if (!(Test-Path $file)) {
  throw "Fichier introuvable: $file"
}

Copy-Item `
  $file `
  "$file.bak" `
  -Force

$content = @'
import {
  DynamicField,
  DynamicFormContext,
} from "@/runtime/forms/DynamicField";

import {
  coreERPModules,
  ERPModuleBuilder,
} from "@/runtime/modules";

import {
  maintenanceForm,
} from "@/runtime/forms/definitions/maintenance.form";

import {
  materielsForm,
} from "@/runtime/forms/definitions/materiels.form";

import {
  terrainsForm,
} from "@/runtime/forms/definitions/terrains.form";

import {
  exploitationsForm,
} from "@/runtime/forms/definitions/exploitations.form";

import {
  stocksForm,
} from "@/runtime/forms/definitions/stocks.form";

import {
  produitsForm,
} from "@/runtime/forms/definitions/produits.form";

import {
  interventionsForm,
} from "@/runtime/forms/definitions/interventions.form";

import {
  contratsForm,
} from "@/runtime/forms/definitions/contrats.form";

import {
  paiementsForm,
} from "@/runtime/forms/definitions/paiements.form";

const legacyRegistry = {
  maintenance:
    maintenanceForm,

  materiels:
    materielsForm,

  terrains:
    terrainsForm,

  exploitations:
    exploitationsForm,

  stocks:
    stocksForm,

  produits:
    produitsForm,

  interventions:
    interventionsForm,

  contrats:
    contratsForm,

  paiements:
    paiementsForm,
};

function toDynamicField(
  field: any
): DynamicField {
  return {
    name:
      field.key,

    label:
      field.label,

    type:
      field.type === "status" ||
      field.type === "relation"
        ? "select"
        : field.type,

    required:
      field.required,

    options:
      field.options,
  };
}

export class DynamicFormRegistry {
  static getForm(
    module: string,
    context:
      DynamicFormContext
  ) {
    const coreModule =
      coreERPModules.find(
        (item) =>
          item.metadata.key === module
      );

    if (coreModule) {
      return ERPModuleBuilder
        .buildForm(coreModule)
        .fields
        .map(toDynamicField);
    }

    const definition =
      legacyRegistry[
        module as keyof typeof legacyRegistry
      ];

    if (!definition) {
      console.warn(
        "No dynamic form definition for module:",
        module
      );

      return [];
    }

    return definition.build(
      context
    );
  }

  static getAvailableModules() {
    return Array.from(
      new Set([
        ...coreERPModules.map(
          (module) => module.metadata.key
        ),
        ...Object.keys(
          legacyRegistry
        ),
      ])
    );
  }
}
'@

[System.IO.File]::WriteAllText(
  $file,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - DynamicFormRegistry converge vers coreERPModules"
Write-Host "Backup créé: $file.bak"
Write-Host ""
Write-Host "Lance maintenant: pnpm build"