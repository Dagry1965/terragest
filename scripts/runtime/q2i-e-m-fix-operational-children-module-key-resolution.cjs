const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const filePath = path.join(
  ROOT,
  "src",
  "runtime",
  "operational",
  "RuntimeOperationalChildrenResolver.ts"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("RuntimeOperationalChildrenResolver.ts not found");
}

let content = fs.readFileSync(filePath, "utf8");

const backupPath = filePath + ".bak-q2i-e-m-fix-module-key-resolution";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

const oldGetModuleKey = `function getModuleKey(module: ERPModule): string {
  return String((module as any).key ?? (module as any).id ?? "");
}`;

const newGetModuleKey = `function getModuleKey(module: ERPModule): string {
  return String(
    (module as any).metadata?.key ??
      (module as any).key ??
      (module as any).id ??
      ""
  ).trim();
}`;

const oldGetModuleLabel = `function getModuleLabel(module: ERPModule): string {
  return String((module as any).label ?? (module as any).name ?? getModuleKey(module));
}`;

const newGetModuleLabel = `function getModuleLabel(module: ERPModule): string {
  return String(
    (module as any).metadata?.label ??
      (module as any).label ??
      (module as any).name ??
      getModuleKey(module)
  ).trim();
}`;

if (!content.includes(oldGetModuleKey)) {
  fail("Expected getModuleKey implementation not found");
}

if (!content.includes(oldGetModuleLabel)) {
  fail("Expected getModuleLabel implementation not found");
}

content = content.replace(oldGetModuleKey, newGetModuleKey);
content = content.replace(oldGetModuleLabel, newGetModuleLabel);

fs.writeFileSync(filePath, content, "utf8");

const updated = fs.readFileSync(filePath, "utf8");

const checks = [
  {
    label: "getModuleKey now reads metadata.key",
    ok: updated.includes("(module as any).metadata?.key"),
  },
  {
    label: "getModuleLabel now reads metadata.label",
    ok: updated.includes("(module as any).metadata?.label"),
  },
  {
    label: "fallback key/id preserved",
    ok: updated.includes("(module as any).key") && updated.includes("(module as any).id"),
  },
  {
    label: "resolver still uses allERPModules",
    ok: updated.includes("allERPModules"),
  },
  {
    label: "resolver still filters by foreignKey",
    ok: updated.includes("recordMatchesParent(record, foreignKey, parentRecordId)"),
  },
  {
    label: "resolver still returns real module in groups",
    ok: updated.includes("module: childModule"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-I-E-M] Fix operational children resolver module key resolution");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] RuntimeOperationalChildrenResolver module key resolution fixed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
