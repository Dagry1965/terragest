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

WriteFile "src\components\erp\shell\ErpTopbar.tsx" @'
export function ErpTopbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      <div>
        <h1 className="text-xl font-black tracking-tight text-slate-950">
          Terragest ERP
        </h1>
        <p className="text-sm text-slate-500">
          Cockpit central de gestion des operations, ressources et activites.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
          Systeme operationnel
        </div>

        <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
          ERP Enterprise
        </div>
      </div>
    </header>
  );
}
'@

WriteFile "src\components\erp\shell\ErpSidebar.tsx" @'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildERPNavigation } from "@/core/navigation/navigation-builder";

const groups = ["Pilotage", "Metier", "Operations", "Finance", "Systeme"];

export function ErpSidebar() {
  const pathname = usePathname();
  const navigation = buildERPNavigation();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white lg:block">
      <div className="flex h-20 items-center border-b border-slate-800 px-6">
        <div>
          <div className="text-2xl font-black tracking-tight">
            Terragest
          </div>
          <div className="text-xs font-bold uppercase tracking-wide text-blue-300">
            ERP Enterprise
          </div>
        </div>
      </div>

      <nav className="space-y-8 px-4 py-6">
        {groups.map((group) => {
          const items = navigation.filter((item) => item.group === group);

          if (items.length === 0) {
            return null;
          }

          return (
            <div key={group}>
              <div className="mb-2 px-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                {group}
              </div>

              <div className="space-y-1">
                {items.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "flex rounded-2xl px-4 py-3 text-sm font-bold transition",
                        active
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
'@

WriteFile "src\components\erp\runtime\ERPRuntimePage.tsx" @'
import { ERPBadge, ERPButton, ERPCard, ERPEmptyState } from "@/components/erp/ui";
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
        description="La definition du module est absente."
      />
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
    <div className="space-y-8">
      <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="flex flex-wrap gap-2">
              <ERPBadge tone="info">Module ERP</ERPBadge>
              <ERPBadge tone="success">Operationnel</ERPBadge>
              {module.metadata.category && (
                <ERPBadge>{module.metadata.category}</ERPBadge>
              )}
            </div>

            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-950">
              {module.metadata.label}
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-500">
              {module.metadata.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ERPButton type="button">Nouveau</ERPButton>
            <ERPButton variant="secondary" type="button">Exporter</ERPButton>
            <ERPButton variant="ghost" type="button">Importer</ERPButton>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <ERPCard title="Collection">
          <p className="text-2xl font-black text-slate-100">
            {module.schema.collection}
          </p>
        </ERPCard>

        <ERPCard title="Champs">
          <p className="text-2xl font-black text-slate-100">
            {module.schema.fields.length}
          </p>
        </ERPCard>

        <ERPCard title="Fonctions">
          <p className="text-2xl font-black text-slate-100">
            {enabledFeatures.length}
          </p>
        </ERPCard>

        <ERPCard title="Statut" premium>
          <p className="text-2xl font-black text-emerald-300">
            Actif
          </p>
        </ERPCard>
      </section>

      <div className="flex flex-wrap gap-2 rounded-[2rem] border border-slate-200 bg-white p-3 shadow-xl">
        {["Vue generale", "Liste", "Activite", "Workflows", "Audit"].map(
          (tab, index) => (
            <button
              key={tab}
              type="button"
              className={[
                "rounded-2xl px-5 py-3 text-sm font-bold transition",
                index === 0
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              ].join(" ")}
            >
              {tab}
            </button>
          )
        )}
      </div>

      <section className="grid gap-8 xl:grid-cols-[1fr_340px]">
        <ERPRuntimeTable module={module} data={data} />

        <aside className="space-y-5">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-lg font-black text-slate-950">
              Actions metier
            </h3>

            <div className="mt-5 grid gap-3">
              <ERPButton type="button">Lancer workflow</ERPButton>
              <ERPButton variant="secondary" type="button">Voir audit</ERPButton>
              <ERPButton variant="ghost" type="button">Relations</ERPButton>
              <ERPButton variant="ghost" type="button">Permissions</ERPButton>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl">
            <h3 className="text-lg font-black text-slate-950">
              Capacites
            </h3>

            <div className="mt-4 flex flex-wrap gap-2">
              {enabledFeatures.map((feature) => (
                <ERPBadge key={feature} tone="info">
                  {feature}
                </ERPBadge>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
'@

Set-Location $projectRoot
pnpm build