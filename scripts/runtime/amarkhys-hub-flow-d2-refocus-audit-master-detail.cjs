const fs = require("fs");
const path = require("path");

const root = process.cwd();

const fileRel = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const reportRel = "docs/audits/AMARKHYS-HUB-FLOW-D2-REFOCUS-audit-master-detail.md";

const filePath = path.join(root, fileRel);
const reportPath = path.join(root, reportRel);

if (!fs.existsSync(filePath)) {
  console.error("[FAIL] Missing file: " + fileRel);
  process.exit(1);
}

const content = fs.readFileSync(filePath, "utf8");
const lines = content.split(/\r?\n/);

const patterns = [
  "Véhicule sélectionné",
  "Vehicule sélectionné",
  "selectedVehicle ?",
  "text(selectedVehicle",
  "interventionsForSelectedRendezvous.map",
  "data-q2-hub-client-final-c2",
  "data-hub-flow-d2-intervention-lines",
  "expandedInterventionId",
  "toggleExpandedIntervention",
  "facturesForSelectedIntervention",
  "encaissements",
  "lignes",
  "linesForIntervention",
  "totalLinesAmount",
];

const hits = [];

lines.forEach((line, index) => {
  for (const pattern of patterns) {
    if (line.includes(pattern)) {
      hits.push({
        line: index + 1,
        pattern,
        text: line.trim(),
      });
    }
  }
});

function around(lineNumber, before = 12, after = 30) {
  const start = Math.max(0, lineNumber - before - 1);
  const end = Math.min(lines.length, lineNumber + after);
  return lines
    .slice(start, end)
    .map((line, index) => `${start + index + 1}: ${line}`)
    .join("\n");
}

const checks = [
  {
    label: "carte véhicule sélectionné localisée",
    ok: content.includes("Véhicule sélectionné") || content.includes("Vehicule sélectionné"),
  },
  {
    label: "rendu interventions actuel localisé",
    ok: content.includes("interventionsForSelectedRendezvous.map"),
  },
  {
    label: "expandedInterventionId existe",
    ok: content.includes("expandedInterventionId"),
  },
  {
    label: "toggleExpandedIntervention existe",
    ok: content.includes("toggleExpandedIntervention"),
  },
  {
    label: "lignes disponibles",
    ok: content.includes("const lignes = relatedRecordsBySection.lignes ?? []"),
  },
  {
    label: "factures disponibles",
    ok: content.includes("const factures = relatedRecordsBySection.factures ?? []"),
  },
  {
    label: "encaissements disponibles",
    ok: content.includes("const encaissements = relatedRecordsBySection.encaissements ?? []"),
  },
  {
    label: "ancienne expansion D2 déjà présente ou absente à confirmer",
    ok: true,
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS — Audit master/detail intervention table",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "- Supprimer la carte verte Véhicule sélectionné.",
  "- Remplacer le rendu interventions par un tableau maître/détail.",
  "- Préparer une ligne détail pleine largeur sous l’intervention ouverte.",
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
  "## Hits",
  "",
  ...hits.map((hit) => `- L${hit.line} — ${hit.pattern} — ${hit.text}`),
  "",
  "## Contextes clés",
  "",
  ...hits.slice(0, 12).flatMap((hit) => [
    `### L${hit.line} — ${hit.pattern}`,
    "",
    "```tsx",
    around(hit.line),
    "```",
    "",
  ]),
  "",
].join("\n");

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report, "utf8");

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS] Audit master/detail");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[HITS]", hits.length);

if (failCount > 0) {
  console.log("[NEXT] Extract FAILs before fixing.");
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS] DONE");
console.log("[NEXT] Apply master/detail refocus.");