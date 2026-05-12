$ErrorActionPreference = "Stop"

$Root = "C:\Users\Admin\terragest"

function Ensure-Dir($Path) {
  if (!(Test-Path $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-File($Path, $Content) {
  $Dir = Split-Path $Path -Parent
  Ensure-Dir $Dir
  [System.IO.File]::WriteAllText($Path, $Content, [System.Text.UTF8Encoding]::new($false))
  Write-Host "WRITTEN $Path"
}

function Backup-File($Path) {
  if (Test-Path $Path) {
    $Backup = "$Path.bak.dashboard-split"
    Copy-Item $Path $Backup -Force
    Write-Host "BACKUP $Backup"
  }
}

Write-Host "=== TERRAGEST DASHBOARD SPLIT ==="

$BusinessDir = "$Root\src\components\erp\dashboard\business"
$TechnicalDir = "$Root\src\components\erp\dashboard\technical"

Ensure-Dir $BusinessDir
Ensure-Dir $TechnicalDir
Ensure-Dir "$Root\src\app\(private)\dashboard"
Ensure-Dir "$Root\src\app\(private)\supervision"

Backup-File "$Root\src\app\(private)\dashboard\page.tsx"
Backup-File "$Root\src\app\(private)\supervision\page.tsx"

$BusinessDashboard = @'
"use client";

import Link from "next/link";

const kpis = [
  { label: "Terrains", value: "0", href: "/terrains" },
  { label: "Exploitations", value: "0", href: "/exploitations" },
  { label: "Contrats actifs", value: "0", href: "/contrats" },
  { label: "Campagnes en cours", value: "0", href: "/campagnes" },
  { label: "Stocks bas", value: "0", href: "/stocks" },
  { label: "Actifs en maintenance", value: "0", href: "/actifs" },
];

const alerts = [
  "Contrats proches de leur date de fin",
  "Campagnes sans mouvements récents",
  "Stocks sous le seuil minimum",
  "Actifs indisponibles ou en maintenance",
];

export function ERPBusinessDashboard() {
  return (
    <main className="space-y-8 p-8">
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <p className="text-sm font-medium text-emerald-700">
          Tableau de bord métier
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Pilotage opérationnel TerraGest
        </h1>

        <p className="mt-3 max-w-3xl text-slate-600">
          Suivi des terrains, contrats, exploitations, campagnes, ressources,
          actifs, stocks et rentabilité.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpis.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-bold text-slate-950">
              {item.value}
            </p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Chronologie métier
          </h2>

          <div className="mt-5 space-y-3 text-sm text-slate-700">
            <div>Terrain</div>
            <div>↓ Contrat actif</div>
            <div>↓ Exploitation active</div>
            <div>↓ Campagne active</div>
            <div>↓ Mouvements</div>
            <div>↓ Stocks + Comptabilité</div>
            <div>↓ Rentabilité</div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Alertes métier
          </h2>

          <div className="mt-5 space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert}
                className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900"
              >
                {alert}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
'@

$TechnicalDashboard = @'
"use client";

const technicalBlocks = [
  "Runtime Engine",
  "Workflows",
  "Domain Events",
  "Queues",
  "Retries",
  "Dead Letter Queue",
  "Audit",
  "Observability",
  "Firestore Mutations",
  "Business Rules Engine",
];

export function ERPTechnicalDashboard() {
  return (
    <main className="space-y-8 p-8">
      <section className="rounded-3xl border bg-slate-950 p-8 text-white shadow-sm">
        <p className="text-sm font-medium text-cyan-300">
          Tableau de bord technique
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Supervision ERP Runtime
        </h1>

        <p className="mt-3 max-w-3xl text-slate-300">
          Suivi du moteur ERP : événements, workflows, files d’attente,
          règles métier, audit, logs, mutations et santé système.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {technicalBlocks.map((block) => (
          <div
            key={block}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-slate-500">Module technique</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">
              {block}
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Zone réservée à la supervision technique du moteur ERP.
            </p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">
          Séparation validée
        </h2>

        <p className="mt-3 text-sm text-slate-600">
          Ce dashboard ne doit pas contenir de KPI métier comme les terrains,
          campagnes, stocks ou revenus. Il est réservé au fonctionnement interne
          de la plateforme.
        </p>
      </section>
    </main>
  );
}
'@

$BusinessPage = @'
import { ERPBusinessDashboard } from "@/components/erp/dashboard/business/ERPBusinessDashboard";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return <ERPBusinessDashboard />;
}
'@

$TechnicalPage = @'
import { ERPTechnicalDashboard } from "@/components/erp/dashboard/technical/ERPTechnicalDashboard";

export const dynamic = "force-dynamic";

export default function SupervisionPage() {
  return <ERPTechnicalDashboard />;
}
'@

Write-File "$BusinessDir\ERPBusinessDashboard.tsx" $BusinessDashboard
Write-File "$TechnicalDir\ERPTechnicalDashboard.tsx" $TechnicalDashboard
Write-File "$Root\src\app\(private)\dashboard\page.tsx" $BusinessPage
Write-File "$Root\src\app\(private)\supervision\page.tsx" $TechnicalPage

Write-Host ""
Write-Host "DONE Dashboard métier et dashboard technique séparés."
Write-Host "NEXT: pnpm build"