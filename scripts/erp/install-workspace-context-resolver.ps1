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

$typesPath = Join-Path `
  $root `
  "src\runtime\workspaces\ERPWorkspaceContext.ts"

$typesContent = @'
import type {
  ERPWorkspace,
  ERPWorkspaceKpi,
  ERPWorkspaceModule,
  ERPWorkspaceQuickAction,
} from "./ERPWorkspaceTypes";

import type {
  ERPDashboardWidgetConfig,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

export interface ERPWorkspaceContext {
  workspace: ERPWorkspace;

  modules: ERPWorkspaceModule[];

  widgets: ERPDashboardWidgetConfig[];

  kpis: ERPWorkspaceKpi[];

  quickActions: ERPWorkspaceQuickAction[];
}
'@

$resolverPath = Join-Path `
  $root `
  "src\runtime\workspaces\ERPWorkspaceContextResolver.ts"

$resolverContent = @'
import type {
  ERPWorkspace,
  ERPWorkspaceKpi,
  ERPWorkspaceModule,
  ERPWorkspaceQuickAction,
} from "./ERPWorkspaceTypes";

import type {
  ERPDashboardWidgetConfig,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

import type {
  ERPWorkspaceContext,
} from "./ERPWorkspaceContext";

import {
  ERPWorkspaceDashboardResolver,
} from "./ERPWorkspaceDashboardResolver";

export class ERPWorkspaceContextResolver {

  static resolveModules(
    workspace: ERPWorkspace
  ): ERPWorkspaceModule[] {

    return workspace.modules;
  }

  static resolveWidgets(
    workspace: ERPWorkspace
  ): ERPDashboardWidgetConfig[] {

    return ERPWorkspaceDashboardResolver.resolveWidgets(
      workspace
    );
  }

  static resolveKpis(
    workspace: ERPWorkspace
  ): ERPWorkspaceKpi[] {

    return workspace.kpis;
  }

  static resolveQuickActions(
    workspace: ERPWorkspace
  ): ERPWorkspaceQuickAction[] {

    return workspace.quickActions;
  }

  static resolveWorkspaceContext(
    workspace: ERPWorkspace
  ): ERPWorkspaceContext {

    return {
      workspace,

      modules:
        this.resolveModules(
          workspace
        ),

      widgets:
        this.resolveWidgets(
          workspace
        ),

      kpis:
        this.resolveKpis(
          workspace
        ),

      quickActions:
        this.resolveQuickActions(
          workspace
        ),
    };
  }
}
'@

Write-Utf8NoBom `
  -Path $typesPath `
  -Content $typesContent

Write-Utf8NoBom `
  -Path $resolverPath `
  -Content $resolverContent

Write-Host ""
Write-Host "OK - ERPWorkspaceContextResolver installed."
Write-Host "Run: pnpm build"