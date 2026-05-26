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

if (!content.includes("const [selectedDate")) {
  fail("selectedDate state introuvable");
}

/**
 * 1) Ajouter des handlers nommés après useState(selectedDate)
 */
if (!content.includes("const goToNextDate =")) {
  const stateRegex =
    /const\s+\[selectedDate,\s*setSelectedDate\]\s*=\s*\n\s*useState\(toDateOnly\(initialDate\)\);\s*/m;

  if (!stateRegex.test(content)) {
    fail("Bloc useState(selectedDate) introuvable");
  }

  content = content.replace(
    stateRegex,
    (match) => `${match}

  const goToPreviousDate = () => {
    setSelectedDate((current) => addDays(current, -1));
  };

  const goToNextDate = () => {
    setSelectedDate((current) => addDays(current, 1));
  };

  const goToToday = () => {
    setSelectedDate(toDateOnly());
  };
`
  );

  ok("Handlers goToPreviousDate/goToNextDate/goToToday ajoutés");
} else {
  ok("Handlers navigation déjà présents");
}

/**
 * 2) Remplacer les onClick inline existants, même s’ils sont sur plusieurs lignes.
 */
content = content.replace(
  /onClick=\{\(\)\s*=>\s*setSelectedDate\(addDays\(selectedDate,\s*-1\)\)\}/g,
  "onClick={goToPreviousDate}"
);

content = content.replace(
  /onClick=\{\(\)\s*=>\s*setSelectedDate\(addDays\(selectedDate,\s*1\)\)\}/g,
  "onClick={goToNextDate}"
);

content = content.replace(
  /onClick=\{\(\)\s*=>\s*setSelectedDate\(\(current\)\s*=>\s*addDays\(current,\s*-1\)\)\}/g,
  "onClick={goToPreviousDate}"
);

content = content.replace(
  /onClick=\{\(\)\s*=>\s*setSelectedDate\(\(current\)\s*=>\s*addDays\(current,\s*1\)\)\}/g,
  "onClick={goToNextDate}"
);

content = content.replace(
  /onClick=\{\(\)\s*=>\s*setSelectedDate\(toDateOnly\(\)\)\}/g,
  "onClick={goToToday}"
);

/**
 * 3) Sécuriser les boutons par aria-label + handlers nommés.
 */
content = content.replace(
  /(<button\s+type="button"\s+)onClick=\{goToPreviousDate\}/,
  `$1aria-label="Jour précédent"
                  onClick={goToPreviousDate}`
);

content = content.replace(
  /(<button\s+type="button"\s+)onClick=\{goToNextDate\}/,
  `$1aria-label="Jour suivant"
                  onClick={goToNextDate}`
);

content = content.replace(
  /(<button\s+type="button"\s+)onClick=\{goToToday\}/,
  `$1aria-label="Aujourd'hui"
                  onClick={goToToday}`
);

/**
 * 4) Vérifications.
 */
if (!content.includes("const goToNextDate =")) {
  fail("goToNextDate absent après correction");
}

if (!content.includes("onClick={goToNextDate}")) {
  fail("Bouton suivant non branché sur goToNextDate");
}

if (!content.includes("onClick={goToPreviousDate}")) {
  fail("Bouton précédent non branché sur goToPreviousDate");
}

if (!content.includes("onClick={goToToday}")) {
  fail("Bouton Aujourd’hui non branché sur goToToday");
}

fs.writeFileSync(planningPath, content, "utf8");

ok("Navigation planning forcée avec handlers nommés");
console.log("");
console.log("[Q22E9K_FORCE_DATE_NAVIGATION_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");