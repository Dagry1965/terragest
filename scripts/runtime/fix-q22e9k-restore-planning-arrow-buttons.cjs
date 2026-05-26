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

if (!content.includes("formatLocalDateOnly")) {
  fail("formatLocalDateOnly absent : ne remets pas les flèches avant le correctif date locale");
}

content = content.replace(/>\s*Precedent\s*</g, ">←<");
content = content.replace(/>\s*Suivant\s*</g, ">→<");
content = content.replace(/>\s*Aujourd'hui\s*</g, ">Aujourd’hui<");

content = content.replace(/aria-label="Jour precedent"/g, 'aria-label="Jour précédent"');
content = content.replace(/aria-label="Aujourd'hui"/g, 'aria-label="Aujourd’hui"');

if (!content.includes(">←<")) {
  fail("Flèche précédente non restaurée");
}

if (!content.includes(">→<")) {
  fail("Flèche suivante non restaurée");
}

fs.writeFileSync(planningPath, content, "utf8");

ok("Flèches restaurées sur les boutons planning");
ok("Le correctif date locale reste en place");

console.log("");
console.log("[Q22E9K_RESTORE_ARROW_BUTTONS_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");