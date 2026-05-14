import {
  ERPWorkspaceRegistry,
} from "@/runtime/workspaces/ERPWorkspaceRegistry";

import {
  ERPSessionRuntime,
} from "@/runtime/security/sessions/ERPSessionRuntime";

export function getERPWorkspacesNavigation() {
  return ERPWorkspaceRegistry
    .filter((workspace) =>
      ERPSessionRuntime.canAccessWorkspace(
        workspace.key
      )
    )
    .map((workspace) => ({
      key: workspace.key,
      label: workspace.label,
      href: `/workspaces/${workspace.key}`,
      defaultHref: workspace.defaultHref,
      modules: workspace.modules
        .filter((module) =>
          ERPSessionRuntime.canAccessModule(
            module.key
          )
        )
        .map((module) => ({
          key: module.key,
          label: module.label,
          href: `/${module.key}`,
        })),
      quickActions: workspace.quickActions,
    }));
}