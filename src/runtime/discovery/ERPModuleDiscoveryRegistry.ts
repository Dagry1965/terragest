export class ERPModuleDiscoveryRegistry {

  private static modules:
    string[] = [];

  static register(
    moduleKey: string
  ) {

    if (
      !this.modules.includes(
        moduleKey
      )
    ) {
      this.modules.push(
        moduleKey
      );
    }
  }

  static getAll():
    string[] {

    return this.modules;
  }
}