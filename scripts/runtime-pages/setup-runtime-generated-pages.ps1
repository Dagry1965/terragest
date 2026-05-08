$ErrorActionPreference = "Stop"

Write-Host "=== TERRAGEST ERP - RUNTIME GENERATED PAGES ===" -ForegroundColor Cyan

function Write-ERPFile {
  param(
    [string]$Path,
    [string]$Content
  )

  $dir = Split-Path $Path
  New-Item -ItemType Directory -Force $dir | Out-Null
  Set-Content -LiteralPath $Path -Value $Content
  Write-Host "OK $Path" -ForegroundColor Green
}

New-Item -ItemType Directory -Force "src\components\erp\runtime" | Out-Null
New-Item -ItemType Directory -Force "src\app\(private)\runtime\[module]" | Out-Null

Write-ERPFile "src\components\erp\runtime\ERPRuntimeFieldValue.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModuleField } from "@/runtime/modules";

interface ERPRuntimeFieldValueProps {
  field: ERPModuleField;
  value: unknown;
}

export function ERPRuntimeFieldValue({
  field,
  value,
}: ERPRuntimeFieldValueProps) {
  if (value === null || value === undefined || value === "") {
    return <span className="text-slate-500">—</span>;
  }

  if (field.type === "status") {
    return <ERPBadge tone="info">{String(value)}</ERPBadge>;
  }

  if (field.type === "boolean") {
    return (
      <ERPBadge tone={value ? "success" : "danger"}>
        {value ? "Oui" : "Non"}
      </ERPBadge>
    );
  }

  if (field.type === "currency") {
    return <span>{Number(value).toLocaleString("fr-FR")} FCFA</span>;
  }

  if (field.type === "date" || field.type === "datetime") {
    return <span>{String(value)}</span>;
  }

  return <span>{String(value)}</span>;
}
'@

Write-ERPFile "src\components\erp\runtime\ERPRuntimeTable.tsx" @'
import { ERPTable } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";

interface ERPRuntimeTableProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

export function ERPRuntimeTable({
  module,
  data = [],
}: ERPRuntimeTableProps) {
  const table = ERPModuleBuilder.buildTable(module);

  const columns = table.columns.map((column) => {
    const field = module.schema.fields.find((item) => item.key === column.key);

    return {
      key: column.key,
      label: column.label,
      render: (row: Record<string, unknown>) =>
        field ? (
          <ERPRuntimeFieldValue field={field} value={row[column.key]} />
        ) : (
          String(row[column.key] ?? "")
        ),
    };
  });

  return (
    <ERPTable
      columns={columns}
      data={data}
      emptyLabel={`Aucune donnée pour ${module.metadata.label}`}
    />
  );
}
'@

Write-ERPFile "src\components\erp\runtime\ERPRuntimeForm.tsx" @'
import { ERPButton, ERPCard, ERPInput, ERPSelect } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";

interface ERPRuntimeFormProps {
  module: ERPModule;
}

export function ERPRuntimeForm({ module }: ERPRuntimeFormProps) {
  const form = ERPModuleBuilder.buildForm(module);

  return (
    <ERPCard
      title={`Formulaire ${module.metadata.label}`}
      description="Formulaire généré automatiquement par le Runtime ERP."
    >
      <form className="grid gap-5 md:grid-cols-2">
        {form.fields.map((field) => {
          if (field.type === "select" || field.type === "status") {
            return (
              <ERPSelect
                key={field.key}
                label={field.label}
                options={
                  field.options ?? [
                    { label: "Actif", value: "actif" },
                    { label: "En attente", value: "pending" },
                    { label: "Archivé", value: "archived" },
                  ]
                }
              />
            );
          }

          return (
            <ERPInput
              key={field.key}
              label={field.label}
              required={field.required}
              type={field.type === "number" ? "number" : "text"}
            />
          );
        })}

        <div className="md:col-span-2">
          <ERPButton type="button">
            Enregistrer
          </ERPButton>
        </div>
      </form>
    </ERPCard>
  );
}
'@

Write-ERPFile "src\components\erp\runtime\ERPRuntimeDetails.tsx" @'
import { ERPCard } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";

interface ERPRuntimeDetailsProps {
  module: ERPModule;
  data?: Record<string, unknown>;
}

export function ERPRuntimeDetails({
  module,
  data = {},
}: ERPRuntimeDetailsProps) {
  const details = ERPModuleBuilder.buildDetails(module);

  return (
    <ERPCard
      title={`Détails ${module.metadata.label}`}
      description="Vue détail générée automatiquement par le Runtime ERP."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {details.fields.map((field) => (
          <div
            key={field.key}
            className="rounded-xl border border-slate-800 bg-slate-950 p-4"
          >
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {field.label}
            </p>

            <div className="mt-2 text-sm text-slate-100">
              <ERPRuntimeFieldValue
                field={field}
                value={data[field.key]}
              />
            </div>
          </div>
        ))}
      </div>
    </ERPCard>
  );
}
'@

Write-ERPFile "src\components\erp\runtime\ERPRuntimePage.tsx" @'
import { ERPButton, ERPCard, ERPEmptyState } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPRuntimeTable } from "./ERPRuntimeTable";
import { ERPRuntimeForm } from "./ERPRuntimeForm";
import { ERPRuntimeDetails } from "./ERPRuntimeDetails";

type ERPRuntimePageType = "list" | "create" | "edit" | "details";

interface ERPRuntimePageProps {
  module?: ERPModule;
  type?: ERPRuntimePageType;
  data?: Record<string, unknown>[];
  record?: Record<string, unknown>;
}

export function ERPRuntimePage({
  module,
  type = "list",
  data = [],
  record,
}: ERPRuntimePageProps) {
  if (!module) {
    return (
      <ERPEmptyState
        title="Module introuvable"
        description="Le Runtime ERP ne trouve pas la définition du module demandé."
      />
    );
  }

  if (type === "create" || type === "edit") {
    return <ERPRuntimeForm module={module} />;
  }

  if (type === "details") {
    return <ERPRuntimeDetails module={module} data={record} />;
  }

  return (
    <div className="space-y-6">
      <ERPCard
        title={module.metadata.label}
        description={module.metadata.description}
        premium
        actions={
          module.metadata.routes?.create ? (
            <ERPButton type="button">
              Nouveau
            </ERPButton>
          ) : null
        }
      >
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs text-slate-500">Module</p>
            <p className="mt-1 text-sm font-medium text-slate-100">
              {module.metadata.key}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs text-slate-500">Collection</p>
            <p className="mt-1 text-sm font-medium text-slate-100">
              {module.schema.collection}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs text-slate-500">Champs</p>
            <p className="mt-1 text-sm font-medium text-slate-100">
              {module.schema.fields.length}
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <p className="text-xs text-slate-500">Runtime</p>
            <p className="mt-1 text-sm font-medium text-emerald-300">
              Actif
            </p>
          </div>
        </div>
      </ERPCard>

      <ERPRuntimeTable module={module} data={data} />
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\runtime\index.ts" @'
export { ERPRuntimePage } from "./ERPRuntimePage";
export { ERPRuntimeTable } from "./ERPRuntimeTable";
export { ERPRuntimeForm } from "./ERPRuntimeForm";
export { ERPRuntimeDetails } from "./ERPRuntimeDetails";
export { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";
'@

Write-ERPFile "src\app\(private)\runtime\[module]\page.tsx" @'
import { ERPRuntimePage } from "@/components/erp/runtime";
import { ERPModuleRegistry, registerCoreModules } from "@/runtime/modules";

interface RuntimeModulePageProps {
  params: {
    module: string;
  };
}

export default function RuntimeModulePage({
  params,
}: RuntimeModulePageProps) {
  registerCoreModules();

  const module = ERPModuleRegistry.get(params.module);

  return (
    <main className="p-8">
      <ERPRuntimePage module={module} />
    </main>
  );
}
'@

Write-Host ""
Write-Host "=== BUILD TERRAGEST ===" -ForegroundColor Cyan

pnpm build

Write-Host ""
Write-Host "=== RUNTIME GENERATED PAGES INITIALISÉ ===" -ForegroundColor Green
