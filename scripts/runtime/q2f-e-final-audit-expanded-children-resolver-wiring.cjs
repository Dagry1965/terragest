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

const resolverPath = path.join(
  ROOT,
  "src",
  "runtime",
  "operational",
  "RuntimeOperationalChildrenResolver.ts"
);

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function walk(dir, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (["node_modules", ".next", ".git"].includes(entry.name)) continue;
      walk(full, results);
      continue;
    }

    results.push(full);
  }

  return results;
}

const component = read(componentPath);
const resolver = read(resolverPath);

const backupFiles = walk(path.join(ROOT, "src"))
  .filter((file) => file.includes(".bak-"))
  .map((file) => path.relative(ROOT, file));

const checks = [
  {
    label: "ERPOperationalExpandedChildren exists",
    ok: fs.existsSync(componentPath),
  },
  {
    label: "Component calls RuntimeOperationalChildrenResolver",
    ok: component.includes("RuntimeOperationalChildrenResolver.resolveExpandedChildren"),
  },
  {
    label: "Component no longer uses RuntimeDataBinding",
    ok: !component.includes("RuntimeDataBinding"),
  },
  {
    label: "Component no longer uses allERPModules",
    ok: !component.includes("allERPModules"),
  },
  {
    label: "Component no longer has local loadChildGroup",
    ok: !component.includes("loadChildGroup"),
  },
  {
    label: "Component keeps operational JSX shell",
    ok:
      component.includes("Chargement des éléments liés") &&
      component.includes("Aucun élément lié à afficher") &&
      component.includes("<Link") &&
      component.includes("ERPRuntimeFieldValue"),
  },
  {
    label: "Nested composition child uses valid metadata",
    ok:
      component.includes("key: childGroup.moduleKey") &&
      component.includes("title: childGroup.moduleLabel") &&
      !component.includes("label: childGroup.moduleLabel"),
  },
  {
    label: "RuntimeOperationalChildrenResolver exists",
    ok: fs.existsSync(resolverPath),
  },
  {
    label: "Resolver centralizes RuntimeDataBinding.list",
    ok: resolver.includes("RuntimeDataBinding.list"),
  },
  {
    label: "Resolver has no direct Firestore usage",
    ok:
      !resolver.includes("firebase/firestore") &&
      !resolver.includes("collection(") &&
      !resolver.includes("getDocs("),
  },
  {
    label: "No source backup .bak-* files",
    ok: backupFiles.length === 0,
    details: backupFiles,
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-F-E] Final audit expanded children resolver wiring");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);

  if (!check.ok && check.details?.length) {
    for (const detail of check.details) {
      console.log("       - " + detail);
    }
  }
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] Q2-F-E final audit passed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
