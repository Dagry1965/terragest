import {
  ERPWorkspaceRegistry,
} from "@/runtime/workspaces/ERPWorkspaceRegistry";

import {
  ERPSessionRuntime,
} from "@/runtime/security/sessions/ERPSessionRuntime";

export function getERPWorkspacesNavigation() {
  const workspaceNavigation = ERPWorkspaceRegistry
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

  return [
    ...workspaceNavigation,
    {
      key: "settings",
      label: "Paramètres ERP",
      href: "/settings",
      defaultHref: "/settings/scheduling",
      modules: [
        {
          key: "settings-scheduling",
          label: "Planning",
          href: "/settings/scheduling",
        },
      ],
      quickActions: [],
    },
  ];
}