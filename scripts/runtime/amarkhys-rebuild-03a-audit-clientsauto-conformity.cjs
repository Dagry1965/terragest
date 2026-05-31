const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  module: "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  actions: "src/runtime/modules/generated/clientsauto/clientsauto.actions.ts",
  workflows: "src/runtime/modules/generated/clientsauto/clientsauto.workflows.ts",
  permissions: "src/runtime/modules/generated/clientsauto/clientsauto.permissions.ts",
  hubPage: "src/app/(private)/clientsauto/hub/page.tsx",
  hubClient: "src/app/(private)/clientsauto/hub/ClientOperationalSheetClient.tsx",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-03A-clientsauto-conformity-post-commit.md";
const reportPath = path.join(root, reportRel);

function read(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
}

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function count(content, regex) {
  return (content.match(regex) || []).length;
}

function hasAny(content, items) {
  return items.some((item) => content.includes(item));
}

const moduleContent = read(files.module);
const actionsContent = read(files.actions);
const workflowsContent = read(files.workflows);
const permissionsContent = read(files.permissions);
const hubPageContent = read(files.hubPage);
const hubClientContent = read(files.hubClient);
const formContent = read(files.form);

const expectedStatuses = ["prospect", "actif", "inactif", "archive"];
const expectedActions = [
  "Activer client",
  "Désactiver client",
  "Réactiver client",
  "Archiver client",
  "Ajouter véhicule",
  "Ouvrir fiche opérationnelle",
];

const forbiddenClientBusinessFields = [
  "factureId",
  "factures",
  "paiementId",
  "paiements",
  "encaissementId",
  "encaissements",
  "interventionId",
  "interventions",
  "diagnostic",
  "stockId",
  "mouvementStockId",
  "ligneInterventionId",
  "lignesIntervention",
];

const forbiddenRuntimeLocalPatterns = [
  {
    label: "Action client ajoutée dans ERPEnterpriseForm",
    ok:
      !formContent.includes("clientsauto.activer") &&
      !formContent.includes("Activer client") &&
      !formContent.includes("Désactiver client") &&
      !formContent.includes("Archiver client") &&
      !formContent.includes("Ouvrir fiche opérationnelle"),
  },
  {
    label: "Usage Firestore direct dans module clientsauto",
    ok: !/firebase\/firestore|getDocs|addDoc|updateDoc|deleteDoc|collection\(|doc\(/.test(moduleContent),
  },
  {
    label: "Usage Firestore direct dans actions clientsauto",
    ok: !/firebase\/firestore|getDocs|addDoc|updateDoc|deleteDoc|collection\(|doc\(/.test(actionsContent),
  },
  {
    label: "Ancienne route locale /client360-demo absente",
    ok: !moduleContent.includes("/client360-demo") && !actionsContent.includes("/client360-demo"),
  },
  {
    label: "Ancienne action RDV locale absente du module client",
    ok: !moduleContent.includes('href: "/rendezvous/nouveau"'),
  },
];

const checks = [];

checks.push({
  group: "Fichiers",
  label: "clientsauto.module.ts existe",
  ok: exists(files.module),
});

checks.push({
  group: "Fichiers",
  label: "clientsauto.actions.ts existe",
  ok: exists(files.actions),
});

checks.push({
  group: "Actions",
  label: "clientsauto.actions.ts contient 6 actions",
  ok: count(actionsContent, /key:\s*"/g) === 6,
});

for (const action of expectedActions) {
  checks.push({
    group: "Actions",
    label: `Action attendue présente: ${action}`,
    ok: actionsContent.includes(action),
  });
}

checks.push({
  group: "Actions",
  label: "Le module référence clientsautoActions",
  ok:
    moduleContent.includes('import { clientsautoActions } from "./clientsauto.actions";') &&
    moduleContent.includes("actions: clientsautoActions,"),
});

checks.push({
  group: "Actions",
  label: "Les actions sont hors ERPEnterpriseForm",
  ok: forbiddenRuntimeLocalPatterns[0].ok,
});

checks.push({
  group: "Navigation",
  label: "Ajouter véhicule conserve le contexte parent client",
  ok:
    actionsContent.includes('targetModuleKey: "vehicules"') &&
    actionsContent.includes('parentModuleKey: "clientsauto"') &&
    actionsContent.includes('parentForeignKey: "clientId"') &&
    actionsContent.includes("preserveParentContext: true"),
});

checks.push({
  group: "Navigation",
  label: "Fiche opérationnelle client accessible par action runtime",
  ok:
    actionsContent.includes('href: "/clientsauto/hub"') &&
    actionsContent.includes("preserveRecordContext: true"),
});

for (const status of expectedStatuses) {
  checks.push({
    group: "Statuts",
    label: `Statut client reconnu: ${status}`,
    ok: moduleContent.includes(status) || actionsContent.includes(status),
  });
}

checks.push({
  group: "Statuts",
  label: "Pas de statut client hors recadrage détecté dans actions",
  ok:
    !actionsContent.includes("termine") &&
    !actionsContent.includes("annule") &&
    !actionsContent.includes("facture") &&
    !actionsContent.includes("paye") &&
    !actionsContent.includes("diagnostic"),
});

checks.push({
  group: "Workflow",
  label: "clientsauto.workflows.ts ne contient pas de workflows locaux actifs",
  ok: workflowsContent.trim() === "export const clientsautoWorkflows = [];" || workflowsContent.trim() === "export const clientsautoWorkflows = []",
});

checks.push({
  group: "Permissions",
  label: "clientsauto.permissions.ts ne bloque pas la passe actuelle",
  ok: permissionsContent.includes("clientsautoPermissions") || permissionsContent.trim().length === 0,
});

for (const item of forbiddenRuntimeLocalPatterns.slice(1)) {
  checks.push({
    group: "Interdits locaux",
    label: item.label,
    ok: item.ok,
  });
}

const forbiddenFieldsFound = forbiddenClientBusinessFields.filter((field) => moduleContent.includes(field));
checks.push({
  group: "Modèle métier",
  label: "Client ne porte pas directement atelier/facture/paiement/stock",
  ok: forbiddenFieldsFound.length === 0,
  details: forbiddenFieldsFound,
});

checks.push({
  group: "Hub",
  label: "Route fiche opérationnelle clientsauto/hub existe",
  ok: exists(files.hubPage),
});

checks.push({
  group: "Hub",
  label: "ClientOperationalSheetClient existe",
  ok: exists(files.hubClient),
});

const grouped = checks.reduce((acc, check) => {
  acc[check.group] ||= [];
  acc[check.group].push(check);
  return acc;
}, {});

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const actionScore = Math.round(
  (expectedActions.filter((action) => actionsContent.includes(action)).length / expectedActions.length) * 100
);

const statusScore = Math.round(
  (expectedStatuses.filter((status) => moduleContent.includes(status) || actionsContent.includes(status)).length / expectedStatuses.length) * 100
);

const report = [];
report.push("# AMARKHYS-REBUILD-03A — Audit conformité clientsauto post-commit");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Contexte");
report.push("");
report.push("Audit post-commit après AMARKHYS-REBUILD-02, qui a aligné les actions runtime du module clientsauto.");
report.push("");
report.push("## Scores indicatifs");
report.push("");
report.push(`- Actions attendues détectées: ${actionScore}%`);
report.push(`- Statuts attendus détectés: ${statusScore}%`);
report.push(`- Checks OK: ${okCount}`);
report.push(`- Checks FAIL: ${failCount}`);
report.push("");
report.push("## Résultats par groupe");
report.push("");

for (const [group, items] of Object.entries(grouped)) {
  report.push(`### ${group}`);
  report.push("");
  for (const item of items) {
    report.push(`- ${item.ok ? "OK" : "FAIL"} — ${item.label}`);
    if (item.details && item.details.length) {
      report.push(`  - Détails: ${item.details.join(", ")}`);
    }
  }
  report.push("");
}

report.push("## Lecture ERP");
report.push("");
if (failCount === 0) {
  report.push("clientsauto est conforme sur la couche actions runtime, statuts de base, séparation formulaire/actions et absence de logique locale critique détectée par cet audit.");
} else {
  report.push("clientsauto nécessite encore une correction ciblée avant clôture complète de la conformité client.");
}
report.push("");
report.push("## Prochaine étape recommandée");
report.push("");
report.push("- Si FAIL=0 : clôturer clientsauto conformité immédiate et passer à vehicules.");
report.push("- Si FAIL>0 : traiter uniquement les FAIL, sans patch local et sans toucher ERPEnterpriseForm.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-03A] clientsauto conformity audit");
console.log("[REPORT]", reportRel);
console.log("[ACTIONS_SCORE]", actionScore + "%");
console.log("[STATUS_SCORE]", statusScore + "%");
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Open report and fix FAIL only.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-03A] DONE");