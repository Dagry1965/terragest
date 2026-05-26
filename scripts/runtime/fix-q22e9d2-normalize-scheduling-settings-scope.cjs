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

let content = fs.readFileSync(typesPath, "utf8");

if (!content.includes("RuntimeSchedulingSettings")) {
  fail("RuntimeSchedulingSettings introuvable dans RuntimeSchedulingSettingsTypes.ts");
}

const normalizedScope =
  'export type RuntimeSchedulingSettingsScope = "tenant" | "workspace" | "module";';

let changed = false;

/**
 * Supprime les anciennes formes possibles du scope si elles existent :
 * - export type RuntimeSchedulingSettingsScope = ...
 * - export enum RuntimeSchedulingSettingsScope { ... }
 * - export interface RuntimeSchedulingSettingsScope { ... }
 */
const before = content;

content = content.replace(
  /export\s+type\s+RuntimeSchedulingSettingsScope\s*=\s*[^;]+;\s*/g,
  ""
);

content = content.replace(
  /export\s+enum\s+RuntimeSchedulingSettingsScope\s*\{[\s\S]*?\}\s*/g,
  ""
);

content = content.replace(
  /export\s+interface\s+RuntimeSchedulingSettingsScope\s*\{[\s\S]*?\}\s*/g,
  ""
);

if (content !== before) {
  changed = true;
  ok("Ancienne définition RuntimeSchedulingSettingsScope supprimée");
}

content = `${normalizedScope}

${content.trimStart()}`;

changed = true;

if (!content.includes("export interface RuntimeStoredSchedulingSettings")) {
  content = `${content.trimEnd()}

export interface RuntimeStoredSchedulingSettings {
  scope: RuntimeSchedulingSettingsScope;
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

fs.writeFileSync(typesPath, content, "utf8");

ok("RuntimeSchedulingSettingsScope normalisé en union tenant/workspace/module");

console.log("");
console.log("[Q22E9D2_SCOPE_FIX_DONE] Scope scheduling settings normalisé.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");