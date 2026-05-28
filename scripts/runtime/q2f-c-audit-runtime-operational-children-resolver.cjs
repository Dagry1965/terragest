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

const indexPath = path.join(
  ROOT,
  "src",
  "runtime",
  "operational",
  "index.ts"
);

const expandedChildrenPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "runtime",
  "operational",
  "ERPOperationalExpandedChildren.tsx"
);

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

const resolver = read(resolverPath);
const index = read(indexPath);
const expandedChildren = read(expandedChildrenPath);

const checks = [
  {
    label: "RuntimeOperationalChildrenResolver file exists",
    ok: fs.existsSync(resolverPath),
  },
  {
    label: "RuntimeOperationalChildrenResolver class exists",
    ok: resolver.includes("export class RuntimeOperationalChildrenResolver"),
  },
  {
    label: "resolveExpandedChildren method exists",
    ok: resolver.includes("resolveExpandedChildren"),
  },
  {
    label: "RuntimeOperationalExpandedGroup type exists",
    ok: resolver.includes("RuntimeOperationalExpandedGroup"),
  },
  {
    label: "RuntimeOperationalChildrenResolverRequest type exists",
    ok: resolver.includes("RuntimeOperationalChildrenResolverRequest"),
  },
  {
    label: "Resolver reads composition.children",
    ok: resolver.includes("composition") && resolver.includes("children"),
  },
  {
    label: "Resolver uses allERPModules",
    ok: resolver.includes("allERPModules"),
  },
  {
    label: "Resolver uses RuntimeDataBinding.list",
    ok: resolver.includes("RuntimeDataBinding.list"),
  },
  {
    label: "Resolver filters removedAt",
    ok: resolver.includes("removedAt"),
  },
  {
    label: "Resolver filters retiree",
    ok: resolver.includes("retiree"),
  },
  {
    label: "Resolver filters retirée",
    ok: resolver.includes("retirée"),
  },
  {
    label: "Resolver has recursive group resolution",
    ok: resolver.includes("resolveGroups") && resolver.includes("depth + 1"),
  },
  {
    label: "Resolver supports maxDepth",
    ok: resolver.includes("maxDepth"),
  },
  {
    label: "Resolver exported from operational index",
    ok: index.includes('export * from "./RuntimeOperationalChildrenResolver";'),
  },
  {
    label: "Resolver has no direct Firestore import",
    ok:
      !resolver.includes("firebase/firestore") &&
      !resolver.includes("collection(") &&
      !resolver.includes("getDocs("),
  },
  {
    label: "ERPOperationalExpandedChildren not wired yet",
    ok: !expandedChildren.includes("RuntimeOperationalChildrenResolver"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-F-C] Audit RuntimeOperationalChildrenResolver foundation");
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
console.log("[DONE] Q2-F-C audit passed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
