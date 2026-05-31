const fs = require("fs");
const path = require("path");

const root = process.cwd();

const moduleRel = "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts";
const reportRel = "docs/audits/AMARKHYS-REBUILD-06C-FIX6-A-audit-mecanicien-layout.md";

const modulePath = path.join(root, moduleRel);
const reportPath = path.join(root, reportRel);

function fail(message) {
  console.error("[FAIL]", message);
  process.exit(1);
}

if (!fs.existsSync(modulePath)) {
  fail("Missing file: " + moduleRel);
}

const content = fs.readFileSync(modulePath, "utf8");
const lines = content.split(/\r?\n/);

const hits = [];

[
  "key: \"mecanicienId\"",
  "\"mecanicienId\"",
  "form:",
  "tabs:",
  "sections:",
  "fields:",
  "clientId",
  "vehiculeId",
  "rendezVousId",
  "dateIntervention",
  "kilometrage",
].forEach((pattern) => {
  lines.forEach((line, index) => {
    if (line.includes(pattern)) {
      hits.push({
        pattern,
        line: index + 1,
        text: line,
      });
    }
  });
});

function sliceAround(pattern, before = 25, after = 45) {
  const index = lines.findIndex((line) => line.includes(pattern));
  if (index === -1) return [];

  const start = Math.max(0, index - before);
  const end = Math.min(lines.length - 1, index + after);

  return lines.slice(start, end + 1).map((text, i) => ({
    line: start + i + 1,
    text,
  }));
}

const report = [];

report.push("# AMARKHYS-REBUILD-06C-FIX6-A — Audit mecanicienId layout");
report.push("");
report.push(`Date: ${new Date().toISOString()}`);
report.push("");
report.push("## Objectif");
report.push("");
report.push("Vérifier si mecanicienId est réellement dans le form.tabs.sections.fields rendu par ERPEnterpriseForm.");
report.push("");
report.push("## Hits");
report.push("");

for (const hit of hits) {
  report.push(`- ${hit.pattern} — L${hit.line}: ${hit.text.trim()}`);
}

report.push("");
report.push("## Bloc field mecanicienId");
report.push("");
for (const row of sliceAround('key: "mecanicienId"', 10, 20)) {
  report.push(`${String(row.line).padStart(5, " ")}: ${row.text}`);
}

report.push("");
report.push("## Bloc form");
report.push("");
for (const row of sliceAround("form:", 0, 160)) {
  report.push(`${String(row.line).padStart(5, " ")}: ${row.text}`);
}

report.push("");
report.push("## Bloc rendezVousId");
report.push("");
for (const row of sliceAround('"rendezVousId"', 20, 40)) {
  report.push(`${String(row.line).padStart(5, " ")}: ${row.text}`);
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[AMARKHYS-REBUILD-06C-FIX6-A] Audit mecanicienId layout");
console.log("[REPORT]", reportRel);
console.log("[NEXT] Extract mecanicien/form blocks.");