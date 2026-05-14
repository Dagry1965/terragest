$ErrorActionPreference = "Stop"

$root = "C:\Users\Admin\terragest"

function Write-Utf8NoBom {
  param(
    [string]$Path,
    [string]$Content
  )

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

$pagePath = Join-Path $root "src\app\(private)\workspaces\[workspace]\page.tsx"

$pageContent = @'
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ERPWorkspaceRegistry,
} from "@/runtime/workspaces/ERPWorkspaceRegistry";

interface WorkspacePageProps {
  params: Promise<{
    workspace: string;
  }>;
}

export const dynamic = "force-dynamic";

export default async function WorkspacePage({
  params,
}: WorkspacePageProps) {
  const { workspace } = await params;

  const currentWorkspace =
    ERPWorkspaceRegistry.find((item) => item.key === workspace);

  if (!currentWorkspace) {
    notFound();
  }

  return (
    <main className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
          Workspace ERP
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
          {currentWorkspace.label}
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          {currentWorkspace.description}
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-950">
            KPI runtime
          </h2>

          <div className="mt-4 space-y-3">
            {currentWorkspace.kpis.length > 0 ? (
              currentWorkspace.kpis.map((kpi) => (
                <div
                  key={kpi.key}
                  className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <p className="text-sm font-medium text-slate-900">
                    {kpi.label}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {kpi.value ?? "Valeur runtime à connecter"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">
                Aucun KPI configuré pour ce workspace.
              </p>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-sm font-semibold text-slate-950">
            Modules du workspace
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {currentWorkspace.modules.map((module) => (
              <Link
                key={module.key}
                href={`/${module.key}`}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-white"
              >
                <p className="text-sm font-medium text-slate-900">
                  {module.label}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Ouvrir le module {module.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-950">
          Actions rapides
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          {currentWorkspace.quickActions.length > 0 ? (
            currentWorkspace.quickActions.map((action) => (
              <Link
                key={action.key}
                href={action.href}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
              >
                {action.label}
              </Link>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              Aucune action rapide configurée pour ce workspace.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
'@

Write-Utf8NoBom -Path $pagePath -Content $pageContent

Write-Host ""
Write-Host "OK - Workspace runtime page installed."
Write-Host "Run: pnpm build"