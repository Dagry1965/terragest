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
  "src\components\erp\workspace\ERPWorkspaceModulesPanel.tsx"

$panelContent = @'
import Link from "next/link";

import type {
  ERPWorkspace,
} from "@/runtime/workspaces/ERPWorkspaceTypes";

interface ERPWorkspaceModulesPanelProps {
  workspace: ERPWorkspace;
}

export function ERPWorkspaceModulesPanel({
  workspace,
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

        {workspace.modules.map((module) => (

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

$dashboardPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceDashboard.tsx"

$content = Get-Content $dashboardPath -Raw

$content = $content.Replace(
'import {
  ERPWorkspaceRuntimeWidgets,
} from "./ERPWorkspaceRuntimeWidgets";',
'import {
  ERPWorkspaceRuntimeWidgets,
} from "./ERPWorkspaceRuntimeWidgets";

import {
  ERPWorkspaceModulesPanel,
} from "./ERPWorkspaceModulesPanel";'
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

            {workspace.modules.map((module) => (

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
'@

$newBlock = @'
        <ERPWorkspaceModulesPanel
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
Write-Host "OK - ERPWorkspaceModulesPanel extracted."
Write-Host "Run: pnpm build"