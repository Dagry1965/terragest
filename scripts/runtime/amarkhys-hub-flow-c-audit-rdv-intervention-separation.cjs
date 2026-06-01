const fs = require("fs");
const path = require("path");

const root = process.cwd();

const fileRel = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const reportRel = "docs/audits/AMARKHYS-HUB-FLOW-C-audit-rdv-intervention-separation.md";

const filePath = path.join(root, fileRel);
const reportPath = path.join(root, reportRel);

if (!fs.existsSync(filePath)) {
  console.error("[FAIL] Missing file: " + fileRel);
  process.exit(1);
}

const content = fs.readFileSync(filePath, "utf8");
const lines = content.split(/\r?\n/);

const patterns = [
  "1. Rendez-vous du véhicule",
  "Sélectionnez un rendez-vous",
  "2. Interventions du rendez-vous sélectionné",
  "Rendez-vous sélectionné",
  "selectedRendezvous",
  "selectedRendezvousId",
  "setSelectedRendezvousId",
  "interventionsForSelectedRendezvous",
  "setSelectedInterventionId",
  "interventionsautoModule",
  "parentModule={interventionsautoModule}",
  "lignesinterventionauto",
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

function around(lineNumber, before = 10, after = 20) {
  const start = Math.max(0, lineNumber - before - 1);
  const end = Math.min(lines.length, lineNumber + after);
  return lines
    .slice(start, end)
    .map((line, index) => `${start + index + 1}: ${line}`)
    .join("\n");
}

const checks = [
  {
    label: "section rendez-vous existante",
    ok: content.includes("1. Rendez-vous du véhicule"),
  },
  {
    label: "section interventions existante",
    ok: content.includes("2. Interventions du rendez-vous sélectionné"),
  },
  {
    label: "selectedRendezvousId existe",
    ok: content.includes("selectedRendezvousId"),
  },
  {
    label: "selectedRendezvous existe",
    ok: content.includes("selectedRendezvous"),
  },
  {
    label: "interventions filtrées par rendez-vous existent",
    ok: content.includes("interventionsForSelectedRendezvous"),
  },
  {
    label: "sélection RDV reset intervention",
    ok: content.includes("setSelectedInterventionId(null)"),
  },
  {
    label: "rendu intervention actuel localisé",
    ok: content.includes("parentModule={interventionsautoModule}") || content.includes("interventionsForSelectedRendezvous.map"),
  },
];

const okCount = checks.filter((check) => check.ok).length;
const failCount = checks.length - okCount;

const report = [
  "# AMARKHYS-HUB-FLOW-C — Audit RDV / interventions separation",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "- Vérifier la séparation existante entre rendez-vous sélectionnable et interventions filtrées.",
  "- Préparer une correction visuelle sans refonte complète.",
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

console.log("[AMARKHYS-HUB-FLOW-C] Audit RDV / interventions separation");
console.log("[REPORT]", reportRel);
console.log("[OK]", okCount);
console.log("[FAIL]", failCount);
console.log("[HITS]", hits.length);

if (failCount > 0) {
  process.exit(1);
}

console.log("[AMARKHYS-HUB-FLOW-C] DONE");
console.log("[NEXT] Apply visual separation polish.");