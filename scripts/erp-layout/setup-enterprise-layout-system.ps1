$ErrorActionPreference = "Stop"

Write-Host "=== TERRAGEST ERP - ENTERPRISE LAYOUT SYSTEM ===" -ForegroundColor Cyan

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

New-Item -ItemType Directory -Force "src\components\erp\layout" | Out-Null

Write-ERPFile "src\components\erp\layout\ERPAppShell.tsx" @'
import type { ReactNode } from "react";
import { ERPBadge } from "@/components/erp/ui";
import { coreERPModules } from "@/runtime/modules";

interface ERPAppShellProps {
  children: ReactNode;
  activeModule?: string;
  title?: string;
  subtitle?: string;
}

export function ERPAppShell({
  children,
  activeModule,
  title = "Terragest ERP",
  subtitle = "Enterprise Runtime Platform",
}: ERPAppShellProps) {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_10%_8%,rgba(37,99,235,0.32),transparent_30%),radial-gradient(circle_at_92%_16%,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_55%_100%,rgba(124,58,237,0.18),transparent_35%),linear-gradient(180deg,#020617,#0f172a_48%,#020617)]" />

      <div className="relative z-10 grid min-h-screen grid-cols-1 xl:grid-cols-[290px_1fr]">
        <aside className="hidden border-r border-white/10 bg-white/[0.045] p-6 backdrop-blur-2xl xl:block">
          <div className="mb-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black shadow-lg shadow-blue-950/60">
              TG
            </div>

            <h1 className="mt-4 text-xl font-black tracking-tight">
              {title}
            </h1>

            <p className="mt-1 text-xs text-slate-400">
              {subtitle}
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <ERPBadge tone="success">ERP Core</ERPBadge>
            <ERPBadge tone="info">Runtime</ERPBadge>
          </div>

          <nav className="space-y-2">
            {coreERPModules.map((item) => {
              const active = activeModule === item.metadata.key;

              return (
                <a
                  key={item.metadata.key}
                  href={`/runtime/${item.metadata.key}`}
                  className={`block rounded-2xl px-4 py-3 text-sm transition ${
                    active
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-950/50"
                      : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="font-semibold">{item.metadata.label}</div>
                  <div className="mt-1 text-xs opacity-70">
                    {item.metadata.category ?? "Module ERP"}
                  </div>
                </a>
              );
            })}
          </nav>

          <div className="mt-10 rounded-3xl border border-emerald-400/20 bg-emerald-950/20 p-5">
            <p className="text-sm font-semibold text-emerald-300">
              Plateforme active
            </p>
            <p className="mt-2 text-xs leading-5 text-emerald-100/70">
              UI System, Module Registry, Renderer et Runtime synchronisés.
            </p>
          </div>
        </aside>

        <main className="p-5 md:p-8 xl:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\layout\ERPTopBar.tsx" @'
import type { ReactNode } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";

interface ERPTopBarProps {
  eyebrow?: string;
  title?: string;
  actions?: ReactNode;
}

export function ERPTopBar({
  eyebrow = "Terragest_V2",
  title = "Pilotage ERP",
  actions,
}: ERPTopBarProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-white/[0.055] p-5 shadow-2xl shadow-black/20 backdrop-blur-2xl md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-blue-300">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-2xl font-black tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ERPBadge tone="success">Build OK</ERPBadge>
        <ERPBadge tone="info">Runtime actif</ERPBadge>
        {actions ?? (
          <ERPButton variant="secondary" type="button">
            Audit
          </ERPButton>
        )}
      </div>
    </header>
  );
}
'@

Write-ERPFile "src\components\erp\layout\ERPPageHero.tsx" @'
import type { ReactNode } from "react";
import { ERPBadge, ERPButton } from "@/components/erp/ui";

interface ERPPageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  category?: string;
  actions?: ReactNode;
  side?: ReactNode;
}

export function ERPPageHero({
  eyebrow = "Module métier",
  title,
  description,
  category,
  actions,
  side,
}: ERPPageHeroProps) {
  return (
    <section className="mb-8 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.065] shadow-2xl shadow-black/30 backdrop-blur-2xl">
      <div className="grid gap-8 p-8 lg:grid-cols-[1.5fr_0.8fr]">
        <div>
          <div className="flex flex-wrap gap-2">
            <ERPBadge tone="info">{eyebrow}</ERPBadge>
            <ERPBadge tone="success">Opérationnel</ERPBadge>
            {category && <ERPBadge>{category}</ERPBadge>}
          </div>

          <h1 className="mt-6 text-5xl font-black tracking-tight text-white md:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              {description}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {actions ?? (
              <>
                <ERPButton type="button">Créer</ERPButton>
                <ERPButton variant="secondary" type="button">
                  Exporter
                </ERPButton>
                <ERPButton variant="ghost" type="button">
                  Inspecter
                </ERPButton>
              </>
            )}
          </div>
        </div>

        {side}
      </div>
    </section>
  );
}
'@

Write-ERPFile "src\components\erp\layout\ERPRuntimeHealthPanel.tsx" @'
export function ERPRuntimeHealthPanel() {
  const items = [
    ["Schema", "100%", "bg-emerald-400", "text-emerald-300"],
    ["Renderer", "96%", "bg-blue-400", "text-blue-300"],
    ["UI System", "98%", "bg-violet-400", "text-violet-300"],
  ];

  return (
    <div className="rounded-[2rem] border border-blue-400/20 bg-blue-950/30 p-6">
      <p className="text-sm font-semibold text-blue-200">
        Runtime Health
      </p>

      <div className="mt-6 space-y-5">
        {items.map(([label, value, barClass, textClass]) => (
          <div key={label}>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-slate-400">{label}</span>
              <span className={textClass}>{value}</span>
            </div>

            <div className="h-2 rounded-full bg-slate-800">
              <div
                className={`h-2 rounded-full ${barClass}`}
                style={{ width: value }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\layout\ERPKpiGrid.tsx" @'
interface ERPKpiGridProps {
  items: {
    label: string;
    value: string;
    tone?: "default" | "success" | "info";
  }[];
}

export function ERPKpiGrid({ items }: ERPKpiGridProps) {
  return (
    <section className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const tone =
          item.tone === "success"
            ? "border-emerald-400/20 bg-emerald-950/20 text-emerald-300"
            : item.tone === "info"
              ? "border-blue-400/20 bg-blue-950/20 text-blue-300"
              : "border-white/10 bg-white/[0.06] text-white";

        return (
          <div
            key={item.label}
            className={`rounded-[2rem] border p-6 shadow-xl shadow-black/20 backdrop-blur-2xl ${tone}`}
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {item.label}
            </p>
            <p className="mt-3 text-3xl font-black">
              {item.value}
            </p>
          </div>
        );
      })}
    </section>
  );
}
'@

Write-ERPFile "src\components\erp\layout\ERPContentGrid.tsx" @'
import type { ReactNode } from "react";

interface ERPContentGridProps {
  main: ReactNode;
  side?: ReactNode;
}

export function ERPContentGrid({ main, side }: ERPContentGridProps) {
  if (!side) {
    return <section>{main}</section>;
  }

  return (
    <section className="grid gap-8 2xl:grid-cols-[1.7fr_0.75fr]">
      <div>{main}</div>
      <aside className="space-y-6">{side}</aside>
    </section>
  );
}
'@

Write-ERPFile "src\components\erp\layout\ERPCommandPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";

interface ERPCommandPanelProps {
  features?: string[];
}

export function ERPCommandPanel({ features = [] }: ERPCommandPanelProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
        <h3 className="text-lg font-bold text-white">Capacités ERP</h3>
        <p className="mt-2 text-sm text-slate-400">
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

      <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/20 backdrop-blur-2xl">
        <h3 className="text-lg font-bold text-white">Command Center</h3>
        <p className="mt-2 text-sm text-slate-400">
          Actions prêtes pour workflows, règles, audit et supervision.
        </p>

        <div className="mt-5 space-y-3">
          {[
            "Lancer workflow métier",
            "Ouvrir journal d’audit",
            "Analyser relations",
            "Contrôler permissions",
          ].map((action) => (
            <button
              key={action}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-blue-400/50 hover:bg-blue-950/30"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\layout\ERPCockpitLayout.tsx" @'
import type { ReactNode } from "react";
import { ERPAppShell } from "./ERPAppShell";
import { ERPTopBar } from "./ERPTopBar";
import { ERPPageHero } from "./ERPPageHero";
import { ERPKpiGrid } from "./ERPKpiGrid";
import { ERPContentGrid } from "./ERPContentGrid";

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

      {kpis.length > 0 && <ERPKpiGrid items={kpis} />}

      <ERPContentGrid main={main} side={side} />
    </ERPAppShell>
  );
}
'@

Write-ERPFile "src\components\erp\layout\index.ts" @'
export { ERPAppShell } from "./ERPAppShell";
export { ERPTopBar } from "./ERPTopBar";
export { ERPPageHero } from "./ERPPageHero";
export { ERPRuntimeHealthPanel } from "./ERPRuntimeHealthPanel";
export { ERPKpiGrid } from "./ERPKpiGrid";
export { ERPContentGrid } from "./ERPContentGrid";
export { ERPCommandPanel } from "./ERPCommandPanel";
export { ERPCockpitLayout } from "./ERPCockpitLayout";
'@

Write-ERPFile "src\components\erp\runtime\ERPRuntimePage.tsx" @'
import { ERPEmptyState } from "@/components/erp/ui";
import {
  ERPCockpitLayout,
  ERPCommandPanel,
  ERPRuntimeHealthPanel,
} from "@/components/erp/layout";
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
      <div className="min-h-screen bg-[#020617] p-10">
        <ERPEmptyState
          title="Module introuvable"
          description="Le Runtime ERP ne trouve pas la définition du module demandé."
        />
      </div>
    );
  }

  if (type === "create" || type === "edit") {
    return <ERPRuntimeForm module={module} />;
  }

  if (type === "details") {
    return <ERPRuntimeDetails module={module} data={record} />;
  }

  const enabledFeatures = Object.entries(module.metadata.features ?? {})
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature);

  return (
    <ERPCockpitLayout
      activeModule={module.metadata.key}
      topbarTitle="Pilotage ERP centralisé"
      heroTitle={module.metadata.label}
      heroDescription={
        module.metadata.description ??
        "Page générée automatiquement par le moteur ERP central Terragest_V2."
      }
      heroCategory={module.metadata.category}
      heroSide={<ERPRuntimeHealthPanel />}
      kpis={[
        {
          label: "Collection",
          value: module.schema.collection,
        },
        {
          label: "Champs métier",
          value: String(module.schema.fields.length),
          tone: "info",
        },
        {
          label: "Features",
          value: String(enabledFeatures.length),
        },
        {
          label: "Statut",
          value: "Opérationnel",
          tone: "success",
        },
      ]}
      main={<ERPRuntimeTable module={module} data={data} />}
      side={<ERPCommandPanel features={enabledFeatures} />}
    />
  );
}
'@

pnpm build

Write-Host ""
Write-Host "=== ENTERPRISE LAYOUT SYSTEM OK ===" -ForegroundColor Green