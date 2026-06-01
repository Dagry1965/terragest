const fs = require("fs");
const path = require("path");

const root = process.cwd();

const fileRel = "src/components/erp/hub/ERPClientOperationalSheet.tsx";
const reportRel = "docs/audits/AMARKHYS-HUB-FLOW-B2-audit-empty-vehicle-gray-box.md";

const filePath = path.join(root, fileRel);
const reportPath = path.join(root, reportRel);

if (!fs.existsSync(filePath)) {
  console.error("[FAIL] Missing file: " + fileRel);
  process.exit(1);
}

const content = fs.readFileSync(filePath, "utf8");
const lines = content.split(/\r?\n/);

const patterns = [
  "bg-slate-50",
  "bg-slate-100",
  "border-slate-200",
  "rounded-2xl",
  "rounded-3xl",
  "grid",
  "Année",
  "Carburant",
  "selectedVehicle",
  "vehicle",
  "vehicule",
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

function around(lineNumber, before = 8, after = 12) {
  const start = Math.max(0, lineNumber - before - 1);
  const end = Math.min(lines.length, lineNumber + after);
  return lines
    .slice(start, end)
    .map((line, index) => `${start + index + 1}: ${line}`)
    .join("\n");
}

const grayHits = hits.filter((hit) =>
  hit.pattern === "bg-slate-50" ||
  hit.pattern === "bg-slate-100" ||
  hit.pattern === "border-slate-200"
);

const report = [
  "# AMARKHYS-HUB-FLOW-B2 — Audit empty vehicle gray box",
  "",
  `Date: ${new Date().toISOString()}`,
  "",
  "## Objectif",
  "",
  "Localiser le cadre gris vide restant dans la carte véhicule.",
  "",
  "## Gray hits",
  "",
  ...grayHits.map((hit) => `- L${hit.line} — ${hit.pattern} — ${hit.text}`),
  "",
  "## Contextes",
  "",
  ...grayHits.slice(0, 12).flatMap((hit) => [
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

console.log("[AMARKHYS-HUB-FLOW-B2] Audit empty vehicle gray box");
console.log("[REPORT]", reportRel);
console.log("[GRAY_HITS]", grayHits.length);
console.log("[NEXT] Extract gray hits.");