/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const guardPath = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(guardPath)) {
  fail("processRuntimeBeforeMutationGuards.ts introuvable");
}

let content = fs.readFileSync(guardPath, "utf8");

if (!content.includes("RuntimeSchedulingSettingsResolver")) {
  const importAnchor =
    /from\s+["']@\/runtime\/scheduling\/RuntimeSchedulingEngine["'];/;

  if (!importAnchor.test(content)) {
    fail("Import RuntimeSchedulingEngine introuvable pour insérer le resolver");
  }

  content = content.replace(
    importAnchor,
    (match) =>
      `${match}\nimport { RuntimeSchedulingSettingsResolver } from "@/runtime/scheduling/settings";`
  );

  ok("Import RuntimeSchedulingSettingsResolver ajouté");
} else {
  ok("Import RuntimeSchedulingSettingsResolver déjà présent");
}

const functionRegex =
  /function\s+getSchedulingConfig\s*\(\s*module\s*:\s*ERPModule\s*\)\s*(?::\s*ERPModule\["scheduling"\]\s*\|\s*null)?\s*\{\s*return\s+module\.scheduling\?\.enabled\s*\?\s*module\.scheduling\s*:\s*null;\s*\}/m;

if (!functionRegex.test(content)) {
  const around = content
    .split(/\r?\n/)
    .slice(168, 182)
    .map((line, index) => `${String(index + 169).padStart(4, " ")}: ${line}`)
    .join("\n");

  console.log("");
  console.log("Bloc autour de getSchedulingConfig :");
  console.log(around);
  console.log("");

  fail("Fonction getSchedulingConfig directe introuvable");
}

content = content.replace(
  functionRegex,
  `function getSchedulingConfig(module: ERPModule) {
  const effectiveSchedulingConfig =
    RuntimeSchedulingSettingsResolver.resolve({
      module,
      context: {
        tenantId: "runtime",
        moduleKey: module.metadata.key,
      },
    });

  return effectiveSchedulingConfig.enabled
    ? effectiveSchedulingConfig
    : null;
}`
);

if (content.includes("module.scheduling?.enabled")) {
  fail("La lecture directe module.scheduling?.enabled est encore présente après remplacement");
}

fs.writeFileSync(guardPath, content, "utf8");

ok("processRuntimeBeforeMutationGuards utilise RuntimeSchedulingSettingsResolver.resolve()");
ok("Lecture directe module.scheduling?.enabled supprimée côté guards");

console.log("");
console.log("[Q22E9G_B_DONE] Guards branchés sur la configuration effective locale.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");
console.log("  git add .");
console.log('  git commit -m "feat(runtime): use effective scheduling config in guards"');
console.log("  git tag q22e9g-b-guards-effective-config");