const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "src/runtime/operational/index.ts",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/runtime/modules/ERPModule.ts",
];

const checks = [];

function abs(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  const file = abs(rel);

  if (!fs.existsSync(file)) {
    checks.push({
      level: "FAIL",
      file: rel,
      message: "Fichier introuvable",
    });

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

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const resolverRel = "src/runtime/operational/RuntimeOperationalDataResolver.ts";
const indexRel = "src/runtime/operational/index.ts";
const tableRel = "src/components/erp/operational/ERPOperationalTable.tsx";
const expandedRel = "src/components/erp/operational/ERPOperationalExpandedChildren.tsx";
const moduleRel = "src/runtime/modules/ERPModule.ts";

const resolver = contents[resolverRel];
const indexFile = contents[indexRel];
const table = contents[tableRel];
const expanded = contents[expandedRel];
const moduleTypes = contents[moduleRel];

console.log("");
console.log("[Q2-D-C-B2-RUNTIME-OPERATIONAL-DATA-RESOLVER-FOUNDATION-AUDIT]");
console.log("");

checkContains(
  resolverRel,
  resolver,
  "export class RuntimeOperationalDataResolver",
  "RuntimeOperationalDataResolver est exporté"
);

checkContains(
  resolverRel,
  resolver,
  "static async resolveRelationLabels",
  "resolveRelationLabels est présent"
);

checkContains(
  resolverRel,
  resolver,
  "static async resolveChildTotals",
  "resolveChildTotals est présent"
);

checkContains(
  resolverRel,
  resolver,
  "RuntimeDataBinding.list",
  "Resolver passe par RuntimeDataBinding.list"
);

checkContains(
  resolverRel,
  resolver,
  "relationLabelFields",
  "Resolver supporte relationLabelFields"
);

checkContains(
  resolverRel,
  resolver,
  "ERPOperationalChildTotalConfig",
  "Resolver utilise ERPOperationalChildTotalConfig"
);

checkContains(
  resolverRel,
  resolver,
  "foreignKey",
  "Resolver utilise foreignKey pour les totaux enfants"
);

checkContains(
  resolverRel,
  resolver,
  "totalField",
  "Resolver utilise totalField pour les totaux enfants"
);

checkContains(
  resolverRel,
  resolver,
  "Promise.all",
  "Resolver charge les données auxiliaires en parallèle"
);

checkContains(
  resolverRel,
  resolver,
  "isVisibleRuntimeRecord",
  "Resolver filtre les records retirés"
);

checkNotContains(
  resolverRel,
  resolver,
  "firebase/firestore",
  "Resolver ne lit pas Firestore directement"
);

checkNotContains(
  resolverRel,
  resolver,
  "AMARKHYS",
  "Resolver ne contient pas de logique AMARKHYS"
);

checkNotContains(
  resolverRel,
  resolver,
  "rendezvous",
  "Resolver ne hardcode pas rendezvous"
);

checkNotContains(
  resolverRel,
  resolver,
  "interventionsauto",
  "Resolver ne hardcode pas interventionsauto"
);

checkNotContains(
  resolverRel,
  resolver,
  "facturesauto",
  "Resolver ne hardcode pas facturesauto"
);

checkContains(
  indexRel,
  indexFile,
  "RuntimeOperationalDataResolver",
  "index.ts exporte RuntimeOperationalDataResolver"
);

checkContains(
  indexRel,
  indexFile,
  "OperationalRelationLabelsMap",
  "index.ts exporte OperationalRelationLabelsMap"
);

checkContains(
  indexRel,
  indexFile,
  "OperationalChildTotalsMap",
  "index.ts exporte OperationalChildTotalsMap"
);

checkContains(
  moduleRel,
  moduleTypes,
  "ERPOperationalChildTotalConfig",
  "ERPModule expose encore ERPOperationalChildTotalConfig"
);

checkContains(
  moduleRel,
  moduleTypes,
  "relationLabelFields",
  "ERPModule expose encore relationLabelFields"
);

/**
 * Important : la fondation ne doit pas encore être branchée à l'UI dans cette passe.
 */
checkNotContains(
  tableRel,
  table,
  "RuntimeOperationalDataResolver",
  "ERPOperationalTable n'est pas encore branché au resolver"
);

checkNotContains(
  expandedRel,
  expanded,
  "RuntimeOperationalDataResolver",
  "ERPOperationalExpandedChildren n'est pas encore branché au resolver"
);

const okCount = checks.filter((item) => item.level === "OK").length;
const failCount = checks.filter((item) => item.level === "FAIL").length;

console.log("[CHECKS]");
for (const item of checks) {
  console.log(`[${item.level}] ${item.file}`);
  console.log("     " + item.message);

  if (item.level === "FAIL" && item.pattern) {
    console.log("     pattern: " + item.pattern);
  }
}

console.log("");
console.log("[SUMMARY]");
console.log("OK:", okCount);
console.log("FAIL:", failCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-D-C-B2 — Audit RuntimeOperationalDataResolver foundation",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((item) => `- [${item.level}] ${item.file} — ${item.message}`),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "La fondation RuntimeOperationalDataResolver est valide. Elle peut être branchée progressivement dans Q2-D-C-C."
    : "Corriger les FAIL avant de brancher ERPOperationalTable.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-D-C-B2-runtime-operational-data-resolver-foundation-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-D-C-B2-runtime-operational-data-resolver-foundation-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant branchement UI.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK — foundation prête pour branchement progressif.");
