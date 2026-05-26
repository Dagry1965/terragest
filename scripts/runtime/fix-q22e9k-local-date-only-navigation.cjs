/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const planningPath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(planningPath)) {
  fail("ERPSchedulingPlanningView.tsx introuvable");
}

let content = fs.readFileSync(planningPath, "utf8");

if (!content.includes("function addDays(")) {
  fail("addDays() introuvable");
}

/**
 * Ajoute un formatter local YYYY-MM-DD pour éviter les décalages UTC de toISOString().
 */
if (!content.includes("function formatLocalDateOnly(")) {
  const anchor = /function toDateOnly\(value\?: string\) \{[\s\S]*?\n\}/m;

  if (!anchor.test(content)) {
    fail("toDateOnly() introuvable pour insérer formatLocalDateOnly()");
  }

  content = content.replace(
    anchor,
    (match) => `${match}

function formatLocalDateOnly(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return \`\${year}-\${month}-\${day}\`;
}
`
  );

  ok("formatLocalDateOnly() ajouté");
} else {
  ok("formatLocalDateOnly() déjà présent");
}

/**
 * Remplace le retour UTC dans addDays().
 */
content = content.replace(
  /function addDays\(dateOnly: string,\s*amount: number\) \{\s*const date = new Date\(`\$\{dateOnly\}T00:00:00`\);\s*date\.setDate\(date\.getDate\(\) \+ amount\);\s*return date\.toISOString\(\)\.slice\(0,\s*10\);\s*\}/m,
  `function addDays(dateOnly: string, amount: number) {
  const date = new Date(\`\${dateOnly}T00:00:00\`);
  date.setDate(date.getDate() + amount);

  return formatLocalDateOnly(date);
}`
);

if (content.includes("return date.toISOString().slice(0, 10);")) {
  fail("addDays() utilise encore toISOString()");
}

/**
 * Corrige aussi toDateOnly() si le fallback utilise toISOString().
 */
content = content.replace(
  /return new Date\(\)\.toISOString\(\)\.slice\(0,\s*10\);/g,
  "return formatLocalDateOnly(new Date());"
);

fs.writeFileSync(planningPath, content, "utf8");

ok("addDays() corrigé en date locale");
ok("toDateOnly() corrigé en date locale si nécessaire");

console.log("");
console.log("[Q22E9K_LOCAL_DATE_NAVIGATION_FIX_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");