const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  erpModule: "src/runtime/modules/ERPModule.ts",
  resolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
};

const checks = [];
const ok = [];
const warn = [];
const fail = [];

function filePath(rel) {
  return path.join(ROOT, rel);
}

function exists(rel) {
  return fs.existsSync(filePath(rel));
}

function read(rel) {
  if (!exists(rel)) return "";
  return fs.readFileSync(filePath(rel), "utf8");
}

function add(status, label, details = "") {
  const item = { status, label, details };
  checks.push(item);
  if (status === "OK") ok.push(item);
  if (status === "WARN") warn.push(item);
  if (status === "FAIL") fail.push(item);
}

const erpModule = read(files.erpModule);
const resolver = read(files.resolver);
const treeView = read(files.treeView);
const factures = read(files.factures);

for (const [key, rel] of Object.entries(files)) {
  add(exists(rel) ? "OK" : "FAIL", "File exists: " + key, rel);
}

add(
  /RuntimeOperationalTreeSummary/.test(resolver) &&
    /summary\?: RuntimeOperationalTreeSummary/.test(resolver),
  "OK",
  "Runtime node summary contract exists",
  "Q2-I-J-B must be present before invoice summary mapping."
);

add(
  /node\.summary\?\.badges/.test(treeView) &&
    /node\.summary\?\.metrics/.test(treeView),
  "OK",
  "Tree view renders summary badges and metrics",
  "Generic renderer is ready."
);

add(
  /ERPOperationalTreeConfig/.test(erpModule) && /tree\?: ERPOperationalTreeConfig/.test(erpModule),
  "OK",
  "Operational tree config exists",
  "Summary metadata should extend operational tree configuration."
);

add(
  /summary|nodeSummary/.test(erpModule)
    ? "WARN"
    : "OK",
  "No typed summary metadata config detected yet",
  "Q2-I-J-C-B can add it generically."
);

const factureFields = [
  "typeFacture",
  "statutFacture",
  "statutPaiement",
  "montantHT",
  "tva",
  "montantTTC",
  "montantPaye",
  "resteAPayer",
];

for (const field of factureFields) {
  add(
    factures.includes(field) ? "OK" : "FAIL",
    "facturesauto field available: " + field,
    "Required for FAC-ATELIER-Q2I-001 summary."
  );
}

add(
  /operational\s*:\s*\{/.test(factures)
    ? "OK"
    : "WARN",
  "facturesauto has operational metadata block",
  "If absent, Q2-I-J-C-B must create or extend it carefully."
);

add(
  /montantHT|montantTTC|statutPaiement/.test(treeView)
    ? "FAIL"
    : "OK",
  "Generic TreeView has no invoice field hardcode",
  "Invoice fields must stay in metadata/resolver mapping."
);

add(
  /firebase\/firestore|getFirestore|collection\(|doc\(|query\(/.test(treeView)
    ? "FAIL"
    : "OK",
  "Generic TreeView has no direct Firestore access",
  "Summary rendering must remain presentation-only."
);

add(
  /AMARKHYS|ORG_AMARKHYS_001|amarkhys/.test(treeView + resolver)
    ? "FAIL"
    : "OK",
  "No hardcoded AMARKHYS context",
  "Summary config must remain generic."
);

const reportRel = "docs/audits/Q2-I-J-C-A-invoice-summary-metadata-readiness.md";
const report = filePath(reportRel);

const lines = [];
lines.push("# Q2-I-J-C-A — Invoice summary metadata readiness audit");
lines.push("");
lines.push("## Scope");
lines.push("");
lines.push("- Goal: prepare metadata-driven invoice root summary for the operational tree.");
lines.push("- No code modification in this pass.");
lines.push("- Target invoice example: `FAC-ATELIER-Q2I-001`.");
lines.push("- Generic renderer must stay invoice-agnostic.");
lines.push("");
lines.push("## Target summary");
lines.push("");
lines.push("```text");
lines.push("FAC-ATELIER-Q2I-001");
lines.push("[FACTURE ATELIER] [EMISE] [PARTIEL]");
lines.push("HT 140 000 | TVA 25 200 | TTC 165 200 | Paye 90 000 | Reste 75 200");
lines.push("```");
lines.push("");
lines.push("## Summary");
lines.push("");
lines.push("- OK: " + ok.length);
lines.push("- WARN: " + warn.length);
lines.push("- FAIL: " + fail.length);
lines.push("");
lines.push("## Checks");
lines.push("");
lines.push("| Status | Check | Details |");
lines.push("|---|---|---|");

for (const check of checks) {
  lines.push(
    "| " +
      check.status +
      " | " +
      check.label.replace(/\|/g, "\\|") +
      " | " +
      String(check.details || "").replace(/\|/g, "\\|") +
      " |"
  );
}

lines.push("");
lines.push("## Decision");
lines.push("");

if (fail.length === 0) {
  lines.push("Q2-I-J-C-A is validated. Invoice summary can be configured through metadata and mapped into `RuntimeOperationalTreeNode.summary`.");
  lines.push("");
  lines.push("Next step: Q2-I-J-C-B add generic summary metadata config and consume it in `RuntimeOperationalTreeResolver`.");
} else {
  lines.push("Q2-I-J-C-A is blocked. Fix failed checks before adding invoice summary metadata.");
  lines.push("");
  for (const item of fail) {
    lines.push("- " + item.label + ": " + item.details);
  }
}

fs.mkdirSync(path.dirname(report), { recursive: true });
fs.writeFileSync(report, lines.join("\n"), "utf8");

console.log("[Q2-I-J-C-A] Invoice summary metadata readiness audit");
console.log("[OK]", ok.length);
console.log("[WARN]", warn.length);
console.log("[FAIL]", fail.length);
console.log("[REPORT]", reportRel);

if (fail.length > 0) {
  process.exitCode = 1;
}
