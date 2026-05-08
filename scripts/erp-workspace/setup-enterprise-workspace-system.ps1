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

Write-Host "=== ERP ENTERPRISE WORKSPACE SYSTEM ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\workspace" | Out-Null

WriteFile "src\components\erp\workspace\ERPWorkspaceActivity.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPWorkspaceActivityProps {
  module: ERPModule;
}

export function ERPWorkspaceActivity({ module }: ERPWorkspaceActivityProps) {
  const items = [
    "Nouvelle action metier enregistree",
    "Controle de coherence effectue",
    "Workflow disponible pour validation",
    "Mise a jour operationnelle detectee",
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Activite workspace
          </h2>
          <p className="text-sm text-slate-500">
            Flux recent du module {module.metadata.label}.
          </p>
        </div>

        <ERPBadge tone="info">Live</ERPBadge>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm font-bold text-slate-800">{item}</p>
            <p className="mt-1 text-xs text-slate-400">Mis a jour recemment</p>
          </div>
        ))}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\workspace\ERPWorkspaceCommandCenter.tsx" @'
import { ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPWorkspaceCommandCenterProps {
  module: ERPModule;
}

export function ERPWorkspaceCommandCenter({
  module,
}: ERPWorkspaceCommandCenterProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Command center
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Actions contextuelles pour piloter le module {module.metadata.label}.
      </p>

      <div className="mt-5 grid gap-3">
        <ERPButton type="button">Lancer workflow</ERPButton>
        <ERPButton variant="secondary" type="button">Analyser les donnees</ERPButton>
        <ERPButton variant="ghost" type="button">Voir historique</ERPButton>
        <ERPButton variant="ghost" type="button">Controler permissions</ERPButton>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\workspace\ERPWorkspaceContextPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";

interface ERPWorkspaceContextPanelProps {
  module: ERPModule;
}

export function ERPWorkspaceContextPanel({
  module,
}: ERPWorkspaceContextPanelProps) {
  const features = Object.entries(module.metadata.features ?? {})
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Contexte module
      </h2>

      <div className="mt-5 space-y-4 text-sm">
        <div>
          <p className="font-bold text-slate-500">Collection</p>
          <p className="mt-1 text-slate-950">{module.schema.collection}</p>
        </div>

        <div>
          <p className="font-bold text-slate-500">Champs</p>
          <p className="mt-1 text-slate-950">{module.schema.fields.length}</p>
        </div>

        <div>
          <p className="font-bold text-slate-500">Capacites</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {features.map((feature) => (
              <ERPBadge key={feature} tone="info">
                {feature}
              </ERPBadge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\workspace\ERPWorkspaceQuickActions.tsx" @'
import { ERPActionToolbar } from "@/components/erp/actions";
import { ERPActionRegistry } from "@/runtime/actions";
import type { ERPModule } from "@/runtime/modules";

interface ERPWorkspaceQuickActionsProps {
  module: ERPModule;
}

export function ERPWorkspaceQuickActions({
  module,
}: ERPWorkspaceQuickActionsProps) {
  const actions = ERPActionRegistry.forModule(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-black text-slate-950">
          Actions rapides
        </h2>
        <p className="text-sm text-slate-500">
          Raccourcis issus du registre central.
        </p>
      </div>

      <ERPActionToolbar actions={actions} />
    </section>
  );
}
'@

WriteFile "src\components\erp\workspace\ERPWorkspaceTabs.tsx" @'
const tabs = [
  "Vue operationnelle",
  "Dossiers",
  "Activite",
  "Workflows",
  "Audit",
  "Relations",
];

export function ERPWorkspaceTabs() {
  return (
    <div className="flex flex-wrap gap-2 rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          type="button"
          className={[
            "rounded-2xl px-5 py-3 text-sm font-bold transition",
            index === 0
              ? "bg-blue-600 text-white shadow-sm"
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

WriteFile "src\components\erp\workspace\ERPWorkspaceLayout.tsx" @'
import type { ReactNode } from "react";
import type { ERPModule } from "@/runtime/modules";
import { ERPWorkspaceActivity } from "./ERPWorkspaceActivity";
import { ERPWorkspaceCommandCenter } from "./ERPWorkspaceCommandCenter";
import { ERPWorkspaceContextPanel } from "./ERPWorkspaceContextPanel";
import { ERPWorkspaceQuickActions } from "./ERPWorkspaceQuickActions";
import { ERPWorkspaceTabs } from "./ERPWorkspaceTabs";

interface ERPWorkspaceLayoutProps {
  module: ERPModule;
  children: ReactNode;
}

export function ERPWorkspaceLayout({
  module,
  children,
}: ERPWorkspaceLayoutProps) {
  return (
    <div className="space-y-8">
      <ERPWorkspaceQuickActions module={module} />
      <ERPWorkspaceTabs />

      <section className="grid gap-8 2xl:grid-cols-[1fr_380px]">
        <div>{children}</div>

        <aside className="space-y-6">
          <ERPWorkspaceContextPanel module={module} />
          <ERPWorkspaceCommandCenter module={module} />
          <ERPWorkspaceActivity module={module} />
        </aside>
      </section>
    </div>
  );
}
'@

WriteFile "src\components\erp\workspace\index.ts" @'
export { ERPWorkspaceLayout } from "./ERPWorkspaceLayout";
export { ERPWorkspaceActivity } from "./ERPWorkspaceActivity";
export { ERPWorkspaceCommandCenter } from "./ERPWorkspaceCommandCenter";
export { ERPWorkspaceContextPanel } from "./ERPWorkspaceContextPanel";
export { ERPWorkspaceQuickActions } from "./ERPWorkspaceQuickActions";
export { ERPWorkspaceTabs } from "./ERPWorkspaceTabs";
'@

WriteFile "src\components\erp\templates\ERPModuleListTemplate.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPEnterpriseDataTable } from "@/components/erp/datatable/ERPEnterpriseDataTable";
import { ERPWorkspaceLayout } from "@/components/erp/workspace";
import { ERPModuleHeader } from "./ERPModuleHeader";
import { ERPModuleKpiGrid } from "./ERPModuleKpiGrid";

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

      <ERPWorkspaceLayout module={module}>
        <ERPEnterpriseDataTable module={module} data={data} />
      </ERPWorkspaceLayout>
    </div>
  );
}
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== ERP ENTERPRISE WORKSPACE SYSTEM TERMINE ===" -ForegroundColor Green