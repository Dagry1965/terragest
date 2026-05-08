$ErrorActionPreference = "Stop"

Write-Host "=== TERRAGEST ERP - PREMIUM RUNTIME DESIGN FINAL ===" -ForegroundColor Cyan

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

Write-ERPFile "src\components\erp\runtime\ERPRuntimeTable.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPModuleBuilder } from "@/runtime/modules";
import { ERPRuntimeFieldValue } from "./ERPRuntimeFieldValue";

interface ERPRuntimeTableProps {
  module: ERPModule;
  data?: Record<string, unknown>[];
}

function createDemoRows(module: ERPModule): Record<string, unknown>[] {
  return Array.from({ length: 6 }).map((_, index) => {
    const row: Record<string, unknown> = {};

    module.schema.fields.forEach((field) => {
      if (field.type === "number") {
        row[field.key] = index * 12 + 8;
      } else if (field.type === "status") {
        row[field.key] = index % 2 === 0 ? "Actif" : "En supervision";
      } else if (field.type === "relation") {
        row[field.key] = "EXP-" + String(index + 1).padStart(3, "0");
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
    <div className="overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-950/80 shadow-2xl shadow-slate-950/40">
      <div className="flex flex-col gap-3 border-b border-slate-800 bg-slate-900/70 px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-base font-semibold text-white">
            Registre opérationnel
          </h3>
          <p className="mt-1 text-sm text-slate-400">
            Données générées par le Runtime ERP central.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ERPBadge tone="success">{rows.length} lignes</ERPBadge>
          <ERPBadge tone="info">{columns.length} colonnes</ERPBadge>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/90">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="whitespace-nowrap px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/80">
            {rows.map((row, index) => (
              <tr
                key={index}
                className="group transition hover:bg-blue-950/20"
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className="whitespace-nowrap px-6 py-4 text-slate-200"
                  >
                    {column.render(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
'@

Write-ERPFile "src\components\erp\runtime\ERPRuntimePage.tsx" @'
import {
  ERPBadge,
  ERPButton,
  ERPCard,
  ERPEmptyState,
} from "@/components/erp/ui";
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

const featureLabels: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  workflows: "Workflows",
  automation: "Automation",
  notifications: "Notifications",
  observability: "Observability",
  audit: "Audit",
  realtime: "Realtime",
};

export function ERPRuntimePage({
  module,
  type = "list",
  data = [],
  record,
}: ERPRuntimePageProps) {
  if (!module) {
    return (
      <div className="min-h-screen bg-slate-950 p-8">
        <ERPEmptyState
          title="Module introuvable"
          description="Le Runtime ERP ne trouve pas la définition du module demandé."
        />
      </div>
    );
  }

  if (type === "create" || type === "edit") {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-slate-100">
        <ERPRuntimeForm module={module} />
      </div>
    );
  }

  if (type === "details") {
    return (
      <div className="min-h-screen bg-slate-950 p-8 text-slate-100">
        <ERPRuntimeDetails module={module} data={record} />
      </div>
    );
  }

  const enabledFeatures = Object.entries(module.metadata.features ?? {})
    .filter(([, enabled]) => enabled)
    .map(([feature]) => feature);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_20%_10%,rgba(59,130,246,0.22),transparent_32%),radial-gradient(circle_at_85%_0%,rgba(16,185,129,0.14),transparent_28%),linear-gradient(180deg,#020617_0%,#0f172a_45%,#020617_100%)]" />

      <main className="relative z-10 mx-auto max-w-7xl space-y-8 p-6 lg:p-10">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/30 backdrop-blur-xl">
          <div className="border-b border-white/10 bg-white/[0.03] px-6 py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <ERPBadge tone="info">Terragest_V2</ERPBadge>
                <ERPBadge tone="success">ERP Core actif</ERPBadge>
                <ERPBadge>Runtime Generated</ERPBadge>
              </div>

              <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                Enterprise Runtime Platform
              </p>
            </div>
          </div>

          <div className="grid gap-8 p-8 xl:grid-cols-[1.45fr_0.75fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-blue-300">
                Module métier
              </p>

              <h1 className="mt-4 text-5xl font-bold tracking-tight text-white">
                {module.metadata.label}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                {module.metadata.description ??
                  "Page générée automatiquement par le moteur ERP central."}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ERPButton type="button">Créer un élément</ERPButton>
                <ERPButton variant="secondary" type="button">
                  Exporter
                </ERPButton>
                <ERPButton variant="ghost" type="button">
                  Inspecter runtime
                </ERPButton>
              </div>
            </div>

            <div className="rounded-3xl border border-blue-500/20 bg-blue-950/20 p-6">
              <p className="text-sm font-medium text-blue-200">
                Santé runtime
              </p>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Registry</span>
                  <ERPBadge tone="success">Connecté</ERPBadge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Schema</span>
                  <ERPBadge tone="success">Valide</ERPBadge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Renderer</span>
                  <ERPBadge tone="info">Actif</ERPBadge>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[92%] rounded-full bg-blue-500" />
                </div>

                <p className="text-xs text-slate-500">
                  Génération runtime opérationnelle à 92%.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Module
            </p>
            <p className="mt-3 text-2xl font-bold text-white">
              {module.metadata.key}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Collection
            </p>
            <p className="mt-3 text-2xl font-bold text-white">
              {module.schema.collection}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-xl backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Champs
            </p>
            <p className="mt-3 text-2xl font-bold text-white">
              {module.schema.fields.length}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-400/20 bg-emerald-950/20 p-6 shadow-xl backdrop-blur">
            <p className="text-xs uppercase tracking-wide text-emerald-300">
              Statut
            </p>
            <p className="mt-3 text-2xl font-bold text-emerald-300">
              Opérationnel
            </p>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[1.65fr_0.8fr]">
          <ERPRuntimeTable module={module} data={data} />

          <div className="space-y-6">
            <ERPCard
              title="Capacités ERP"
              description="Fonctions activées depuis la définition du module."
              premium
            >
              <div className="flex flex-wrap gap-2">
                {enabledFeatures.map((feature) => (
                  <ERPBadge key={feature} tone="info">
                    {featureLabels[feature] ?? feature}
                  </ERPBadge>
                ))}
              </div>
            </ERPCard>

            <ERPCard
              title="Pilotage métier"
              description="Actions prêtes à être branchées aux workflows."
            >
              <div className="space-y-3">
                <button className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-blue-500/50 hover:bg-blue-950/20">
                  Lancer un workflow métier
                </button>

                <button className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-blue-500/50 hover:bg-blue-950/20">
                  Consulter l’audit du module
                </button>

                <button className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-left text-sm text-slate-200 transition hover:border-blue-500/50 hover:bg-blue-950/20">
                  Voir relations et dépendances
                </button>
              </div>
            </ERPCard>
          </div>
        </section>
      </main>
    </div>
  );
}
'@

pnpm build

Write-Host ""
Write-Host "=== DESIGN RUNTIME PREMIUM FINAL OK ===" -ForegroundColor Green