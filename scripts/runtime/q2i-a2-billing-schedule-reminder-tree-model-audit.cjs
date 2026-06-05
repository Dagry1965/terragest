const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts",
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts",
  "src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "docs/audits/Q2-I-A-operational-tree-runtime-readiness-audit.md",
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

function checkAnyContains(rel, content, patterns, message) {
  checks.push({
    level: patterns.some((pattern) => content.includes(pattern)) ? "OK" : "FAIL",
    file: rel,
    message,
    pattern: patterns.join(" OR "),
  });
}

function addFinding(level, file, message) {
  findings.push({ level, file, message });
}

function extractBlock(content, startPattern, endPatterns) {
  const start = content.indexOf(startPattern);
  if (start < 0) return "";

  const ends = endPatterns
    .map((pattern) => content.indexOf(pattern, start + startPattern.length))
    .filter((index) => index > start);

  const end = ends.length ? Math.min(...ends) : content.length;

  return content.slice(start, end);
}

function extractComposition(content) {
  return extractBlock(content, "composition:", ["actions:", "workflows:", "operational:"]);
}

function extractSchema(content) {
  return extractBlock(content, "schema:", ["composition:", "actions:", "workflows:", "operational:"]);
}

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const facturesRel = "src/runtime/modules/generated/facturesauto/facturesauto.module.ts";
const lignesRel = "src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts";
const encaissementsRel = "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts";
const echeancesRel = "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts";
const rappelsRel = "src/runtime/modules/generated/rappelsauto/rappelsauto.module.ts";
const interventionsRel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";

const factures = contents[facturesRel];
const lignes = contents[lignesRel];
const encaissements = contents[encaissementsRel];
const echeances = contents[echeancesRel];
const rappels = contents[rappelsRel];
const interventions = contents[interventionsRel];

const facturesSchema = extractSchema(factures);
const facturesComposition = extractComposition(factures);
const lignesSchema = extractSchema(lignes);
const encaissementsSchema = extractSchema(encaissements);
const echeancesSchema = extractSchema(echeances);
const rappelsSchema = extractSchema(rappels);
const rappelsComposition = extractComposition(rappels);
const interventionsComposition = extractComposition(interventions);

console.log("");
console.log("[Q2-I-A2-BILLING-SCHEDULE-REMINDER-TREE-MODEL-AUDIT]");
console.log("");

/**
 * Facture as generic financial document.
 */
for (const field of [
  "typeFacture",
  "sourceScope",
  "sourceType",
  "sourceModule",
  "sourceRecordId",
  "sourceLabel",
]) {
  checkContains(
    facturesRel,
    facturesSchema,
    `key: "${field}"`,
    `facturesauto expose ${field}`
  );
}

for (const field of [
  "numeroFacture",
  "clientId",
  "vehiculeId",
  "interventionId",
  "montantHT",
  "montantTTC",
  "montantPaye",
  "resteAPayer",
  "statutPaiement",
]) {
  checkContains(
    facturesRel,
    facturesSchema,
    `key: "${field}"`,
    `facturesauto expose ${field}`
  );
}

checkContains(
  facturesRel,
  factures,
  "readOnlyFields",
  "facturesauto déclare readOnlyFields"
);

for (const field of [
  "montantTTC",
  "montantPaye",
  "resteAPayer",
  "statutPaiement",
  "sourceModule",
  "sourceRecordId",
  "sourceLabel",
]) {
  checkContains(
    facturesRel,
    factures,
    `"${field}"`,
    `facturesauto verrouille ou référence ${field}`
  );
}

/**
 * Invoice children.
 */
for (const child of [
  "lignesfactureauto",
  "encaissementsauto",
  "echeancespaiementauto",
]) {
  checkContains(
    facturesRel,
    facturesComposition,
    child,
    `facturesauto composition.children expose ${child}`
  );
}

checkAnyContains(
  facturesRel,
  facturesComposition,
  ["rappelsauto", "relancesauto"],
  "facturesauto expose rappels/relances comme enfant direct si disponible"
);

/**
 * Lines define economics.
 */
for (const field of [
  "factureId",
  "designation",
  "quantite",
  "prixUnitaireHT",
  "montantHT",
  "montantTTC",
]) {
  checkContains(
    lignesRel,
    lignesSchema,
    `key: "${field}"`,
    `lignesfactureauto expose ${field}`
  );
}

for (const field of [
  "sourceModule",
  "sourceRecordId",
  "sourceLineId",
]) {
  checkAnyContains(
    lignesRel,
    lignesSchema,
    [`key: "${field}"`, field],
    `lignesfactureauto peut tracer la source ${field}`
  );
}

/**
 * Payments.
 */
for (const field of [
  "factureId",
  "clientId",
  "vehiculeId",
  "montant",
  "modePaiement",
  "statut",
]) {
  checkContains(
    encaissementsRel,
    encaissementsSchema,
    `key: "${field}"`,
    `encaissementsauto expose ${field}`
  );
}

/**
 * Schedules.
 */
for (const field of [
  "factureId",
  "clientId",
  "vehiculeId",
  "montantPrevu",
  "montantPaye",
  "dateEcheance",
  "statut",
]) {
  checkContains(
    echeancesRel,
    echeancesSchema,
    `key: "${field}"`,
    `echeancespaiementauto expose ${field}`
  );
}

/**
 * Reminders / relances.
 */
checkContains(
  rappelsRel,
  rappels,
  "schema:",
  "rappelsauto existe et déclare schema"
);

for (const field of [
  "clientId",
  "vehiculeId",
  "typeRappel",
  "dateRappel",
  "canal",
  "message",
  "statut",
]) {
  checkContains(
    rappelsRel,
    rappelsSchema,
    `key: "${field}"`,
    `rappelsauto expose ${field}`
  );
}

checkAnyContains(
  rappelsRel,
  rappelsSchema,
  ['key: "factureId"', "factureId"],
  "rappelsauto peut être lié à une facture"
);

checkAnyContains(
  rappelsRel,
  rappelsSchema,
  ['key: "echeanceId"', "echeanceId", "echeancePaiementId"],
  "rappelsauto peut être lié à une échéance"
);

/**
 * Intervention relationship is still valid but not exclusive.
 */
checkContains(
  interventionsRel,
  interventionsComposition,
  "facturesauto",
  "interventionsauto peut exposer facturesauto comme document lié"
);

checkContains(
  interventionsRel,
  interventionsComposition,
  'foreignKey: "interventionId"',
  "interventionsauto → facturesauto utilise interventionId"
);

checkContains(
  facturesRel,
  facturesSchema,
  `key: "interventionId"`,
  "facturesauto conserve interventionId pour compatibilité atelier"
);

checkContains(
  facturesRel,
  facturesSchema,
  `key: "sourceModule"`,
  "facturesauto utilise sourceModule pour ne pas limiter la facture à interventionId"
);

/**
 * Tree resolver implications.
 */
checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  contents["src/runtime/operational/RuntimeOperationalChildrenResolver.ts"],
  "RuntimeOperationalChildrenResolver",
  "ChildrenResolver existant disponible pour enfants déclarés"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  contents["src/runtime/operational/RuntimeOperationalDataResolver.ts"],
  "resolveRelationLabels",
  "DataResolver disponible pour labels"
);

checkContains(
  "docs/audits/Q2-I-A-operational-tree-runtime-readiness-audit.md",
  contents["docs/audits/Q2-I-A-operational-tree-runtime-readiness-audit.md"],
  "FAIL: 0",
  "Q2-I-A readiness arbre validée"
);

/**
 * Findings / decisions.
 */
addFinding(
  "RULE",
  "Billing tree model",
  "Les lignes facture définissent le détail économique et les montants agrégés de facture."
);

addFinding(
  "RULE",
  "Billing tree model",
  "Les échéances découpent le reste à payer de la facture globale ; elles ne sont pas enfants des lignes facture par défaut."
);

addFinding(
  "RULE",
  "Billing tree model",
  "Les encaissements réduisent le reste à payer de la facture."
);

addFinding(
  "RULE",
  "Billing tree model",
  "Les relances se rattachent à une facture ou à une échéance si le modèle expose les clés correspondantes."
);

addFinding(
  "RULE",
  "Billing tree model",
  "La facture peut apparaître comme enfant d’une intervention atelier, mais doit aussi être représentable comme document financier autonome avec sourceModule/sourceRecordId."
);

addFinding(
  "DECISION",
  "Q2-I-B",
  "RuntimeOperationalTreeResolver doit supporter composition.children et liens source documentaire sourceModule/sourceRecordId sans hardcoder intervention → facture."
);

if (!facturesComposition.includes("rappelsauto") && !facturesComposition.includes("relancesauto")) {
  addFinding(
    "RECOMMEND",
    facturesRel,
    "Ajouter plus tard rappelsauto/relances comme enfant metadata de facturesauto si les champs factureId/echeanceId existent ou sont ajoutés."
  );
}

if (!rappelsSchema.includes("factureId")) {
  addFinding(
    "RECOMMEND",
    rappelsRel,
    "Ajouter factureId à rappelsauto si les relances facture doivent apparaître directement sous Facture."
  );
}

if (!rappelsSchema.includes("echeanceId") && !rappelsSchema.includes("echeancePaiementId")) {
  addFinding(
    "RECOMMEND",
    rappelsRel,
    "Ajouter echeanceId/echeancePaiementId à rappelsauto si les relances d’échéance doivent apparaître sous Échéance."
  );
}

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;
const ruleCount = findings.filter((finding) => finding.level === "RULE").length;
const decisionCount = findings.filter((finding) => finding.level === "DECISION").length;
const recommendCount = findings.filter((finding) => finding.level === "RECOMMEND").length;

for (const check of checks) {
  console.log(`[${check.level}] ${check.file}`);
  console.log("     " + check.message);

  if (check.level === "FAIL" && check.pattern) {
    console.log("     pattern: " + check.pattern);
  }
}

console.log("");
console.log("[FINDINGS]");
for (const finding of findings) {
  console.log(`[${finding.level}] ${finding.file}`);
  console.log("     " + finding.message);
}

console.log("");
console.log("[SUMMARY]");
console.log("OK:", okCount);
console.log("FAIL:", failCount);
console.log("RULE:", ruleCount);
console.log("DECISION:", decisionCount);
console.log("RECOMMEND:", recommendCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-I-A2 — Audit modèle facture / échéances / relances pour arbre opérationnel",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `RULE: ${ruleCount}`,
  `DECISION: ${decisionCount}`,
  `RECOMMEND: ${recommendCount}`,
  "",
  "## Règles confirmées",
  "",
  "- Les lignes facture définissent le détail économique et les montants agrégés de facture.",
  "- Les échéances découpent le reste à payer de la facture globale ; elles ne sont pas enfants des lignes facture par défaut.",
  "- Les encaissements réduisent le reste à payer de la facture.",
  "- Les relances se rattachent à une facture ou à une échéance si le modèle expose les clés correspondantes.",
  "- La facture peut apparaître comme enfant d’une intervention atelier, mais doit aussi être représentable comme document financier autonome avec sourceModule/sourceRecordId.",
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- [${check.level}] ${check.file} — ${check.message}`),
  "",
  "## Findings",
  "",
  ...findings.map((finding) => `- [${finding.level}] ${finding.file} — ${finding.message}`),
  "",
  "## Décision",
  "",
  failCount === 0
    ? "Le modèle facture / échéances / relances est suffisamment cadré pour créer RuntimeOperationalTreeResolver en tenant compte des sources documentaires."
    : "Corriger les FAIL avant Q2-I-B.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-I-A2-billing-schedule-reminder-tree-model-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-I-A2-billing-schedule-reminder-tree-model-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant Q2-I-B.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/RECOMMEND — modèle facture prêt pour arbre opérationnel.");
