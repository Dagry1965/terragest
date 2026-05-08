$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host "=== ERP UI ARCHITECTURE ALIGNMENT ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\actions" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\runtime\ui" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\templates" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\datatable" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\forms" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\navigation" | Out-Null

WriteFile "src\runtime\actions\ERPAction.ts" @'
export type ERPActionType =
  | "create"
  | "edit"
  | "details"
  | "delete"
  | "export"
  | "import"
  | "workflow"
  | "audit"
  | "relations"
  | "permissions";

export interface ERPAction {
  key: ERPActionType | string;
  label: string;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  visible?: boolean;
  disabled?: boolean;
}
'@

WriteFile "src\runtime\actions\ERPActionResolver.ts" @'
import type { ERPModule } from "@/runtime/modules";
import type { ERPAction } from "./ERPAction";

export class ERPActionResolver {
  static resolve(module: ERPModule): ERPAction[] {
    const routes = module.metadata.routes ?? {};

    return [
      {
        key: "create",
        label: "Nouveau",
        href: routes.create,
        variant: "primary",
      },
      {
        key: "export",
        label: "Exporter",
        variant: "secondary",
      },
      {
        key: "import",
        label: "Importer",
        variant: "ghost",
      },
      {
        key: "workflow",
        label: "Workflow",
        variant: "ghost",
        visible: module.metadata.features?.workflows === true,
      },
      {
        key: "audit",
        label: "Audit",
        variant: "ghost",
        visible: module.metadata.features?.audit === true,
      },
      {
        key: "relations",
        label: "Relations",
        variant: "ghost",
      },
    ].filter((action) => action.visible !== false);
  }

  static resolveRowActions(module: ERPModule, id?: string): ERPAction[] {
    const basePath = module.metadata.routes?.list ?? `/${module.metadata.key}`;

    return [
      {
        key: "details",
        label: "Ouvrir",
        href: id ? `${basePath}/${id}` : basePath,
        variant: "ghost",
      },
      {
        key: "edit",
        label: "Modifier",
        href: id ? `${basePath}/${id}/edit` : basePath,
        variant: "secondary",
      },
    ];
  }
}
'@

WriteFile "src\runtime\actions\ERPActionRegistry.ts" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPActionResolver } from "./ERPActionResolver";

export const ERPActionRegistry = {
  forModule(module: ERPModule) {
    return ERPActionResolver.resolve(module);
  },

  forRow(module: ERPModule, id?: string) {
    return ERPActionResolver.resolveRowActions(module, id);
  },
};
'@

WriteFile "src\runtime\actions\index.ts" @'
export type { ERPAction, ERPActionType } from "./ERPAction";
export { ERPActionResolver } from "./ERPActionResolver";
export { ERPActionRegistry } from "./ERPActionRegistry";
'@

WriteFile "src\runtime\ui\ERPUIComposition.ts" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPActionRegistry } from "@/runtime/actions";

export interface ERPUIComposition {
  title: string;
  description?: string;
  category?: string;
  actions: ReturnType<typeof ERPActionRegistry.forModule>;
  tabs: string[];
  kpis: {
    label: string;
    value: string;
    helper: string;
  }[];
}

export class ERPUIComposer {
  static compose(module: ERPModule): ERPUIComposition {
    return {
      title: module.metadata.label,
      description: module.metadata.description,
      category: module.metadata.category,
      actions: ERPActionRegistry.forModule(module),
      tabs: ["Vue generale", "Liste", "Activite", "Workflows", "Audit"],
      kpis: [
        {
          label: "Total",
          value: "182",
          helper: "enregistrements",
        },
        {
          label: "Actifs",
          value: "148",
          helper: "operationnels",
        },
        {
          label: "En suivi",
          value: "28",
          helper: "a surveiller",
        },
        {
          label: "Alertes",
          value: "6",
          helper: "priorites",
        },
      ],
    };
  }
}
'@

WriteFile "src\components\erp\navigation\ERPActionButton.tsx" @'
import Link from "next/link";
import { ERPButton } from "@/components/erp/ui";
import type { ERPAction } from "@/runtime/actions";

interface ERPActionButtonProps {
  action: ERPAction;
}

export function ERPActionButton({ action }: ERPActionButtonProps) {
  if (action.href) {
    return (
      <Link href={action.href}>
        <ERPButton variant={action.variant} type="button">
          {action.label}
        </ERPButton>
      </Link>
    );
  }

  return (
    <ERPButton variant={action.variant} type="button" disabled={action.disabled}>
      {action.label}
    </ERPButton>
  );
}
'@

WriteFile "src\components\erp\navigation\ERPActionToolbar.tsx" @'
import type { ERPAction } from "@/runtime/actions";
import { ERPActionButton } from "./ERPActionButton";

interface ERPActionToolbarProps {
  actions: ERPAction[];
}

export function ERPActionToolbar({ actions }: ERPActionToolbarProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => (
        <ERPActionButton key={action.key} action={action} />
      ))}
    </div>
  );
}
'@

WriteFile "src\components\erp\navigation\ERPBreadcrumbs.tsx" @'
import Link from "next/link";
import type { ERPModule } from "@/runtime/modules";

interface ERPBreadcrumbsProps {
  module: ERPModule;
  current?: string;
}

export function ERPBreadcrumbs({ module, current = "Liste" }: ERPBreadcrumbsProps) {
  return (
    <nav className="mb-4 flex items-center gap-2 text-sm text-slate-500">
      <Link href="/dashboard" className="font-medium hover:text-slate-900">
        Dashboard
      </Link>
      <span>/</span>
      <span className="font-medium text-slate-700">{module.metadata.label}</span>
      <span>/</span>
      <span>{current}</span>
    </nav>
  );
}
'@

WriteFile "src\components\erp\datatable\ERPEnterpriseDataTable.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import { ERPActionRegistry } from "@/runtime/actions";
import { ERPActionButton } from "@/components/erp/navigation/ERPActionButton";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "@/components/erp/runtime/ERPRuntimeFieldValue";

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
        row[field.key] = "REF-" + String(index + 1).padStart(3, "0");
      } else {
        row[field.key] = `${field.label} ${index + 1}`;
      }
    });

    return row;
  });
}

export function ERPEnterpriseDataTable({
  module,
  data,
}: ERPEnterpriseDataTableProps) {
  const table = ERPModuleBuilder.buildTable(module);
  const rows = data && data.length > 0 ? data : createRows(module);

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
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-950">
            Liste operationnelle
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Donnees metier du module {module.metadata.label}.
          </p>
        </div>

        <div className="flex gap-2">
          <ERPBadge tone="success">{rows.length} lignes</ERPBadge>
          <ERPBadge tone="info">Synchronise</ERPBadge>
        </div>
      </div>

      <div className="grid gap-3 border-b border-slate-200 bg-slate-50 p-4 md:grid-cols-3">
        <input
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          placeholder="Rechercher..."
        />

        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
          <option>Tous les statuts</option>
          <option>Actif</option>
          <option>En suivi</option>
          <option>A controler</option>
        </select>

        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
          <option>Tri recent</option>
          <option>Tri alphabetique</option>
          <option>Priorite</option>
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
              <tr key={index} className="transition hover:bg-blue-50/70">
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="whitespace-nowrap px-6 py-4 font-medium text-slate-700"
                  >
                    {column.render(row)}
                  </td>
                ))}

                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {ERPActionRegistry.forRow(
                      module,
                      String(row.id ?? "")
                    ).map((action) => (
                      <ERPActionButton key={action.key} action={action} />
                    ))}
                  </div>
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

WriteFile "src\components\erp\forms\ERPFormRenderer.tsx" @'
import { ERPButton, ERPCard, ERPInput, ERPSelect } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";

interface ERPFormRendererProps {
  module: ERPModule;
}

export function ERPFormRenderer({ module }: ERPFormRendererProps) {
  const form = ERPModuleBuilder.buildForm(module);

  return (
    <ERPCard
      title={`${module.metadata.label} - formulaire`}
      description="Formulaire centralise genere depuis le schema metier."
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
                    { label: "En suivi", value: "en-suivi" },
                    { label: "A controler", value: "a-controler" },
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

        <div className="flex gap-3 md:col-span-2">
          <ERPButton type="button">Enregistrer</ERPButton>
          <ERPButton variant="ghost" type="button">Annuler</ERPButton>
        </div>
      </form>
    </ERPCard>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleHeader.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPActionToolbar } from "@/components/erp/navigation/ERPActionToolbar";
import { ERPBreadcrumbs } from "@/components/erp/navigation/ERPBreadcrumbs";
import { ERPUIComposer } from "@/runtime/ui/ERPUIComposition";

interface ERPModuleHeaderProps {
  module: ERPModule;
}

export function ERPModuleHeader({ module }: ERPModuleHeaderProps) {
  const composition = ERPUIComposer.compose(module);

  return (
    <section className="space-y-4">
      <ERPBreadcrumbs module={module} />

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <ERPBadge tone="info">Module ERP</ERPBadge>
                <ERPBadge tone="success">Actif</ERPBadge>
                {composition.category && <ERPBadge>{composition.category}</ERPBadge>}
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight">
                {composition.title}
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                {composition.description}
              </p>
            </div>

            <ERPActionToolbar actions={composition.actions} />
          </div>
        </div>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleKpiGrid.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPUIComposer } from "@/runtime/ui/ERPUIComposition";

interface ERPModuleKpiGridProps {
  module: ERPModule;
}

export function ERPModuleKpiGrid({ module }: ERPModuleKpiGridProps) {
  const composition = ERPUIComposer.compose(module);

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {composition.kpis.map((kpi) => (
        <div
          key={`${module.metadata.key}-${kpi.label}`}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-bold text-slate-500">{kpi.label}</p>
          <p className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            {kpi.value}
          </p>
          <p className="mt-2 text-sm text-slate-400">{kpi.helper}</p>
        </div>
      ))}
    </section>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleTabs.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPUIComposer } from "@/runtime/ui/ERPUIComposition";

interface ERPModuleTabsProps {
  module: ERPModule;
}

export function ERPModuleTabs({ module }: ERPModuleTabsProps) {
  const composition = ERPUIComposer.compose(module);

  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
      {composition.tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          className={[
            "rounded-2xl px-5 py-3 text-sm font-bold transition",
            index === 1
              ? "bg-slate-950 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
          ].join(" ")}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleListTemplate.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPEnterpriseDataTable } from "@/components/erp/datatable/ERPEnterpriseDataTable";
import { ERPModuleHeader } from "./ERPModuleHeader";
import { ERPModuleKpiGrid } from "./ERPModuleKpiGrid";
import { ERPModuleTabs } from "./ERPModuleTabs";
import { ERPModuleActivityPanel } from "./ERPModuleActivityPanel";
import { ERPModuleWorkflowPanel } from "./ERPModuleWorkflowPanel";

interface ERPModuleListTemplateProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

export function ERPModuleListTemplate({
  module,
  data = [],
}: ERPModuleListTemplateProps) {
  return (
    <div className="space-y-8">
      <ERPModuleHeader module={module} />
      <ERPModuleKpiGrid module={module} />
      <ERPModuleTabs module={module} />

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <ERPEnterpriseDataTable module={module} data={data} />

        <aside className="space-y-6">
          <ERPModuleWorkflowPanel module={module} />
          <ERPModuleActivityPanel module={module} />
        </aside>
      </section>
    </div>
  );
}
'@

WriteFile "src\components\erp\templates\ERPPageTemplateRegistry.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPEmptyState } from "@/components/erp/ui";
import { ERPFormRenderer } from "@/components/erp/forms/ERPFormRenderer";
import { ERPRuntimeDetails } from "@/components/erp/runtime/ERPRuntimeDetails";
import { ERPModuleListTemplate } from "./ERPModuleListTemplate";
import { ERPModuleDashboardTemplate } from "./ERPModuleDashboardTemplate";

export type ERPPageTemplateType =
  | "list"
  | "dashboard"
  | "create"
  | "edit"
  | "details";

interface RenderOptions {
  module?: ERPModule;
  type?: ERPPageTemplateType;
  data?: Record<string, unknown>[];
  record?: Record<string, unknown>;
}

export const ERPPageTemplateRegistry = {
  render({
    module,
    type = "list",
    data = [],
    record,
  }: RenderOptions) {
    if (!module) {
      return (
        <ERPEmptyState
          title="Module introuvable"
          description="La definition du module est absente."
        />
      );
    }

    if (type === "dashboard") {
      return <ERPModuleDashboardTemplate module={module} />;
    }

    if (type === "create" || type === "edit") {
      return <ERPFormRenderer module={module} />;
    }

    if (type === "details") {
      return <ERPRuntimeDetails module={module} data={record} />;
    }

    return <ERPModuleListTemplate module={module} data={data} />;
  },
};
'@

WriteFile "src\components\erp\templates\index.ts" @'
export { ERPModuleActivityPanel } from "./ERPModuleActivityPanel";
export { ERPModuleWorkflowPanel } from "./ERPModuleWorkflowPanel";
export { ERPModuleKpiGrid } from "./ERPModuleKpiGrid";
export { ERPModuleTabs } from "./ERPModuleTabs";
export { ERPModuleToolbar } from "./ERPModuleToolbar";
export { ERPModuleHeader } from "./ERPModuleHeader";
export { ERPModuleListTemplate } from "./ERPModuleListTemplate";
export { ERPModuleDashboardTemplate } from "./ERPModuleDashboardTemplate";
export { ERPPageTemplateRegistry } from "./ERPPageTemplateRegistry";
export type { ERPPageTemplateType } from "./ERPPageTemplateRegistry";
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== ERP UI ARCHITECTURE ALIGNMENT TERMINE ===" -ForegroundColor Green