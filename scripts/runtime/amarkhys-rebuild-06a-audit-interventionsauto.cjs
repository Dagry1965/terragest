const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  module: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  actions: "src/runtime/modules/generated/interventionsauto/interventionsauto.actions.ts",
  workflows: "src/runtime/modules/generated/interventionsauto/interventionsauto.workflows.ts",
  businessRules: "src/runtime/business-rules/runtimeBusinessRules.ts",
  runtimeMutation: "src/runtime/firebase/FirestoreRuntimeMutation.ts",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  relatedPanel: "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-06A-audit-interventionsauto.md";
const reportPath = path.join(root, reportRel);

const expectedCoreFields = [
  "rendezVousId",
  "clientId",
  "vehiculeId",
  "mecanicienId",
  "statut",
  "montantHT",
  "montantTTC",
];

const expectedRelations = [
  "rendezvous",
  "clientsauto",
  "vehicules",
  "lignesinterventionauto",
];

const expectedStatuses = [
  "brouillon",
  "planifiee",
  "en_cours",
  "terminee",
  "facturee",
  "annulee",
  "validee",
  "cloturee",
];

const expectedActionLabels = [
  "Démarrer intervention",
  "Demarrer intervention",
  "Terminer intervention",
  "Clôturer intervention",
  "Cloturer intervention",
  "Annuler intervention",
  "Créer facture",
  "Creer facture",
  "Ouvrir facture",
  "Ajouter ligne",
];

const forbiddenDirectConcepts = [
  "encaissementId",
  "paiementId",
  "stockMovementId",
  "stockReversalMovementId",
  "ligneFactureId",
];

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function lineHits(content, patterns) {
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    for (const pattern of patterns) {
      if (line.includes(pattern)) {
        hits.push({
          pattern,
          line: index + 1,
          text: line.trim().slice(0, 260),
        });
      }
    }
  });

  return hits;
}

function blockAround(content, needle, before = 10, after = 30) {
  const lines = content.split(/\r?\n/);
  const blocks = [];

  lines.forEach((line, index) => {
    if (line.includes(needle)) {
      const start = Math.max(0, index - before);
      const end = Math.min(lines.length - 1, index + after);

      blocks.push({
        needle,
        line: index + 1,
        rows: lines.slice(start, end + 1).map((text, i) => ({
          line: start + i + 1,
          text,
        })),
      });
    }
  });

  return blocks;
}

const moduleContent = read(files.module);
const actionsContent = read(files.actions);
const workflowsContent = read(files.workflows);
const businessRulesContent = read(files.businessRules);
const mutationContent = read(files.runtimeMutation);
const formContent = read(files.form);
const relatedPanelContent = read(files.relatedPanel);

const checks = [];

checks.push({
  group: "Fichiers",
  label: "interventionsauto.module.ts existe",
  ok: exists(files.module),
});

checks.push({
  group: "Fichiers",
  label: "interventionsauto.actions.ts existe",
  ok: exists(files.actions),
});

checks.push({
  group: "Actions",
  label: "interventionsauto.actions.ts contient des actions",
  ok: actionsContent.trim().length > 0 && !/export const interventionsautoActions\s*=\s*\[\s*\]/.test(actionsContent),
});

checks.push({
  group: "Statut",
  label: "champ statut présent",
  ok: moduleContent.includes('key: "statut"') || moduleContent.includes('name: "statut"'),
});

checks.push({
  group: "Statut",
  label: "statut verrouillé par readonlyIf ou gouvernance",
  ok:
    /key:\s*"statut"[\s\S]*?readonlyIf/.test(moduleContent) ||
    moduleContent.includes("action_only") ||
    moduleContent.includes("statusGovernance"),
});

for (const field of expectedCoreFields) {
  checks.push({
    group: "Champs",
    label: `champ attendu présent: ${field}`,
    ok: moduleContent.includes(`key: "${field}"`) || moduleContent.includes(`name: "${field}"`) || moduleContent.includes(field),
  });
}

for (const relation of expectedRelations) {
  checks.push({
    group: "Relations",
    label: `relation/concept attendu présent: ${relation}`,
    ok: moduleContent.includes(relation),
  });
}

checks.push({
  group: "Relations",
  label: "relation RDV vers intervention présente",
  ok: moduleContent.includes("rendezVousId") && moduleContent.includes("rendezvous"),
});

checks.push({
  group: "Relations",
  label: "enfants lignesinterventionauto déclarés",
  ok: moduleContent.includes("lignesinterventionauto"),
});

checks.push({
  group: "Calculs",
  label: "totaux intervention calculés ou référencés",
  ok:
    moduleContent.includes("montantHT") &&
    moduleContent.includes("montantTTC") &&
    (
      businessRulesContent.includes("interventionsauto") ||
      mutationContent.includes("interventionsauto") ||
      moduleContent.includes("computed") ||
      moduleContent.includes("readonlyIf")
    ),
});

checks.push({
  group: "Verrouillage contexte",
  label: "champs hérités RDV/client/véhicule verrouillés ou lockFields présents",
  ok:
    moduleContent.includes("lockFields") ||
    formContent.includes("lockedFields") ||
    moduleContent.includes("rendezVousId") && moduleContent.includes("clientId") && moduleContent.includes("vehiculeId"),
});

const actionHits = lineHits(actionsContent + "\n" + moduleContent, expectedActionLabels);
checks.push({
  group: "Actions",
  label: "actions métier intervention détectées",
  ok: actionHits.length > 0,
});

const forbiddenHits = lineHits(moduleContent, forbiddenDirectConcepts);
checks.push({
  group: "Interdits",
  label: "pas de champs directs paiement/encaissement/stock dans intervention",
  ok: forbiddenHits.length === 0,
});

checks.push({
  group: "Runtime",
  label: "ERPRelatedRecordsPanel existe et peut afficher les lignes",
  ok: exists(files.relatedPanel) && relatedPanelContent.includes("allowCreate"),
});

const grouped = checks.reduce((acc, check) => {
  acc[check.group] ||= [];
  acc[check.group].push(check);
  return acc;
}, {});

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const statusBlocks = [
  ...blockAround(moduleContent, 'key: "statut"', 8, 35),
  ...blockAround(moduleContent, 'name: "statut"', 8, 35),
];

const lineBlocks = [
  ...blockAround(moduleContent, "lignesinterventionauto", 10, 35),
  ...blockAround(moduleContent, "children", 10, 35),
];

const rdvBlocks = [
  ...blockAround(moduleContent, "rendezVousId", 8, 25),
  ...blockAround(moduleContent, "rendezvous", 8, 25),
];

const totalsBlocks = [
  ...blockAround(moduleContent, "montantHT", 8, 25),
  ...blockAround(moduleContent, "montantTTC", 8, 25),
];

const report = [];

report.push("# AMARKHYS-REBUILD-06A — Audit interventionsauto");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Auditer interventionsauto après clôture rendezvous : actions, statuts, relations RDV/client/véhicule, lignes d'intervention, verrouillages et calculs.");
report.push("");
report.push("## Synthèse");
report.push("");
report.push(`- OK: ${okCount}`);
report.push(`- FAIL: ${failCount}`);
report.push("");
report.push("## Checks");
report.push("");

for (const [group, items] of Object.entries(grouped)) {
  report.push(`### ${group}`);
  report.push("");
  for (const item of items) {
    report.push(`- ${item.ok ? "OK" : "FAIL"} — ${item.label}`);
  }
  report.push("");
}

report.push("## Actions détectées");
report.push("");
if (!actionHits.length) {
  report.push("- Aucune action métier intervention détectée.");
} else {
  for (const hit of actionHits) {
    report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
  }
}
report.push("");

report.push("## Interdits détectés");
report.push("");
if (!forbiddenHits.length) {
  report.push("- Aucun interdit détecté.");
} else {
  for (const hit of forbiddenHits) {
    report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
  }
}
report.push("");

function writeBlocks(title, blocks) {
  report.push(`## ${title}`);
  report.push("");

  if (!blocks.length) {
    report.push("- Aucun bloc trouvé.");
    report.push("");
    return;
  }

  for (const entry of blocks) {
    report.push(`### ${entry.needle} — ligne ${entry.line}`);
    report.push("");
    for (const row of entry.rows) {
      report.push(`${String(row.line).padStart(5, " ")}: ${row.text}`);
    }
    report.push("");
  }
}

writeBlocks("Bloc statut intervention", statusBlocks);
writeBlocks("Blocs relation RDV", rdvBlocks);
writeBlocks("Blocs lignes intervention", lineBlocks);
writeBlocks("Blocs montants intervention", totalsBlocks);

report.push("## Lecture recommandée");
report.push("");
report.push("- Corriger uniquement les FAIL.");
report.push("- Le statut intervention doit être visible mais non modifiable si piloté par actions runtime.");
report.push("- Les champs hérités RDV/client/véhicule doivent être verrouillés en contexte enfant.");
report.push("- Intervention doit porter mecanicienId comme responsable réel.");
report.push("- Les lignes d'intervention doivent porter les pièces/services/main-d'œuvre et alimenter les totaux.");
report.push("- Facture/encaissement doivent rester dans leurs modules/contexte contrôlé.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-06A] Audit interventionsauto");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Extract FAILs and fix only those.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-06A] DONE");