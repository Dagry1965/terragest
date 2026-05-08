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

WriteFile "src\components\erp\layout\ERPRuntimeHealthPanel.tsx" @'
export function ERPRuntimeHealthPanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-bold text-slate-950">
        Synthese operationnelle
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        Indicateurs de suivi metier, activite recente et priorites du module.
      </p>

      <div className="mt-6 space-y-4">
        {[
          ["Disponibilite", "94%"],
          ["Qualite des donnees", "98%"],
          ["Actions en attente", "6"],
        ].map(([label, value]) => (
          <div key={label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-500">{label}</span>
              <span className="font-bold text-slate-950">{value}</span>
            </div>

            <div className="h-2 rounded-full bg-slate-100">
              <div className="h-2 w-[88%] rounded-full bg-blue-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
'@

WriteFile "src\components\erp\layout\ERPTopBar.tsx" @'
import type { ReactNode } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";

interface ERPTopBarProps {
  eyebrow?: string;
  title?: string;
  actions?: ReactNode;
}

export function ERPTopBar({
  eyebrow = "Terragest ERP",
  title = "Pilotage operationnel",
  actions,
}: ERPTopBarProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-600">
          {eyebrow}
        </p>

        <h2 className="mt-2 text-2xl font-black text-slate-950">
          {title}
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ERPBadge tone="success">Systeme actif</ERPBadge>
        <ERPBadge tone="info">Donnees synchronisees</ERPBadge>

        {actions ?? (
          <ERPButton variant="ghost" type="button">
            Centre d'aide
          </ERPButton>
        )}
      </div>
    </header>
  );
}
'@

WriteFile "src\components\erp\layout\ERPCockpitLayout.tsx" @'
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
  topbarTitle = "Pilotage operationnel",
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

WriteFile "src\components\erp\generic\GenericListPage.tsx" @'
import { ERPRuntimePage } from "@/components/erp/runtime";
import type { ERPModule } from "@/runtime/modules";

interface GenericListPageProps {
  module?: ERPModule;
  data?: Record<string, unknown>[];
}

export function GenericListPage({
  module,
  data = [],
}: GenericListPageProps) {
  return <ERPRuntimePage module={module} data={data} type="list" />;
}
'@

WriteFile "src\components\erp\generic\GenericCreatePage.tsx" @'
import { ERPRuntimePage } from "@/components/erp/runtime";
import type { ERPModule } from "@/runtime/modules";

interface GenericCreatePageProps {
  module?: ERPModule;
}

export function GenericCreatePage({
  module,
}: GenericCreatePageProps) {
  return <ERPRuntimePage module={module} type="create" />;
}
'@

WriteFile "src\components\erp\generic\GenericEditPage.tsx" @'
import { ERPRuntimePage } from "@/components/erp/runtime";
import type { ERPModule } from "@/runtime/modules";

interface GenericEditPageProps {
  module?: ERPModule;
  record?: Record<string, unknown>;
}

export function GenericEditPage({
  module,
  record,
}: GenericEditPageProps) {
  return <ERPRuntimePage module={module} type="edit" record={record} />;
}
'@

WriteFile "src\components\erp\generic\GenericDetailPage.tsx" @'
import { ERPRuntimePage } from "@/components/erp/runtime";
import type { ERPModule } from "@/runtime/modules";

interface GenericDetailPageProps {
  module?: ERPModule;
  record?: Record<string, unknown>;
}

export function GenericDetailPage({
  module,
  record,
}: GenericDetailPageProps) {
  return <ERPRuntimePage module={module} type="details" record={record} />;
}
'@

WriteFile "src\features\platform\components\layout\EnterpriseTopbar.tsx" @'
export function EnterpriseTopbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-xl font-black text-slate-950">
          Terragest ERP
        </h1>
        <p className="text-sm text-slate-500">
          Pilotage central des operations et activites metier.
        </p>
      </div>

      <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
        Systeme actif
      </div>
    </header>
  );
}
'@

WriteFile "src\core\layout\Topbar.tsx" @'
export function Topbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="text-xl font-black text-slate-950">
          Terragest ERP
        </h1>
        <p className="text-sm text-slate-500">
          Gestion centralisee des modules, operations et indicateurs.
        </p>
      </div>

      <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
        Donnees synchronisees
      </div>
    </header>
  );
}
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== NETTOYAGE UI TECHNIQUE VISIBLE TERMINE ===" -ForegroundColor Green