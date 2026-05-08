import {
  GeneratedRuntimeBindings,
} from "../generated/GeneratedRuntimeBindings";

export class RuntimePermissionRegistry {

  private permissions =
    new Map<
      string,
      string[]
    >();

  initialize() {

    for (
      const [moduleId, binding]
      of Object.entries(
        GeneratedRuntimeBindings
      )
    ) {

      this.permissions.set(
        moduleId,
        binding.permissions
      );
    }
  }

  getModulePermissions(
    moduleId: string
  ) {

    return this.permissions.get(
      moduleId
    ) ?? [];
  }

  getAllPermissions() {

    return Array.from(
      this.permissions.entries()
    );
  }
}

export const runtimePermissionRegistry =
  new RuntimePermissionRegistry();

runtimePermissionRegistry.initialize();