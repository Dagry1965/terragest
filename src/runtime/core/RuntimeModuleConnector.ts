import type {
  RuntimeModuleContract,
} from "./RuntimeContracts";

import type {
  RuntimeBinding,
} from "./RuntimeBindings";

export function connectRuntimeModule(
  module: RuntimeModuleContract
): RuntimeBinding {

  return {

    workflows:
      module.workflows,

    permissions:
      module.permissions,

    states:
      module.states,
  };
}