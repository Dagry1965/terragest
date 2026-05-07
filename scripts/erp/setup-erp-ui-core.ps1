# scripts/erp/setup-erp-ui-core.ps1

Write-Host "=== TERRAGEST_V2 - SETUP ERP UI CORE ===" -ForegroundColor Cyan

$dirs = @(
  "src/core/modules",
  "src/core/schemas",
  "src/core/navigation",
  "src/core/actions",
  "src/core/runtime",
  "src/components/erp/shell",
  "src/components/erp/dashboard",
  "src/components/erp/generic"
)

foreach ($dir in $dirs) {
  New-Item -ItemType Directory -Force $dir | Out-Null
  Write-Host "OK dossier: $dir" -ForegroundColor Green
}

@'
export type ERPModuleGroup =
  | "Pilotage"
  | "Métier"
  | "Opérations"
  | "Finance"
  | "Système";

export type ERPModuleFeature = {
  workflow?: boolean;
  audit?: boolean;
  supervision?: boolean;
  notifications?: boolean;
};

export type ERPModule = {
  key: string;
  label: string;
  pluralLabel: string;
  description?: string;
  group: ERPModuleGroup;
  enabled: boolean;
  routes: {
    list: string;
    create: string;
    details: (id: string) => string;
    edit: (id: string) => string;
  };
  permissions?: string[];
  features?: ERPModuleFeature;
};

export const moduleRegistry: ERPModule[] = [
  {
    key: "exploitations",
    label: "Exploitation",
    pluralLabel: "Exploitations",
    group: "Métier",
    enabled: true,
    description: "Gestion des exploitations agricoles et patrimoniales.",
    routes: {
      list: "/exploitations",
      create: "/exploitations/nouveau",
      details: (id) => `/exploitations/${id}`,
      edit: (id) => `/exploitations/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      supervision: true,
    },
  },
  {
    key: "terrains",
    label: "Terrain",
    pluralLabel: "Terrains",
    group: "Métier",
    enabled: true,
    description: "Gestion des terrains rattachés aux exploitations.",
    routes: {
      list: "/terrains",
      create: "/terrains/nouveau",
      details: (id) => `/terrains/${id}`,
      edit: (id) => `/terrains/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
    },
  },
  {
    key: "produits",
    label: "Produit",
    pluralLabel: "Produits",
    group: "Métier",
    enabled: true,
    description: "Gestion des produits agricoles, animaux et intrants.",
    routes: {
      list: "/produits",
      create: "/produits/nouveau",
      details: (id) => `/produits/${id}`,
      edit: (id) => `/produits/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
    },
  },
  {
    key: "stocks",
    label: "Stock",
    pluralLabel: "Stocks",
    group: "Opérations",
    enabled: true,
    description: "Suivi des stocks, entrées, sorties et mouvements.",
    routes: {
      list: "/stocks",
      create: "/stocks/nouveau",
      details: (id) => `/stocks/${id}`,
      edit: (id) => `/stocks/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      supervision: true,
      notifications: true,
    },
  },
  {
    key: "materiels",
    label: "Matériel",
    pluralLabel: "Matériels",
    group: "Opérations",
    enabled: true,
    description: "Gestion des matériels, états, affectations et pannes.",
    routes: {
      list: "/materiels",
      create: "/materiels/nouveau",
      details: (id) => `/materiels/${id}`,
      edit: (id) => `/materiels/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      supervision: true,
      notifications: true,
    },
  },
  {
    key: "interventions",
    label: "Intervention",
    pluralLabel: "Interventions",
    group: "Opérations",
    enabled: true,
    description: "Suivi des interventions terrain et maintenance.",
    routes: {
      list: "/interventions",
      create: "/interventions/nouveau",
      details: (id) => `/interventions/${id}`,
      edit: (id) => `/interventions/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      supervision: true,
    },
  },
  {
    key: "contrats",
    label: "Contrat",
    pluralLabel: "Contrats",
    group: "Finance",
    enabled: true,
    description: "Gestion des contrats, échéances et engagements.",
    routes: {
      list: "/contrats",
      create: "/contrats/nouveau",
      details: (id) => `/contrats/${id}`,
      edit: (id) => `/contrats/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      notifications: true,
    },
  },
  {
    key: "paiements",
    label: "Paiement",
    pluralLabel: "Paiements",
    group: "Finance",
    enabled: true,
    description: "Suivi des paiements, dépenses et revenus.",
    routes: {
      list: "/paiements",
      create: "/paiements/nouveau",
      details: (id) => `/paiements/${id}`,
      edit: (id) => `/paiements/${id}/edit`,
    },
    features: {
      workflow: true,
      audit: true,
      supervision: true,
    },
  },
];

export function getEnabledModules() {
  return moduleRegistry.filter((module) => module.enabled);
}

export function getModuleByKey(key: string) {
  return moduleRegistry.find((module) => module.key === key);
}
'@ | Set-Content -Encoding UTF8 "src/core/modules/module-registry.ts"

@'
import { getEnabledModules } from "@/core/modules/module-registry";

export type ERPNavigationItem = {
  label: string;
  href: string;
  group: string;
};

export function buildERPNavigation(): ERPNavigationItem[] {
  const staticItems: ERPNavigationItem[] = [
    {
      label: "Dashboard",
      href: "/",
      group: "Pilotage",
    },
    {
      label: "Workflows",
      href: "/workflows",
      group: "Système",
    },
    {
      label: "Supervision",
      href: "/supervision",
      group: "Système",
    },
    {
      label: "Admin",
      href: "/admin",
      group: "Système",
    },
  ];

  const moduleItems = getEnabledModules().map((module) => ({
    label: module.pluralLabel,
    href: module.routes.list,
    group: module.group,
  }));

  return [...staticItems, ...moduleItems];
}
'@ | Set-Content -Encoding UTF8 "src/core/navigation/navigation-builder.ts"

@'
import { ReactNode } from "react";
import { ErpSidebar } from "./ErpSidebar";
import { ErpTopbar } from "./ErpTopbar";

type Props = {
  children: ReactNode;
};

export function ErpShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <ErpSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <ErpTopbar />

          <main className="flex-1 px-6 py-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/erp/shell/ErpShell.tsx"

@'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildERPNavigation } from "@/core/navigation/navigation-builder";

const groups = ["Pilotage", "Métier", "Opérations", "Finance", "Système"];

export function ErpSidebar() {
  const pathname = usePathname();
  const navigation = buildERPNavigation();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-20 items-center border-b border-slate-200 px-6">
        <div>
          <div className="text-xl font-bold tracking-tight text-slate-950">
            Terragest
          </div>
          <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
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
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
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
                        "flex rounded-xl px-3 py-2.5 text-sm font-medium transition",
                        active
                          ? "bg-slate-900 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
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
'@ | Set-Content -Encoding UTF8 "src/components/erp/shell/ErpSidebar.tsx"

@'
export function ErpTopbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      <div>
        <h1 className="text-lg font-semibold text-slate-950">
          Pilotage ERP
        </h1>
        <p className="text-sm text-slate-500">
          Interface pilotée par le moteur ERP central Terragest_V2.
        </p>
      </div>

      <div className="rounded-full bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
        ERP Core actif
      </div>
    </header>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/erp/shell/ErpTopbar.tsx"

@'
import { getEnabledModules } from "@/core/modules/module-registry";

export function ErpDashboard() {
  const modules = getEnabledModules();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-slate-950 p-8 text-white shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Terragest_V2
        </p>

        <h2 className="mt-3 max-w-4xl text-3xl font-bold tracking-tight">
          ERP de pilotage agricole, patrimonial et opérationnel.
        </h2>

        <p className="mt-4 max-w-3xl text-slate-300">
          Cette ébauche s’appuie sur le ModuleRegistry, les modules métier,
          les workflows, l’audit, la supervision et le moteur ERP central.
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Modules actifs
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-950">
            {modules.length}
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Pilotés par le registry central
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Workflows
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-950">
            Actifs
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Orchestration métier prévue
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Audit
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-950">
            Traçable
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Historique des actions ERP
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-slate-500">
            Supervision
          </div>
          <div className="mt-3 text-3xl font-bold text-slate-950">
            Centralisée
          </div>
          <div className="mt-2 text-sm text-slate-500">
            Monitoring global du runtime
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-950">
          Modules ERP disponibles
        </h3>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => (
            <div
              key={module.key}
              className="rounded-xl border border-slate-100 bg-slate-50 p-5"
            >
              <div className="text-base font-semibold text-slate-950">
                {module.pluralLabel}
              </div>

              <p className="mt-2 text-sm text-slate-500">
                {module.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                {module.features?.workflow && (
                  <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700">
                    Workflow
                  </span>
                )}

                {module.features?.audit && (
                  <span className="rounded-full bg-violet-50 px-3 py-1 font-medium text-violet-700">
                    Audit
                  </span>
                )}

                {module.features?.supervision && (
                  <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-700">
                    Supervision
                  </span>
                )}

                {module.features?.notifications && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">
                    Notifications
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
'@ | Set-Content -Encoding UTF8 "src/components/erp/dashboard/ErpDashboard.tsx"

Write-Host "=== ERP UI CORE créé avec succès ===" -ForegroundColor Cyan
Write-Host "Prochaine étape: brancher ErpShell dans le layout et ErpDashboard sur la page d'accueil." -ForegroundColor Yellow