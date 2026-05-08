$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

$path = Join-Path $projectRoot "src\app\(private)\dashboard\page.tsx"

$content = @'
"use client";

import Link from "next/link";
import { ERPBadge, ERPButton } from "@/components/erp/ui";

const modules = [
  {
    title: "Exploitations",
    description: "Pilotage des exploitations, terrains et ressources.",
    href: "/exploitations",
  },
  {
    title: "Materiels",
    description: "Suivi des equipements, maintenance et disponibilite.",
    href: "/materiels",
  },
  {
    title: "Stocks",
    description: "Gestion des flux, niveaux et alertes de stock.",
    href: "/stocks",
  },
  {
    title: "Produits",
    description: "Catalogue des produits, intrants et references.",
    href: "/produits",
  },
];

const kpis = [
  ["Exploitations", "24", "sites actifs"],
  ["Materiels", "182", "equipements suivis"],
  ["Interventions", "13", "actions ouvertes"],
  ["Alertes", "4", "priorites critiques"],
];

const activities = [
  "Nouvelle exploitation ajoutee",
  "Maintenance planifiee sur un materiel",
  "Alerte stock detectee",
  "Workflow de validation termine",
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-10 text-white">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <ERPBadge tone="info">Cockpit ERP</ERPBadge>
                <ERPBadge tone="success">Systeme actif</ERPBadge>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight">
                Tableau de bord Terragest
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                Vue de synthese des operations, ressources, alertes et activites metier.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ERPButton type="button">Nouvelle action</ERPButton>
              <ERPButton variant="secondary" type="button">Exporter</ERPButton>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map(([title, value, subtitle]) => (
          <div
            key={title}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-bold text-slate-500">{title}</p>
            <p className="mt-3 text-4xl font-black text-slate-950">{value}</p>
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-8 xl:grid-cols-[1fr_360px]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-slate-950">
                Modules principaux
              </h2>
              <p className="text-sm text-slate-500">
                Acces rapide aux domaines metier.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {modules.map((module) => (
              <Link
                key={module.href}
                href={module.href}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-blue-300 hover:bg-blue-50"
              >
                <h3 className="text-lg font-black text-slate-950">
                  {module.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {module.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">
              Activite recente
            </h2>

            <div className="mt-5 space-y-3">
              {activities.map((activity) => (
                <div
                  key={activity}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm font-bold text-slate-800">
                    {activity}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Mis a jour recemment
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-black text-slate-950">
              Priorites
            </h2>

            <div className="mt-5 space-y-3">
              <ERPBadge tone="warning">3 validations en attente</ERPBadge>
              <ERPBadge tone="danger">4 alertes critiques</ERPBadge>
              <ERPBadge tone="success">Operations stables</ERPBadge>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
'@

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $content, $utf8NoBom)

Set-Location $projectRoot
pnpm build