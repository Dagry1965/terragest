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