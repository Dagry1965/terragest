"use client";

import Link from "next/link";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import { ERPEnterpriseOSPanel } from "@/components/erp/os";
import { EnterpriseRuntimeConsolidationPanel } from "@/components/erp/enterprise-runtime";
import { ProductionHardeningPanel } from "@/components/erp/production";

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

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-10 text-white">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <ERPBadge tone="info">Production Hardening</ERPBadge>
                <ERPBadge tone="success">Runtime protege</ERPBadge>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight">
                Dashboard Terragest
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                Vue globale du runtime, de la consolidation enterprise et de la readiness production.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ERPButton type="button">Diagnostic</ERPButton>
              <ERPButton variant="secondary" type="button">Exporter</ERPButton>
            </div>
          </div>
        </div>
      </section>

      <ProductionHardeningPanel />

      <EnterpriseRuntimeConsolidationPanel />

      <ERPEnterpriseOSPanel />

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl font-black text-slate-950">
            Modules principaux
          </h2>
          <p className="text-sm text-slate-500">
            Acces rapide aux domaines metier.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
      </section>
    </div>
  );
}