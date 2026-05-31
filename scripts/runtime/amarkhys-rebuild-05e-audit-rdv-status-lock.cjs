const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  module: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  actions: "src/runtime/modules/generated/rendezvous/rendezvous.actions.ts",
  workflows: "src/runtime/modules/generated/rendezvous/rendezvous.workflows.ts",
  statusGovernance: "src/runtime/status/RuntimeStatusGovernanceEngine.ts",
  enterpriseForm: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  formField: "src/components/erp/forms/enterprise/ERPFormField.tsx",
  formTabs: "src/components/erp/forms/enterprise/ERPFormTabs.tsx",
  moduleTypes: "src/runtime/modules/ERPModule.ts",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-05E-A-rdv-status-lock-audit.md";
const reportPath = path.join(root, reportRel);

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

function blockAround(content, needle, before = 12, after = 30) {
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
const governanceContent = read(files.statusGovernance);
const formContent = read(files.enterpriseForm);
const fieldContent = read(files.formField);
const tabsContent = read(files.formTabs);
const typesContent = read(files.moduleTypes);

const expectedStatuses = ["planifie", "confirme", "en_cours", "termine", "annule"];

const checks = [];

checks.push({
  group: "Fichiers",
  label: "rendezvous.module.ts existe",
  ok: exists(files.module),
});

checks.push({
  group: "Fichiers",
  label: "RuntimeStatusGovernanceEngine existe",
  ok: exists(files.statusGovernance),
});

checks.push({
  group: "Champ statut",
  label: "champ statut présent dans rendezvous.module.ts",
  ok: moduleContent.includes('key: "statut"') || moduleContent.includes('name: "statut"'),
});

checks.push({
  group: "Champ statut",
  label: "champ statut actuellement visible dans le formulaire",
  ok:
    /key:\s*"statut"[\s\S]*?form:\s*\{[\s\S]*?visible:\s*true/.test(moduleContent) ||
    /key:\s*"statut"[\s\S]*?form:\s*\{/.test(moduleContent),
});

for (const status of expectedStatuses) {
  checks.push({
    group: "Statuts",
    label: `statut attendu présent: ${status}`,
    ok: moduleContent.includes(status) || actionsContent.includes(status) || workflowsContent.includes(status),
  });
}

checks.push({
  group: "Actions",
  label: "actions RDV existent et pilotent le statut",
  ok:
    actionsContent.includes("Reporter RDV") &&
    actionsContent.includes("Confirmer le RDV") &&
    actionsContent.includes("Annuler"),
});

checks.push({
  group: "Gouvernance",
  label: "moteur gouvernance référence rendezvous",
  ok: governanceContent.includes("rendezvous"),
});

checks.push({
  group: "Gouvernance",
  label: "moteur gouvernance supporte action_only",
  ok: governanceContent.includes("action_only"),
});

checks.push({
  group: "Gouvernance",
  label: "formulaire lit statusGovernance",
  ok: formContent.includes("statusGovernance"),
});

checks.push({
  group: "Gouvernance",
  label: "formulaire applique un verrouillage action_only",
  ok:
    formContent.includes("action_only") &&
    (
      formContent.includes("readOnly") ||
      formContent.includes("readonly") ||
      formContent.includes("disabled") ||
      formContent.includes("locked")
    ),
});

checks.push({
  group: "Field rendering",
  label: "ERPFormField supporte readOnly/disabled",
  ok:
    fieldContent.includes("readOnly") ||
    fieldContent.includes("readonly") ||
    fieldContent.includes("disabled"),
});

checks.push({
  group: "Metadata",
  label: "contrat module supporte readonly/locked",
  ok:
    typesContent.includes("readOnly") ||
    typesContent.includes("readonly") ||
    typesContent.includes("locked") ||
    typesContent.includes("disabled"),
});

const grouped = checks.reduce((acc, check) => {
  acc[check.group] ||= [];
  acc[check.group].push(check);
  return acc;
}, {});

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const statusBlocks = [
  ...blockAround(moduleContent, 'key: "statut"', 10, 35),
  ...blockAround(moduleContent, 'name: "statut"', 10, 35),
];

const governanceBlocks = [
  ...blockAround(governanceContent, "rendezvous", 12, 40),
  ...blockAround(governanceContent, "action_only", 10, 35),
  ...blockAround(governanceContent, "editMode", 10, 35),
];

const formBlocks = [
  ...blockAround(formContent, "statusGovernance", 10, 35),
  ...blockAround(formContent, "action_only", 10, 35),
  ...blockAround(formContent, "lockedFields", 10, 35),
  ...blockAround(formContent, "readOnly", 10, 35),
  ...blockAround(formContent, "disabled", 10, 35),
];

const report = [];

report.push("# AMARKHYS-REBUILD-05E-A — Audit verrouillage statut RDV");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Vérifier comment rendre le champ statut du module rendezvous visible mais non modifiable directement, en s'appuyant sur le runtime existant.");
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

function writeBlocks(title, blocks) {
  report.push(`## ${title}`);
  report.push("");

  if (!blocks.length) {
    report.push("- Aucun bloc trouvé.");
    report.push("");
    return;
  }

  for (const block of blocks) {
    report.push(`### ${block.needle} — ligne ${block.line}`);
    report.push("");
    for (const row of block.rows) {
      report.push(`${String(row.line).padStart(5, " ")}: ${row.text}`);
    }
    report.push("");
  }
}

writeBlocks("Bloc statut rendezvous.module.ts", statusBlocks);
writeBlocks("Blocs RuntimeStatusGovernanceEngine", governanceBlocks);
writeBlocks("Blocs ERPEnterpriseForm statut/verrouillage", formBlocks);

report.push("## Décision attendue");
report.push("");
report.push("- Si RuntimeStatusGovernanceEngine supporte déjà action_only : ajouter rendezvous à la policy.");
report.push("- Si ERPEnterpriseForm applique déjà action_only : ne pas patcher le formulaire.");
report.push("- Si le champ statut doit être verrouillé par metadata : utiliser la propriété existante readonly/locked si elle existe.");
report.push("- Le statut doit rester visible et être modifié uniquement par les actions runtime.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-05E-A] RDV status lock audit");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Extract FAILs and relevant blocks.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05E-A] DONE");