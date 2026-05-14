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