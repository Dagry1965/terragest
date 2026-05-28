const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const resolverPath = path.join(
  ROOT,
  "src",
  "runtime",
  "operational",
  "RuntimeOperationalChildrenResolver.ts"
);

const componentPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalExpandedChildren.tsx"
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

const resolver = read(resolverPath);
const component = read(componentPath);

const backupFiles = walk(path.join(ROOT, "src"))
  .filter((file) => file.includes(".bak-"))
  .map((file) => path.relative(ROOT, file));

const checks = [
  {
    label: "RuntimeOperationalChildrenResolver exists",
    ok: fs.existsSync(resolverPath),
  },
  {
    label: "RuntimeOperationalExpandedGroup exposes module: ERPModule",
    ok: resolver.includes("module: ERPModule"),
  },
  {
    label: "Resolver pushes module: childModule",
    ok: resolver.includes("module: childModule"),
  },
  {
    label: "Resolver still exposes moduleKey and moduleLabel",
    ok: resolver.includes("moduleKey: string") && resolver.includes("moduleLabel: string"),
  },
  {
    label: "Resolver still supports recursive children",
    ok: resolver.includes("children: RuntimeOperationalExpandedGroup[]") && resolver.includes("depth + 1"),
  },
  {
    label: "ERPOperationalExpandedChildren uses group.module",
    ok: component.includes("const module = group.module;"),
  },
  {
    label: "ERPOperationalExpandedChildren uses childGroup.module",
    ok: component.includes("const nestedModule = childGroup.module;"),
  },
  {
    label: "Component no longer reconstructs fake root module from parentModule",
    ok: !component.includes("...parentModule,\n        metadata:"),
  },
  {
    label: "Component no longer reconstructs fake nested module",
    ok: !component.includes("...module,\n              metadata:"),
  },
  {
    label: "RuntimeDataBinding remains centralized in resolver",
    ok:
      resolver.includes("RuntimeDataBinding.list") &&
      !component.includes("RuntimeDataBinding"),
  },
  {
    label: "allERPModules remains resolver-only",
    ok:
      resolver.includes("allERPModules") &&
      !component.includes("allERPModules"),
  },
  {
    label: "No direct Firestore usage",
    ok:
      !resolver.includes("firebase/firestore") &&
      !component.includes("firebase/firestore") &&
      !resolver.includes("getDocs(") &&
      !component.includes("getDocs("),
  },
  {
    label: "No source backup .bak-* files",
    ok: backupFiles.length === 0,
    details: backupFiles,
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-G-C] Audit real child module exposure");
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
console.log("[DONE] Q2-G-C audit passed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
