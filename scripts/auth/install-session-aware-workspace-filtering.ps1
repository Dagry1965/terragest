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
  "src\runtime\workspaces\ERPWorkspaceContextResolver.ts"

$content =
  Get-Content `
    $resolverPath `
    -Raw

# =========================================================
# IMPORT SESSION RUNTIME
# =========================================================

$content = $content.Replace(
'import {
  ERPWorkspacePluginResolver,
} from "./plugins/ERPWorkspacePluginResolver";',
'import {
  ERPWorkspacePluginResolver,
} from "./plugins/ERPWorkspacePluginResolver";

import {
  ERPSessionRuntime,
} from "@/runtime/security/sessions/ERPSessionRuntime";'
)

# =========================================================
# FILTER MODULES
# =========================================================

$oldModules = @'
    return [
      ...workspace.modules,
      ...ERPWorkspacePluginResolver.resolveModules(
        workspace
      ),
    ];
'@

$newModules = @'
    return [

      ...workspace.modules,

      ...ERPWorkspacePluginResolver.resolveModules(
        workspace
      ),

    ].filter(
      (module) =>
        ERPSessionRuntime.canAccessModule(
          module.key
        )
    );
'@

$content =
  $content.Replace(
    $oldModules,
    $newModules
  )

# =========================================================
# FILTER KPIS
# =========================================================

$oldKpis = @'
    return [
      ...workspace.kpis,
      ...ERPWorkspacePluginResolver.resolveKpis(
        workspace
      ),
    ];
'@

$newKpis = @'
    return [

      ...workspace.kpis,

      ...ERPWorkspacePluginResolver.resolveKpis(
        workspace
      ),

    ].filter(
      (kpi) =>
        !kpi.module
        ||
        ERPSessionRuntime.canAccessModule(
          kpi.module
        )
    );
'@

$content =
  $content.Replace(
    $oldKpis,
    $newKpis
  )

# =========================================================
# FILTER WIDGETS
# =========================================================

$oldWidgets = @'
    return [
      ...ERPWorkspaceDashboardResolver.resolveWidgets(
        workspace
      ),

      ...ERPWorkspacePluginResolver.resolveWidgets(
        workspace
      ),
    ];
'@

$newWidgets = @'
    return [

      ...ERPWorkspaceDashboardResolver.resolveWidgets(
        workspace
      ),

      ...ERPWorkspacePluginResolver.resolveWidgets(
        workspace
      ),

    ].filter(
      (widget) =>
        ERPSessionRuntime.canAccessModule(
          widget.moduleKey
        )
    );
'@

$content =
  $content.Replace(
    $oldWidgets,
    $newWidgets
  )

# =========================================================
# FILTER QUICK ACTIONS
# =========================================================

$oldQuickActions = @'
    return [
      ...workspace.quickActions,
      ...ERPWorkspacePluginResolver.resolveQuickActions(
        workspace
      ),
    ];
'@

$newQuickActions = @'
    return [

      ...workspace.quickActions,

      ...ERPWorkspacePluginResolver.resolveQuickActions(
        workspace
      ),

    ].filter(
      (action) => {

        const moduleKey =
          action.href
            .split("/")[1];

        return (
          !moduleKey
          ||
          ERPSessionRuntime.canAccessModule(
            moduleKey
          )
        );
      }
    );
'@

$content =
  $content.Replace(
    $oldQuickActions,
    $newQuickActions
  )

# =========================================================
# FILTER WORKSPACE ACCESS
# =========================================================

$oldContext = @'
    return {
      workspace,
'@

$newContext = @'
    if (
      !ERPSessionRuntime.canAccessWorkspace(
        workspace.key
      )
    ) {

      return {
        workspace,

        modules: [],

        widgets: [],

        kpis: [],

        quickActions: [],
      };
    }

    return {
      workspace,
'@

$content =
  $content.Replace(
    $oldContext,
    $newContext
  )

Write-Utf8NoBom `
  -Path $resolverPath `
  -Content $content

Write-Host ""
Write-Host "OK - Session-aware workspace filtering installed."
Write-Host "Run: pnpm build"