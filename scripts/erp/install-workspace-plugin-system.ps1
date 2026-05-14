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
# ERPWorkspacePlugin.ts
# =========================================================

$pluginTypePath = Join-Path `
  $root `
  "src\runtime\workspaces\plugins\ERPWorkspacePlugin.ts"

$pluginTypeContent = @'
import type {
  ERPWorkspace,
  ERPWorkspaceKpi,
  ERPWorkspaceModule,
  ERPWorkspaceQuickAction,
} from "../ERPWorkspaceTypes";

import type {
  ERPDashboardWidgetConfig,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

export interface ERPWorkspacePluginContext {
  workspace: ERPWorkspace;
}

export interface ERPWorkspacePlugin {

  key: string;

  enabled?: boolean;

  resolveModules?: (
    context: ERPWorkspacePluginContext
  ) => ERPWorkspaceModule[];

  resolveWidgets?: (
    context: ERPWorkspacePluginContext
  ) => ERPDashboardWidgetConfig[];

  resolveKpis?: (
    context: ERPWorkspacePluginContext
  ) => ERPWorkspaceKpi[];

  resolveQuickActions?: (
    context: ERPWorkspacePluginContext
  ) => ERPWorkspaceQuickAction[];
}
'@

# =========================================================
# ERPWorkspacePluginRegistry.ts
# =========================================================

$registryPath = Join-Path `
  $root `
  "src\runtime\workspaces\plugins\ERPWorkspacePluginRegistry.ts"

$registryContent = @'
import type {
  ERPWorkspacePlugin,
} from "./ERPWorkspacePlugin";

export class ERPWorkspacePluginRegistry {

  private static plugins:
    ERPWorkspacePlugin[] = [];

  static register(
    plugin: ERPWorkspacePlugin
  ) {

    this.plugins.push(plugin);
  }

  static getAll():
    ERPWorkspacePlugin[] {

    return this.plugins.filter(
      (plugin) =>
        plugin.enabled !== false
    );
  }
}
'@

# =========================================================
# ERPWorkspacePluginResolver.ts
# =========================================================

$resolverPath = Join-Path `
  $root `
  "src\runtime\workspaces\plugins\ERPWorkspacePluginResolver.ts"

$resolverContent = @'
import type {
  ERPWorkspaceKpi,
  ERPWorkspaceModule,
  ERPWorkspaceQuickAction,
} from "../ERPWorkspaceTypes";

import type {
  ERPDashboardWidgetConfig,
} from "@/runtime/dashboard/generic/ERPDashboardTypes";

import type {
  ERPWorkspace,
} from "../ERPWorkspaceTypes";

import {
  ERPWorkspacePluginRegistry,
} from "./ERPWorkspacePluginRegistry";

export class ERPWorkspacePluginResolver {

  static resolveModules(
    workspace: ERPWorkspace
  ): ERPWorkspaceModule[] {

    return (
      ERPWorkspacePluginRegistry
        .getAll()
        .flatMap(
          (plugin) =>
            plugin.resolveModules?.({
              workspace,
            }) ?? []
        )
    );
  }

  static resolveWidgets(
    workspace: ERPWorkspace
  ): ERPDashboardWidgetConfig[] {

    return (
      ERPWorkspacePluginRegistry
        .getAll()
        .flatMap(
          (plugin) =>
            plugin.resolveWidgets?.({
              workspace,
            }) ?? []
        )
    );
  }

  static resolveKpis(
    workspace: ERPWorkspace
  ): ERPWorkspaceKpi[] {

    return (
      ERPWorkspacePluginRegistry
        .getAll()
        .flatMap(
          (plugin) =>
            plugin.resolveKpis?.({
              workspace,
            }) ?? []
        )
    );
  }

  static resolveQuickActions(
    workspace: ERPWorkspace
  ): ERPWorkspaceQuickAction[] {

    return (
      ERPWorkspacePluginRegistry
        .getAll()
        .flatMap(
          (plugin) =>
            plugin.resolveQuickActions?.({
              workspace,
            }) ?? []
        )
    );
  }
}
'@

# =========================================================
# PATCH CONTEXT RESOLVER
# =========================================================

$contextResolverPath = Join-Path `
  $root `
  "src\runtime\workspaces\ERPWorkspaceContextResolver.ts"

$content = Get-Content $contextResolverPath -Raw

$content = $content.Replace(
'import {
  ERPWorkspaceDashboardResolver,
} from "./ERPWorkspaceDashboardResolver";',
'import {
  ERPWorkspaceDashboardResolver,
} from "./ERPWorkspaceDashboardResolver";

import {
  ERPWorkspacePluginResolver,
} from "./plugins/ERPWorkspacePluginResolver";'
)

$content = $content.Replace(
'    return workspace.modules;',
'    return [
      ...workspace.modules,
      ...ERPWorkspacePluginResolver.resolveModules(
        workspace
      ),
    ];'
)

$content = $content.Replace(
'    return ERPWorkspaceDashboardResolver.resolveWidgets(
      workspace
    );',
'    return [
      ...ERPWorkspaceDashboardResolver.resolveWidgets(
        workspace
      ),

      ...ERPWorkspacePluginResolver.resolveWidgets(
        workspace
      ),
    ];'
)

$content = $content.Replace(
'    return workspace.kpis;',
'    return [
      ...workspace.kpis,
      ...ERPWorkspacePluginResolver.resolveKpis(
        workspace
      ),
    ];'
)

$content = $content.Replace(
'    return workspace.quickActions;',
'    return [
      ...workspace.quickActions,
      ...ERPWorkspacePluginResolver.resolveQuickActions(
        workspace
      ),
    ];'
)

Write-Utf8NoBom `
  -Path $pluginTypePath `
  -Content $pluginTypeContent

Write-Utf8NoBom `
  -Path $registryPath `
  -Content $registryContent

Write-Utf8NoBom `
  -Path $resolverPath `
  -Content $resolverContent

Write-Utf8NoBom `
  -Path $contextResolverPath `
  -Content $content

Write-Host ""
Write-Host "OK - ERP Workspace Plugin System installed."
Write-Host "Run: pnpm build"