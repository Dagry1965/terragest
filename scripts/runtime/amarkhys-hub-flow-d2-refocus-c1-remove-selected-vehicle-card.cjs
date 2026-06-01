const fs = require("fs");
const path = require("path");

const root = process.cwd();

const fileRel = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const reportRel = "docs/audits/AMARKHYS-HUB-FLOW-D2-REFOCUS-C1-remove-selected-vehicle-card.md";

const filePath = path.join(root, fileRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  fail("Missing file: " + fileRel);
}

const backupPath = filePath + ".bak-hub-flow-d2-refocus-c1-remove-selected-vehicle-card";
fs.copyFileSync(filePath, backupPath);
console.log("[BACKUP]", path.relative(root, backupPath));

let content = fs.readFileSync(filePath, "utf8");
const before = content;

const title = "Véhicule sélectionné";
const titleIndex = content.indexOf(title);

if (titleIndex === -1) {
  fail("Cannot find selected vehicle card title: " + title);
}

// La carte verte commence au wrapper conditionnel juste avant le titre.
const start = content.lastIndexOf("{selectedVehicle ? (", titleIndex);

if (start === -1) {
  fail("Cannot find selected vehicle card start");
}

// Elle se termine juste avant la section RDV, qui doit rester intacte.
const rdvSectionMarker = '<section className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white">';
const end = content.indexOf(rdvSectionMarker, titleIndex);

if (end === -1) {
  fail("Cannot find RDV section marker after selected vehicle card");
}

const removedBlock = content.slice(start, end);

if (!removedBlock.includes(title)) {
  fail("Removed block does not contain selected vehicle title");
}

if (!removedBlock.includes("text(selectedVehicle")) {
  fail("Removed block does not look like selected vehicle card");
}

content = content.slice(0, start) + content.slice(end);

fs.writeFileSync(filePath, content, "utf8");

const checks = [
  {
    label: "carte verte Véhicule sélectionné supprimée",
    ok: !content.includes("Véhicule sélectionné"),
  },
  {
    label: "section RDV conservée",
    ok: content.includes("1. Choisir un rendez-vous") && content.includes("Rendez-vous du véhicule"),
  },
  {
    label: "section interventions conservée",
    ok: content.includes("2. Interventions liées au rendez-vous"),
  },
  {
    label: "filtrage interventions conservé",
    ok: content.includes("interventionsForSelectedRendezvous"),
  },
  {
    label: "factures conservées",
    ok: content.includes("facturesForSelectedIntervention") || content.includes("factures"),
  },
  {
    label: "encaissements conservés",
    ok: content.includes("encaissements"),
  },
  {
    label: "selectedVehicle logique conservée",
    ok: content.includes("const selectedVehicle = useMemo"),
  },
  {
    label: "fichier modifié",
    ok: before !== content,
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C1 — Remove selected vehicle card",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "- Supprimer uniquement la carte verte `Véhicule sélectionné`.",
  "- Ne pas modifier le flux RDV / interventions / factures / encaissements.",
  "",
  "## Checks",
  "",
  ...checks.map((check) => `- ${check.ok ? "OK" : "FAIL"} — ${check.label}`),
  "",
  "## Synthèse",
  "",
  `- OK: ${okCount}`,
  `- FAIL: ${failCount}`,
  "",
  "## Bloc supprimé",
  "",
  "```tsx",
  removedBlock.slice(0, 2400),
  removedBlock.length > 2400 ? "\n/* ... bloc tronqué dans le rapport ... */" : "",
  "```",
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C1] Remove selected vehicle card");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C1] DONE");
console.log("[NEXT] Build and UI check.");