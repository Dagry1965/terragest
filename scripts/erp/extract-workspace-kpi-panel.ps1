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
  "src\components\erp\workspace\ERPWorkspaceKpiPanel.tsx"

$panelContent = @'
import type {
  ERPWorkspace,
} from "@/runtime/workspaces/ERPWorkspaceTypes";

interface ERPWorkspaceKpiPanelProps {
  workspace: ERPWorkspace;
}

export function ERPWorkspaceKpiPanel({
  workspace,
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

        {workspace.kpis.length > 0 ? (

          workspace.kpis.map((kpi) => (

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
            Aucun KPI configuré pour ce workspace.
          </p>

        )}

      </div>

    </div>

  );
}
'@

$dashboardPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceDashboard.tsx"

$content = Get-Content $dashboardPath -Raw

$content = $content.Replace(
'import {
  ERPWorkspaceModulesPanel,
} from "./ERPWorkspaceModulesPanel";',
'import {
  ERPWorkspaceModulesPanel,
} from "./ERPWorkspaceModulesPanel";

import {
  ERPWorkspaceKpiPanel,
} from "./ERPWorkspaceKpiPanel";'
)

$oldBlock = @'
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

            {workspace.kpis.length > 0 ? (

              workspace.kpis.map((kpi) => (

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
                Aucun KPI configuré pour ce workspace.
              </p>

            )}

          </div>

        </div>
'@

$newBlock = @'
        <ERPWorkspaceKpiPanel
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
Write-Host "OK - ERPWorkspaceKpiPanel extracted."
Write-Host "Run: pnpm build"