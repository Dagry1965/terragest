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

import {
  ERPWorkspacePluginResolver,
} from "./plugins/ERPWorkspacePluginResolver";

import {
  ERPSessionRuntime,
} from "@/runtime/security/sessions/ERPSessionRuntime";

export class ERPWorkspaceContextResolver {

  static resolveModules(
    workspace: ERPWorkspace
  ): ERPWorkspaceModule[] {

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
  }

  static resolveWidgets(
    workspace: ERPWorkspace
  ): ERPDashboardWidgetConfig[] {

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
  }

  static resolveKpis(
    workspace: ERPWorkspace
  ): ERPWorkspaceKpi[] {

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
  }

  static resolveQuickActions(
    workspace: ERPWorkspace
  ): ERPWorkspaceQuickAction[] {

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
  }

  static resolveWorkspaceContext(
    workspace: ERPWorkspace
  ): ERPWorkspaceContext {

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