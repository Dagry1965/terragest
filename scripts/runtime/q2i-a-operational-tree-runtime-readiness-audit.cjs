const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = [
  "src/runtime/modules/ERPModule.ts",
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  "src/runtime/operational/index.ts",

  "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  "src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts",
  "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts",
  "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts",

  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
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

  if (start < 0) {
    return "";
  }

  const ends = endPatterns
    .map((pattern) => content.indexOf(pattern, start + startPattern.length))
    .filter((index) => index > start);

  const end = ends.length ? Math.min(...ends) : content.length;

  return content.slice(start, end);
}

function moduleChecks(moduleKey, rel, content) {
  const composition = extractBlock(content, "composition:", ["actions:", "workflows:", "operational:"]);

  checkContains(rel, content, "schema:", `${moduleKey} déclare schema`);
  checkContains(rel, content, "fields:", `${moduleKey} déclare fields`);
  checkContains(rel, content, "composition:", `${moduleKey} déclare composition`);
  checkAnyContains(rel, composition, ["labelFields", "labelField"], `${moduleKey} déclare labelFields ou labelField`);
  const hasRelationsOrChildren =
    composition.includes("relations:") || composition.includes("children:");

  if (!hasRelationsOrChildren) {
    addFinding(
      "INFO",
      rel,
      `${moduleKey} n’a pas de relations/children directs ; traité comme module feuille possible dans l’arbre.`
    );
  } else {
    checks.push({
      level: "OK",
      file: rel,
      message: `${moduleKey} déclare relations ou children`,
      pattern: "relations: OR children:",
    });
  }

  if (composition.includes("children:")) {
    checkContains(rel, composition, "moduleKey:", `${moduleKey} children utilisent moduleKey`);
    checkContains(rel, composition, "foreignKey:", `${moduleKey} children utilisent foreignKey`);
    checkContains(rel, composition, "openLabel:", `${moduleKey} children utilisent openLabel`);
  } else {
    addFinding(
      "INFO",
      rel,
      `${moduleKey} n’a pas forcément de children directs ; peut être feuille ou parent via relations inverses.`
    );
  }
}

const contents = Object.fromEntries(files.map((rel) => [rel, read(rel)]));

console.log("");
console.log("[Q2-I-A-OPERATIONAL-TREE-RUNTIME-READINESS-AUDIT]");
console.log("");

const erpModule = contents["src/runtime/modules/ERPModule.ts"];
const dataResolver = contents["src/runtime/operational/RuntimeOperationalDataResolver.ts"];
const childrenResolver = contents["src/runtime/operational/RuntimeOperationalChildrenResolver.ts"];
const operationalIndex = contents["src/runtime/operational/index.ts"];
const expandedChildren = contents["src/components/erp/operational/ERPOperationalExpandedChildren.tsx"];
const operationalTable = contents["src/components/erp/operational/ERPOperationalTable.tsx"];
const operationalPage = contents["src/components/erp/operational/ERPOperationalModulePage.tsx"];

/**
 * Contracts.
 */
for (const pattern of [
  "ERPCompositionChild",
  "children?: ERPCompositionChild[]",
  "foreignKey",
  "moduleKey",
  "openLabel?: string",
  "labelFields",
  "subtitleFields",
  "relations",
]) {
  checkContains(
    "src/runtime/modules/ERPModule.ts",
    erpModule,
    pattern,
    `ERPModule supporte ${pattern}`
  );
}

/**
 * Resolvers.
 */
checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  dataResolver,
  "RuntimeOperationalDataResolver",
  "RuntimeOperationalDataResolver existe"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  dataResolver,
  "resolveRelationLabels",
  "DataResolver résout les labels relationnels"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalDataResolver.ts",
  dataResolver,
  "resolveChildTotals",
  "DataResolver résout les totaux enfants"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  childrenResolver,
  "RuntimeOperationalChildrenResolver",
  "RuntimeOperationalChildrenResolver existe"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  childrenResolver,
  "resolveExpandedChildren",
  "ChildrenResolver résout enfants expandés"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  childrenResolver,
  "maxDepth",
  "ChildrenResolver supporte maxDepth"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  childrenResolver,
  "children: RuntimeOperationalExpandedGroup[]",
  "ChildrenResolver produit une forme hiérarchique partielle"
);

checkContains(
  "src/runtime/operational/RuntimeOperationalChildrenResolver.ts",
  childrenResolver,
  "parentRecordId",
  "ChildrenResolver conserve parentRecordId"
);

checkContains(
  "src/runtime/operational/index.ts",
  operationalIndex,
  "RuntimeOperationalDataResolver",
  "runtime/operational exporte DataResolver"
);

checkContains(
  "src/runtime/operational/index.ts",
  operationalIndex,
  "RuntimeOperationalChildrenResolver",
  "runtime/operational exporte ChildrenResolver"
);

/**
 * Existing UI components reusable.
 */
checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expandedChildren,
  "RuntimeOperationalChildrenResolver",
  "ExpandedChildren consomme déjà ChildrenResolver"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expandedChildren,
  "grandchildrenByParentId",
  "ExpandedChildren gère petits-enfants"
);

checkContains(
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  expandedChildren,
  'child.openLabel ?? "Ouvrir"',
  "ExpandedChildren consomme openLabel"
);

checkContains(
  "src/components/erp/operational/ERPOperationalTable.tsx",
  operationalTable,
  "ERPOperationalExpandedChildren",
  "Table branche ExpandedChildren"
);

checkContains(
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
  operationalPage,
  "ERPOperationalTable",
  "ModulePage branche Table opérationnelle"
);

/**
 * Modules readiness.
 */
const moduleTargets = [
  ["clientsauto", "src/runtime/modules/generated/clientsauto/clientsauto.module.ts"],
  ["vehicules", "src/runtime/modules/generated/vehicules/vehicules.module.ts"],
  ["rendezvous", "src/runtime/modules/generated/rendezvous/rendezvous.module.ts"],
  ["interventionsauto", "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"],
  ["lignesinterventionauto", "src/runtime/modules/generated/lignesinterventionauto/lignesinterventionauto.module.ts"],
  ["facturesauto", "src/runtime/modules/generated/facturesauto/facturesauto.module.ts"],
  ["lignesfactureauto", "src/runtime/modules/generated/lignesfactureauto/lignesfactureauto.module.ts"],
  ["encaissementsauto", "src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts"],
  ["echeancespaiementauto", "src/runtime/modules/generated/echeancespaiementauto/echeancespaiementauto.module.ts"],
];

for (const [moduleKey, rel] of moduleTargets) {
  moduleChecks(moduleKey, rel, contents[rel]);
}

/**
 * Expected AMARKHYS chain by metadata, not hardcoded UI.
 */
const clients = contents["src/runtime/modules/generated/clientsauto/clientsauto.module.ts"];
const vehicules = contents["src/runtime/modules/generated/vehicules/vehicules.module.ts"];
const rendezvous = contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"];
const interventions = contents["src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"];
const factures = contents["src/runtime/modules/generated/facturesauto/facturesauto.module.ts"];

checkContains(
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  vehicules,
  "clientId",
  "vehicules porte clientId pour relation client → véhicules"
);

checkContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  rendezvous,
  "vehiculeId",
  "rendezvous porte vehiculeId pour relation véhicule → rendezvous"
);

checkContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  rendezvous,
  "clientId",
  "rendezvous porte clientId"
);

checkContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  rendezvous,
  "interventionsauto",
  "rendezvous déclare enfant interventionsauto"
);

checkContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  rendezvous,
  'foreignKey: "rendezVousId"',
  "rendezvous → interventions utilise rendezVousId"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  interventions,
  "lignesinterventionauto",
  "interventionsauto déclare enfant lignesinterventionauto"
);

checkContains(
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  interventions,
  "facturesauto",
  "interventionsauto déclare enfant facturesauto"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  factures,
  "lignesfactureauto",
  "facturesauto déclare enfant lignesfactureauto"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  factures,
  "encaissementsauto",
  "facturesauto déclare enfant encaissementsauto"
);

checkContains(
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
  factures,
  "echeancespaiementauto",
  "facturesauto déclare enfant echeancespaiementauto"
);

/**
 * No hardcoded tree component yet.
 */
const possibleTreeFiles = [
  "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  "src/components/erp/operational/ERPOperationalTreeView.tsx",
  "src/components/erp/operational/ERPOperationalTreePanel.tsx",
];

for (const rel of possibleTreeFiles) {
  if (fs.existsSync(abs(rel))) {
    addFinding("INFO", rel, "Un élément arbre existe déjà et devra être inspecté avant création.");
  } else {
    addFinding("RECOMMEND", rel, "Absent. Peut être créé dans Q2-I-B/C si nécessaire.");
  }
}

addFinding(
  "DECISION",
  "Q2-I",
  "RuntimeOperationalChildrenResolver suffit pour l’expand local, mais un RuntimeOperationalTreeResolver dédié est recommandé pour construire un arbre multi-niveaux depuis une racine arbitraire."
);

addFinding(
  "RULE",
  "Q2-I",
  "Ne pas hardcoder Client → Véhicule → RDV → Intervention dans l’UI ; déclarer/consommer les chemins via metadata."
);

addFinding(
  "RECOMMEND",
  "Q2-I",
  "Créer une foundation RuntimeOperationalTreeResolver avec rootModule/rootRecord/maxDepth, puis un composant ERPOperationalTreeView générique."
);

/**
 * No direct Firestore in UI components.
 */
for (const rel of [
  "src/components/erp/operational/ERPOperationalExpandedChildren.tsx",
  "src/components/erp/operational/ERPOperationalTable.tsx",
  "src/components/erp/operational/ERPOperationalModulePage.tsx",
]) {
  checkContains(rel, contents[rel], "use client", `${rel} composant client identifié`);
  if (contents[rel].includes("firebase/firestore")) {
    checks.push({
      level: "FAIL",
      file: rel,
      message: "Firestore direct détecté dans UI",
      pattern: "firebase/firestore",
    });
  } else {
    checks.push({
      level: "OK",
      file: rel,
      message: "Pas de Firestore direct dans UI",
      pattern: "firebase/firestore",
    });
  }
}

const okCount = checks.filter((check) => check.level === "OK").length;
const failCount = checks.filter((check) => check.level === "FAIL").length;
const infoCount = findings.filter((finding) => finding.level === "INFO").length;
const recommendCount = findings.filter((finding) => finding.level === "RECOMMEND").length;
const decisionCount = findings.filter((finding) => finding.level === "DECISION").length;
const ruleCount = findings.filter((finding) => finding.level === "RULE").length;

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
console.log("DECISION:", decisionCount);
console.log("RULE:", ruleCount);

const reportDir = path.join(ROOT, "docs", "audits");
fs.mkdirSync(reportDir, { recursive: true });

const report = [
  "# Q2-I-A — Audit readiness arbre opérationnel runtime",
  "",
  `OK: ${okCount}`,
  `FAIL: ${failCount}`,
  `INFO: ${infoCount}`,
  `RECOMMEND: ${recommendCount}`,
  `DECISION: ${decisionCount}`,
  `RULE: ${ruleCount}`,
  "",
  "## Scope",
  "",
  "- Metadata modules AMARKHYS",
  "- composition.children",
  "- labelFields / subtitleFields / openLabel",
  "- RuntimeOperationalChildrenResolver",
  "- Préparation RuntimeOperationalTreeResolver",
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
    ? "Readiness arbre opérationnel validée. Créer RuntimeOperationalTreeResolver foundation en Q2-I-B."
    : "Corriger les FAIL avant de créer le resolver arbre.",
  "",
].join("\n");

fs.writeFileSync(
  path.join(reportDir, "Q2-I-A-operational-tree-runtime-readiness-audit.md"),
  report,
  "utf8"
);

console.log("");
console.log("[REPORT] docs/audits/Q2-I-A-operational-tree-runtime-readiness-audit.md");

if (failCount > 0) {
  console.log("");
  console.log("[RESULT] FAIL — corriger avant Q2-I-B.");
  process.exit(1);
}

console.log("");
console.log("[RESULT] OK/RECOMMEND — readiness arbre validée, préparer RuntimeOperationalTreeResolver.");
