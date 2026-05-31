const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  module: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  actions: "src/runtime/modules/generated/rendezvous/rendezvous.actions.ts",
  workflows: "src/runtime/modules/generated/rendezvous/rendezvous.workflows.ts",
  createPage: "src/app/(private)/rendezvous/nouveau/page.tsx",
  listPage: "src/app/(private)/rendezvous/page.tsx",
  planningPage: "src/app/(private)/rendezvous/planning/page.tsx",
  detailPage: "src/app/(private)/rendezvous/[id]/page.tsx",
  editPage: "src/app/(private)/rendezvous/[id]/edit/page.tsx",
  genericCreatePage: "src/components/erp/generic/GenericCreatePage.tsx",
  genericDetailPage: "src/components/erp/generic/GenericDetailPage.tsx",
  genericEditPage: "src/components/erp/generic/GenericEditPage.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  runtimeActionBar: "src/components/erp/runtime/ERPRuntimeActionBar.tsx",
  enterpriseForm: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
};

const reportRel = "docs/audits/AMARKHYS-REBUILD-05A-rendezvous-actions-context-audit.md";
const reportPath = path.join(root, reportRel);

const actionLabels = [
  "Reporter RDV",
  "Confirmer le RDV",
  "Confirmer RDV",
  "Annuler",
  "Annuler RDV",
  "Démarrer RDV",
  "Demarrer RDV",
  "Terminer RDV",
  "Créer intervention",
  "Creer intervention",
  "Ouvrir planning",
  "Planifier",
];

const contextMarkers = [
  "mode",
  "create",
  "nouveau",
  "detail",
  "edit",
  "list",
  "actions",
  "runtimeOnly",
  "type:",
  "scope",
  "context",
  "record",
  "form",
  "ERPRuntimeActionBar",
  "ERPEnterpriseForm",
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

function regexHits(content, regexes) {
  const lines = content.split(/\r?\n/);
  const hits = [];

  lines.forEach((line, index) => {
    for (const item of regexes) {
      if (item.regex.test(line)) {
        hits.push({
          pattern: item.label,
          line: index + 1,
          text: line.trim().slice(0, 260),
        });
      }
    }
  });

  return hits;
}

function fileSummary(label, rel) {
  const content = read(rel);

  return {
    label,
    rel,
    exists: exists(rel),
    lineCount: content ? content.split(/\r?\n/).length : 0,
    actionHits: lineHits(content, actionLabels),
    contextHits: lineHits(content, contextMarkers),
    suspiciousHits: regexHits(content, [
      { label: "hardcoded button", regex: /<button|<Button|ERPButton|onClick/i },
      { label: "actions passed to form", regex: /actions\s*=|module\.actions|actions:\s*\[/i },
      { label: "create mode", regex: /type=["']create["']|mode=["']create["']|mode:\s*["']create["']/i },
      { label: "runtime action bar", regex: /ERPRuntimeActionBar|RuntimeActionBar/i },
      { label: "form action", regex: /getBusinessStatusAction|businessStatusAction/i },
    ]),
  };
}

const summaries = Object.entries(files).map(([label, rel]) => fileSummary(label, rel));

const moduleContent = read(files.module);
const actionsContent = read(files.actions);
const createPageContent = read(files.createPage);
const genericCreateContent = read(files.genericCreatePage);
const runtimePageContent = read(files.runtimePage);
const runtimeActionBarContent = read(files.runtimeActionBar);
const enterpriseFormContent = read(files.enterpriseForm);

const checks = [];

checks.push({
  group: "Fichiers",
  label: "rendezvous.module.ts existe",
  ok: exists(files.module),
});

checks.push({
  group: "Fichiers",
  label: "rendezvous.actions.ts existe",
  ok: exists(files.actions),
});

checks.push({
  group: "Actions rendezvous",
  label: "Actions RDV détectées dans module ou actions",
  ok: lineHits(moduleContent + "\n" + actionsContent, actionLabels).length > 0,
});

checks.push({
  group: "Create page",
  label: "/rendezvous/nouveau existe",
  ok: exists(files.createPage),
});

checks.push({
  group: "Create page",
  label: "Create page utilise une page générique ou runtime",
  ok:
    /GenericCreatePage|ERPRuntimePage|type=["']create["']|mode=["']create["']/.test(createPageContent),
});

checks.push({
  group: "Create page",
  label: "Aucun bouton métier RDV hardcodé directement dans /rendezvous/nouveau/page.tsx",
  ok: lineHits(createPageContent, actionLabels).length === 0,
});

checks.push({
  group: "Generic create",
  label: "GenericCreatePage existe",
  ok: exists(files.genericCreatePage),
});

checks.push({
  group: "Generic create",
  label: "GenericCreatePage contient un contexte create identifiable",
  ok: /create|nouveau|mode|type/.test(genericCreateContent),
});

checks.push({
  group: "Runtime actions",
  label: "ERPRuntimeActionBar existe",
  ok: exists(files.runtimeActionBar),
});

checks.push({
  group: "Runtime actions",
  label: "ERPRuntimePage existe",
  ok: exists(files.runtimePage),
});

checks.push({
  group: "Runtime actions",
  label: "Un filtre create/no-record est détecté dans action bar ou runtime page",
  ok:
    /mode\s*!==\s*["']create["']|mode\s*===\s*["']create["']|type\s*!==\s*["']create["']|type\s*===\s*["']create["']|record\s*\?|record\s*&&|!record/.test(
      runtimeActionBarContent + "\n" + runtimePageContent
    ),
});

checks.push({
  group: "ERPEnterpriseForm",
  label: "ERPEnterpriseForm ne contient pas directement les actions RDV relevées",
  ok: lineHits(enterpriseFormContent, actionLabels).length === 0,
});

const grouped = checks.reduce((acc, check) => {
  acc[check.group] ||= [];
  acc[check.group].push(check);
  return acc;
}, {});

const okCount = checks.filter((c) => c.ok).length;
const failCount = checks.length - okCount;

const report = [];

report.push("# AMARKHYS-REBUILD-05A — Audit boutons/actions rendezvous par contexte page");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Contexte terrain");
report.push("");
report.push("- /rendezvous : Planning, Nouveau, Exporter");
report.push("- /rendezvous/nouveau : Reporter RDV, Confirmer le RDV, Annuler");
report.push("- /rendezvous/planning : Retour liste, Nouveau, Planifier");
report.push("- /rendezvous/dashboard : aucun");
report.push("- /rendezvous/workflows : aucun");
report.push("");
report.push("## Règle ERP cible");
report.push("");
report.push("Une action record-level ne doit jamais être affichée en contexte create/nouveau, car aucun record métier n'existe encore.");
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

report.push("## Fichiers inspectés");
report.push("");

for (const summary of summaries) {
  report.push(`### ${summary.label}`);
  report.push("");
  report.push(`Fichier: ${summary.rel}`);
  report.push(`Existe: ${summary.exists ? "YES" : "NO"}`);
  report.push(`Lignes: ${summary.lineCount}`);
  report.push("");

  if (summary.actionHits.length) {
    report.push("Actions RDV détectées:");
    for (const hit of summary.actionHits.slice(0, 40)) {
      report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
    }
    report.push("");
  }

  if (summary.suspiciousHits.length) {
    report.push("Marqueurs suspects:");
    for (const hit of summary.suspiciousHits.slice(0, 50)) {
      report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
    }
    report.push("");
  }

  if (summary.contextHits.length) {
    report.push("Marqueurs contexte/actions:");
    for (const hit of summary.contextHits.slice(0, 50)) {
      report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
    }
    report.push("");
  }
}

report.push("## Lecture recommandée");
report.push("");
report.push("Si les actions RDV ne sont pas hardcodées dans la page create mais apparaissent visuellement sur /rendezvous/nouveau, la correction doit être générique dans le rendu runtime des actions : ne pas afficher les actions record-level lorsque mode/type=create ou lorsque record est absent.");
report.push("");
report.push("Ne pas patcher localement /rendezvous/nouveau.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-05A] Rendezvous actions context audit");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  console.log("[NEXT] Extract FAILs and relevant action rendering lines.");
  process.exit(1);
}

console.log("[AMARKHYS-REBUILD-05A] DONE");