const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  {
    key: "module-page",
    file: "src/components/erp/operational/ERPOperationalModulePage.tsx",
    expected: [
      "rounded-[2rem]",
      "bg-[#F8FBF8]",
      "text-[#10251C]",
      "ERPOperationalKpiStrip",
      "ERPOperationalFilters",
      "ERPOperationalTable",
      "ERPOperationalRightPanel",
    ],
  },
  {
    key: "kpi-strip",
    file: "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
    expected: [
      "grid",
      "rounded",
      "shadow",
      "kpis",
      "data",
    ],
  },
  {
    key: "filters",
    file: "src/components/erp/operational/ERPOperationalFilters.tsx",
    expected: [
      "Recherche rapide",
      "input",
      "onSearchChange",
      "Réinitialiser",
      "rounded",
    ],
  },
  {
    key: "table",
    file: "src/components/erp/operational/ERPOperationalTable.tsx",
    expected: [
      "table",
      "expandedRows",
      "ERPOperationalExpandedChildren",
      "rounded",
      "hover:bg",
    ],
  },
  {
    key: "expanded-children",
    file: "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
    expected: [
      "RuntimeOperationalChildrenResolver",
      "openLabel",
      "grandchildren",
      "rounded",
    ],
  },
  {
    key: "right-panel",
    file: "src/components/erp/operational/ERPOperationalRightPanel.tsx",
    expected: [
      "rightPanel",
      "metrics",
      "rounded",
      "summary",
    ],
  },
];

function read(relativePath) {
  const fullPath = path.join(ROOT, relativePath);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : "";
}

function count(content, value) {
  return (content.match(new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) ?? []).length;
}

function inspect(fileConfig) {
  const content = read(fileConfig.file);
  const classNames = [...content.matchAll(/className\s*=\s*["'{`]([\s\S]*?)["'`]/g)].map((match) => match[1]);
  const arbitraryClasses = [...content.matchAll(/\[[^\]]+\]/g)].map((match) => match[0]);
  const hardcodedColors = [...content.matchAll(/#[0-9A-Fa-f]{3,8}/g)].map((match) => match[0]);

  const checks = [
    ["file exists", Boolean(content)],
    ["has expected structure markers", fileConfig.expected.every((item) => content.includes(item))],
    ["uses rounded visual language", content.includes("rounded")],
    ["uses spacing utilities", /p-\d|px-\d|py-\d|gap-\d|space-y-\d/.test(content)],
    ["uses text styling", /text-/.test(content)],
  ];

  return {
    key: fileConfig.key,
    file: fileConfig.file,
    lines: content ? content.split(/\r?\n/).length : 0,
    classNameCount: classNames.length,
    roundedCount: count(content, "rounded"),
    shadowCount: count(content, "shadow"),
    borderCount: count(content, "border"),
    emeraldCount: count(content, "emerald"),
    slateCount: count(content, "slate"),
    arbitraryClasses: Array.from(new Set(arbitraryClasses)).slice(0, 30),
    hardcodedColors: Array.from(new Set(hardcodedColors)),
    checks,
  };
}

console.log("");
console.log("[Q2-M-A] Audit operational UX polish readiness");
console.log("");

const reports = files.map(inspect);

let ok = 0;
let fail = 0;
const failed = [];

for (const report of reports) {
  console.log("");
  console.log("[COMPONENT] " + report.key);
  console.log(JSON.stringify({
    file: report.file,
    lines: report.lines,
    classNameCount: report.classNameCount,
    roundedCount: report.roundedCount,
    shadowCount: report.shadowCount,
    borderCount: report.borderCount,
    emeraldCount: report.emeraldCount,
    slateCount: report.slateCount,
    hardcodedColors: report.hardcodedColors,
    arbitraryClasses: report.arbitraryClasses,
  }, null, 2));

  console.log("");
  console.log("[CHECKS]");

  for (const [label, passed] of report.checks) {
    console.log(`${passed ? "[OK]" : "[FAIL]"} ${label}`);
    if (passed) ok++;
    else {
      fail++;
      failed.push(`${report.key} — ${label}`);
    }
  }
}

console.log("");
console.log("[GLOBAL SUMMARY]");
console.log(`[SUMMARY] OK: ${ok} FAIL: ${fail}`);

if (failed.length > 0) {
  console.log("");
  console.log("[FAILED]");
  for (const item of failed) {
    console.log("[FAIL] " + item);
  }
}

console.log("");
console.log("[DONE] Q2-M-A audit completed.");
console.log("");
console.log("Next:");
console.log("  Q2-M-B — define generic operational visual tokens.");
console.log("  Q2-M-C — apply minimal visual polish generically.");

if (fail > 0) {
  process.exit(1);
}
