/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const planningPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const auditPath = path.join(
  ROOT,
  "scripts",
  "runtime",
  "audit-q22e9j-final-scheduling-settings-runtime-chain.cjs"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`${path.relative(ROOT, filePath)} introuvable`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log(`[WRITTEN] ${path.relative(ROOT, filePath)}`);
}

let planning = read(planningPath);
let audit = read(auditPath);

if (!planning.includes("RuntimeSchedulingSettingsResolver.resolve")) {
  fail("Planning n'utilise pas RuntimeSchedulingSettingsResolver.resolve()");
}

planning = planning.replace(
  /moduleKey:\s*module\.route,/g,
  "moduleKey: module.metadata.key,"
);

if (planning.includes("moduleKey: module.route")) {
  fail("module.route encore présent dans le planning");
}

if (!planning.includes("moduleKey: module.metadata.key")) {
  fail("module.metadata.key non trouvé dans le planning après correction");
}

audit = audit.replace(
  /moduleKey:\s*module\.route/g,
  "moduleKey: module.metadata.key"
);

audit = audit.replace(
  /Planning transmet module\.route comme moduleKey/g,
  "Planning transmet module.metadata.key comme moduleKey"
);

audit = audit.replace(
  /"moduleKey: module\.route"/g,
  '"moduleKey: module.metadata.key"'
);

if (audit.includes("module.route")) {
  fail("module.route encore présent dans l'audit final");
}

write(planningPath, planning);
write(auditPath, audit);

ok("Planning corrigé : moduleKey = module.metadata.key");
ok("Audit final corrigé : attente module.metadata.key");

console.log("");
console.log("[Q22E9J_MODULE_KEY_FIX_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  node .\\scripts\\runtime\\audit-q22e9j-final-scheduling-settings-runtime-chain.cjs");
console.log("  git status --short");