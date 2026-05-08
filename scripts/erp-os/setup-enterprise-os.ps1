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

Write-Host "=== ERP ENTERPRISE OS ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\os-enterprise" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\os" | Out-Null

WriteFile "src\runtime\os-enterprise\ERPCommand.ts" @'
export interface ERPCommand {
  id: string;
  label: string;
  description?: string;
  href?: string;
  group?: string;
}
'@

WriteFile "src\runtime\os-enterprise\ERPCommandCenter.ts" @'
import type { ERPCommand } from "./ERPCommand";

export class ERPCommandCenter {
  static commands(): ERPCommand[] {
    return [
      {
        id: "dashboard",
        label: "Ouvrir le dashboard",
        description: "Acceder au cockpit principal.",
        href: "/dashboard",
        group: "Navigation",
      },
      {
        id: "exploitations",
        label: "Ouvrir Exploitations",
        description: "Piloter les exploitations.",
        href: "/exploitations",
        group: "Modules",
      },
      {
        id: "materiels",
        label: "Ouvrir Materiels",
        description: "Suivre les equipements.",
        href: "/materiels",
        group: "Modules",
      },
      {
        id: "stocks",
        label: "Ouvrir Stocks",
        description: "Superviser les stocks.",
        href: "/stocks",
        group: "Modules",
      },
      {
        id: "audit",
        label: "Consulter les audits",
        description: "Verifier les traces operationnelles.",
        href: "/exploitations/audit",
        group: "Controle",
      },
    ];
  }
}
'@

WriteFile "src\runtime\os-enterprise\ERPNotification.ts" @'
export type ERPNotificationLevel =
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface ERPNotification {
  id: string;
  title: string;
  message: string;
  level: ERPNotificationLevel;
  time: string;
}
'@

WriteFile "src\runtime\os-enterprise\ERPNotificationCenter.ts" @'
import type { ERPNotification } from "./ERPNotification";

export class ERPNotificationCenter {
  static notifications(): ERPNotification[] {
    return [
      {
        id: "notif-1",
        title: "Operations stables",
        message: "Les modules principaux fonctionnent normalement.",
        level: "success",
        time: "Maintenant",
      },
      {
        id: "notif-2",
        title: "Validation en attente",
        message: "Des actions metier peuvent necessiter une validation.",
        level: "warning",
        time: "Il y a 5 min",
      },
      {
        id: "notif-3",
        title: "Synchronisation terminee",
        message: "Les donnees operationnelles sont a jour.",
        level: "info",
        time: "Il y a 10 min",
      },
    ];
  }
}
'@

WriteFile "src\runtime\os-enterprise\ERPSavedView.ts" @'
export interface ERPSavedView {
  id: string;
  label: string;
  description?: string;
  href: string;
}
'@

WriteFile "src\runtime\os-enterprise\ERPSavedViews.ts" @'
import type { ERPSavedView } from "./ERPSavedView";

export class ERPSavedViews {
  static views(): ERPSavedView[] {
    return [
      {
        id: "view-operations",
        label: "Vue operations",
        description: "Vue globale des operations actives.",
        href: "/dashboard",
      },
      {
        id: "view-maintenance",
        label: "Vue maintenance",
        description: "Suivi des equipements et interventions.",
        href: "/materiels",
      },
      {
        id: "view-stocks",
        label: "Vue stocks",
        description: "Surveillance des niveaux et alertes.",
        href: "/stocks",
      },
    ];
  }
}
'@

WriteFile "src\runtime\os-enterprise\ERPUserContext.ts" @'
export interface ERPUserContext {
  userName: string;
  role: string;
  workspaceMode: "operations" | "direction" | "audit";
}

export class ERPUserContextProvider {
  static current(): ERPUserContext {
    return {
      userName: "Utilisateur ERP",
      role: "Administrateur",
      workspaceMode: "operations",
    };
  }
}
'@

WriteFile "src\runtime\os-enterprise\index.ts" @'
export type { ERPCommand } from "./ERPCommand";
export { ERPCommandCenter } from "./ERPCommandCenter";

export type {
  ERPNotification,
  ERPNotificationLevel,
} from "./ERPNotification";
export { ERPNotificationCenter } from "./ERPNotificationCenter";

export type { ERPSavedView } from "./ERPSavedView";
export { ERPSavedViews } from "./ERPSavedViews";

export type { ERPUserContext } from "./ERPUserContext";
export { ERPUserContextProvider } from "./ERPUserContext";
'@

WriteFile "src\components\erp\os\ERPCommandPalette.tsx" @'
import Link from "next/link";
import { ERPCommandCenter } from "@/runtime/os-enterprise";

export function ERPCommandPalette() {
  const commands = ERPCommandCenter.commands();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-black text-slate-950">
          Commandes ERP
        </h2>
        <p className="text-sm text-slate-500">
          Acces rapide aux actions globales.
        </p>
      </div>

      <div className="space-y-2">
        {commands.slice(0, 4).map((command) => (
          <Link
            key={command.id}
            href={command.href ?? "#"}
            className="block rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-blue-300 hover:bg-blue-50"
          >
            <p className="text-sm font-black text-slate-900">
              {command.label}
            </p>

            {command.description && (
              <p className="mt-1 text-xs text-slate-500">
                {command.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\os\ERPNotificationCenter.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import { ERPNotificationCenter as NotificationRuntime } from "@/runtime/os-enterprise";

export function ERPNotificationCenter() {
  const notifications = NotificationRuntime.notifications();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Notifications
          </h2>
          <p className="text-sm text-slate-500">
            Signaux importants de la plateforme.
          </p>
        </div>

        <ERPBadge tone="info">{notifications.length}</ERPBadge>
      </div>

      <div className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">
                  {notification.title}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {notification.message}
                </p>
              </div>

              <ERPBadge tone={notification.level}>
                {notification.time}
              </ERPBadge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\os\ERPSavedViewsPanel.tsx" @'
import Link from "next/link";
import { ERPSavedViews } from "@/runtime/os-enterprise";

export function ERPSavedViewsPanel() {
  const views = ERPSavedViews.views();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-black text-slate-950">
          Vues sauvegardees
        </h2>
        <p className="text-sm text-slate-500">
          Espaces de travail favoris.
        </p>
      </div>

      <div className="space-y-2">
        {views.map((view) => (
          <Link
            key={view.id}
            href={view.href}
            className="block rounded-2xl bg-slate-50 p-4 transition hover:bg-blue-50"
          >
            <p className="text-sm font-black text-slate-900">
              {view.label}
            </p>

            {view.description && (
              <p className="mt-1 text-xs text-slate-500">
                {view.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\os\ERPWorkspaceSwitcher.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import { ERPUserContextProvider } from "@/runtime/os-enterprise";

export function ERPWorkspaceSwitcher() {
  const context = ERPUserContextProvider.current();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Workspace
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Contexte utilisateur courant.
      </p>

      <div className="mt-5 space-y-3">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            Utilisateur
          </p>
          <p className="mt-1 text-sm font-black text-slate-950">
            {context.userName}
          </p>
        </div>

        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-bold uppercase text-slate-400">
            Role
          </p>
          <p className="mt-1 text-sm font-black text-slate-950">
            {context.role}
          </p>
        </div>

        <ERPBadge tone="success">
          Mode {context.workspaceMode}
        </ERPBadge>
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\os\ERPEnterpriseOSPanel.tsx" @'
import { ERPCommandPalette } from "./ERPCommandPalette";
import { ERPNotificationCenter } from "./ERPNotificationCenter";
import { ERPSavedViewsPanel } from "./ERPSavedViewsPanel";
import { ERPWorkspaceSwitcher } from "./ERPWorkspaceSwitcher";

export function ERPEnterpriseOSPanel() {
  return (
    <section className="grid gap-6 xl:grid-cols-2 2xl:grid-cols-4">
      <ERPCommandPalette />
      <ERPNotificationCenter />
      <ERPSavedViewsPanel />
      <ERPWorkspaceSwitcher />
    </section>
  );
}
'@

WriteFile "src\components\erp\os\index.ts" @'
export { ERPCommandPalette } from "./ERPCommandPalette";
export { ERPNotificationCenter } from "./ERPNotificationCenter";
export { ERPSavedViewsPanel } from "./ERPSavedViewsPanel";
export { ERPWorkspaceSwitcher } from "./ERPWorkspaceSwitcher";
export { ERPEnterpriseOSPanel } from "./ERPEnterpriseOSPanel";
'@

WriteFile "src\app\(private)\dashboard\page.tsx" @'
"use client";

import Link from "next/link";
import { ERPBadge, ERPButton } from "@/components/erp/ui";
import { ERPEnterpriseOSPanel } from "@/components/erp/os";

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

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 px-8 py-10 text-white">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <ERPBadge tone="info">Enterprise OS</ERPBadge>
                <ERPBadge tone="success">Systeme actif</ERPBadge>
              </div>

              <h1 className="mt-5 text-4xl font-black tracking-tight">
                Tableau de bord Terragest
              </h1>

              <p className="mt-3 max-w-3xl text-base leading-7 text-slate-300">
                Vue globale des operations, commandes, notifications et espaces de travail.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <ERPButton type="button">Nouvelle action</ERPButton>
              <ERPButton variant="secondary" type="button">Exporter</ERPButton>
            </div>
          </div>
        </div>
      </section>

      <ERPEnterpriseOSPanel />

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
'@

Set-Location $projectRoot
pnpm build

Write-Host ""
Write-Host "=== ERP ENTERPRISE OS TERMINE ===" -ForegroundColor Green