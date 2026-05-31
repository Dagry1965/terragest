const fs = require("fs");
const path = require("path");

const root = process.cwd();

const targets = [
  {
    name: "clientsauto.module.ts",
    rel: "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
    patterns: [
      "factureId",
      "factures",
      "encaissements",
      "interventionId",
      "interventions",
      "paiementId",
      "paiements",
      "stockId",
      "mouvementStockId",
      "ligneInterventionId",
      "lignesIntervention",
    ],
  },
  {
    name: "ERPEnterpriseForm.tsx",
    rel: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
    patterns: [
      "clientsauto.activer",
      "Activer client",
      "Désactiver client",
      "Réactiver client",
      "Archiver client",
      "Ouvrir fiche opérationnelle",
      "Ajouter véhicule",
    ],
  },
];

const reportRel = "docs/audits/AMARKHYS-REBUILD-03B1-locate-clientsauto-fails.md";
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

const report = [];
report.push("# AMARKHYS-REBUILD-03B1 — Localisation précise des FAIL clientsauto");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");

let totalHits = 0;

for (const target of targets) {
  const content = read(target.rel);
  const hits = lineHits(content, target.patterns);
  totalHits += hits.length;

  report.push(`## ${target.name}`);
  report.push("");
  report.push(`Fichier: ${target.rel}`);
  report.push(`Occurrences: ${hits.length}`);
  report.push("");

  if (!content) {
    report.push("- MISSING");
    report.push("");
    continue;
  }

  if (hits.length === 0) {
    report.push("- Aucun hit.");
    report.push("");
    continue;
  }

  for (const hit of hits) {
    report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text}`);
  }

  report.push("");
}

report.push("## Lecture");
report.push("");
report.push("Ce rapport localise seulement les deux FAIL de 03A. Ne pas corriger sans lire les lignes exactes.");
report.push("");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-03B1] Locate clientsauto FAILs");
console.log("[REPORT]", reportRel);
console.log("[HITS]", totalHits);
console.log("[NEXT] Open report and paste relevant lines.");