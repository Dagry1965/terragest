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

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));

  if (fs.existsSync(filePath)) {
    const backupPath = `${filePath}.bak-q22e9d-scheduling-settings-repository`;
    fs.copyFileSync(filePath, backupPath);
    console.log(`[BACKUP] ${path.relative(ROOT, backupPath)}`);
  }

  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(ROOT, filePath)}`);
}

function readFile(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function removeBackup(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`[REMOVED] ${path.relative(ROOT, filePath)}`);
  }
}

const settingsDir = p("src", "runtime", "scheduling", "settings");
const repositoryPath = p(
  "src",
  "runtime",
  "scheduling",
  "settings",
  "RuntimeSchedulingSettingsRepository.ts"
);
const indexPath = p("src", "runtime", "scheduling", "settings", "index.ts");

const repositoryContent = `import {
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  type Firestore,
} from "firebase/firestore";

import { runtimeFirestore } from "@/runtime/firebase/runtime-firestore";

import type {
  RuntimeSchedulingSettings,
  RuntimeSchedulingSettingsScope,
  RuntimeStoredSchedulingSettings,
} from "./RuntimeSchedulingSettingsTypes";

export interface RuntimeSchedulingSettingsRepositoryContext {
  tenantId: string;
  workspaceId?: string;
  moduleKey?: string;
  userId?: string;
  firestore?: Firestore;
}

export interface RuntimeSchedulingStoredSettingsBundle {
  tenantSettings?: RuntimeStoredSchedulingSettings;
  workspaceSettings?: RuntimeStoredSchedulingSettings;
  moduleSettings?: RuntimeStoredSchedulingSettings;
}

export interface RuntimeSchedulingSettingsSaveInput {
  context: RuntimeSchedulingSettingsRepositoryContext;
  scope: RuntimeSchedulingSettingsScope;
  settings: RuntimeSchedulingSettings;
}

function assertTenantId(tenantId: string): void {
  if (!tenantId || !tenantId.trim()) {
    throw new Error("tenantId est requis pour les paramètres de planification.");
  }
}

function assertWorkspaceId(workspaceId?: string): asserts workspaceId is string {
  if (!workspaceId || !workspaceId.trim()) {
    throw new Error("workspaceId est requis pour les paramètres de planification workspace/module.");
  }
}

function assertModuleKey(moduleKey?: string): asserts moduleKey is string {
  if (!moduleKey || !moduleKey.trim()) {
    throw new Error("moduleKey est requis pour les paramètres de planification module.");
  }
}

function getDb(context?: Pick<RuntimeSchedulingSettingsRepositoryContext, "firestore">): Firestore {
  return context?.firestore ?? runtimeFirestore;
}

function cleanSettings(
  settings: RuntimeSchedulingSettings
): RuntimeSchedulingSettings {
  return Object.fromEntries(
    Object.entries(settings).filter(([, value]) => value !== undefined)
  ) as RuntimeSchedulingSettings;
}

function buildStoredSettings(
  input: RuntimeSchedulingSettingsSaveInput
): RuntimeStoredSchedulingSettings {
  const { context, scope, settings } = input;

  assertTenantId(context.tenantId);

  if (scope === "workspace") {
    assertWorkspaceId(context.workspaceId);
  }

  if (scope === "module") {
    assertWorkspaceId(context.workspaceId);
    assertModuleKey(context.moduleKey);
  }

  const now = serverTimestamp();

  return {
    scope,
    tenantId: context.tenantId,
    workspaceId: scope === "tenant" ? undefined : context.workspaceId,
    moduleKey: scope === "module" ? context.moduleKey : undefined,
    settings: cleanSettings(settings),
    updatedAt: now,
    updatedBy: context.userId,
  };
}

export class RuntimeSchedulingSettingsRepository {
  static tenantDocRef(
    context: RuntimeSchedulingSettingsRepositoryContext
  ) {
    assertTenantId(context.tenantId);

    return doc(
      collection(getDb(context), "runtimeSchedulingSettings"),
      context.tenantId
    );
  }

  static workspaceDocRef(
    context: RuntimeSchedulingSettingsRepositoryContext
  ) {
    assertTenantId(context.tenantId);
    assertWorkspaceId(context.workspaceId);

    return doc(
      collection(this.tenantDocRef(context), "workspaces"),
      context.workspaceId
    );
  }

  static moduleDocRef(
    context: RuntimeSchedulingSettingsRepositoryContext
  ) {
    assertTenantId(context.tenantId);
    assertWorkspaceId(context.workspaceId);
    assertModuleKey(context.moduleKey);

    return doc(
      collection(this.workspaceDocRef(context), "modules"),
      context.moduleKey
    );
  }

  static async readTenantSettings(
    context: RuntimeSchedulingSettingsRepositoryContext
  ): Promise<RuntimeStoredSchedulingSettings | undefined> {
    const snapshot = await getDoc(this.tenantDocRef(context));

    if (!snapshot.exists()) {
      return undefined;
    }

    return snapshot.data() as RuntimeStoredSchedulingSettings;
  }

  static async readWorkspaceSettings(
    context: RuntimeSchedulingSettingsRepositoryContext
  ): Promise<RuntimeStoredSchedulingSettings | undefined> {
    const snapshot = await getDoc(this.workspaceDocRef(context));

    if (!snapshot.exists()) {
      return undefined;
    }

    return snapshot.data() as RuntimeStoredSchedulingSettings;
  }

  static async readModuleSettings(
    context: RuntimeSchedulingSettingsRepositoryContext
  ): Promise<RuntimeStoredSchedulingSettings | undefined> {
    const snapshot = await getDoc(this.moduleDocRef(context));

    if (!snapshot.exists()) {
      return undefined;
    }

    return snapshot.data() as RuntimeStoredSchedulingSettings;
  }

  static async saveTenantSettings(
    context: RuntimeSchedulingSettingsRepositoryContext,
    settings: RuntimeSchedulingSettings
  ): Promise<void> {
    await setDoc(
      this.tenantDocRef(context),
      buildStoredSettings({
        context,
        scope: "tenant",
        settings,
      }),
      { merge: true }
    );
  }

  static async saveWorkspaceSettings(
    context: RuntimeSchedulingSettingsRepositoryContext,
    settings: RuntimeSchedulingSettings
  ): Promise<void> {
    await setDoc(
      this.workspaceDocRef(context),
      buildStoredSettings({
        context,
        scope: "workspace",
        settings,
      }),
      { merge: true }
    );
  }

  static async saveModuleSettings(
    context: RuntimeSchedulingSettingsRepositoryContext,
    settings: RuntimeSchedulingSettings
  ): Promise<void> {
    await setDoc(
      this.moduleDocRef(context),
      buildStoredSettings({
        context,
        scope: "module",
        settings,
      }),
      { merge: true }
    );
  }

  static async resolveStoredSettings(
    context: RuntimeSchedulingSettingsRepositoryContext
  ): Promise<RuntimeSchedulingStoredSettingsBundle> {
    const tenantSettings = await this.readTenantSettings(context);

    const workspaceSettings = context.workspaceId
      ? await this.readWorkspaceSettings(context)
      : undefined;

    const moduleSettings =
      context.workspaceId && context.moduleKey
        ? await this.readModuleSettings(context)
        : undefined;

    return {
      tenantSettings,
      workspaceSettings,
      moduleSettings,
    };
  }
}
`;

writeFile(repositoryPath, repositoryContent);

let indexContent = readFile(indexPath);

if (!indexContent.includes("RuntimeSchedulingSettingsRepository")) {
  indexContent = `${indexContent.trim()}
export * from "./RuntimeSchedulingSettingsRepository";
`;
  writeFile(indexPath, indexContent);
} else {
  console.log("[SKIP] index.ts export déjà RuntimeSchedulingSettingsRepository");
}

removeBackup(
  `${repositoryPath}.bak-q22e9d-scheduling-settings-repository`
);
removeBackup(`${indexPath}.bak-q22e9d-scheduling-settings-repository`);

console.log("");
console.log("[Q22E9D_DONE] RuntimeSchedulingSettingsRepository créé.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
console.log("  git add .");
console.log('  git commit -m "feat(runtime): add scheduling settings repository"');
console.log("  git tag q22e9d-scheduling-settings-repository");