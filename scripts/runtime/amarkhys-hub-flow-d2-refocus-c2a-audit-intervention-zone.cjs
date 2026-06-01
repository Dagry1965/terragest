const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET = path.join(ROOT, "src", "components", "erp", "hub", "ERPClientOperationalSheet.tsx");
const REPORT = path.join(ROOT, "docs", "audits", "AMARKHYS-HUB-FLOW-D2-REFOCUS-C2A-audit-intervention-zone.md");

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

if (!fs.existsSync(TARGET)) fail(`Missing target: ${TARGET}`);

const source = fs.readFileSync(TARGET, "utf8");
const lines = source.split(/\r?\n/);

const patterns = [
  "Interventions liées au rendez-vous",
  "Interventions liees au rendez-vous",
  "appointmentInterventions",
  "selectedAppointment",
  "selectedRendezvous",
  "selectedRdv",
  "rendezvousInterventions",
  "filteredInterventions",
  "selectedInterventionId",
  "setSelectedInterventionId",
  ".map((intervention",
  ".map((record",
  "interventions.map",
  "interventionsFor",
  "rendezvous",
  "rdv",
];

const hits = [];

for (const pattern of patterns) {
  lines.forEach((line, index) => {
    if (line.includes(pattern)) {
      const start = Math.max(0, index - 8);
      const end = Math.min(lines.length, index + 18);
      hits.push({
        pattern,
        line: index + 1,
        excerpt: lines.slice(start, end).map((content, i) => {
          const n = start + i + 1;
          return `${String(n).padStart(4, " ")}: ${content}`;
        }).join("\n"),
      });
    }
  });
}

const report = [
  "# AMARKHYS-HUB-FLOW-D2-REFOCUS-C2A — Audit intervention zone",
  "",
  `Target: \`${path.relative(ROOT, TARGET)}\``,
  "",
  "## Goal",
  "",
  "Find the real state/variable names used by the intervention zone before applying C2B.",
  "",
  "## Hits",
  "",
  hits.length
    ? hits.map((hit) => [
        `### ${hit.pattern} — line ${hit.line}`,
        "",
        "```tsx",
        hit.excerpt,
        "```",
        "",
      ].join("\n")).join("\n")
    : "No hits found.",
  "",
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, report, "utf8");

console.log("[AMARKHYS-HUB-FLOW-D2-REFOCUS-C2A] Audit intervention zone");
console.log(`[REPORT] ${path.relative(ROOT, REPORT)}`);
console.log(`[HITS] ${hits.length}`);

if (!hits.length) process.exit(1);