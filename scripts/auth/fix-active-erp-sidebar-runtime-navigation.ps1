$ErrorActionPreference = "Stop"

$path = "C:\Users\Admin\terragest\src\components\erp\shell\ErpSidebar.tsx"

$content = @'
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  useAuth,
} from "@/providers/AuthProvider";

import {
  getERPWorkspacesNavigation,
} from "@/runtime/navigation/ERPNavigationEngine";

export function ErpSidebar() {
  const pathname = usePathname();

  const { loading } = useAuth();

  if (loading) {
    return (
      <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white lg:block">
        <div className="p-6 text-sm text-slate-400">
          Chargement navigation...
        </div>
      </aside>
    );
  }

  const navigation = getERPWorkspacesNavigation();

  return (
    <aside className="hidden w-72 shrink-0 overflow-y-auto border-r border-slate-200 bg-slate-950 text-white lg:block">
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

      <nav className="space-y-6 px-4 py-6">
        {navigation.map((workspace) => {
          const workspaceActive =
            pathname === workspace.href ||
            pathname.startsWith(`${workspace.href}/`);

          return (
            <div key={workspace.key}>
              <Link
                href={workspace.href}
                className={[
                  "flex rounded-2xl px-4 py-3 text-sm font-black transition",
                  workspaceActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                    : "text-white hover:bg-slate-800",
                ].join(" ")}
              >
                {workspace.label}
              </Link>

              <div className="mt-2 space-y-1 pl-3">
                {workspace.modules.map((module) => {
                  const active =
                    pathname === module.href ||
                    pathname.startsWith(`${module.href}/`);

                  return (
                    <Link
                      key={module.key}
                      href={module.href}
                      className={[
                        "flex rounded-2xl px-4 py-2 text-sm font-semibold transition",
                        active
                          ? "bg-slate-800 text-white"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white",
                      ].join(" ")}
                    >
                      {module.label}
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

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - Active ErpSidebar now uses runtime workspace navigation."
Write-Host "Run: pnpm build"