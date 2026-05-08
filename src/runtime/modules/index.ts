export type {
  ERPModule,
  ERPModuleAction,
  ERPModuleRelation,
  ERPModuleWorkflow,
} from "./ERPModule";

export { ERPModuleRegistry } from "./ERPModuleRegistry";

export type { ERPModuleMetadata } from "./metadata/ERPModuleMetadata";

export type {
  ERPModuleSchema,
  ERPModuleField,
  ERPModuleFieldOption,
  ERPModuleFieldType,
} from "./schemas/ERPModuleSchema";

export {
  ERPModuleBuilder,
  type ERPTableDefinition,
  type ERPFormDefinition,
  type ERPDetailsDefinition,
  type ERPModuleRuntimeDefinition,
} from "./builders/ERPModuleBuilder";

export { ERPModuleRenderer } from "./renderers/ERPModuleRenderer";
export { RuntimePageFactory, type RuntimePageType } from "./factories/RuntimePageFactory";
export { RuntimeFormFactory } from "./factories/RuntimeFormFactory";
export { RuntimeTableFactory } from "./factories/RuntimeTableFactory";

export { coreERPModules } from "./definitions/coreModules";
export { registerCoreModules } from "./registry/registerCoreModules";
