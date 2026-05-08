$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function Write-Utf8File {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Utf8File "src\components\erp\layout\ERPActionBar.tsx" @'
import { ERPButton } from "@/components/erp/ui";

export function ERPActionBar() {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-xl md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-3">
        <ERPButton type="button">+ Nouveau</ERPButton>
        <ERPButton variant="secondary" type="button">Exporter</ERPButton>
        <ERPButton variant="ghost" type="button">Importer</ERPButton>
        <ERPButton variant="ghost" type="button">Filtrer</ERPButton>
      </div>

      <div className="flex flex-wrap gap-3">
        <ERPButton variant="ghost" type="button">Workflow</ERPButton>
        <ERPButton variant="ghost" type="button">Audit</ERPButton>
        <ERPButton variant="danger" type="button">Alerte</ERPButton>
      </div>
    </div>
  );
}
'@

Write-Utf8File "src\components\erp\layout\ERPTabNavigation.tsx" @'
const tabs = [
  "Vue générale",
  "Données",
  "Workflows",
  "Audit",
  "Relations",
];

export function ERPTabNavigation() {
  return (
    <div className="mb-6 overflow-x-auto rounded-3xl border border-slate-200 bg-white p-2 shadow-xl">
      <div className="flex min-w-max gap-2">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`rounded-2xl px-5 py-3 text-sm font-bold transition ${
              index === 0
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
'@

Write-Utf8File "src\components\erp\layout\ERPQuickFilters.tsx" @'
const filters = [
  "Tous",
  "Actifs",
  "En attente",
  "Critiques",
  "Archivés",
];

export function ERPQuickFilters() {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filters.map((filter, index) => (
        <button
          key={filter}
          type="button"
          className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
            index === 0
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-700"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
'@

Write-Utf8File "src\components\erp\layout\ERPCommandPanel.tsx" @'
import { ERPBadge, ERPButton } from "@/components/erp/ui";

interface ERPCommandPanelProps {
  features?: string[];
}

export function ERPCommandPanel({ features = [] }: ERPCommandPanelProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
        <h3 className="text-lg font-black text-slate-950">Capacités ERP</h3>
        <p className="mt-2 text-sm text-slate-500">
          Fonctions activées depuis la définition runtime du module.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {features.length === 0 ? (
            <span className="text-sm text-slate-400">Aucune capacité déclarée.</span>
          ) : (
            features.map((feature) => (
              <ERPBadge key={feature} tone="info">
                {feature}
              </ERPBadge>
            ))
          )}
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
        <h3 className="text-lg font-black text-slate-950">Command Center</h3>
        <p className="mt-2 text-sm text-slate-500">
          Actions globales connectables aux workflows, règles et audit.
        </p>

        <div className="mt-5 grid gap-3">
          <ERPButton type="button">Lancer workflow</ERPButton>
          <ERPButton variant="secondary" type="button">Journal audit</ERPButton>
          <ERPButton variant="ghost" type="button">Relations</ERPButton>
          <ERPButton variant="ghost" type="button">Permissions</ERPButton>
        </div>
      </div>
    </div>
  );
}
'@

Write-Utf8File "src\components\erp\layout\ERPCockpitLayout.tsx" @'
import type { ReactNode } from "react";
import { ERPAppShell } from "./ERPAppShell";
import { ERPTopBar } from "./ERPTopBar";
import { ERPPageHero } from "./ERPPageHero";
import { ERPKpiGrid } from "./ERPKpiGrid";
import { ERPContentGrid } from "./ERPContentGrid";
import { ERPActionBar } from "./ERPActionBar";
import { ERPTabNavigation } from "./ERPTabNavigation";
import { ERPQuickFilters } from "./ERPQuickFilters";

interface ERPCockpitLayoutProps {
  activeModule?: string;
  topbarTitle?: string;
  heroTitle: string;
  heroDescription?: string;
  heroCategory?: string;
  heroSide?: ReactNode;
  kpis?: {
    label: string;
    value: string;
    tone?: "default" | "success" | "info";
  }[];
  main: ReactNode;
  side?: ReactNode;
}

export function ERPCockpitLayout({
  activeModule,
  topbarTitle = "Pilotage ERP",
  heroTitle,
  heroDescription,
  heroCategory,
  heroSide,
  kpis = [],
  main,
  side,
}: ERPCockpitLayoutProps) {
  return (
    <ERPAppShell activeModule={activeModule}>
      <ERPTopBar title={topbarTitle} />

      <ERPPageHero
        title={heroTitle}
        description={heroDescription}
        category={heroCategory}
        side={heroSide}
      />

      <ERPActionBar />
      <ERPTabNavigation />

      {kpis.length > 0 && <ERPKpiGrid items={kpis} />}

      <ERPQuickFilters />

      <ERPContentGrid main={main} side={side} />
    </ERPAppShell>
  );
}
'@

Write-Utf8File "src\components\erp\layout\index.ts" @'
export { ERPAppShell } from "./ERPAppShell";
export { ERPTopBar } from "./ERPTopBar";
export { ERPPageHero } from "./ERPPageHero";
export { ERPRuntimeHealthPanel } from "./ERPRuntimeHealthPanel";
export { ERPKpiGrid } from "./ERPKpiGrid";
export { ERPContentGrid } from "./ERPContentGrid";
export { ERPCommandPanel } from "./ERPCommandPanel";
export { ERPCockpitLayout } from "./ERPCockpitLayout";
export { ERPActionBar } from "./ERPActionBar";
export { ERPTabNavigation } from "./ERPTabNavigation";
export { ERPQuickFilters } from "./ERPQuickFilters";
'@

Set-Location $projectRoot
pnpm build