export class ERPPluginDiscoveryRegistry {

  private static plugins:
    string[] = [];

  static register(
    pluginKey: string
  ) {

    if (
      !this.plugins.includes(
        pluginKey
      )
    ) {
      this.plugins.push(
        pluginKey
      );
    }
  }

  static getAll():
    string[] {

    return this.plugins;
  }
}