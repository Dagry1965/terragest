const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts",
  "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/ERPModule.ts",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx"
];

const patterns = [
  "interventionsauto",
  "lignesinterventionauto",
  "facturesauto",
  "rendezVousId",
  "rendezvous",
  "clientId",
  "vehiculeId",
  "statut",
  "ouverte",
  "diagnostic",
  "en_cours",
  "terminee",
  "annulee",
  "facturee",
  "coutTotal",
  "montant",
  "montantHT",
  "montantTTC",
  "total",
  "composition",
  "children",
  "foreignKey",
  "labelFields",
  "subtitleFields",
  "totalField",
  "workflow",
  "workflows",
  "actions",
  "operational",
  "fields",
  "relation",
  "businessCode"
];

function printContext(content, pattern, context = 5) {
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    if (line.toLowerCase().includes(pattern.toLowerCase())) {
      hits.push(index);
    }
  });

  return hits.slice(0, 6).map((hit) => {
    const start = Math.max(0, hit - context);
    const end = Math.min(lines.length, hit + context + 1);

    return lines
      .slice(start, end)
      .map((line, idx) => String(start + idx + 1).padStart(4, "0") + ": " + line)
      .join("\n");
  });
}

const checks = [];

function addCheck(level, file, message) {
  checks.push({ level, file, message });
}

console.log("");
console.log("[Q2-B-A-INTERVENTIONS-OPERATIONAL-READINESS-AUDIT]");
console.log("");

for (const rel of files) {
  const file = path.join(ROOT, rel);

  if (!fs.existsSync(file)) {
    console.log("[MISSING]", rel);
    addCheck("WARN", rel, "Fichier introuvable");
    continue;
  }

  const content = fs.readFileSync(file, "utf8");
  const found = patterns.filter((pattern) =>
    content.toLowerCase().includes(pattern.toLowerCase())
  );

  if (found.length === 0) continue;

  console.log("");
  console.log("============================================================");
  console.log("FILE:", rel);
  console.log("MATCHES:", found.join(", "));
  console.log("============================================================");

  for (const pattern of found) {
    console.log("");
    console.log("---- PATTERN:", pattern, "----");

    const blocks = printContext(content, pattern, 5);

    for (const block of blocks.slice(0, 3)) {
      console.log(block);
      console.log("");
    }
  }
}

/**
 * Structured readiness checks
 */
const interventionsRel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
const interventionsFile = path.join(ROOT, interventionsRel);
const interventions = fs.existsSync(interventionsFile)
  ? fs.readFileSync(interventionsFile, "utf8")
  : "";

const lignesRel = "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts";
const lignesFile = path.join(ROOT, lignesRel);
const lignes = fs.existsSync(lignesFile)
  ? fs.readFileSync(lignesFile, "utf8")
  : "";

function contains(content, pattern) {
  return content.toLowerCase().includes(pattern.toLowerCase());
}

if (interventions) {
  addCheck(
    contains(interventions, "composition") ? "OK" : "FAIL",
    interventionsRel,
    "composition présente sur interventionsauto"
  );

  addCheck(
    contains(interventions, "children") ? "OK" : "FAIL",
    interventionsRel,
    "children déclarés sur interventionsauto"
  );

  addCheck(
    contains(interventions, "lignesinterventionauto") ? "OK" : "FAIL",
    interventionsRel,
    "interventionsauto déclare lignesinterventionauto comme enfant"
  );

  addCheck(
    contains(interventions, "clientId") ? "OK" : "FAIL",
    interventionsRel,
    "clientId présent"
  );

  addCheck(
    contains(interventions, "vehiculeId") ? "OK" : "FAIL",
    interventionsRel,
    "vehiculeId présent"
  );

  addCheck(
    contains(interventions, "rendezVousId") ? "OK" : "WARN",
    interventionsRel,
    "rendezVousId présent ou à confirmer"
  );

  addCheck(
    contains(interventions, "coutTotal") || contains(interventions, "montantTTC") ? "OK" : "WARN",
    interventionsRel,
    "montant total intervention présent"
  );

  addCheck(
    contains(interventions, "workflows") ? "OK" : "WARN",
    interventionsRel,
    "workflow intervention présent"
  );

  addCheck(
    contains(interventions, "operational") ? "WARN" : "OK",
    interventionsRel,
    "operational pas encore activé sur interventionsauto"
  );
}

if (lignes) {
  addCheck(
    contains(lignes, "interventionId") ? "OK" : "FAIL",
    lignesRel,
    "lignesinterventionauto contient interventionId"
  );

  addCheck(
    contains(lignes, "montantTotal") || contains(lignes, "montantTTC") ? "OK" : "WARN",
    lignesRel,
    "lignes intervention contiennent un montant exploitable"
  );

  addCheck(
    contains(lignes, "statut") ? "OK" : "WARN",
    lignesRel,
    "lignes intervention contiennent un statut"
  );
}

const okCount = checks.filter((check) => check.level === "OK").length;
const warnCount = checks.filter((check) => check.level === "WARN").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;

console.log("");
console.log("[READINESS CHECKS]");
for (const check of checks) {
  console.log(`[${check.level}] ${check.file}`);
  console.log("     " + check.message);
}

console.log("");
console.log("[SUMMARY]");
console.log("OK:", okCount);
console.log("WARN:", warnCount);
console.log("FAIL:", failCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-B-A — Audit readiness vue opérationnelle Interventions",
  "",
  `OK: ${okCount}`,
  `WARN: ${warnCount}`,
  `FAIL: ${failCount}`,
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "La vue opérationnelle interventions peut être préparée après validation humaine des champs/statuts."
    : "Des points bloquants doivent être corrigés avant activation de la vue opérationnelle interventions.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-B-A-interventions-operational-readiness-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-B-A-interventions-operational-readiness-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — ne pas activer operational sur interventionsauto avant correction.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/WARN — audit prêt pour analyse humaine.");
