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

if (!content.includes("export interface RuntimeSchedulingSettings")) {
  fail("RuntimeSchedulingSettings est introuvable dans le fichier types");
}

let changed = false;

if (!content.includes("RuntimeSchedulingSettingsScope")) {
  const scopeType = `

export type RuntimeSchedulingSettingsScope = "tenant" | "workspace" | "module";
`;

  content = `${content.trimEnd()}${scopeType}`;
  changed = true;
  ok("RuntimeSchedulingSettingsScope ajouté");
} else {
  ok("RuntimeSchedulingSettingsScope existe déjà");
}

if (!content.includes("export interface RuntimeStoredSchedulingSettings")) {
  const storedType = `

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

  content = `${content.trimEnd()}${storedType}`;
  changed = true;
  ok("RuntimeStoredSchedulingSettings ajouté");
} else {
  ok("RuntimeStoredSchedulingSettings existe déjà");
}

if (changed) {
  fs.writeFileSync(typesPath, content, "utf8");
  console.log(
    "[WRITTEN] src/runtime/scheduling/settings/RuntimeSchedulingSettingsTypes.ts"
  );
} else {
  console.log("[SKIP] Aucun changement nécessaire");
}

console.log("");
console.log("[Q22E9D_FIX_DONE] Types scheduling settings persistés vérifiés.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");