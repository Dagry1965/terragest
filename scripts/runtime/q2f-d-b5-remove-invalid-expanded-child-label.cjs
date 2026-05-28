const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const componentPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalExpandedChildren.tsx"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(componentPath)) {
  fail("File not found: " + path.relative(ROOT, componentPath));
}

let content = fs.readFileSync(componentPath, "utf8");

const backupPath = componentPath + ".bak-q2f-d-b5-remove-invalid-composition-label";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

const oldLine = `              label: childGroup.moduleLabel,
`;

if (!content.includes(oldLine)) {
  fail("Invalid label line not found");
}

content = content.replace(oldLine, "");

fs.writeFileSync(componentPath, content, "utf8");

const checks = [
  {
    label: "Invalid ERPCompositionChild label property removed",
    ok: !content.includes("label: childGroup.moduleLabel"),
  },
  {
    label: "nestedChild keeps required key",
    ok: content.includes("key: childGroup.moduleKey"),
  },
  {
    label: "nestedChild keeps required title",
    ok: content.includes("title: childGroup.moduleLabel"),
  },
  {
    label: "RuntimeOperationalChildrenResolver still wired",
    ok: content.includes("RuntimeOperationalChildrenResolver.resolveExpandedChildren"),
  },
  {
    label: "RuntimeDataBinding still removed from component",
    ok: !content.includes("RuntimeDataBinding"),
  },
  {
    label: "allERPModules still removed from component",
    ok: !content.includes("allERPModules"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-F-D-B5] Remove invalid ERPCompositionChild label property");
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
console.log("[DONE] Q2-F-D-B5 type fix applied.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
