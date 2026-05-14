$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

function Write-Utf8NoBom {
  param([string]$Path, [string]$Content)

  $dir = Split-Path $Path -Parent
  if (!(Test-Path $dir)) {
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  [System.IO.File]::WriteAllText(
    $Path,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN $Path"
}

# 1. Mount AuthProvider globally
$layoutPath = Join-Path $root "src\app\layout.tsx"

$layoutContent = @'
import "./globals.css";

import {
  RuntimeBootstrapProvider,
} from "@/components/bootstrap/RuntimeBootstrapProvider";

import {
  AuthProvider,
} from "@/providers/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <RuntimeBootstrapProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </RuntimeBootstrapProvider>
      </body>
    </html>
  );
}
'@

# 2. Make navigation builder session-aware
$navPath = Join-Path $root "src\core\navigation\navigation-builder.ts"

$navContent = @'
import { getEnabledModules } from "@/core/modules/module-registry";

import {
  ERPSessionRuntime,
} from "@/runtime/security/sessions/ERPSessionRuntime";

export type ERPNavigationItem = {
  label: string;
  href: string;
  group: string;
};

function normalizeGroup(group?: string) {
  if (!group) {
    return "Metier";
  }

  return group
    .replace("SystÃƒÂ¨me", "Systeme")
    .replace("Système", "Systeme")
    .replace("Métier", "Metier")
    .replace("MÃƒÂ©tier", "Metier");
}

function moduleKeyFromHref(href: string) {
  return href
    .split("/")
    .filter(Boolean)[0];
}

export function buildERPNavigation(): ERPNavigationItem[] {
  const staticItems: ERPNavigationItem[] = [
    {
      label: "Cockpit",
      href: "/workspaces/general",
      group: "Pilotage",
    },
    {
      label: "Production",
      href: "/workspaces/production",
      group: "Pilotage",
    },
    {
      label: "Maintenance",
      href: "/workspaces/maintenance",
      group: "Pilotage",
    },
    {
      label: "Finance",
      href: "/workspaces/finance",
      group: "Pilotage",
    },
    {
      label: "Administration",
      href: "/workspaces/administration",
      group: "Systeme",
    },
    {
      label: "Supervision",
      href: "/workspaces/supervision",
      group: "Systeme",
    },
  ].filter((item) => {
    const workspaceKey =
      item.href.split("/").filter(Boolean)[1];

    return (
      !workspaceKey ||
      ERPSessionRuntime.canAccessWorkspace(workspaceKey)
    );
  });

  const moduleItems = getEnabledModules()
    .map((module) => {
      const runtimeModule = module as any;

      const href =
        runtimeModule.routes?.list ?? "/";

      const key =
        runtimeModule.key ??
        runtimeModule.id ??
        moduleKeyFromHref(href);

      return {
        key,
        label:
          runtimeModule.pluralLabel ??
          runtimeModule.label ??
          key,
        href,
        group: normalizeGroup(runtimeModule.group),
      };
    })
    .filter((module) =>
      ERPSessionRuntime.canAccessModule(module.key)
    )
    .map(({ key, ...item }) => item);

  return [
    ...staticItems,
    ...moduleItems,
  ];
}
'@

# 3. Make sidebar wait for AuthProvider hydration
$sidebarPath = Join-Path $root "src\components\erp\shell\ErpSidebar.tsx"

$sidebarContent = @'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  buildERPNavigation,
} from "@/core/navigation/navigation-builder";

import {
  useAuth,
} from "@/providers/AuthProvider";

const groups = [
  "Pilotage",
  "Metier",
  "Operations",
  "Finance",
  "Systeme",
];

export function ErpSidebar() {
  const pathname = usePathname();

  const {
    loading,
  } = useAuth();

  if (loading) {
    return (
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white lg:block">
        <div className="p-6 text-sm text-slate-400">
          Chargement navigation...
        </div>
      </aside>
    );
  }

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
          const items = navigation.filter(
            (item) => item.group === group
          );

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

Write-Utf8NoBom -Path $layoutPath -Content $layoutContent
Write-Utf8NoBom -Path $navPath -Content $navContent
Write-Utf8NoBom -Path $sidebarPath -Content $sidebarContent

Write-Host ""
Write-Host "OK - Sidebar is now session-aware."
Write-Host "Run: pnpm build"