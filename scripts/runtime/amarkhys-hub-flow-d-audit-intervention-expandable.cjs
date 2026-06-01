const fs = require("fs");
const path = require("path");

const root = process.cwd();

const fileRel = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const reportRel = "docs/audits/AMARKHYS-HUB-FLOW-D-audit-intervention-expandable.md";

const filePath = path.join(root, fileRel);
const reportPath = path.join(root, reportRel);

if (!fs.existsSync(filePath)) {
  console.error("[FAIL] Missing file: " + fileRel);
  process.exit(1);
}

const content = fs.readFileSync(filePath, "utf8");
const lines = content.split(/\r?\n/);

const patterns = [
  "expandedInterventionId",
  "setExpandedInterventionId",
  "toggleExpandedIntervention",
  "selectedInterventionId",
  "setSelectedInterventionId",
  "interventionsForSelectedRendezvous.map",
  "data-q2-hub-client-final-c2",
  "lignesForSelectedIntervention",
  "interventionLines",
  "lignes.filter",
  "interventionId",
  "parentModule={interventionsautoModule}",
  "parentModule={lignesinterventionautoModule}",
  "montantTTC",
  "montantHT",
  "statut",
  "mecanicienId",
  "dateIntervention",
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

function around(lineNumber, before = 12, after = 28) {
  const start = Math.max(0, lineNumber - before - 1);
  const end = Math.min(lines.length, lineNumber + after);
  return lines
    .slice(start, end)
    .map((line, index) => `${start + index + 1}: ${line}`)
    .join("\n");
}

const checks = [
  {
    label: "état expandedInterventionId existe",
    ok: content.includes("expandedInterventionId"),
  },
  {
    label: "toggleExpandedIntervention existe",
    ok: content.includes("toggleExpandedIntervention"),
  },
  {
    label: "rendu interventions localisé",
    ok: content.includes("interventionsForSelectedRendezvous.map"),
  },
  {
    label: "sélection intervention existe",
    ok: content.includes("selectedInterventionId") && content.includes("setSelectedInterventionId"),
  },
  {
    label: "lignes disponibles dans le composant",
    ok: content.includes("const lignes = relatedRecordsBySection.lignes ?? []"),
  },
  {
    label: "filtrage lignes par intervention existe ou à créer",
    ok:
      content.includes("lignesForSelectedIntervention") ||
      content.includes("interventionLines") ||
      content.includes("interventionId"),
  },
  {
    label: "bloc actuel des lignes localisé",
    ok:
      content.includes("parentModule={lignesinterventionautoModule}") ||
      content.includes("lignesinterventionautoModule"),
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-HUB-FLOW-D — Audit intervention expandable readiness",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "- Auditer le rendu actuel des interventions dans le hub client.",
  "- Préparer expansion + / - avec lignes d’intervention.",
  "",
  "## Règle cible",
  "",
  "- Rendez-vous = filtre.",
  "- Intervention = élément expandable.",
  "- Expansion intervention = synthèse + lignes + totaux + actions utiles.",
  "- Ne pas toucher aux factures / encaissements dans cette passe.",
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

console.log("[AMARKHYS-HUB-FLOW-D] Audit intervention expandable readiness");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[HITS]", hits.length);

if (failCount > 0) {
  console.log("[NEXT] Extract FAILs and context before fixing.");
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-D] DONE");
console.log("[NEXT] Apply intervention expandable rendering.");