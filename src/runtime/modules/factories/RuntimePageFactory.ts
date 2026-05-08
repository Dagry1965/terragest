import type { ERPModule } from "../ERPModule";
import { ERPModuleBuilder } from "../builders/ERPModuleBuilder";

export type RuntimePageType = "list" | "create" | "edit" | "details";

export class RuntimePageFactory {
  static create(module: ERPModule, pageType: RuntimePageType) {
    const runtime = ERPModuleBuilder.buildRuntime(module);

    return {
      type: pageType,
      module: module.metadata,
      schema: module.schema,
      runtime,
      route:
        pageType === "list"
          ? module.metadata.routes?.list
          : pageType === "create"
            ? module.metadata.routes?.create
            : pageType === "edit"
              ? module.metadata.routes?.edit
              : module.metadata.routes?.details,
    };
  }
}
