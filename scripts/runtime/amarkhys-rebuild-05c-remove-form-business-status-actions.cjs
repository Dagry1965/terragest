const fs = require("fs");
const path = require("path");

const root = process.cwd();

const formRel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05C-remove-form-business-status-actions.md";

const formPath = path.join(root, formRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(formPath)) {
  fail("Missing file: " + formRel);
}

const backupPath = formPath + ".bak-rebuild-05c-remove-business-status-actions";
fs.copyFileSync(formPath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(formPath, "utf8");
const before = content;

function replaceOnce(source, search, replacement, label) {
  if (!source.includes(search)) {
    console.log("[SKIP]", label);
    return source;
  }

  console.log("[PATCH]", label);
  return source.replace(search, replacement);
}

/**
 * 1. Neutralise la source des actions métier internes.
 * On garde getBusinessStatusAction() pour minimiser le diff si d'autres blocs y font encore référence,
 * mais il ne retourne plus rien.
 */
const functionStart = content.indexOf("  function getBusinessStatusAction() {");
if (functionStart === -1) {
  fail("Cannot find getBusinessStatusAction()");
}

const nextFunction = content.indexOf("  async function handleBusinessStatusAction()", functionStart);
if (nextFunction === -1) {
  fail("Cannot find handleBusinessStatusAction() after getBusinessStatusAction()");
}

const neutralFunction = `  function getBusinessStatusAction() {
    // AMARKHYS-REBUILD-05C
    // Workflow/status/business actions must be rendered by ERPRuntimePage / ERPRuntimeActionBar.
    // ERPEnterpriseForm must remain a form-only component and must not expose record-level actions.
    return null;
  }

`;

content = content.slice(0, functionStart) + neutralFunction + content.slice(nextFunction);

/**
 * 2. Sécurise aussi la variable businessStatusAction :
 * même si la fonction est réintroduite plus tard, rien ne doit apparaître en mode create.
 */
content = replaceOnce(
  content,
  "  const businessStatusAction = isRemovedRecord ? null : getBusinessStatusAction();",
  '  const businessStatusAction = mode === "create" || isRemovedRecord ? null : getBusinessStatusAction();',
  "businessStatusAction create guard"
);

fs.writeFileSync(formPath, content, "utf8");

const checks = [
  {
    label: "getBusinessStatusAction neutralisée",
    ok:
      content.includes("AMARKHYS-REBUILD-05C") &&
      /function getBusinessStatusAction\(\)\s*\{[\s\S]*?return null;[\s\S]*?\}/.test(content),
  },
  {
    label: "businessStatusAction guard create présent",
    ok: content.includes('mode === "create" || isRemovedRecord ? null : getBusinessStatusAction()'),
  },
  {
    label: "anciens labels RDV absents du formulaire",
    ok:
      !content.includes('label: "Reporter RDV"') &&
      !content.includes('label: "Confirmer le RDV"') &&
      !content.includes('label: "Annuler RDV"'),
  },
  {
    label: "anciens labels clients/vehicules absents du formulaire",
    ok:
      !content.includes('label: "Archiver client"') &&
      !content.includes('label: "Archiver vehicule"') &&
      !content.includes('label: "Archiver véhicule"'),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-REBUILD-05C — Suppression actions métier internes ERPEnterpriseForm",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Décision ERP",
  "",
  "ERPEnterpriseForm doit rester un composant formulaire. Les boutons métier / workflow / statut doivent être rendus par ERPRuntimePage / ERPRuntimeActionBar.",
  "",
  "## Correction appliquée",
  "",
  "- getBusinessStatusAction() neutralisée.",
  "- businessStatusAction protégé explicitement en mode create.",
  "- Aucun patch local sur /rendezvous/nouveau.",
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
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-REBUILD-05C] Remove form business status actions");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05C] DONE");
console.log("[NEXT] Rerun 05A audit, manual check /rendezvous/nouveau, then build.");