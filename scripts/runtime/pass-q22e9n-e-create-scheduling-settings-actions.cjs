const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  actions:
    "src/runtime/scheduling/settings/RuntimeSchedulingSettingsActions.ts",
  index:
    "src/runtime/scheduling/settings/index.ts",
};

function full(rel) {
  return path.join(ROOT, rel);
}

function ensureDir(rel) {
  fs.mkdirSync(path.dirname(full(rel)), { recursive: true });
}

function read(rel) {
  const file = full(rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function write(rel, content) {
  ensureDir(rel);
  fs.writeFileSync(full(rel), content, "utf8");
}

if (fs.existsSync(full(files.actions))) {
  throw new Error(`Le fichier actions existe déjà: ${files.actions}`);
}

const actions = `"use server";

import type { ERPModule } from "@/runtime/modules/ERPModule";

import {
  RuntimeSchedulingSettingsService,
  type RuntimeSchedulingSettingsServiceContext,
} from "./RuntimeSchedulingSettingsService";

import type {
  RuntimeSchedulingSettings,
  RuntimeSchedulingSettingsStorageScope,
} from "./RuntimeSchedulingSettingsTypes";

export interface RuntimeSchedulingSettingsActionContext
  extends Omit<RuntimeSchedulingSettingsServiceContext, "module"> {
  module?: ERPModule;
}

export interface ReadRuntimeSchedulingSettingsActionInput {
  context: RuntimeSchedulingSettingsActionContext;
}

export interface SaveRuntimeSchedulingSettingsActionInput {
  context: RuntimeSchedulingSettingsActionContext;
  scope: RuntimeSchedulingSettingsStorageScope;
  settings: RuntimeSchedulingSettings;
}

function assertActionContext(
  context: RuntimeSchedulingSettingsActionContext
): void {
  const tenantId = context.tenantId?.trim();

  if (!tenantId) {
    throw new Error("tenantId est requis pour lire ou modifier les paramètres de planification.");
  }
}

export async function readRuntimeSchedulingSettingsAction(
  input: ReadRuntimeSchedulingSettingsActionInput
) {
  const { context } = input;

  assertActionContext(context);

  return RuntimeSchedulingSettingsService.read({
    context,
  });
}

export async function saveRuntimeSchedulingSettingsAction(
  input: SaveRuntimeSchedulingSettingsActionInput
) {
  const { context, scope, settings } = input;

  assertActionContext(context);

  return RuntimeSchedulingSettingsService.save({
    context,
    scope,
    settings,
  });
}
`;

write(files.actions, actions);

let index = read(files.index);

if (!index.includes('RuntimeSchedulingSettingsActions')) {
  index = `${index.trim()}
export * from "./RuntimeSchedulingSettingsActions";
`;
  write(files.index, index);
}

console.log("");
console.log("[Q22E-9N-E] DONE");
console.log("[CREATED]");
console.log(`- ${files.actions}`);
console.log("[UPDATED]");
console.log(`- ${files.index}`);
console.log("");
console.log("Next:");
console.log("pnpm build");