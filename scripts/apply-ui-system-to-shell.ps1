Set-Location "C:\Users\Admin\terragest"

@'
"use client";

import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-950">
      <Sidebar />

      <div className="ml-64 min-h-screen">
        <Topbar />

        <main className="p-8">
          <div className="mx-auto max-w-7xl space-y-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
'@ | Set-Content ".\src\core\layout\AppShell.tsx" -Encoding UTF8

@'
"use client";

import Link from "next/link";

const items = [
  ["Dashboard", "/dashboard"],
  ["Exploitations", "/exploitations"],
  ["Terrains", "/terrains"],
  ["Matériels", "/materiels"],
  ["Maintenance", "/maintenance"],
  ["Interventions", "/interventions/workflow"],
  ["Stocks", "/stocks"],
  ["Produits", "/produits"],
  ["Notifications", "/notifications"],
  ["Observability", "/observability"],
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
      <div className="mb-8 rounded-3xl bg-slate-950 p-5 text-white shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">
          ERP Suite
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          Terragest
        </h1>

        <p className="mt-1 text-sm text-slate-300">
          Enterprise Runtime
        </p>
      </div>

      <nav className="space-y-1">
        {items.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950"
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
'@ | Set-Content ".\src\core\layout\Sidebar.tsx" -Encoding UTF8

@'
"use client";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/60 bg-white/70 px-8 shadow-sm backdrop-blur-xl">
      <div>
        <p className="text-sm font-medium text-slate-500">
          UI System Final
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-slate-950">
          Cockpit Enterprise
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          Runtime actif
        </span>

        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          Design System
        </span>
      </div>
    </header>
  );
}
'@ | Set-Content ".\src\core\layout\Topbar.tsx" -Encoding UTF8

Write-Host ""
Write-Host "ERP Shell upgraded to UI System Final."
Write-Host ""