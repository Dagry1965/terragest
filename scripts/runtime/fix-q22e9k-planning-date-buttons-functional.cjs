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

content = content.replace(
  /onClick=\{\(\)\s*=>\s*setSelectedDate\(addDays\(selectedDate,\s*-1\)\)\}/g,
  "onClick={() => setSelectedDate((current) => addDays(current, -1))}"
);

content = content.replace(
  /onClick=\{\(\)\s*=>\s*setSelectedDate\(addDays\(selectedDate,\s*1\)\)\}/g,
  "onClick={() => setSelectedDate((current) => addDays(current, 1))}"
);

content = content.replace(
  /onClick=\{\(\)\s*=>\s*setSelectedDate\(toDateOnly\(\)\)\}/g,
  "onClick={() => setSelectedDate(toDateOnly())}"
);

if (!content.includes("setSelectedDate((current) => addDays(current, 1))")) {
  fail("Bouton suivant → non corrigé");
}

if (!content.includes("setSelectedDate((current) => addDays(current, -1))")) {
  fail("Bouton précédent ← non corrigé");
}

fs.writeFileSync(planningPath, content, "utf8");

ok("Boutons date corrigés en update fonctionnel");
console.log("");
console.log("[Q22E9K_DATE_BUTTONS_FUNCTIONAL_FIX_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");