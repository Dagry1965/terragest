/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const resolverPath = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "settings",
  "RuntimeSchedulingSettingsResolver.ts"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(resolverPath)) {
  fail("RuntimeSchedulingSettingsResolver.ts introuvable");
}

const content = `import type { ERPModule } from "@/runtime/modules/ERPModule";

import { RuntimeSchedulingSettingsEngine } from "./RuntimeSchedulingSettingsEngine";
import {
  RuntimeSchedulingSettingsRepository,
  type RuntimeSchedulingSettingsRepositoryContext,
} from "./RuntimeSchedulingSettingsRepository";

import type {
  RuntimeSchedulingSettings,
  RuntimeStoredSchedulingSettings,
} from "./RuntimeSchedulingSettingsTypes";

export interface RuntimeSchedulingSettingsResolverInput {
  module: ERPModule;
  context: RuntimeSchedulingSettingsRepositoryContext;
  tenantSettings?: RuntimeStoredSchedulingSettings | RuntimeSchedulingSettings;
  workspaceSettings?: RuntimeStoredSchedulingSettings | RuntimeSchedulingSettings;
  moduleSettings?: RuntimeStoredSchedulingSettings | RuntimeSchedulingSettings;
}

export interface RuntimeSchedulingSettingsResolverLoadInput {
  module: ERPModule;
  context: RuntimeSchedulingSettingsRepositoryContext;
}

function unwrapStoredSettings(
  value?: RuntimeStoredSchedulingSettings | RuntimeSchedulingSettings
): RuntimeSchedulingSettings | undefined {
  if (!value) {
    return undefined;
  }

  if ("settings" in value && value.settings) {
    return value.settings;
  }

  return value as RuntimeSchedulingSettings;
}

function requireModuleKey(
  context: RuntimeSchedulingSettingsRepositoryContext
): string {
  const moduleKey = context.moduleKey?.trim();

  if (!moduleKey) {
    throw new Error(
      "moduleKey est requis pour résoudre les paramètres de planification effectifs."
    );
  }

  return moduleKey;
}

export class RuntimeSchedulingSettingsResolver {
  static resolve(input: RuntimeSchedulingSettingsResolverInput) {
    return RuntimeSchedulingSettingsEngine.resolve({
      moduleKey: requireModuleKey(input.context),
      moduleScheduling: input.module.scheduling,
      tenantSettings: unwrapStoredSettings(input.tenantSettings),
      workspaceSettings: unwrapStoredSettings(input.workspaceSettings),
      moduleSettings: unwrapStoredSettings(input.moduleSettings),
    });
  }

  static async loadAndResolve(input: RuntimeSchedulingSettingsResolverLoadInput) {
    const storedSettings =
      await RuntimeSchedulingSettingsRepository.resolveStoredSettings(
        input.context
      );

    return this.resolve({
      module: input.module,
      context: input.context,
      tenantSettings: storedSettings.tenantSettings,
      workspaceSettings: storedSettings.workspaceSettings,
      moduleSettings: storedSettings.moduleSettings,
    });
  }
}
`;

fs.writeFileSync(resolverPath, content, "utf8");

ok("RuntimeSchedulingSettingsResolver.ts corrigé : moduleKey requis depuis context.moduleKey");

console.log("");
console.log("[Q22E9E_REQUIRE_MODULE_KEY_FIX_DONE] Resolver aligné sans supposer module.key/module.id.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");