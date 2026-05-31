const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/clientsauto/clientsauto.module.ts";
const actionsRel = "src/runtime/modules/generated/clientsauto/clientsauto.actions.ts";
const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-02C-clientsauto-post-actions-audit.md";

function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function count(content, pattern) {
  return (content.match(pattern) || []).length;
}

const moduleContent = read(moduleRel);
const actionsContent = read(actionsRel);
const formContent = read(formRel);

const expectedLabels = [
  "Activer client",
  "Désactiver client",
  "Réactiver client",
  "Archiver client",
  "Ajouter véhicule",
  "Ouvrir fiche opérationnelle",
];

const expectedKeys = [
  "clientsauto.activer",
  "clientsauto.desactiver",
  "clientsauto.reactiver",
  "clientsauto.archiver",
  "clientsauto.ajouter-vehicule",
  "clientsauto.ouvrir-fiche-operationnelle",
];

const checks = [];

checks.push({
  label: "clientsauto.actions.ts existe et n'est pas vide",
  ok: actionsContent.trim().length > "export const clientsautoActions = [];".length,
});

checks.push({
  label: "clientsauto.actions.ts déclare 6 actions",
  ok: count(actionsContent, /key:\s*"/g) === 6,
});

for (const label of expectedLabels) {
  checks.push({
    label: `Action présente: ${label}`,
    ok: actionsContent.includes(label),
  });
}

for (const key of expectedKeys) {
  checks.push({
    label: `Key présente: ${key}`,
    ok: actionsContent.includes(key),
  });
}

checks.push({
  label: "clientsauto.module.ts importe clientsautoActions",
  ok: moduleContent.includes('import { clientsautoActions } from "./clientsauto.actions";'),
});

checks.push({
  label: "clientsauto.module.ts utilise actions: clientsautoActions",
  ok: moduleContent.includes("actions: clientsautoActions,"),
});

checks.push({
  label: "Ancienne action inline /client360-demo supprimée",
  ok: !moduleContent.includes("/client360-demo"),
});

checks.push({
  label: "Ancienne action inline /rendezvous/nouveau supprimée du module clientsauto",
  ok: !moduleContent.includes('href: "/rendezvous/nouveau"'),
});

checks.push({
  label: "Aucune action clientsauto ajoutée dans ERPEnterpriseForm",
  ok:
    !formContent.includes("clientsauto.activer") &&
    !formContent.includes("Activer client") &&
    !formContent.includes("Désactiver client") &&
    !formContent.includes("Ouvrir fiche opérationnelle"),
});

checks.push({
  label: "Actions navigation parent/enfant déclarées",
  ok:
    actionsContent.includes('parentModuleKey: "clientsauto"') &&
    actionsContent.includes('targetModuleKey: "vehicules"') &&
    actionsContent.includes('parentForeignKey: "clientId"'),
});

checks.push({
  label: "Actions statut pilotées runtimeOnly",
  ok: count(actionsContent, /runtimeOnly:\s*true/g) >= 4,
});

checks.push({
  label: "Statuts recadrage clients respectés",
  ok:
    actionsContent.includes('"prospect"') &&
    actionsContent.includes('"actif"') &&
    actionsContent.includes('"inactif"') &&
    actionsContent.includes('"archive"'),
});

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-02C — Audit post-correction clientsauto",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "Vérifier que clientsauto est remis en conformité côté actions runtime après AMARKHYS-REBUILD-02B.",
  "",
  "## Fichiers audités",
  "",
  `- ${moduleRel}`,
  `- ${actionsRel}`,
  `- ${formRel}`,
  "",
  "## Checks",
  "",
  ...checks.map((c) => `- ${c.ok ? "OK" : "FAIL"} — ${c.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
  "## Décision",
  "",
  failCount === 0
    ? "La passe clientsauto actions runtime est conforme. On peut committer après contrôle git."
    : "La passe clientsauto actions runtime n'est pas encore conforme. Corriger les FAIL avant commit.",
  "",
].join("\n");

const reportPath = path.join(root, reportRel);
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-02C] Audit post actions clientsauto");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.error("[AMARKHYS-REBUILD-02C] FAIL");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-02C] DONE");