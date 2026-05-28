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

const resolver = read(resolverPath);
const component = read(componentPath);

const checks = [
  {
    label: "RuntimeOperationalChildrenResolver exists",
    ok: fs.existsSync(resolverPath),
  },
  {
    label: "Resolver exposes resolveExpandedChildren",
    ok: resolver.includes("resolveExpandedChildren"),
  },
  {
    label: "Resolver returns RuntimeOperationalExpandedGroup",
    ok: resolver.includes("RuntimeOperationalExpandedGroup"),
  },
  {
    label: "Expanded group has moduleKey",
    ok: resolver.includes("moduleKey: string"),
  },
  {
    label: "Expanded group has moduleLabel",
    ok: resolver.includes("moduleLabel: string"),
  },
  {
    label: "Expanded group has parentModuleKey",
    ok: resolver.includes("parentModuleKey: string"),
  },
  {
    label: "Expanded group has parentRecordId",
    ok: resolver.includes("parentRecordId: string"),
  },
  {
    label: "Expanded group has foreignKey",
    ok: resolver.includes("foreignKey: string"),
  },
  {
    label: "Expanded group has records",
    ok: resolver.includes("records: RuntimeOperationalRecord[]"),
  },
  {
    label: "Expanded group has children",
    ok: resolver.includes("children: RuntimeOperationalExpandedGroup[]"),
  },
  {
    label: "Resolver uses composition.children",
    ok: resolver.includes("composition") && resolver.includes("children"),
  },
  {
    label: "Resolver resolves child modules via allERPModules",
    ok: resolver.includes("allERPModules") && resolver.includes("resolveChildModule"),
  },
  {
    label: "Resolver centralizes RuntimeDataBinding.list",
    ok: resolver.includes("RuntimeDataBinding.list"),
  },
  {
    label: "Resolver filters removedAt",
    ok: resolver.includes("removedAt"),
  },
  {
    label: "Resolver filters retiree/retirée",
    ok: resolver.includes("retiree") && resolver.includes("retirée"),
  },
  {
    label: "Resolver supports maxDepth",
    ok: resolver.includes("maxDepth") && resolver.includes("depth >= maxDepth"),
  },
  {
    label: "Resolver has no direct Firestore usage",
    ok:
      !resolver.includes("firebase/firestore") &&
      !resolver.includes("collection(") &&
      !resolver.includes("getDocs("),
  },
  {
    label: "Resolver has no JSX/UI logic",
    ok:
      !resolver.includes("<div") &&
      !resolver.includes("className") &&
      !resolver.includes("useEffect") &&
      !resolver.includes("useState"),
  },
  {
    label: "Component consumes resolver",
    ok: component.includes("RuntimeOperationalChildrenResolver.resolveExpandedChildren"),
  },
  {
    label: "Component no longer performs direct RuntimeDataBinding.list",
    ok: !component.includes("RuntimeDataBinding.list"),
  },
  {
    label: "Potential limitation: group does not expose full child module",
    ok: !resolver.includes("module: ERPModule"),
    warning: true,
  },
];

const hardFailures = checks.filter((check) => !check.ok && !check.warning);
const warnings = checks.filter((check) => !check.ok && check.warning);

console.log("");
console.log("[Q2-G-A] Audit RuntimeOperationalChildrenResolver quality");
console.log("");

for (const check of checks) {
  const prefix = check.ok ? "[OK]" : check.warning ? "[WARN]" : "[FAIL]";
  console.log(`${prefix} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.filter((check) => check.ok).length} WARN: ${warnings.length} FAIL: ${hardFailures.length}`);

if (hardFailures.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] Q2-G-A audit passed with warnings allowed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
