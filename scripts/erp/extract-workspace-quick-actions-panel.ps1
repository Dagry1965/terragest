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

$panelPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceQuickActionsPanel.tsx"

$panelContent = @'
import Link from "next/link";

import type {
  ERPWorkspace,
} from "@/runtime/workspaces/ERPWorkspaceTypes";

interface ERPWorkspaceQuickActionsPanelProps {
  workspace: ERPWorkspace;
}

export function ERPWorkspaceQuickActionsPanel({
  workspace,
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

        {workspace.quickActions.length > 0 ? (

          workspace.quickActions.map((action) => (

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
            Aucune action rapide configurée pour ce workspace.
          </p>

        )}

      </div>

    </section>

  );
}
'@

$dashboardPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceDashboard.tsx"

$content = Get-Content $dashboardPath -Raw

$content = $content.Replace(
'import {
  ERPWorkspaceKpiPanel,
} from "./ERPWorkspaceKpiPanel";',
'import {
  ERPWorkspaceKpiPanel,
} from "./ERPWorkspaceKpiPanel";

import {
  ERPWorkspaceQuickActionsPanel,
} from "./ERPWorkspaceQuickActionsPanel";'
)

$oldBlock = @'
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

          {workspace.quickActions.length > 0 ? (

            workspace.quickActions.map((action) => (

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
              Aucune action rapide configurée pour ce workspace.
            </p>

          )}

        </div>

      </section>
'@

$newBlock = @'
      <ERPWorkspaceQuickActionsPanel
        workspace={workspace}
      />
'@

$content = $content.Replace(
  $oldBlock,
  $newBlock
)

Write-Utf8NoBom `
  -Path $panelPath `
  -Content $panelContent

Write-Utf8NoBom `
  -Path $dashboardPath `
  -Content $content

Write-Host ""
Write-Host "OK - ERPWorkspaceQuickActionsPanel extracted."
Write-Host "Run: pnpm build"