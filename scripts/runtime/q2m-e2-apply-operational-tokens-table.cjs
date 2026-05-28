const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const filePath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalTable.tsx"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("ERPOperationalTable.tsx not found");
}

let content = fs.readFileSync(filePath, "utf8");

const backupPath = filePath + ".bak-q2m-e2-apply-operational-tokens-table";
fs.writeFileSync(backupPath, content, "utf8");

console.log("[BACKUP]", path.relative(ROOT, backupPath));

if (!content.includes('import { ERPOperationalExpandedChildren } from "./ERPOperationalExpandedChildren";')) {
  fail("Expected import anchor not found");
}

if (!content.includes('import { operationalUiTokens } from "./operationalUiTokens";')) {
  content = content.replace(
    'import { ERPOperationalExpandedChildren } from "./ERPOperationalExpandedChildren";',
    'import { ERPOperationalExpandedChildren } from "./ERPOperationalExpandedChildren";\nimport { operationalUiTokens } from "./operationalUiTokens";'
  );
}

function replaceOne(label, from, to) {
  if (!content.includes(from)) {
    fail("Missing expected pattern: " + label);
  }

  content = content.replace(from, to);
  console.log("[REPLACED]", label);
}

function replaceAll(label, from, to) {
  if (!content.includes(from)) {
    fail("Missing expected pattern: " + label);
  }

  content = content.split(from).join(to);
  console.log("[REPLACED]", label);
}

replaceOne(
  "table wrapper div",
  '<div className="overflow-hidden rounded-[1.7rem] border border-slate-200 bg-slate-50 shadow-[0_18px_55px_rgba(15,23,42,0.06)]">',
  '<div className={operationalUiTokens.table.wrapper}>'
);

replaceAll(
  "table header cells",
  'className="whitespace-nowrap px-5 py-3.5 text-[11px] font-black uppercase tracking-[0.16em] text-slate-500"',
  "className={operationalUiTokens.table.headerCell}"
);

replaceOne(
  "table row",
  'className="cursor-pointer border-b border-slate-100 transition hover:bg-emerald-50/45"',
  "className={operationalUiTokens.table.row}"
);

replaceAll(
  "table body cells",
  'className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-[#10251C]"',
  "className={operationalUiTokens.table.bodyCell}"
);

fs.writeFileSync(filePath, content, "utf8");

const updated = fs.readFileSync(filePath, "utf8");

const checks = [
  {
    label: "imports operationalUiTokens",
    ok: updated.includes('import { operationalUiTokens } from "./operationalUiTokens";'),
  },
  {
    label: "table wrapper uses token",
    ok: updated.includes("operationalUiTokens.table.wrapper"),
  },
  {
    label: "header cells use token",
    ok: updated.includes("operationalUiTokens.table.headerCell"),
  },
  {
    label: "body cells use token",
    ok: updated.includes("operationalUiTokens.table.bodyCell"),
  },
  {
    label: "row uses token",
    ok: updated.includes("operationalUiTokens.table.row"),
  },
  {
    label: "expanded rows preserved",
    ok:
      updated.includes("expandedRows") &&
      updated.includes("toggleExpanded") &&
      updated.includes("ERPOperationalExpandedChildren"),
  },
  {
    label: "relation labels preserved",
    ok:
      updated.includes("relationLabels") &&
      updated.includes("resolveRelationLabels"),
  },
  {
    label: "child totals preserved",
    ok:
      updated.includes("childTotals") &&
      updated.includes("resolveChildTotals"),
  },
  {
    label: "renderCell preserved",
    ok: updated.includes("function renderCell") || updated.includes("const renderCell"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-M-E2] Apply operational UI tokens to table");
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
console.log("[DONE] ERPOperationalTable now uses operational UI tokens.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
