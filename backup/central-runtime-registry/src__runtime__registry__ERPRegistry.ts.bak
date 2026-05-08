import {
  ERPRegistryModules,
} from "./modules/ERPRegistryModules";

import type {
  ERPRegistryModule,
} from "./types";

export const ERPRegistry = {

  modules():
    ERPRegistryModule[] {

    return ERPRegistryModules;
  },

  module(
    moduleKey: string
  ): ERPRegistryModule | undefined {

    return ERPRegistryModules.find(
      (module) =>
        module.key === moduleKey
    );
  },

  navigation() {

    return ERPRegistryModules.flatMap(
      (module) =>
        module.navigation
    );
  },

  actions(
    moduleKey: string
  ) {

    return (
      this.module(moduleKey)
        ?.actions ?? []
    );
  },

  permissions(
    moduleKey: string
  ) {

    return (
      this.module(moduleKey)
        ?.permissions ?? []
    );
  },

  workflows(
    moduleKey: string
  ) {

    return (
      this.module(moduleKey)
        ?.workflows ?? []
    );
  },

  automation(
    moduleKey: string
  ) {

    return (
      this.module(moduleKey)
        ?.automation ?? []
    );
  },

  events(
    moduleKey: string
  ) {

    return (
      this.module(moduleKey)
        ?.events ?? []
    );
  },
};