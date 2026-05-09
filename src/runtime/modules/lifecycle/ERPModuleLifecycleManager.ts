import type { ERPModule } from "../ERPModule";

export class ERPModuleLifecycleManager {

  static disable(
    module: ERPModule
  ): ERPModule {

    return {
      ...module,

      metadata: {
        ...module.metadata,

        enabled: false,
        visible: false,
      },
    };
  }

  static enable(
    module: ERPModule
  ): ERPModule {

    return {
      ...module,

      metadata: {
        ...module.metadata,

        enabled: true,
        visible: true,
      },
    };
  }
}