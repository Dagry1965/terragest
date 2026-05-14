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

$resolverPath = Join-Path `
  $root `
  "src\runtime\workspaces\ERPWorkspaceDashboardResolver.ts"

$resolverContent = @'
import type {
  ERPDashboardWidgetConfig,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

import {
  ERPBusinessDashboardConfig,
} from "@/runtime/dashboard/generic/configs/ERPBusinessDashboardConfig";

import type {
  ERPWorkspace,
} from "./ERPWorkspaceTypes";

export class ERPWorkspaceDashboardResolver {

  static resolveWidgets(
    workspace: ERPWorkspace
  ): ERPDashboardWidgetConfig[] {

    const workspaceModuleKeys =
      workspace.modules.map(
        (module) => module.key
      );

    return ERPBusinessDashboardConfig.widgets.filter(
      (widget) =>
        workspaceModuleKeys.includes(
          widget.moduleKey
        )
    );
  }
}
'@

$widgetsPath = Join-Path `
  $root `
  "src\components\erp\workspace\ERPWorkspaceRuntimeWidgets.tsx"

$content = Get-Content $widgetsPath -Raw

$content = $content.Replace(
'import {
  ERPBusinessDashboardConfig,
} from "@/runtime/dashboard/generic/configs/ERPBusinessDashboardConfig";

import {
  ERPDashboardWidgetEngine,
} from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";',
'import {
  ERPDashboardWidgetEngine,
} from "@/runtime/dashboard/generic/ERPDashboardWidgetEngine";

import {
  ERPWorkspaceDashboardResolver,
} from "@/runtime/workspaces/ERPWorkspaceDashboardResolver";'
)

$oldBlock = @'
  const workspaceModuleKeys =
    workspace.modules.map(
      (module) => module.key
    );

  const widgets =
    ERPBusinessDashboardConfig.widgets.filter(
      (widget) =>
        workspaceModuleKeys.includes(
          widget.moduleKey
        )
    );
'@

$newBlock = @'
  const widgets =
    ERPWorkspaceDashboardResolver.resolveWidgets(
      workspace
    );
'@

$content = $content.Replace(
  $oldBlock,
  $newBlock
)

Write-Utf8NoBom `
  -Path $resolverPath `
  -Content $resolverContent

Write-Utf8NoBom `
  -Path $widgetsPath `
  -Content $content

Write-Host ""
Write-Host "OK - ERPWorkspaceDashboardResolver installed."
Write-Host "Run: pnpm build"