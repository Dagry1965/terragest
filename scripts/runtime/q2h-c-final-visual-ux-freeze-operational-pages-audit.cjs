const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "docs/audits/Q2-H-A-operational-pages-visual-ux-readiness-audit.md",
  "docs/audits/Q2-H-B-operational-pages-visual-manual-test.md",
  "docs/audits/Q2-G-final-operational-ux-runtime-audit.md",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
];

const checks = [];
const findings = [];

function read(rel) {
  const file = path.join(ROOT, rel);

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

function addFinding(level, file, message) {
  findings.push({ level, file, message });
}

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

const readiness = contents["docs/audits/Q2-H-A-operational-pages-visual-ux-readiness-audit.md"];
const manual = contents["docs/audits/Q2-H-B-operational-pages-visual-manual-test.md"];
const global = contents["docs/audits/Q2-G-final-operational-ux-runtime-audit.md"];

const rendezvous = contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"];
const interventions = contents["src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"];
const factures = contents["src/runtime/modules/generated/facturesauto/facturesauto.module.ts"];

const modulePage = contents["src/components/erp/operational/ERPOperationalModulePage.tsx"];
const table = contents["src/components/erp/operational/ERPOperationalTable.tsx"];
const rightPanel = contents["src/components/erp/operational/ERPOperationalRightPanel.tsx"];
const expanded = contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"];
const dataResolver = contents["src/runtime/operational/RuntimeOperationalDataResolver.ts"];
const childrenResolver = contents["src/runtime/operational/RuntimeOperationalChildrenResolver.ts"];

console.log("");
console.log("[Q2-H-C-FINAL-VISUAL-UX-FREEZE-OPERATIONAL-PAGES-AUDIT]");
console.log("");

/**
 * Previous audits.
 */
checkContains(
  "docs/audits/Q2-H-A-operational-pages-visual-ux-readiness-audit.md",
  readiness,
  "FAIL: 0",
  "Q2-H-A readiness validée sans FAIL"
);

checkContains(
  "docs/audits/Q2-H-B-operational-pages-visual-manual-test.md",
  manual,
  "Q2-H-B est validé",
  "Q2-H-B test visuel manuel validé"
);

checkContains(
  "docs/audits/Q2-H-B-operational-pages-visual-manual-test.md",
  manual,
  "/rendezvous : OK",
  "/rendezvous validé visuellement"
);

checkContains(
  "docs/audits/Q2-H-B-operational-pages-visual-manual-test.md",
  manual,
  "/interventionsauto : OK",
  "/interventionsauto validé visuellement"
);

checkContains(
  "docs/audits/Q2-H-B-operational-pages-visual-manual-test.md",
  manual,
  "/facturesauto : OK",
  "/facturesauto validé visuellement"
);

checkContains(
  "docs/audits/Q2-G-final-operational-ux-runtime-audit.md",
  global,
  "FAIL: 0",
  "Q2-G audit global validé sans FAIL"
);

checkContains(
  "docs/audits/Q2-G-final-operational-ux-runtime-audit.md",
  global,
  "FAIL_FINDINGS: 0",
  "Q2-G audit global validé sans FAIL_FINDINGS"
);

/**
 * Operational modules still ready.
 */
for (const [rel, content, label] of [
  ["src/runtime/modules/generated/rendezvous/rendezvous.module.ts", rendezvous, "rendezvous"],
  ["src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts", interventions, "interventionsauto"],
  ["src/runtime/modules/generated/facturesauto/facturesauto.module.ts", factures, "facturesauto"],
]) {
  checkContains(rel, content, "operational:", `${label} déclare operational`);
  checkContains(rel, content, "enabled: true", `${label} operational enabled`);
  checkContains(rel, content, "branding:", `${label} branding metadata-driven`);
  checkContains(rel, content, "kpis:", `${label} KPI metadata-driven`);
  checkContains(rel, content, "filters:", `${label} filters metadata-driven`);
  checkContains(rel, content, "table:", `${label} table metadata-driven`);
  checkContains(rel, content, "rightPanel:", `${label} rightPanel metadata-driven`);
  checkContains(rel, content, "metrics:", `${label} rightPanel metrics`);
  checkContains(rel, content, "relationLabelFields:", `${label} relation labels`);
  checkContains(rel, content, "children:", `${label} children/expand metadata`);
}

/**
 * Specific fields validated by visual test.
 */
for (const field of [
  '"clientId"',
  '"vehiculeId"',
  '"dateRendezVous"',
  '"heureRendezVous"',
  '"typeService"',
  '"statut"',
]) {
  checkContains(
    "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
    rendezvous,
    field,
    `rendezvous contient ${field}`
  );
}

for (const field of [
  '"clientId"',
  '"vehiculeId"',
  '"dateIntervention"',
  '"typeIntervention"',
  '"kilometrage"',
  '"coutTotal"',
  '"statut"',
]) {
  checkContains(
    "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    interventions,
    field,
    `interventionsauto contient ${field}`
  );
}

for (const field of [
  '"numeroFacture"',
  '"clientId"',
  '"vehiculeId"',
  '"dateFacture"',
  '"montantTTC"',
  '"montantPaye"',
  '"resteAPayer"',
  '"statutPaiement"',
]) {
  checkContains(
    "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
    factures,
    field,
    `facturesauto contient ${field}`
  );
}

/**
 * Runtime operational chain.
 */
checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "config?.branding",
  "ModulePage consomme branding metadata"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  modulePage,
  "data={filteredData}",
  "ModulePage transmet filteredData"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  table,
  "RuntimeOperationalDataResolver",
  "Table utilise RuntimeOperationalDataResolver"
);

checkContains(
  "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rightPanel,
  "panel.metrics",
  "RightPanel utilise rightPanel.metrics"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expanded,
  "RuntimeOperationalChildrenResolver",
  "ExpandedChildren utilise RuntimeOperationalChildrenResolver"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  dataResolver,
  "resolveRelationLabels",
  "DataResolver expose relation labels"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  dataResolver,
  "resolveChildTotals",
  "DataResolver expose child totals"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  childrenResolver,
  "resolveExpandedChildren",
  "ChildrenResolver expose expanded children"
);

/**
 * No direct data access in UI.
 */
for (const [rel, content] of [
  ["src/components/erp/operational/ERPOperationalModulePage.tsx", modulePage],
  ["src/components/erp/operational/ERPOperationalTable.tsx", table],
  ["src/components/erp/operational/ERPOperationalRightPanel.tsx", rightPanel],
  ["src/components/erp/operational/ERPOperationalExpandedChildren.tsx", expanded],
]) {
  checkNotContains(rel, content, "firebase/firestore", `${rel} ne lit pas Firestore directement`);
  checkNotContains(rel, content, "RuntimeDataBinding.list", `${rel} ne lit pas RuntimeDataBinding.list directement`);
}

/**
 * Test data note.
 */
checkContains(
  "docs/audits/Q2-H-B-operational-pages-visual-manual-test.md",
  manual,
  "14 documents réalignés",
  "Rapport documente le réalignement des données de test"
);

checkContains(
  "docs/audits/Q2-H-B-operational-pages-visual-manual-test.md",
  manual,
  "Aucun orphan détecté",
  "Rapport documente l’absence d’orphan"
);

addFinding(
  "INFO",
  "Q2-H-C",
  "Le socle Operational Pages est gelable fonctionnellement après Q2-H-B."
);

addFinding(
  "INFO",
  "Q2-H-C",
  "Le stash Billing D-D3 reste à traiter séparément."
);

addFinding(
  "RECOMMEND",
  "Q2-H-C",
  "Après gel, reprendre le stash Billing D-D3 ou lancer une micro-passe polish visuel si nécessaire."
);

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;
const infoCount = findings.filter((finding) => finding.level === "INFO").length;
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
console.log("INFO:", infoCount);
console.log("RECOMMEND:", recommendCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-H-C — Audit final UX visuel + gel Operational Pages",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `INFO: ${infoCount}`,
  `RECOMMEND: ${recommendCount}`,
  "",
  "## Résultat",
  "",
  failCount === 0
    ? "Q2-H-C valide le gel fonctionnel du socle Operational Pages."
    : "Q2-H-C n’est pas clôturable tant que les FAIL ne sont pas corrigés.",
  "",
  "## Pages gelées",
  "",
  "- /rendezvous",
  "- /interventionsauto",
  "- /facturesauto",
  "",
  "## Socle validé",
  "",
  "- Header operational metadata-driven",
  "- KPI metadata-driven",
  "- Filters metadata-driven",
  "- Tables metadata-driven",
  "- Relation labels via RuntimeOperationalDataResolver",
  "- RightPanel metrics via rightPanel.metrics",
  "- Expand children via RuntimeOperationalChildrenResolver",
  "- No direct Firestore in operational UI",
  "- No direct RuntimeDataBinding.list in operational UI",
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
    ? "Operational Pages sont gelées fonctionnellement. Les prochaines passes doivent être soit polish visuel ciblé, soit reprise Billing D-D3, sans refondre le socle runtime."
    : "Corriger les FAIL avant gel.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-H-C-final-visual-ux-freeze-operational-pages-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-H-C-final-visual-ux-freeze-operational-pages-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — gel Operational Pages refusé.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/INFO — Operational Pages gelées fonctionnellement.");
