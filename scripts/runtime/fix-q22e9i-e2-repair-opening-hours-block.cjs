/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const guardPath = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(guardPath)) {
  fail("processRuntimeBeforeMutationGuards.ts introuvable");
}

let content = fs.readFileSync(guardPath, "utf8");

const brokenBlockRegex =
  /const\s+openingHoursValidation\s*=\s*\n\s*const\s+schedulingConfig\s*=\s*\n\s*\n\s*await\s+getSchedulingConfig\(module,\s*context\);\s*\n\s*\n\s*\n\s*RuntimeSchedulingEngine\.assertWithinOpeningHours\s*\(\{/m;

if (!brokenBlockRegex.test(content)) {
  fail("Bloc cassé openingHoursValidation/schedulingConfig introuvable");
}

content = content.replace(
  brokenBlockRegex,
  `const schedulingConfig =
    await getSchedulingConfig(module, context);

  const openingHoursValidation =
    RuntimeSchedulingEngine.assertWithinOpeningHours({`
);

if (content.includes("const openingHoursValidation =\n    const schedulingConfig")) {
  fail("Bloc cassé encore présent après remplacement");
}

if (!content.includes("calendarExceptions: schedulingConfig?.calendarExceptions")) {
  fail("calendarExceptions ne pointe pas vers schedulingConfig");
}

fs.writeFileSync(guardPath, content, "utf8");

ok("Bloc openingHoursValidation réparé");
ok("calendarExceptions utilise schedulingConfig effectif");

console.log("");
console.log("[Q22E9I_E2_OPENING_HOURS_REPAIR_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");