/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function p(...parts) {
  return path.join(ROOT, ...parts);
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readFile(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));

  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak-q22e9e-scheduling-settings-resolver`;
    fs.copyFileSync(filePath, backupPath);
    console.log(`[BACKUP] ${path.relative(ROOT, backupPath)}`);
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(ROOT, filePath)}`);
}

function removeBackup(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`[REMOVED] ${path.relative(ROOT, filePath)}`);
  }
}

const settingsDir = p("src", "runtime", "scheduling", "settings");

const resolverPath = p(
  "src",
  "runtime",
  "scheduling",
  "settings",
  "RuntimeSchedulingSettingsResolver.ts"
);

const indexPath = p(
  "src",
  "runtime",
  "scheduling",
  "settings",
  "index.ts"
);

const resolverContent = `import type { ERPModule } from "@/runtime/modules/ERPModule";

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

export class RuntimeSchedulingSettingsResolver {
  static resolve(input: RuntimeSchedulingSettingsResolverInput) {
    return RuntimeSchedulingSettingsEngine.resolve({
      module: input.module,
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

writeFile(resolverPath, resolverContent);

let indexContent = readFile(indexPath);

if (!indexContent.includes("RuntimeSchedulingSettingsResolver")) {
  indexContent = `${indexContent.trim()}
export * from "./RuntimeSchedulingSettingsResolver";
`;

  writeFile(indexPath, indexContent);
} else {
  console.log("[SKIP] index.ts export déjà RuntimeSchedulingSettingsResolver");
}

removeBackup(`${resolverPath}.bak-q22e9e-scheduling-settings-resolver`);
removeBackup(`${indexPath}.bak-q22e9e-scheduling-settings-resolver`);

console.log("");
console.log("[Q22E9E_DONE] RuntimeSchedulingSettingsResolver créé.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
console.log("  git add .");
console.log('  git commit -m "feat(runtime): resolve persisted scheduling settings"');
console.log("  git tag q22e9e-scheduling-settings-resolver");