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