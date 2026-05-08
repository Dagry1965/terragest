$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {
  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent
  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {
    $BackupDir = Join-Path $ProjectRoot "backup\runtime-ui-generation"
    Ensure-Dir $BackupDir
    $SafeName = $Path.Replace("\", "__").Replace("/", "__").Replace(":", "")
    Copy-Item -LiteralPath $FullPath -Destination (Join-Path $BackupDir "$SafeName.bak") -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Host ""
Write-Host "TERRAGEST ERP - RUNTIME UI GENERATION" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\components\erp\runtime-ui"
Ensure-Dir "src\components\erp\forms"
Ensure-Dir "src\components\erp\datatable"
Ensure-Dir "src\runtime\ui-generation"

Write-Utf8 "src\runtime\ui-generation/ERPFieldDefinition.ts" @'
export type ERPFieldType =
  | "text"
  | "number"
  | "date"
  | "select"
  | "textarea"
  | "boolean"
  | "currency"
  | "status";

export type ERPFieldDefinition = {
  key: string;
  label: string;
  type?: ERPFieldType;
  required?: boolean;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
  }[];
};
'@

Write-Utf8 "src\runtime\ui-generation/ERPGeneratedSchema.ts" @'
import type { ERPFieldDefinition } from "./ERPFieldDefinition";

export type ERPGeneratedSchema = {
  moduleKey: string;
  moduleLabel: string;
  description?: string;
  fields: ERPFieldDefinition[];
};
'@

Write-Utf8 "src\runtime\ui-generation/ERPDefaultSchemas.ts" @'
import type { ERPGeneratedSchema } from "./ERPGeneratedSchema";

export const ERPDefaultSchemas: ERPGeneratedSchema[] = [
  {
    moduleKey: "exploitations",
    moduleLabel: "Exploitations",
    description: "Pilotage des exploitations.",
    fields: [
      { key: "nom", label: "Nom", type: "text", required: true },
      { key: "type", label: "Type", type: "select" },
      { key: "statut", label: "Statut", type: "status" },
    ],
  },
  {
    moduleKey: "terrains",
    moduleLabel: "Terrains",
    description: "Gestion des terrains.",
    fields: [
      { key: "nom", label: "Nom", type: "text", required: true },
      { key: "surface", label: "Surface", type: "number" },
      { key: "localisation", label: "Localisation", type: "text" },
    ],
  },
  {
    moduleKey: "materiels",
    moduleLabel: "Materiels",
    description: "Gestion du parc materiel.",
    fields: [
      { key: "nom", label: "Nom", type: "text", required: true },
      { key: "etat", label: "Etat", type: "status" },
      { key: "categorie", label: "Categorie", type: "text" },
    ],
  },
  {
    moduleKey: "produits",
    moduleLabel: "Produits",
    description: "Catalogue produits ERP.",
    fields: [
      { key: "nom", label: "Nom", type: "text", required: true },
      { key: "categorie", label: "Categorie", type: "text" },
      { key: "prix", label: "Prix", type: "currency" },
    ],
  },
  {
    moduleKey: "stocks",
    moduleLabel: "Stocks",
    description: "Suivi des stocks.",
    fields: [
      { key: "produit", label: "Produit", type: "text" },
      { key: "quantite", label: "Quantite", type: "number" },
      { key: "statut", label: "Statut", type: "status" },
    ],
  },
  {
    moduleKey: "paiements",
    moduleLabel: "Paiements",
    description: "Gestion financiere ERP.",
    fields: [
      { key: "reference", label: "Reference", type: "text" },
      { key: "montant", label: "Montant", type: "currency" },
      { key: "statut", label: "Statut", type: "status" },
    ],
  },
  {
    moduleKey: "interventions",
    moduleLabel: "Interventions",
    description: "Interventions operationnelles.",
    fields: [
      { key: "titre", label: "Titre", type: "text" },
      { key: "date", label: "Date", type: "date" },
      { key: "statut", label: "Statut", type: "status" },
    ],
  },
  {
    moduleKey: "contrats",
    moduleLabel: "Contrats",
    description: "Gestion des contrats.",
    fields: [
      { key: "reference", label: "Reference", type: "text" },
      { key: "partenaire", label: "Partenaire", type: "text" },
      { key: "statut", label: "Statut", type: "status" },
    ],
  },
  {
    moduleKey: "maintenance",
    moduleLabel: "Maintenance",
    description: "Suivi maintenance.",
    fields: [
      { key: "objet", label: "Objet", type: "text" },
      { key: "priorite", label: "Priorite", type: "status" },
      { key: "date", label: "Date", type: "date" },
    ],
  },
];
'@

Write-Utf8 "src\runtime\ui-generation/ERPGeneratedSchemaResolver.ts" @'
import { ERPDefaultSchemas } from "./ERPDefaultSchemas";
import type { ERPGeneratedSchema } from "./ERPGeneratedSchema";

export function resolveERPGeneratedSchema(
  moduleKey: string
): ERPGeneratedSchema {
  return (
    ERPDefaultSchemas.find((schema) => schema.moduleKey === moduleKey) ?? {
      moduleKey,
      moduleLabel: moduleKey,
      description: "Module ERP runtime.",
      fields: [
        { key: "nom", label: "Nom", type: "text" },
        { key: "statut", label: "Statut", type: "status" },
      ],
    }
  );
}
'@

Write-Utf8 "src\runtime\ui-generation/index.ts" @'
export * from "./ERPFieldDefinition";
export * from "./ERPGeneratedSchema";
export * from "./ERPDefaultSchemas";
export * from "./ERPGeneratedSchemaResolver";
'@

Write-Utf8 "src\components\erp\forms\ERPFormRenderer.tsx" @'
"use client";

import type { ERPGeneratedSchema } from "@/runtime/ui-generation";

type ERPFormRendererProps = {
  schema: ERPGeneratedSchema;
};

export function ERPFormRenderer({
  schema,
}: ERPFormRendererProps) {
  return (
    <form className="space-y-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {schema.fields.map((field) => (
          <label key={field.key} className="space-y-2">
            <span className="text-sm font-medium text-slate-700">
              {field.label}
              {field.required && <span className="text-red-500"> *</span>}
            </span>

            {field.type === "textarea" ? (
              <textarea
                className="min-h-28 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder={field.placeholder ?? field.label}
              />
            ) : field.type === "select" ? (
              <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100">
                <option value="">Selectionner</option>
                {(field.options ?? []).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={
                  field.type === "number" || field.type === "currency"
                    ? "number"
                    : field.type === "date"
                      ? "date"
                      : "text"
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                placeholder={field.placeholder ?? field.label}
              />
            )}
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
        <button
          type="button"
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Annuler
        </button>

        <button
          type="submit"
          className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}
'@

Write-Utf8 "src\components\erp\forms\index.ts" @'
export * from "./ERPFormRenderer";
'@

Write-Utf8 "src\components\erp\runtime-ui\ERPDataTableRuntime.tsx" @'
import type { ERPGeneratedSchema } from "@/runtime/ui-generation";
import { ERPEmptyState } from "@/components/erp/ui";

type ERPDataTableRuntimeProps = {
  schema: ERPGeneratedSchema;
  rows?: Record<string, unknown>[];
};

export function ERPDataTableRuntime({
  schema,
  rows = [],
}: ERPDataTableRuntimeProps) {
  if (rows.length === 0) {
    return (
      <ERPEmptyState
        title={`${schema.moduleLabel} pret`}
        description="Aucune donnee pour le moment. La table runtime est prete a recevoir les donnees reelles."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-slate-50">
          <tr>
            {schema.fields.map((field) => (
              <th
                key={field.key}
                className="px-4 py-3 text-left font-semibold text-slate-600"
              >
                {field.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {rows.map((row, index) => (
            <tr key={String(row.id ?? index)}>
              {schema.fields.map((field) => (
                <td key={field.key} className="px-4 py-3 text-slate-700">
                  {String(row[field.key] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\runtime-ui\ERPRuntimeModulePage.tsx" @'
import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
} from "@/components/erp/ui";

import { ERPFormRenderer } from "@/components/erp/forms";
import { ERPDataTableRuntime } from "./ERPDataTableRuntime";

import {
  resolveERPGeneratedSchema,
} from "@/runtime/ui-generation";

type ERPRuntimeModulePageProps = {
  moduleKey: string;
  mode?: "list" | "create" | "edit" | "details";
  rows?: Record<string, unknown>[];
};

export function ERPRuntimeModulePage({
  moduleKey,
  mode = "list",
  rows = [],
}: ERPRuntimeModulePageProps) {
  const schema =
    resolveERPGeneratedSchema(moduleKey);

  const isForm =
    mode === "create" || mode === "edit";

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="Runtime UI Generation"
        title={schema.moduleLabel}
        description={
          schema.description ??
          "Module genere par le runtime ERP."
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <ERPStatCard label="Schema" value="OK" helper={`${schema.fields.length} champs`} />
        <ERPStatCard label="Mode" value={mode} helper="Template runtime" />
        <ERPStatCard label="UI" value="Enterprise" helper="Design system central" />
        <ERPStatCard label="Runtime" value="Pret" helper="Generation active" />
      </div>

      <ERPSection>
        {isForm ? (
          <ERPFormRenderer schema={schema} />
        ) : (
          <ERPDataTableRuntime schema={schema} rows={rows} />
        )}
      </ERPSection>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\runtime-ui\index.ts" @'
export * from "./ERPDataTableRuntime";
export * from "./ERPRuntimeModulePage";
'@

Write-Utf8 "src\components\erp\templates\ERPModuleActionPageTemplate.tsx" @'
import {
  ERPPageHeader,
  ERPSection,
  ERPEmptyState,
  ERPStatCard,
} from "@/components/erp/ui";

import { ERPFormRenderer } from "@/components/erp/forms";
import {
  resolveERPGeneratedSchema,
} from "@/runtime/ui-generation";

type ERPModuleActionPageTemplateProps = {
  module?: unknown;
  type?: string;
  moduleLabel?: string;
  moduleName?: string;
  actionLabel?: string;
  title?: string;
  description?: string;
};

function getModuleValue(
  module: unknown,
  key: string
): string | undefined {
  if (!module || typeof module !== "object") {
    return undefined;
  }

  const value = (module as Record<string, unknown>)[key];

  if (typeof value === "string") {
    return value;
  }

  return undefined;
}

function formatActionType(type?: string) {
  switch (type) {
    case "list":
      return "Liste";
    case "details":
    case "detail":
      return "Details";
    case "create":
      return "Creation";
    case "edit":
      return "Edition";
    case "audit":
      return "Audit";
    case "import":
      return "Import";
    case "export":
      return "Export";
    case "relations":
      return "Relations";
    case "workflows":
      return "Workflows";
    default:
      return "Action ERP";
  }
}

function normalizeModuleKey(label: string) {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-");
}

export function ERPModuleActionPageTemplate({
  module,
  type,
  moduleLabel,
  moduleName,
  actionLabel,
  title,
  description,
}: ERPModuleActionPageTemplateProps) {
  const resolvedModule =
    moduleLabel ??
    moduleName ??
    getModuleValue(module, "label") ??
    getModuleValue(module, "name") ??
    getModuleValue(module, "title") ??
    "Module ERP";

  const resolvedAction =
    actionLabel ??
    title ??
    formatActionType(type);

  const schema =
    resolveERPGeneratedSchema(
      getModuleValue(module, "key") ??
      getModuleValue(module, "slug") ??
      normalizeModuleKey(resolvedModule)
    );

  const showForm =
    type === "create" || type === "edit";

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow={resolvedModule}
        title={resolvedAction}
        description={
          description ??
          getModuleValue(module, "description") ??
          "Page raccordee au template ERP enterprise centralise."
        }
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <ERPStatCard label="Module" value={resolvedModule} helper="Registry compatible" />
        <ERPStatCard label="Action" value={resolvedAction} helper="Template central" />
        <ERPStatCard label="Schema" value="OK" helper={`${schema.fields.length} champs`} />
        <ERPStatCard label="Runtime" value="Pret" helper="Generation UI active" />
      </div>

      <ERPSection>
        {showForm ? (
          <ERPFormRenderer schema={schema} />
        ) : (
          <ERPEmptyState
            title={`${resolvedAction} pret`}
            description="Cette page est stabilisee et prete pour le branchement des donnees runtime reelles."
          />
        )}
      </ERPSection>
    </div>
  );
}
'@

$IndexFiles = @(
  @{
    Path = "src\components\erp\index.ts"
    Exports = @(
      'export * from "./forms";',
      'export * from "./runtime-ui";'
    )
  }
)

foreach ($Index in $IndexFiles) {
  $FullPath = Join-Path $ProjectRoot $Index.Path

  if (Test-Path -LiteralPath $FullPath) {
    $Content = Get-Content -LiteralPath $FullPath -Raw

    foreach ($Export in $Index.Exports) {
      if ($Content -notmatch [regex]::Escape($Export)) {
        $Content = $Content.TrimEnd() + "`r`n" + $Export + "`r`n"
      }
    }

    Write-Utf8 $Index.Path $Content
  }
}

Write-Host ""
Write-Host "RUNTIME UI GENERATION INSTALLEE" -ForegroundColor Green
Write-Host "Relance : pnpm build" -ForegroundColor Yellow