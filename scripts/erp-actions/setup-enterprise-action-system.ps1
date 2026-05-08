$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)

  [System.IO.File]::WriteAllText(
    $fullPath,
    $Content,
    $utf8NoBom
  )

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host ""
Write-Host "=== ERP ENTERPRISE ACTION SYSTEM ===" -ForegroundColor Cyan
Write-Host ""

New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\actions" | Out-Null

WriteFile "src\runtime\actions\ERPActionExecutor.ts" @'
"use client";

import { toast } from "react-hot-toast";
import type { ERPAction } from "./ERPAction";

export class ERPActionExecutor {
  static execute(action: ERPAction) {
    switch (action.key) {
      case "export":
        toast.success("Export ERP lancé");
        break;

      case "import":
        toast.success("Import ERP initialisé");
        break;

      case "workflow":
        toast.success("Ouverture du workflow");
        break;

      case "audit":
        toast.success("Consultation audit");
        break;

      case "relations":
        toast.success("Chargement des relations");
        break;

      case "permissions":
        toast.success("Chargement des permissions");
        break;

      default:
        toast(action.label);
        break;
    }
  }
}
'@

WriteFile "src\components\erp\actions\ERPActionButton.tsx" @'
"use client";

import Link from "next/link";
import { ERPButton } from "@/components/erp/ui";
import type { ERPAction } from "@/runtime/actions";
import { ERPActionExecutor } from "@/runtime/actions/ERPActionExecutor";

interface ERPActionButtonProps {
  action: ERPAction;
}

export function ERPActionButton({
  action,
}: ERPActionButtonProps) {

  if (action.href) {
    return (
      <Link href={action.href}>
        <ERPButton
          variant={action.variant}
          type="button"
        >
          {action.label}
        </ERPButton>
      </Link>
    );
  }

  return (
    <ERPButton
      variant={action.variant}
      type="button"
      disabled={action.disabled}
      onClick={() => ERPActionExecutor.execute(action)}
    >
      {action.label}
    </ERPButton>
  );
}
'@

WriteFile "src\components\erp\actions\ERPActionToolbar.tsx" @'
import type { ERPAction } from "@/runtime/actions";
import { ERPActionButton } from "./ERPActionButton";

interface ERPActionToolbarProps {
  actions: ERPAction[];
}

export function ERPActionToolbar({
  actions,
}: ERPActionToolbarProps) {

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <ERPActionButton
          key={action.key}
          action={action}
        />
      ))}
    </div>
  );
}
'@

WriteFile "src\components\erp\actions\ERPRowActions.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPActionRegistry } from "@/runtime/actions";
import { ERPActionButton } from "./ERPActionButton";

interface ERPRowActionsProps {
  module: ERPModule;
  id?: string;
}

export function ERPRowActions({
  module,
  id,
}: ERPRowActionsProps) {

  const actions =
    ERPActionRegistry.forRow(module, id);

  return (
    <div className="flex justify-end gap-2">
      {actions.map((action) => (
        <ERPActionButton
          key={action.key}
          action={action}
        />
      ))}
    </div>
  );
}
'@

WriteFile "src\components\erp\actions\index.ts" @'
export { ERPActionButton } from "./ERPActionButton";
export { ERPActionToolbar } from "./ERPActionToolbar";
export { ERPRowActions } from "./ERPRowActions";
'@

WriteFile "src\components\erp\datatable\ERPEnterpriseDataTable.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";
import { ERPRowActions } from "@/components/erp/actions";

interface ERPEnterpriseDataTableProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

function createRows(module: ERPModule): Record<string, unknown>[] {
  return Array.from({ length: 8 }).map((_, index) => {
    const row: Record<string, unknown> = {
      id: `${module.metadata.key}-${index + 1}`,
    };

    module.schema.fields.forEach((field) => {
      if (field.type === "number") {
        row[field.key] = index * 10 + 5;
      } else if (field.type === "status") {
        row[field.key] =
          index % 3 === 0
            ? "Actif"
            : index % 3 === 1
              ? "En suivi"
              : "A controler";
      } else if (field.type === "relation") {
        row[field.key] =
          "REF-" + String(index + 1).padStart(3, "0");
      } else {
        row[field.key] =
          `${field.label} ${index + 1}`;
      }
    });

    return row;
  });
}

export function ERPEnterpriseDataTable({
  module,
  data,
}: ERPEnterpriseDataTableProps) {

  const table =
    ERPModuleBuilder.buildTable(module);

  const rows =
    data && data.length > 0
      ? data
      : createRows(module);

  const columns = table.columns.map((column) => {

    const field =
      module.schema.fields.find(
        (item) => item.key === column.key
      );

    return {
      key: column.key,
      label: column.label,
      render: (
        row: Record<string, unknown>
      ) =>
        field ? (
          <ERPRuntimeFieldValue
            field={field}
            value={row[column.key]}
          />
        ) : (
          String(row[column.key] ?? "")
        ),
    };
  });

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="flex flex-col gap-4 border-b border-slate-200 bg-white px-6 py-5 md:flex-row md:items-center md:justify-between">

        <div>
          <h3 className="text-xl font-black text-slate-950">
            Registre opérationnel
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Données métier du module {module.metadata.label}.
          </p>
        </div>

        <div className="flex gap-2">
          <ERPBadge tone="success">
            {rows.length} lignes
          </ERPBadge>

          <ERPBadge tone="info">
            Runtime synchronisé
          </ERPBadge>
        </div>
      </div>

      <div className="grid gap-3 border-b border-slate-200 bg-slate-50 p-4 md:grid-cols-3">

        <input
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          placeholder="Recherche métier..."
        />

        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500">
          <option>Tous les statuts</option>
          <option>Actif</option>
          <option>En suivi</option>
          <option>A contrôler</option>
        </select>

        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500">
          <option>Tri récent</option>
          <option>Tri alphabétique</option>
          <option>Priorité</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">

          <thead>
            <tr className="border-b border-slate-200 bg-white">

              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="whitespace-nowrap px-6 py-4 text-xs font-black uppercase tracking-wide text-slate-500"
                >
                  {column.label}
                </th>
              ))}

              <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-wide text-slate-500">
                Actions
              </th>

            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">

            {rows.map((row, index) => (

              <tr
                key={index}
                className="transition hover:bg-blue-50/70"
              >

                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="whitespace-nowrap px-6 py-4 font-medium text-slate-700"
                  >
                    {column.render(row)}
                  </td>
                ))}

                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <ERPRowActions
                    module={module}
                    id={String(row.id ?? "")}
                  />
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleHeader.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPUIComposer } from "@/runtime/ui/ERPUIComposition";
import { ERPBreadcrumbs } from "@/components/erp/navigation/ERPBreadcrumbs";
import { ERPActionToolbar } from "@/components/erp/actions";

interface ERPModuleHeaderProps {
  module: ERPModule;
}

export function ERPModuleHeader({
  module,
}: ERPModuleHeaderProps) {

  const composition =
    ERPUIComposer.compose(module);

  return (
    <section className="space-y-4">

      <ERPBreadcrumbs module={module} />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">

          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <div className="flex flex-wrap gap-2">

                <ERPBadge tone="info">
                  Module ERP
                </ERPBadge>

                <ERPBadge tone="success">
                  Opérationnel
                </ERPBadge>

                {composition.category && (
                  <ERPBadge>
                    {composition.category}
                  </ERPBadge>
                )}

              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight">
                {composition.title}
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                {composition.description}
              </p>

            </div>


            <ERPActionToolbar
              actions={composition.actions}
            />

          </div>
        </div>
      </div>
    </section>
  );
}
'@

Set-Location $projectRoot

pnpm build

Write-Host ""
Write-Host "=== ERP ENTERPRISE ACTION SYSTEM TERMINE ===" -ForegroundColor Green