const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.actions.ts",
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/ERPModule.ts",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx"
];

const patterns = [
  "facturesauto",
  "encaissementsauto",
  "echeancespaiementauto",
  "interventionsauto",
  "clientId",
  "vehiculeId",
  "interventionId",
  "numeroFacture",
  "dateFacture",
  "statutFacture",
  "statutPaiement",
  "modePaiement",
  "montantHT",
  "tva",
  "montantTTC",
  "montantPaye",
  "resteAPayer",
  "montant",
  "statut",
  "en_attente",
  "partiel",
  "payee",
  "annulee",
  "composition",
  "children",
  "foreignKey",
  "labelFields",
  "subtitleFields",
  "totalField",
  "workflow",
  "workflows",
  "actions",
  "fields",
  "relation",
  "operational",
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

function contains(content, pattern) {
  return content.toLowerCase().includes(pattern.toLowerCase());
}

console.log("");
console.log("[Q2-C-A-FACTURES-OPERATIONAL-READINESS-AUDIT]");
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

const facturesRel = "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";
const facturesFile = path.join(ROOT, facturesRel);
const factures = fs.existsSync(facturesFile)
  ? fs.readFileSync(facturesFile, "utf8")
  : "";

const encaissementsRel = "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts";
const encaissementsFile = path.join(ROOT, encaissementsRel);
const encaissements = fs.existsSync(encaissementsFile)
  ? fs.readFileSync(encaissementsFile, "utf8")
  : "";

const echeancesRel = "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts";
const echeancesFile = path.join(ROOT, echeancesRel);
const echeances = fs.existsSync(echeancesFile)
  ? fs.readFileSync(echeancesFile, "utf8")
  : "";

if (factures) {
  addCheck(
    contains(factures, "composition") ? "OK" : "FAIL",
    facturesRel,
    "composition présente sur facturesauto"
  );

  addCheck(
    contains(factures, "children") ? "OK" : "FAIL",
    facturesRel,
    "children déclarés sur facturesauto"
  );

  addCheck(
    contains(factures, "encaissementsauto") ? "OK" : "FAIL",
    facturesRel,
    "facturesauto déclare encaissementsauto comme enfant"
  );

  addCheck(
    contains(factures, "echeancespaiementauto") ? "OK" : "WARN",
    facturesRel,
    "facturesauto déclare échéances paiement comme enfant"
  );

  addCheck(
    contains(factures, "clientId") ? "OK" : "FAIL",
    facturesRel,
    "clientId présent"
  );

  addCheck(
    contains(factures, "vehiculeId") ? "OK" : "FAIL",
    facturesRel,
    "vehiculeId présent"
  );

  addCheck(
    contains(factures, "interventionId") ? "OK" : "WARN",
    facturesRel,
    "interventionId présent ou à confirmer"
  );

  addCheck(
    contains(factures, "numeroFacture") ? "OK" : "FAIL",
    facturesRel,
    "numeroFacture présent"
  );

  addCheck(
    contains(factures, "montantTTC") ? "OK" : "FAIL",
    facturesRel,
    "montantTTC présent"
  );

  addCheck(
    contains(factures, "montantPaye") ? "OK" : "WARN",
    facturesRel,
    "montantPaye présent"
  );

  addCheck(
    contains(factures, "resteAPayer") ? "OK" : "WARN",
    facturesRel,
    "resteAPayer présent"
  );

  addCheck(
    contains(factures, "statutPaiement") ? "OK" : "FAIL",
    facturesRel,
    "statutPaiement présent"
  );

  addCheck(
    contains(factures, "workflows") ? "OK" : "WARN",
    facturesRel,
    "workflow facture présent"
  );

  addCheck(
    contains(factures, "operational") ? "WARN" : "OK",
    facturesRel,
    "operational pas encore activé sur facturesauto"
  );
}

if (encaissements) {
  addCheck(
    contains(encaissements, "factureId") ? "OK" : "FAIL",
    encaissementsRel,
    "encaissementsauto contient factureId"
  );

  addCheck(
    contains(encaissements, "montant") ? "OK" : "WARN",
    encaissementsRel,
    "encaissementsauto contient un montant exploitable"
  );

  addCheck(
    contains(encaissements, "statut") ? "OK" : "WARN",
    encaissementsRel,
    "encaissementsauto contient un statut"
  );
}

if (echeances) {
  addCheck(
    contains(echeances, "factureId") ? "OK" : "WARN",
    echeancesRel,
    "echeancespaiementauto contient factureId"
  );

  addCheck(
    contains(echeances, "montantPrevu") || contains(echeances, "montant") ? "OK" : "WARN",
    echeancesRel,
    "echeancespaiementauto contient un montant exploitable"
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
  "# Q2-C-A — Audit readiness vue opérationnelle Factures",
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
    ? "La vue opérationnelle factures peut être préparée après validation humaine des champs/statuts."
    : "Des points bloquants doivent être corrigés avant activation de la vue opérationnelle factures.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-C-A-factures-operational-readiness-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-C-A-factures-operational-readiness-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — ne pas activer operational sur facturesauto avant correction.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/WARN — audit prêt pour analyse humaine.");
