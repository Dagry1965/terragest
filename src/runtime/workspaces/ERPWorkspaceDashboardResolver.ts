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