const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  table: path.join(ROOT, "src", "components", "erp", "operational", "ERPOperationalTable.tsx"),
  expanded: path.join(ROOT, "src", "components", "erp", "operational", "ERPOperationalExpandedChildren.tsx"),
  resolver: path.join(ROOT, "src", "runtime", "operational", "RuntimeOperationalChildrenResolver.ts"),
  rightPanel: path.join(ROOT, "src", "components", "erp", "operational", "ERPOperationalRightPanel.tsx"),
};

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

const table = read(files.table);
const expanded = read(files.expanded);
const resolver = read(files.resolver);
const rightPanel = read(files.rightPanel);

const backupFiles = walk(path.join(ROOT, "src"))
  .filter((file) => file.includes(".bak-"))
  .map((file) => path.relative(ROOT, file));

const checks = [
  {
    label: "ERPOperationalTable still imports ERPOperationalExpandedChildren",
    ok: table.includes("ERPOperationalExpandedChildren"),
  },
  {
    label: "Expanded children component still renders loading state",
    ok: expanded.includes("Chargement des éléments liés"),
  },
  {
    label: "Expanded children component still renders empty state",
    ok: expanded.includes("Aucun élément lié à afficher"),
  },
  {
    label: "Expanded children component still renders links",
    ok: expanded.includes("<Link") && expanded.includes("</Link>"),
  },
  {
    label: "Expanded children component still renders runtime field values",
    ok: expanded.includes("ERPRuntimeFieldValue"),
  },
  {
    label: "Expanded children component consumes resolver",
    ok: expanded.includes("RuntimeOperationalChildrenResolver.resolveExpandedChildren"),
  },
  {
    label: "Expanded children component no longer loads RuntimeDataBinding directly",
    ok: !expanded.includes("RuntimeDataBinding"),
  },
  {
    label: "Expanded children component uses real group.module",
    ok: expanded.includes("const module = group.module;"),
  },
  {
    label: "Expanded children component uses real childGroup.module",
    ok: expanded.includes("const nestedModule = childGroup.module;"),
  },
  {
    label: "Resolver exposes real module",
    ok: resolver.includes("module: ERPModule") && resolver.includes("module: childModule"),
  },
  {
    label: "Resolver handles recursive children",
    ok: resolver.includes("depth + 1") && resolver.includes("children: RuntimeOperationalExpandedGroup[]"),
  },
  {
    label: "Resolver filters removed records",
    ok: resolver.includes("removedAt") && resolver.includes("retiree") && resolver.includes("retirée"),
  },
  {
    label: "Right panel still exists and is not affected",
    ok: fs.existsSync(files.rightPanel) && rightPanel.includes("ERPOperationalRightPanel"),
  },
  {
    label: "No source backup .bak-* files",
    ok: backupFiles.length === 0,
    details: backupFiles,
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-H-A] Operational UI non-regression audit after children resolver refactor");
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
console.log("[DONE] Q2-H-A audit passed.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
