const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";
const actionsRel = "src/runtime/modules/generated/rendezvous/rendezvous.actions.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-05D-audit-rdv-intervention-related-panel.md";

const modulePath = path.join(root, moduleRel);
const actionsPath = path.join(root, actionsRel);
const reportPath = path.join(root, reportRel);

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
          text: line.trim(),
        });
      }
    }
  });

  return hits;
}

const moduleContent = read(moduleRel);
const actionsContent = read(actionsRel);

const patterns = [
  "interventionsauto",
  "intervention",
  "Intervention générée",
  "Intervention generee",
  "Créer une intervention",
  "Creer une intervention",
  "Créer intervention",
  "Creer intervention",
  "allowCreate",
  "displayIn",
  "foreignKey",
  "rendezVousId",
  "rendezvousId",
];

const moduleHits = lineHits(moduleContent, patterns);
const actionHits = lineHits(actionsContent, patterns);

const report = [];

report.push("# AMARKHYS-REBUILD-05D — Audit RDV intervention related panel");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Décision métier");
report.push("");
report.push("- Un RDV ne doit pas servir à créer plusieurs interventions.");
report.push("- Le formulaire edit RDV ne doit pas afficher le panneau de composition intervention.");
report.push("- La création d'intervention doit passer par une action runtime contrôlée.");
report.push("- Une intervention peut ensuite porter plusieurs lignes d'intervention.");
report.push("");
report.push("## Hits rendezvous.module.ts");
report.push("");

for (const hit of moduleHits) {
  report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
}

report.push("");
report.push("## Hits rendezvous.actions.ts");
report.push("");

for (const hit of actionHits) {
  report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
}

report.push("");
report.push("## Lecture recommandée");
report.push("");
report.push("Corriger uniquement le bloc related/children RDV -> interventionsauto : pas d'affichage en edit, pas de création depuis ce panneau.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-05D] Audit RDV intervention related panel");
console.log("[REPORT]", reportRel);
console.log("[MODULE_HITS]", moduleHits.length);
console.log("[ACTION_HITS]", actionHits.length);
console.log("[NEXT] Extract related lines.");