$ErrorActionPreference = "Stop"

$path = "C:\Users\Admin\terragest\src\runtime\navigation\ERPNavigationEngine.ts"

$content = @'
import {
  ERPWorkspaceRegistry,
} from "@/runtime/workspaces/ERPWorkspaceRegistry";

export function getERPWorkspacesNavigation() {
  return ERPWorkspaceRegistry.map((workspace) => ({
    key: workspace.key,
    label: workspace.label,
    href: `/workspaces/${workspace.key}`,
    defaultHref: workspace.defaultHref,
    modules: workspace.modules.map((module) => ({
      key: module.key,
      label: module.label,
      href: `/${module.key}`,
    })),
    quickActions: workspace.quickActions,
  }));
}
'@

[System.IO.File]::WriteAllText(
  $path,
  $content,
  [System.Text.UTF8Encoding]::new($false)
)

Write-Host "OK - ERPNavigationEngine now points workspaces to /workspaces/[workspace]"