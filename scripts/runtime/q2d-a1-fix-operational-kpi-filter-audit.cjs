const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rel = "scripts/runtime/q2d-a-operational-runtime-consolidation-audit.cjs";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");

fs.writeFileSync(
  file + ".bak-q2d-a1-fix-kpi-filter-audit",
  original,
  "utf8"
);

let content = original;

content = content.replace(
  `checkContains(
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  kpiStrip,
  "module.operational?.kpis",
  "KPI strip consomme operational.kpis"
);`,
  `checkContains(
  "src/components/erp/operational/ERPOperationalKpiStrip.tsx",
  kpiStrip,
  "kpis?: ERPOperationalKpiConfig[]",
  "KPI strip consomme une configuration KPI opérationnelle via props"
);`
);

content = content.replace(
  `checkContains(
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  filters,
  "config?.filters",
  "Filtres consomment operational.filters"
);`,
  `checkContains(
  "src/components/erp/operational/ERPOperationalFilters.tsx",
  filters,
  "filters?: ERPOperationalFilterConfig[]",
  "Filtres consomment une configuration de filtres opérationnels via props"
);`
);

const problems = [];

if (content.includes('"module.operational?.kpis"')) {
  problems.push("Ancien check module.operational?.kpis encore présent");
}

if (content.includes('"config?.filters"')) {
  problems.push("Ancien check config?.filters encore présent");
}

if (!content.includes("KPI strip consomme une configuration KPI opérationnelle via props")) {
  problems.push("Nouveau check KPI absent");
}

if (!content.includes("Filtres consomment une configuration de filtres opérationnels via props")) {
  problems.push("Nouveau check Filters absent");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-D-A1 audit KPI/Filters corrigé.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("node .\\scripts\\runtime\\q2d-a-operational-runtime-consolidation-audit.cjs");
