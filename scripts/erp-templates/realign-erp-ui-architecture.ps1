$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param(
    [string]$Path,
    [string]$Content
  )

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

WriteFile "src\components\erp\templates\ERPModuleActivityPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPModuleActivityPanelProps {
  module: ERPModule;
}

export function ERPModuleActivityPanel({
  module,
}: ERPModuleActivityPanelProps) {
  const activities = [
    {
      title: "Nouvel enregistrement cree",
      description: `Une nouvelle entree a ete ajoutee au module ${module.metadata.label}.`,
      tone: "success" as const,
    },
    {
      title: "Verification metier effectuee",
      description: "Les regles de coherence du module ont ete appliquees.",
      tone: "info" as const,
    },
    {
      title: "Workflow disponible",
      description: "Une action metier peut etre lancee depuis ce module.",
      tone: "default" as const,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Activite recente
          </h2>
          <p className="text-sm text-slate-500">
            Evenements metier recents du module.
          </p>
        </div>

        <ERPBadge tone="info">Live</ERPBadge>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.title}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-slate-900">
                {activity.title}
              </h3>

              <ERPBadge tone={activity.tone}>
                ERP
              </ERPBadge>
            </div>

            <p className="text-sm leading-6 text-slate-500">
              {activity.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleWorkflowPanel.tsx" @'
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPModuleWorkflowPanelProps {
  module: ERPModule;
}

export function ERPModuleWorkflowPanel({
  module,
}: ERPModuleWorkflowPanelProps) {
  const workflowsEnabled = module.metadata.features?.workflows === true;
  const auditEnabled = module.metadata.features?.audit === true;
  const automationEnabled = module.metadata.features?.automation === true;

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-950">
          Pilotage metier
        </h2>
        <p className="text-sm text-slate-500">
          Actions operationnelles, workflows et audit discret.
        </p>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {workflowsEnabled && <ERPBadge tone="info">Workflows</ERPBadge>}
        {auditEnabled && <ERPBadge tone="success">Audit</ERPBadge>}
        {automationEnabled && <ERPBadge tone="warning">Automation</ERPBadge>}
      </div>

      <div className="grid gap-3">
        <ERPButton type="button">
          Creer un dossier
        </ERPButton>

        <ERPButton variant="secondary" type="button">
          Lancer une action metier
        </ERPButton>

        <ERPButton variant="ghost" type="button">
          Consulter l'historique
        </ERPButton>

        <ERPButton variant="ghost" type="button">
          Voir les relations
        </ERPButton>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleKpiGrid.tsx" @'
import type { ERPModule } from "@/runtime/modules";

interface ERPModuleKpiGridProps {
  module: ERPModule;
  total?: number;
}

export function ERPModuleKpiGrid({
  module,
  total = 182,
}: ERPModuleKpiGridProps) {
  const kpis = [
    {
      label: "Total",
      value: String(total),
      helper: "enregistrements",
    },
    {
      label: "Actifs",
      value: "148",
      helper: "elements operationnels",
    },
    {
      label: "En suivi",
      value: "28",
      helper: "elements a surveiller",
    },
    {
      label: "Alertes",
      value: "6",
      helper: "priorites metier",
    },
  ];

  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <div
          key={`${module.metadata.key}-${kpi.label}`}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-bold text-slate-500">
            {kpi.label}
          </p>

          <p className="mt-3 text-4xl font-black tracking-tight text-slate-950">
            {kpi.value}
          </p>

          <p className="mt-2 text-sm text-slate-400">
            {kpi.helper}
          </p>
        </div>
      ))}
    </section>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleTabs.tsx" @'
const tabs = [
  "Vue generale",
  "Liste",
  "Activite",
  "Workflows",
  "Audit",
];

export function ERPModuleTabs() {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
      {tabs.map((tab, index) => (
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

WriteFile "src\components\erp\templates\ERPModuleToolbar.tsx" @'
import { ERPButton } from "@/components/erp/ui";

export function ERPModuleToolbar() {
  return (
    <section className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm xl:grid-cols-[1fr_auto] xl:items-center">
      <div className="grid gap-3 md:grid-cols-3">
        <input
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          placeholder="Rechercher..."
        />

        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500">
          <option>Tous les statuts</option>
          <option>Actif</option>
          <option>En suivi</option>
          <option>A controler</option>
        </select>

        <select className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500">
          <option>Vue operationnelle</option>
          <option>Vue workflow</option>
          <option>Vue audit</option>
        </select>
      </div>

      <div className="flex flex-wrap gap-3">
        <ERPButton type="button">
          Nouveau
        </ERPButton>

        <ERPButton variant="secondary" type="button">
          Exporter
        </ERPButton>

        <ERPButton variant="ghost" type="button">
          Importer
        </ERPButton>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleHeader.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPModuleHeaderProps {
  module: ERPModule;
}

export function ERPModuleHeader({
  module,
}: ERPModuleHeaderProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-8 text-white">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <ERPBadge tone="info">
                Module ERP
              </ERPBadge>

              <ERPBadge tone="success">
                Actif
              </ERPBadge>

              {module.metadata.category && (
                <ERPBadge>
                  {module.metadata.category}
                </ERPBadge>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight">
              {module.metadata.label}
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
              {module.metadata.description}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-slate-200">
            <p className="font-bold text-white">
              Mode runtime discret
            </p>
            <p className="mt-1 text-slate-300">
              La page est generee depuis le schema metier central.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleListTemplate.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPRuntimeTable } from "@/components/erp/runtime/ERPRuntimeTable";
import { ERPModuleHeader } from "./ERPModuleHeader";
import { ERPModuleToolbar } from "./ERPModuleToolbar";
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
      <ERPModuleToolbar />
      <ERPModuleKpiGrid module={module} total={data.length || 182} />
      <ERPModuleTabs />

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <ERPRuntimeTable module={module} data={data} />

        <aside className="space-y-6">
          <ERPModuleWorkflowPanel module={module} />
          <ERPModuleActivityPanel module={module} />
        </aside>
      </section>
    </div>
  );
}
'@

WriteFile "src\components\erp\templates\ERPModuleDashboardTemplate.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleHeader } from "./ERPModuleHeader";
import { ERPModuleKpiGrid } from "./ERPModuleKpiGrid";
import { ERPModuleActivityPanel } from "./ERPModuleActivityPanel";
import { ERPModuleWorkflowPanel } from "./ERPModuleWorkflowPanel";

interface ERPModuleDashboardTemplateProps {
  module: ERPModule;
}

export function ERPModuleDashboardTemplate({
  module,
}: ERPModuleDashboardTemplateProps) {
  return (
    <div className="space-y-8">
      <ERPModuleHeader module={module} />
      <ERPModuleKpiGrid module={module} />

      <section className="grid gap-8 xl:grid-cols-2">
        <ERPModuleActivityPanel module={module} />
        <ERPModuleWorkflowPanel module={module} />
      </section>
    </div>
  );
}
'@

WriteFile "src\components\erp\templates\ERPPageTemplateRegistry.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPEmptyState } from "@/components/erp/ui";
import { ERPRuntimeForm } from "@/components/erp/runtime/ERPRuntimeForm";
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
      return <ERPRuntimeForm module={module} />;
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

WriteFile "src\components\erp\runtime\ERPRuntimePage.tsx" @'
import { ERPPageTemplateRegistry } from "@/components/erp/templates";
import type { ERPModule } from "@/runtime/modules";
import type { ERPPageTemplateType } from "@/components/erp/templates";

interface ERPRuntimePageProps {
  module?: ERPModule;
  type?: ERPPageTemplateType;
  data?: Record<string, unknown>[];
  record?: Record<string, unknown>;
}

export function ERPRuntimePage({
  module,
  type = "list",
  data = [],
  record,
}: ERPRuntimePageProps) {
  return ERPPageTemplateRegistry.render({
    module,
    type,
    data,
    record,
  });
}
'@

WriteFile "src\components\erp\runtime\ERPRuntimeTable.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";

interface ERPRuntimeTableProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

function createDemoRows(module: ERPModule): Record<string, unknown>[] {
  return Array.from({ length: 8 }).map((_, index) => {
    const row: Record<string, unknown> = {};

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

export function ERPRuntimeTable({
  module,
  data,
}: ERPRuntimeTableProps) {
  const table = ERPModuleBuilder.buildTable(module);
  const rows = data && data.length > 0 ? data : createDemoRows(module);

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

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
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
                  <button className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-bold text-slate-600 hover:border-blue-400 hover:text-blue-700">
                    Ouvrir
                  </button>
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

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== REALIGNEMENT ERP UI ARCHITECTURE TERMINE ===" -ForegroundColor Green