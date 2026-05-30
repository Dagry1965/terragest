const fs = require("fs");
const path = require("path");

const root = process.cwd();

const target = "src/components/erp/hub/ERPClientOperationalSheet.tsx";

const markers = [
  "Interventions actives",
  "Factures impay",
  "CA cum",
  "Derniere visite",
  "Dernière visite",
  "Prochain RDV",
  "Vehicules du client",
  "Véhicules du client",
  "selectedVehicle",
  "selectedVehicleId",
  "selectedRendezVous",
  "selectedIntervention",
  "Rendez-vous du vehicule",
  "Rendez-vous du véhicule",
  "Interventions du rendez-vous",
  "Lignes d",
  "factures",
  "encaissements",
  "Dossier vehicule selectionne",
  "Dossier véhicule sélectionné",
  "Navigation rapide",
  "onClick",
  "setSelected",
];

function full(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  const file = full(relativePath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function write(relativePath, content) {
  const file = full(relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function lineNumberAt(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function findLines(content, marker) {
  const lower = content.toLowerCase();
  const needle = marker.toLowerCase();
  const hits = [];
  let index = lower.indexOf(needle);

  while (index !== -1) {
    hits.push(lineNumberAt(content, index));
    index = lower.indexOf(needle, index + marker.length);
  }

  return hits;
}

function contextAround(content, lineNumber, before = 10, after = 18) {
  const lines = content.split(/\r?\n/);
  const start = Math.max(0, lineNumber - before - 1);
  const end = Math.min(lines.length, lineNumber + after);

  return lines
    .slice(start, end)
    .map((line, index) => {
      const actual = start + index + 1;
      return `${String(actual).padStart(5, " ")}: ${line}`;
    })
    .join("\n");
}

const source = read(target);

if (!source) {
  console.error("[MISSING]", target);
  process.exit(1);
}

const report = [];

report.push("# Q2-HUB-CLIENT-FINAL-B1 — Audit composant réel fiche client opérationnelle");
report.push("");
report.push(`Fichier cible : \`${target}\``);
report.push("");
report.push("Objectif : localiser précisément les blocs KPI, véhicules, listes RDV/interventions/lignes/factures/encaissements avant patch.");
report.push("");
report.push("## Marqueurs");
report.push("");

console.log("[Q2-HUB-CLIENT-FINAL-B1] Real client operational sheet audit");
console.log("[ROOT]", root);
console.log("[TARGET]", target);
console.log("[IMPORTANT]");

for (const marker of markers) {
  const lines = findLines(source, marker);

  console.log(`[MARKER] ${marker} count=${lines.length} lines=${lines.slice(0, 12).join(",")}`);

  report.push(`## ${marker}`);
  report.push("");
  report.push(`- Count : ${lines.length}`);
  report.push(`- Lines : ${lines.slice(0, 12).join(", ") || "-"}`);
  report.push("");

  for (const line of lines.slice(0, 4)) {
    report.push("```tsx");
    report.push(contextAround(source, line));
    report.push("```");
    report.push("");
  }
}

report.push("## Décision de patch attendue");
report.push("");
report.push("1. Agrandir les KPI haut gauche.");
report.push("2. Réduire/clarifier l'espace vide dans la carte véhicule.");
report.push("3. Vérifier que le clic véhicule pilote bien `selectedVehicleId`.");
report.push("4. Vérifier que les listes RDV/interventions/lignes/factures/encaissements sont déjà filtrées par sélection.");
report.push("5. Corriger uniquement le composant existant, sans créer de nouveau hub.");

write("docs/audits/Q2-HUB-CLIENT-FINAL-B1-real-client-sheet-audit.md", report.join("\n"));

console.log("[REPORT] docs/audits/Q2-HUB-CLIENT-FINAL-B1-real-client-sheet-audit.md");