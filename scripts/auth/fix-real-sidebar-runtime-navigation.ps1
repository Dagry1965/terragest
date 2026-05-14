$ErrorActionPreference = "Stop"

$path = "C:\Users\Admin\terragest\src\core\layout\Sidebar.tsx"

$content = @'
"use client";

import Link from "next/link";

import {
  useAuth,
} from "@/providers/AuthProvider";

import {
  getERPWorkspacesNavigation,
} from "@/runtime/navigation/ERPNavigationEngine";

export function Sidebar() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
        <p className="text-sm text-slate-500">
          Chargement navigation...
        </p>
      </aside>
    );
  }

  const navigation =
    getERPWorkspacesNavigation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 overflow-y-auto border-r border-white/60 bg-white/75 p-5 shadow-xl shadow-slate-200/40 backdrop-blur-xl">
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

      <nav className="space-y-6">
        {navigation.map((workspace) => (
          <div key={workspace.key}>
            <Link
              href={workspace.href}
              className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-900 transition-all duration-200 hover:bg-slate-100"
            >
              {workspace.label}
            </Link>

            <div className="mt-2 space-y-1 pl-3">
              {workspace.modules.map((module) => (
                <Link
                  key={module.key}
                  href={module.href}
                  className="block rounded-2xl px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950"
                >
                  {module.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
'@

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - Real Sidebar now uses runtime workspace navigation."
Write-Host "Run: pnpm build"