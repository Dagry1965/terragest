/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const typesPath = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "settings",
  "RuntimeSchedulingSettingsTypes.ts"
);

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

if (!fs.existsSync(typesPath)) {
  fail("RuntimeSchedulingSettingsTypes.ts introuvable");
}

if (!fs.existsSync(repositoryPath)) {
  fail("RuntimeSchedulingSettingsRepository.ts introuvable");
}

let types = fs.readFileSync(typesPath, "utf8");
let repository = fs.readFileSync(repositoryPath, "utf8");

if (!types.includes("export interface RuntimeSchedulingSettings")) {
  fail("RuntimeSchedulingSettings introuvable");
}

if (!types.includes("extends RuntimeSchedulingSettingsScope")) {
  fail(
    "Le fichier ne contient pas le contrat attendu : RuntimeSchedulingSettings extends RuntimeSchedulingSettingsScope"
  );
}

/**
 * Supprime uniquement la mauvaise définition union ajoutée précédemment.
 */
types = types.replace(
  /export\s+type\s+RuntimeSchedulingSettingsScope\s*=\s*["']tenant["']\s*\|\s*["']workspace["']\s*\|\s*["']module["'];\s*/g,
  ""
);

/**
 * Si l'interface RuntimeSchedulingSettingsScope n'existe plus,
 * on la restaure comme metadata de contexte compatible avec `extends`.
 */
if (!/export\s+interface\s+RuntimeSchedulingSettingsScope\s*\{/.test(types)) {
  const scopeInterface = `export interface RuntimeSchedulingSettingsScope {
  tenantId?: string;
  workspaceId?: string;
  moduleKey?: string;
}
`;

  types = `${scopeInterface}

${types.trimStart()}`;
  ok("RuntimeSchedulingSettingsScope restauré comme interface");
} else {
  ok("RuntimeSchedulingSettingsScope existe déjà comme interface");
}

/**
 * Ajoute un type distinct pour le scope de stockage repository.
 */
if (!types.includes("RuntimeSchedulingSettingsStorageScope")) {
  types = `${types.trimEnd()}

export type RuntimeSchedulingSettingsStorageScope = "tenant" | "workspace" | "module";
`;
  ok("RuntimeSchedulingSettingsStorageScope ajouté");
} else {
  ok("RuntimeSchedulingSettingsStorageScope existe déjà");
}

/**
 * Corrige RuntimeStoredSchedulingSettings pour utiliser le scope de stockage.
 */
types = types.replace(
  /scope\s*:\s*RuntimeSchedulingSettingsScope\s*;/g,
  "scope: RuntimeSchedulingSettingsStorageScope;"
);

if (!types.includes("export interface RuntimeStoredSchedulingSettings")) {
  types = `${types.trimEnd()}

export interface RuntimeStoredSchedulingSettings {
  scope: RuntimeSchedulingSettingsStorageScope;
  tenantId: string;
  workspaceId?: string;
  moduleKey?: string;
  settings: RuntimeSchedulingSettings;
  updatedAt?: unknown;
  updatedBy?: string;
}
`;
  ok("RuntimeStoredSchedulingSettings ajouté");
} else {
  ok("RuntimeStoredSchedulingSettings existe déjà");
}

fs.writeFileSync(typesPath, types, "utf8");

/**
 * Corrige le repository pour importer/utiliser RuntimeSchedulingSettingsStorageScope.
 */
repository = repository.replace(
  /RuntimeSchedulingSettingsScope,/g,
  "RuntimeSchedulingSettingsStorageScope,"
);

repository = repository.replace(
  /scope:\s*RuntimeSchedulingSettingsScope;/g,
  "scope: RuntimeSchedulingSettingsStorageScope;"
);

repository = repository.replace(
  /RuntimeSchedulingSettingsScope/g,
  "RuntimeSchedulingSettingsStorageScope"
);

fs.writeFileSync(repositoryPath, repository, "utf8");

ok("Repository corrigé pour utiliser RuntimeSchedulingSettingsStorageScope");

console.log("");
console.log("[Q22E9D2_SCOPE_CONTRACT_FIX_DONE] Contrat scope settings corrigé.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");