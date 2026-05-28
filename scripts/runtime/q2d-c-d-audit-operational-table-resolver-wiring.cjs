const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "src/runtime/operational/index.ts",
];

const checks = [];

function read(rel) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    checks.push({ level: "FAIL", file: rel, message: "Fichier introuvable" });
    return "";
  }

  return fs.readFileSync(file, "utf8");
}

function checkContains(rel, content, pattern, message) {
  checks.push({
    level: content.includes(pattern) ? "OK" : "FAIL",
    file: rel,
    message,
    pattern,
  });
}

function checkNotContains(rel, content, pattern, message) {
  checks.push({
    level: content.includes(pattern) ? "FAIL" : "OK",
    file: rel,
    message,
    pattern,
  });
}

const tableRel = "src/components/erp/operational/ERPOperationalTable.tsx";
const resolverRel = "src/runtime/operational/RuntimeOperationalDataResolver.ts";
const indexRel = "src/runtime/operational/index.ts";

const table = read(tableRel);
const resolver = read(resolverRel);
const indexFile = read(indexRel);

console.log("");
console.log("[Q2-D-C-D-OPERATIONAL-TABLE-RESOLVER-WIRING-AUDIT]");
console.log("");

checkContains(
  tableRel,
  table,
  "RuntimeOperationalDataResolver",
  "ERPOperationalTable importe/utilise RuntimeOperationalDataResolver"
);

checkContains(
  tableRel,
  table,
  "resolveRelationLabels",
  "ERPOperationalTable utilise resolveRelationLabels"
);

checkContains(
  tableRel,
  table,
  "resolveChildTotals",
  "ERPOperationalTable utilise resolveChildTotals"
);

checkNotContains(
  tableRel,
  table,
  "RuntimeDataBinding.list",
  "ERPOperationalTable ne charge plus directement via RuntimeDataBinding.list"
);

checkContains(
  tableRel,
  table,
  "setRelationLabels(next)",
  "ERPOperationalTable conserve setRelationLabels"
);

checkContains(
  tableRel,
  table,
  "setChildTotals(next)",
  "ERPOperationalTable conserve setChildTotals"
);

checkContains(
  resolverRel,
  resolver,
  "static async resolveRelationLabels",
  "Resolver expose resolveRelationLabels"
);

checkContains(
  resolverRel,
  resolver,
  "static async resolveChildTotals",
  "Resolver expose resolveChildTotals"
);

checkContains(
  resolverRel,
  resolver,
  "RuntimeDataBinding.list",
  "Resolver centralise les lectures RuntimeDataBinding.list"
);

checkNotContains(
  resolverRel,
  resolver,
  "firebase/firestore",
  "Resolver ne lit pas Firestore directement"
);

checkContains(
  indexRel,
  indexFile,
  "RuntimeOperationalDataResolver",
  "index.ts exporte RuntimeOperationalDataResolver"
);

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;

for (const check of checks) {
  console.log(`[${check.level}] ${check.file}`);
  console.log("     " + check.message);
  if (check.level === "FAIL" && check.pattern) {
    console.log("     pattern: " + check.pattern);
  }
}

console.log("");
console.log("[SUMMARY]");
console.log("OK:", okCount);
console.log("FAIL:", failCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-D-C-D — Audit branchement ERPOperationalTable vers RuntimeOperationalDataResolver",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "ERPOperationalTable est correctement branché au RuntimeOperationalDataResolver."
    : "Corriger les FAIL avant commit.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-D-C-D-operational-table-resolver-wiring-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-D-C-D-operational-table-resolver-wiring-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant commit.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK — branchement resolver validé.");
