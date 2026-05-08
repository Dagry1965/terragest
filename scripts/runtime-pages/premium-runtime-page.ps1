$ErrorActionPreference = "Stop"

Write-Host "=== TERRAGEST ERP - PREMIUM RUNTIME PAGE ===" -ForegroundColor Cyan

$path = "src\components\erp\runtime\ERPRuntimePage.tsx"

$content = @'
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
        description="Le Runtime ERP ne trouve pas la définition du module demandé."
      />
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
    <div className="min-h-screen space-y-8 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.18),_transparent_35%),linear-gradient(180deg,#020617,#0f172a)] p-8 text-slate-100">
      <section className="overflow-hidden rounded-3xl border border-blue-500/20 bg-slate-950/70 p-8 shadow-2xl shadow-blue-950/20 backdrop-blur">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <ERPBadge tone="info">ERP Runtime</ERPBadge>
              <ERPBadge tone="success">Module actif</ERPBadge>
              {module.metadata.category && (
                <ERPBadge>{module.metadata.category}</ERPBadge>
              )}
            </div>

            <p className="text-sm uppercase tracking-[0.3em] text-blue-300">
              Terragest_V2 / Runtime Generated Page
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
              {module.metadata.label}
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              {module.metadata.description ??
                "Page générée automatiquement par le moteur ERP central."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <ERPButton variant="secondary" type="button">
              Exporter
            </ERPButton>

            <ERPButton type="button">
              Nouveau
            </ERPButton>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Module
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {module.metadata.key}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Collection
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {module.schema.collection}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Champs métier
            </p>
            <p className="mt-2 text-lg font-semibold text-white">
              {module.schema.fields.length}
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-800/60 bg-emerald-950/20 p-5">
            <p className="text-xs uppercase tracking-wide text-emerald-400">
              Runtime status
            </p>
            <p className="mt-2 text-lg font-semibold text-emerald-300">
              Opérationnel
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <ERPCard
          title="Données opérationnelles"
          description="Table générée automatiquement à partir du schéma du module."
          premium
        >
          <ERPRuntimeTable module={module} data={data} />
        </ERPCard>

        <div className="space-y-6">
          <ERPCard
            title="Capacités runtime"
            description="Fonctionnalités activées pour ce module."
          >
            <div className="flex flex-wrap gap-2">
              {enabledFeatures.length === 0 ? (
                <span className="text-sm text-slate-400">
                  Aucune capacité spécifique activée.
                </span>
              ) : (
                enabledFeatures.map((feature) => (
                  <ERPBadge key={feature} tone="info">
                    {feature}
                  </ERPBadge>
                ))
              )}
            </div>
          </ERPCard>

          <ERPCard
            title="Actions ERP"
            description="Actions connectables aux workflows, règles et événements."
          >
            <div className="grid gap-3">
              <ERPButton variant="secondary" type="button">
                Lancer workflow
              </ERPButton>

              <ERPButton variant="secondary" type="button">
                Voir audit
              </ERPButton>

              <ERPButton variant="ghost" type="button">
                Inspecter runtime
              </ERPButton>
            </div>
          </ERPCard>
        </div>
      </section>
    </div>
  );
}
'@

Set-Content -LiteralPath $path -Value $content

Write-Host "ERPRuntimePage premium mise à jour." -ForegroundColor Green

pnpm build