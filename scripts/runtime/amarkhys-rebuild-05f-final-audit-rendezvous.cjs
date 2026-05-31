const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  module: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  actions: "src/runtime/modules/generated/rendezvous/rendezvous.actions.ts",
  form: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  actionBar: "src/components/erp/runtime/ERPRuntimeActionBar.tsx",
  createPage: "src/app/(private)/rendezvous/nouveau/page.tsx",
  detailPage: "src/app/(private)/rendezvous/[id]/page.tsx",
  editPage: "src/app/(private)/rendezvous/[id]/edit/page.tsx",
  planningPage: "src/app/(private)/rendezvous/planning/page.tsx",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-05F-final-rendezvous-audit.md";
const reportPath = path.join(root, reportRel);

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function hit(content, pattern) {
  return content.includes(pattern);
}

function block(content, key) {
  const index = content.indexOf(key);
  if (index === -1) return "";
  const start = Math.max(0, content.lastIndexOf("{", index));
  const end = content.indexOf("}", index);
  return content.slice(start, end + 1);
}

const moduleContent = read(files.module);
const actionsContent = read(files.actions);
const formContent = read(files.form);

const rdvStatusBlock = block(moduleContent, 'key: "statut"');
const interventionBlock = block(moduleContent, 'key: "interventions-rendezvous"');

const checks = [
  {
    group: "Routes",
    label: "/rendezvous/nouveau existe",
    ok: exists(files.createPage),
  },
  {
    group: "Routes",
    label: "/rendezvous/[id] existe",
    ok: exists(files.detailPage),
  },
  {
    group: "Routes",
    label: "/rendezvous/[id]/edit existe",
    ok: exists(files.editPage),
  },
  {
    group: "Routes",
    label: "/rendezvous/planning existe",
    ok: exists(files.planningPage),
  },
  {
    group: "Actions",
    label: "Reporter RDV présent",
    ok: hit(actionsContent, "Reporter RDV"),
  },
  {
    group: "Actions",
    label: "Confirmer le RDV présent",
    ok: hit(actionsContent, "Confirmer le RDV"),
  },
  {
    group: "Actions",
    label: "Annuler RDV/action annulation présente",
    ok: hit(actionsContent, "Annuler") || hit(actionsContent, "Annuler RDV"),
  },
  {
    group: "Statut",
    label: "Champ statut présent",
    ok: hit(rdvStatusBlock, 'key: "statut"'),
  },
  {
    group: "Statut",
    label: "Statut RDV verrouillé par readonlyIf",
    ok:
      hit(rdvStatusBlock, "readonlyIf") &&
      hit(rdvStatusBlock, 'operator: "in"') &&
      hit(rdvStatusBlock, "values:"),
  },
  {
    group: "Statut",
    label: "Statuts RDV complets",
    ok:
      hit(rdvStatusBlock, '"planifie"') &&
      hit(rdvStatusBlock, '"confirme"') &&
      hit(rdvStatusBlock, '"en_cours"') &&
      hit(rdvStatusBlock, '"termine"') &&
      hit(rdvStatusBlock, '"annule"'),
  },
  {
    group: "Form runtime",
    label: "ERPEnterpriseForm évalue readonlyIf",
    ok:
      hit(formContent, "evaluateERPConditionalRule") &&
      hit(formContent, "readonlyIfFields") &&
      hit(formContent, "...readonlyIfFields"),
  },
  {
    group: "Form runtime",
    label: "ERPEnterpriseForm supporte operator in/notIn",
    ok: hit(formContent, 'case "in"') && hit(formContent, 'case "notIn"'),
  },
  {
    group: "Intervention liée",
    label: "Bloc Intervention générée absent en edit",
    ok:
      hit(interventionBlock, 'key: "interventions-rendezvous"') &&
      hit(interventionBlock, 'displayIn: ["detail"]') &&
      !hit(interventionBlock, '"edit"'),
  },
  {
    group: "Intervention liée",
    label: "Création depuis panneau intervention désactivée",
    ok:
      hit(interventionBlock, 'key: "interventions-rendezvous"') &&
      hit(interventionBlock, "allowCreate: false"),
  },
  {
    group: "Form actions",
    label: "Actions métier internes supprimées du formulaire",
    ok:
      !hit(formContent, "getBusinessStatusAction") ||
      hit(formContent, "return null"),
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const grouped = checks.reduce((acc, check) => {
  acc[check.group] ||= [];
  acc[check.group].push(check);
  return acc;
}, {});

const report = [];

report.push("# AMARKHYS-REBUILD-05F — Audit final rendezvous");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
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

report.push("## Points validés attendus");
report.push("");
report.push("- /rendezvous/nouveau : pas d'actions métier record-level.");
report.push("- /rendezvous/[id]/edit : statut visible mais non modifiable.");
report.push("- /rendezvous/[id]/edit : pas de panneau Intervention générée.");
report.push("- /rendezvous/[id] : intervention liée consultable en detail si présente.");
report.push("- Actions RDV conservées dans le runtime/action bar.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-05F] Final rendezvous audit");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Open report and fix FAIL only.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05F] DONE");
console.log("[NEXT] pnpm build, then commit audit.");