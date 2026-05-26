const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  service:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsService.ts",
  index:
    "src/runtime/scheduling/settings/index.ts",
};

function full(rel) {
  return path.join(ROOT, rel);
}

function ensureDir(rel) {
  fs.mkdirSync(path.dirname(full(rel)), { recursive: true });
}

function write(rel, content) {
  ensureDir(rel);
  fs.writeFileSync(full(rel), content, "utf8");
}

function read(rel) {
  const file = full(rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

if (fs.existsSync(full(files.service))) {
  throw new Error(`Le service existe déjà: ${files.service}`);
}

const service = [
  `import type { ERPModule } from "@/runtime/modules/ERPModule";`,
  ``,
  `import {`,
  `  RuntimeSchedulingSettingsRepository,`,
  `  type RuntimeSchedulingSettingsRepositoryContext,`,
  `} from "./RuntimeSchedulingSettingsRepository";`,
  ``,
  `import { RuntimeSchedulingSettingsResolver } from "./RuntimeSchedulingSettingsResolver";`,
  `import { RuntimeSchedulingSettingsEngine } from "./RuntimeSchedulingSettingsEngine";`,
  ``,
  `import type {`,
  `  RuntimeSchedulingEffectiveConfig,`,
  `  RuntimeSchedulingSettings,`,
  `  RuntimeSchedulingSettingsStorageScope,`,
  `  RuntimeSchedulingSettingsValidationResult,`,
  `} from "./RuntimeSchedulingSettingsTypes";`,
  ``,
  `export interface RuntimeSchedulingSettingsServiceContext`,
  `  extends RuntimeSchedulingSettingsRepositoryContext {`,
  `  module?: ERPModule;`,
  `}`,
  ``,
  `export interface RuntimeSchedulingSettingsReadInput {`,
  `  context: RuntimeSchedulingSettingsServiceContext;`,
  `}`,
  ``,
  `export interface RuntimeSchedulingSettingsSaveInput {`,
  `  context: RuntimeSchedulingSettingsServiceContext;`,
  `  scope: RuntimeSchedulingSettingsStorageScope;`,
  `  settings: RuntimeSchedulingSettings;`,
  `}`,
  ``,
  `export interface RuntimeSchedulingSettingsReadResult {`,
  `  storedSettings: Awaited<`,
  `    ReturnType<typeof RuntimeSchedulingSettingsRepository.resolveStoredSettings>`,
  `  >;`,
  `  effectiveConfig?: RuntimeSchedulingEffectiveConfig;`,
  `}`,
  ``,
  `export interface RuntimeSchedulingSettingsSaveResult {`,
  `  validation: RuntimeSchedulingSettingsValidationResult;`,
  `  effectiveConfig?: RuntimeSchedulingEffectiveConfig;`,
  `}`,
  ``,
  `function requireRuntimeContext(`,
  `  context: RuntimeSchedulingSettingsServiceContext`,
  `): void {`,
  `  const tenantId = context.tenantId?.trim();`,
  ``,
  `  if (!tenantId) {`,
  `    throw new Error("tenantId est requis pour les paramètres de planification.");`,
  `  }`,
  `}`,
  ``,
  `function assertScopeContext(`,
  `  scope: RuntimeSchedulingSettingsStorageScope,`,
  `  context: RuntimeSchedulingSettingsServiceContext`,
  `): void {`,
  `  requireRuntimeContext(context);`,
  ``,
  `  if ((scope === "workspace" || scope === "module") && !context.workspaceId?.trim()) {`,
  `    throw new Error(`,
  `      "workspaceId est requis pour les paramètres de planification workspace/module."`,
  `    );`,
  `  }`,
  ``,
  `  if (scope === "module" && !context.moduleKey?.trim()) {`,
  `    throw new Error(`,
  `      "moduleKey est requis pour les paramètres de planification module."`,
  `    );`,
  `  }`,
  `}`,
  ``,
  `async function resolveEffectiveConfigIfPossible(`,
  `  context: RuntimeSchedulingSettingsServiceContext`,
  `): Promise<RuntimeSchedulingEffectiveConfig | undefined> {`,
  `  if (!context.module) {`,
  `    return undefined;`,
  `  }`,
  ``,
  `  return RuntimeSchedulingSettingsResolver.resolveForRuntimeGuard({`,
  `    module: context.module,`,
  `    context: {`,
  `      tenantId: context.tenantId,`,
  `      workspaceId: context.workspaceId,`,
  `      moduleKey: context.moduleKey ?? context.module.metadata.key,`,
  `    },`,
  `  });`,
  `}`,
  ``,
  `export class RuntimeSchedulingSettingsService {`,
  `  static async read(`,
  `    input: RuntimeSchedulingSettingsReadInput`,
  `  ): Promise<RuntimeSchedulingSettingsReadResult> {`,
  `    const { context } = input;`,
  ``,
  `    requireRuntimeContext(context);`,
  ``,
  `    const storedSettings =`,
  `      await RuntimeSchedulingSettingsRepository.resolveStoredSettings(context);`,
  ``,
  `    const effectiveConfig =`,
  `      await resolveEffectiveConfigIfPossible(context);`,
  ``,
  `    return {`,
  `      storedSettings,`,
  `      effectiveConfig,`,
  `    };`,
  `  }`,
  ``,
  `  static validate(`,
  `    settings: RuntimeSchedulingSettings`,
  `  ): RuntimeSchedulingSettingsValidationResult {`,
  `    return RuntimeSchedulingSettingsEngine.validate(settings);`,
  `  }`,
  ``,
  `  static async save(`,
  `    input: RuntimeSchedulingSettingsSaveInput`,
  `  ): Promise<RuntimeSchedulingSettingsSaveResult> {`,
  `    const { context, scope, settings } = input;`,
  ``,
  `    assertScopeContext(scope, context);`,
  ``,
  `    const validation =`,
  `      RuntimeSchedulingSettingsEngine.validate(settings);`,
  ``,
  `    if (!validation.ok) {`,
  `      return {`,
  `        validation,`,
  `      };`,
  `    }`,
  ``,
  `    if (scope === "tenant") {`,
  `      await RuntimeSchedulingSettingsRepository.saveTenantSettings(`,
  `        context,`,
  `        settings`,
  `      );`,
  `    }`,
  ``,
  `    if (scope === "workspace") {`,
  `      await RuntimeSchedulingSettingsRepository.saveWorkspaceSettings(`,
  `        context,`,
  `        settings`,
  `      );`,
  `    }`,
  ``,
  `    if (scope === "module") {`,
  `      await RuntimeSchedulingSettingsRepository.saveModuleSettings(`,
  `        context,`,
  `        settings`,
  `      );`,
  `    }`,
  ``,
  `    const effectiveConfig =`,
  `      await resolveEffectiveConfigIfPossible(context);`,
  ``,
  `    return {`,
  `      validation,`,
  `      effectiveConfig,`,
  `    };`,
  `  }`,
  `}`,
  ``,
].join("\n");

write(files.service, service);

let index = read(files.index);

if (!index.includes('RuntimeSchedulingSettingsService')) {
  index = `${index.trim()}
export * from "./RuntimeSchedulingSettingsService";
`;
  write(files.index, index);
}

console.log("");
console.log("[Q22E-9N-D2] DONE");
console.log("[CREATED]");
console.log(`- ${files.service}`);
console.log("[UPDATED]");
console.log(`- ${files.index}`);
console.log("");
console.log("Next:");
console.log("pnpm build");