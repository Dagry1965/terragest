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
const backupPath = componentPath + ".bak-q2f-d-b4-fix-composition-child-type";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

const oldBlock = `            const nestedChild = {
              moduleKey: childGroup.moduleKey,
              foreignKey: childGroup.foreignKey,
              label: childGroup.moduleLabel,
              openLabel: childGroup.openLabel,
            } as ERPCompositionChild;
`;

const newBlock = `            const nestedChild: ERPCompositionChild = {
              key: childGroup.moduleKey,
              title: childGroup.moduleLabel,
              moduleKey: childGroup.moduleKey,
              foreignKey: childGroup.foreignKey,
              label: childGroup.moduleLabel,
              openLabel: childGroup.openLabel,
            };
`;

if (!content.includes(oldBlock)) {
  fail("Expected nestedChild block not found");
}

content = content.replace(oldBlock, newBlock);

fs.writeFileSync(componentPath, content, "utf8");

const checks = [
  {
    label: "nestedChild has required key",
    ok: content.includes("key: childGroup.moduleKey"),
  },
  {
    label: "nestedChild has required title",
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
console.log("[Q2-F-D-B4] Fix nested composition child typing");
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
console.log("[DONE] Q2-F-D-B4 type fix applied.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
