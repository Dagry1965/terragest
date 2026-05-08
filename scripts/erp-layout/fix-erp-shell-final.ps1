$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function Write-Utf8File {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Utf8File "src\components\erp\shell\ErpTopbar.tsx" @'
export function ErpTopbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      <div>
        <h1 className="text-xl font-black tracking-tight text-slate-950">
          Terragest ERP
        </h1>
        <p className="text-sm text-slate-500">
          Cockpit de gestion centralisé des opérations, ressources et activités.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-bold text-emerald-700">
          Système opérationnel
        </div>

        <div className="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700">
          ERP Enterprise
        </div>
      </div>
    </header>
  );
}
'@

Write-Utf8File "src\components\erp\shell\ErpSidebar.tsx" @'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buildERPNavigation } from "@/core/navigation/navigation-builder";

const groups = ["Pilotage", "Métier", "Opérations", "Finance", "Système"];

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

Write-Utf8File "src\components\erp\shell\ErpShell.tsx" @'
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
'@

Set-Location $projectRoot
pnpm build