import {
  GeneratedRuntimeBindings,
} from "../generated/GeneratedRuntimeBindings";

export class RuntimeStateRegistry {

  private states =
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

      this.states.set(
        moduleId,
        binding.states
      );
    }
  }

  getModuleStates(
    moduleId: string
  ) {

    return this.states.get(
      moduleId
    ) ?? [];
  }

  getAllStates() {

    return Array.from(
      this.states.entries()
    );
  }
}

export const runtimeStateRegistry =
  new RuntimeStateRegistry();

runtimeStateRegistry.initialize();