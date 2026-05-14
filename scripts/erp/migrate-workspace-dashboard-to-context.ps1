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

# =========================================================
# ERPWorkspaceDashboard
# =========================================================

$dashboardPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceDashboard.tsx"

$dashboardContent = @'
import type {
  ERPWorkspaceContext,
} from "@/runtime/workspaces/ERPWorkspaceContext";

import {
  ERPWorkspaceRuntimeWidgets,
} from "./ERPWorkspaceRuntimeWidgets";

import {
  ERPWorkspaceModulesPanel,
} from "./ERPWorkspaceModulesPanel";

import {
  ERPWorkspaceKpiPanel,
} from "./ERPWorkspaceKpiPanel";

import {
  ERPWorkspaceQuickActionsPanel,
} from "./ERPWorkspaceQuickActionsPanel";

interface ERPWorkspaceDashboardProps {
  context: ERPWorkspaceContext;
}

export function ERPWorkspaceDashboard({
  context,
}: ERPWorkspaceDashboardProps) {

  return (

    <main className="space-y-8">

      <section
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
        "
      >

        <p
          className="
            text-sm
            font-medium
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          Workspace ERP
        </p>

        <h1
          className="
            mt-2
            text-3xl
            font-semibold
            tracking-tight
            text-slate-950
          "
        >
          {context.workspace.label}
        </h1>

        <p
          className="
            mt-3
            max-w-3xl
            text-sm
            leading-6
            text-slate-600
          "
        >
          {context.workspace.description}
        </p>

      </section>

      <section
        className="
          grid
          gap-6
          lg:grid-cols-3
        "
      >

        <ERPWorkspaceKpiPanel
          kpis={context.kpis}
        />

        <ERPWorkspaceModulesPanel
          modules={context.modules}
        />

      </section>

      <ERPWorkspaceQuickActionsPanel
        quickActions={context.quickActions}
      />

      <ERPWorkspaceRuntimeWidgets
        widgets={context.widgets}
      />

    </main>

  );
}
'@

# =========================================================
# KPI PANEL
# =========================================================

$kpiPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceKpiPanel.tsx"

$kpiContent = @'
import type {
  ERPWorkspaceKpi,
} from "@/runtime/workspaces/ERPWorkspaceTypes";

interface ERPWorkspaceKpiPanelProps {
  kpis: ERPWorkspaceKpi[];
}

export function ERPWorkspaceKpiPanel({
  kpis,
}: ERPWorkspaceKpiPanelProps) {

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <h2
        className="
          text-sm
          font-semibold
          text-slate-950
        "
      >
        KPI runtime
      </h2>

      <div className="mt-4 space-y-3">

        {kpis.length > 0 ? (

          kpis.map((kpi) => (

            <div
              key={kpi.key}
              className="
                rounded-2xl
                border
                border-slate-100
                bg-slate-50
                p-4
              "
            >

              <p
                className="
                  text-sm
                  font-medium
                  text-slate-900
                "
              >
                {kpi.label}
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  text-slate-500
                "
              >
                {kpi.value ?? "Valeur runtime à connecter"}
              </p>

            </div>

          ))

        ) : (

          <p className="text-sm text-slate-500">
            Aucun KPI configuré.
          </p>

        )}

      </div>

    </div>

  );
}
'@

# =========================================================
# MODULES PANEL
# =========================================================

$modulesPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceModulesPanel.tsx"

$modulesContent = @'
import Link from "next/link";

import type {
  ERPWorkspaceModule,
} from "@/runtime/workspaces/ERPWorkspaceTypes";

interface ERPWorkspaceModulesPanelProps {
  modules: ERPWorkspaceModule[];
}

export function ERPWorkspaceModulesPanel({
  modules,
}: ERPWorkspaceModulesPanelProps) {

  return (

    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        lg:col-span-2
      "
    >

      <h2
        className="
          text-sm
          font-semibold
          text-slate-950
        "
      >
        Modules du workspace
      </h2>

      <div
        className="
          mt-4
          grid
          gap-4
          md:grid-cols-2
        "
      >

        {modules.map((module) => (

          <Link
            key={module.key}
            href={`/${module.key}`}
            className="
              rounded-2xl
              border
              border-slate-100
              bg-slate-50
              p-4
              transition
              hover:border-slate-300
              hover:bg-white
            "
          >

            <p
              className="
                text-sm
                font-medium
                text-slate-900
              "
            >
              {module.label}
            </p>

            <p
              className="
                mt-1
                text-xs
                text-slate-500
              "
            >
              Ouvrir le module {module.label}
            </p>

          </Link>

        ))}

      </div>

    </div>

  );
}
'@

# =========================================================
# QUICK ACTIONS
# =========================================================

$quickActionsPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceQuickActionsPanel.tsx"

$quickActionsContent = @'
import Link from "next/link";

import type {
  ERPWorkspaceQuickAction,
} from "@/runtime/workspaces/ERPWorkspaceTypes";

interface ERPWorkspaceQuickActionsPanelProps {
  quickActions: ERPWorkspaceQuickAction[];
}

export function ERPWorkspaceQuickActionsPanel({
  quickActions,
}: ERPWorkspaceQuickActionsPanelProps) {

  return (

    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <h2
        className="
          text-sm
          font-semibold
          text-slate-950
        "
      >
        Actions rapides
      </h2>

      <div
        className="
          mt-4
          flex
          flex-wrap
          gap-3
        "
      >

        {quickActions.length > 0 ? (

          quickActions.map((action) => (

            <Link
              key={action.key}
              href={action.href}
              className="
                rounded-2xl
                border
                border-slate-200
                px-4
                py-2
                text-sm
                font-medium
                text-slate-700
                transition
                hover:border-slate-400
                hover:bg-slate-50
              "
            >
              {action.label}
            </Link>

          ))

        ) : (

          <p className="text-sm text-slate-500">
            Aucune action rapide configurée.
          </p>

        )}

      </div>

    </section>

  );
}
'@

# =========================================================
# RUNTIME WIDGETS
# =========================================================

$runtimeWidgetsPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceRuntimeWidgets.tsx"

$runtimeWidgetsContent = @'
import type {
  ERPDashboardWidgetConfig,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

import {
  ERPDashboardWidgetEngine,
} from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";

import {
  ERPWorkspaceWidgetCard,
} from "./ERPWorkspaceWidgetCard";

interface ERPWorkspaceRuntimeWidgetsProps {
  widgets: ERPDashboardWidgetConfig[];
}

export async function ERPWorkspaceRuntimeWidgets({
  widgets,
}: ERPWorkspaceRuntimeWidgetsProps) {

  const results =
    await Promise.all(
      widgets.map(
        (widget) =>
          ERPDashboardWidgetEngine.resolveWidget(
            widget
          )
      )
    );

  if (results.length === 0) {
    return null;
  }

  return (

    <section
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      <div className="mb-6">

        <h2
          className="
            text-lg
            font-semibold
            text-slate-950
          "
        >
          Widgets runtime
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-500
          "
        >
          Widgets ERP résolus dynamiquement depuis le runtime.
        </p>

      </div>

      <div
        className="
          grid
          gap-4
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {results.map((result) => (

          <ERPWorkspaceWidgetCard
            key={result.key}
            widget={result}
          />

        ))}

      </div>

    </section>

  );
}
'@

# =========================================================
# PAGE
# =========================================================

$pagePath = Join-Path `
  $root `
  "src\app\(private)\workspaces\[workspace]\page.tsx"

$pageContent = @'
import { notFound } from "next/navigation";

import {
  ERPWorkspaceDashboard,
} from "@/components/erp/workspace/ERPWorkspaceDashboard";

import {
  ERPWorkspaceRegistry,
} from "@/runtime/workspaces/ERPWorkspaceRegistry";

import {
  ERPWorkspaceContextResolver,
} from "@/runtime/workspaces/ERPWorkspaceContextResolver";

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
    ERPWorkspaceRegistry.find(
      (item) => item.key === workspace
    );

  if (!currentWorkspace) {
    notFound();
  }

  const context =
    ERPWorkspaceContextResolver.resolveWorkspaceContext(
      currentWorkspace
    );

  return (
    <ERPWorkspaceDashboard
      context={context}
    />
  );
}
'@

Write-Utf8NoBom -Path $dashboardPath -Content $dashboardContent
Write-Utf8NoBom -Path $kpiPath -Content $kpiContent
Write-Utf8NoBom -Path $modulesPath -Content $modulesContent
Write-Utf8NoBom -Path $quickActionsPath -Content $quickActionsContent
Write-Utf8NoBom -Path $runtimeWidgetsPath -Content $runtimeWidgetsContent
Write-Utf8NoBom -Path $pagePath -Content $pageContent

Write-Host ""
Write-Host "OK - Workspace dashboard migrated to context-driven architecture."
Write-Host "Run: pnpm build"