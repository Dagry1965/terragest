/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const repositoryPath = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "settings",
  "RuntimeSchedulingSettingsRepository.ts"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(repositoryPath)) {
  fail("RuntimeSchedulingSettingsRepository.ts introuvable");
}

const content = `import {
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

function getDb(
  context?: Pick<RuntimeSchedulingSettingsRepositoryContext, "firestore">
): Firestore {
  return context?.firestore ?? runtimeFirestore;
}

function requireTenantId(context: RuntimeSchedulingSettingsRepositoryContext): string {
  const tenantId = context.tenantId?.trim();

  if (!tenantId) {
    throw new Error("tenantId est requis pour les paramètres de planification.");
  }

  return tenantId;
}

function requireWorkspaceId(
  context: RuntimeSchedulingSettingsRepositoryContext
): string {
  const workspaceId = context.workspaceId?.trim();

  if (!workspaceId) {
    throw new Error(
      "workspaceId est requis pour les paramètres de planification workspace/module."
    );
  }

  return workspaceId;
}

function requireModuleKey(context: RuntimeSchedulingSettingsRepositoryContext): string {
  const moduleKey = context.moduleKey?.trim();

  if (!moduleKey) {
    throw new Error("moduleKey est requis pour les paramètres de planification module.");
  }

  return moduleKey;
}

function cleanSettings(settings: RuntimeSchedulingSettings): RuntimeSchedulingSettings {
  return Object.fromEntries(
    Object.entries(settings).filter(([, value]) => value !== undefined)
  ) as RuntimeSchedulingSettings;
}

function buildStoredSettings(
  input: RuntimeSchedulingSettingsSaveInput
): RuntimeStoredSchedulingSettings {
  const { context, scope, settings } = input;

  const tenantId = requireTenantId(context);
  const workspaceId =
    scope === "workspace" || scope === "module"
      ? requireWorkspaceId(context)
      : undefined;
  const moduleKey = scope === "module" ? requireModuleKey(context) : undefined;

  return {
    scope,
    tenantId,
    workspaceId,
    moduleKey,
    settings: cleanSettings(settings),
    updatedAt: serverTimestamp(),
    updatedBy: context.userId,
  };
}

export class RuntimeSchedulingSettingsRepository {
  static tenantDocRef(context: RuntimeSchedulingSettingsRepositoryContext) {
    const tenantId = requireTenantId(context);

    return doc(collection(getDb(context), "runtimeSchedulingSettings"), tenantId);
  }

  static workspaceDocRef(context: RuntimeSchedulingSettingsRepositoryContext) {
    const workspaceId = requireWorkspaceId(context);

    return doc(collection(this.tenantDocRef(context), "workspaces"), workspaceId);
  }

  static moduleDocRef(context: RuntimeSchedulingSettingsRepositoryContext) {
    const moduleKey = requireModuleKey(context);

    return doc(collection(this.workspaceDocRef(context), "modules"), moduleKey);
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

fs.writeFileSync(repositoryPath, content, "utf8");

ok("RuntimeSchedulingSettingsRepository.ts corrigé avec helpers typés requireTenantId/workspaceId/moduleKey");

console.log("");
console.log("[Q22E9D2_FIX_DONE] Repository scheduling settings corrigé.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");