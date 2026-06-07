const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
];

const patterns = [
  "AMARKHYS",
  "Runtime ERP",
  "Atelier aujourd'hui",
  "Facturation aujourd'hui",
  "Vue opérationnelle",
  "Vue opérationnelle",
  "garage",
  "atelier",
];

const checks = [];
const findings = [];

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

function addFinding(level, file, message, pattern) {
  findings.push({
    level,
    file,
    message,
    pattern,
  });
}

function extractContext(content, pattern, context = 4) {
  const lines = content.split(/\r?\n/);
  const blocks = [];

  lines.forEach((line, index) => {
    if (!line.includes(pattern)) return;

    const start = Math.max(0, index - context);
    const end = Math.min(lines.length, index + context + 1);

    blocks.push(
      lines
        .slice(start, end)
        .map((value, offset) => String(start + offset + 1).padStart(4, "0") + ": " + value)
        .join("\n")
    );
  });

  return blocks;
}

console.log("");
console.log("[Q2-D-F-A-OPERATIONAL-BRANDING-HARDCODE-AUDIT]");
console.log("");

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const modulePageRel = "src/components/erp/operational/ERPOperationalModulePage.tsx";
const erpModuleRel = "src/runtime/modules/ERPModule.ts";

const modulePage = contents[modulePageRel];
const erpModule = contents[erpModuleRel];

checkContains(
  modulePageRel,
  modulePage,
  "AMARKHYS",
  "ERPOperationalModulePage contient actuellement le branding hardcodé à extraire"
);

checkContains(
  modulePageRel,
  modulePage,
  "Runtime ERP",
  "ERPOperationalModulePage contient actuellement le libellé runtime hardcodé à extraire"
);

checkContains(
  erpModuleRel,
  erpModule,
  "ERPOperationalModuleConfig",
  "Le contrat operational existe dans ERPModule"
);

for (const rel of files) {
  const content = contents[rel] ?? "";

  for (const pattern of patterns) {
    if (content.includes(pattern)) {
      addFinding(
        rel === modulePageRel ? "WARN_HIGH" : "WARN",
        rel,
        `Chaîne branding/contexte détectée : ${pattern}`,
        pattern
      );
    }
  }
}

console.log("[CONTEXT]");
for (const finding of findings) {
  console.log("");
  console.log(`[${finding.level}] ${finding.file}`);
  console.log("     " + finding.message);

  const blocks = extractContext(contents[finding.file] ?? "", finding.pattern, 3);

  for (const block of blocks.slice(0, 2)) {
    console.log(block);
    console.log("");
  }
}

const okCount = checks.filter((item) => item.level === "OK").length;
const failCount = checks.filter((item) => item.level === "FAIL").length;
const warnHighCount = findings.filter((item) => item.level === "WARN_HIGH").length;
const warnCount = findings.filter((item) => item.level === "WARN").length;

console.log("");
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
console.log("WARN_HIGH:", warnHighCount);
console.log("WARN:", warnCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-D-F-A — Audit operational branding hardcode",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `WARN_HIGH: ${warnHighCount}`,
  `WARN: ${warnCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((item) => `- [${item.level}] ${item.file} — ${item.message}`),
  "",
  "## Findings",
  "",
  ...(findings.length
    ? findings.map((item) => `- [${item.level}] ${item.file} — ${item.message}`)
    : ["- [OK] Aucun hardcode détecté."]),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "Le branding peut être extrait vers une configuration metadata-driven."
    : "Corriger les FAIL avant extraction.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-D-F-A-operational-branding-hardcode-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-D-F-A-operational-branding-hardcode-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant Q2-D-F-B.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/WARN — extraction branding metadata-driven recommandée.");
