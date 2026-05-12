import {
  GeneratedRuntimeBindings,
} from "../generated/GeneratedRuntimeBindings";

export interface RuntimeBinding {

  workflows: string[];

  permissions: string[];

  states: string[];
}

export class RuntimeBindingsRegistry {

  private bindings =
    new Map<
      string,
      RuntimeBinding
    >();

  initialize() {

    for (
      const [moduleId, binding]
      of Object.entries(
        GeneratedRuntimeBindings
      )
    ) {

      this.bindings.set(
        moduleId,
        binding
      );
    }
  }

  getBinding(
    moduleId: string
  ) {

    return this.bindings.get(
      moduleId
    );
  }

  getBindings() {

    return Array.from(
      this.bindings.entries()
    );
  }
}

export const runtimeBindingsRegistry =
  new RuntimeBindingsRegistry();

runtimeBindingsRegistry.initialize();