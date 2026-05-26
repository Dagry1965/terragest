/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const enginePath = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(enginePath)) {
  fail("RuntimeSchedulingEngine.ts introuvable");
}

let content = fs.readFileSync(enginePath, "utf8");

if (!content.includes("rangesOverlap")) {
  fail("rangesOverlap introuvable dans RuntimeSchedulingEngine.ts");
}

/**
 * Corrige la règle générique :
 * Deux plages qui se touchent exactement ne se chevauchent pas.
 *
 * OK :
 * 08:00-09:00 et 09:00-10:00 => pas overlap
 *
 * KO :
 * 08:00-09:00 et 08:30-09:30 => overlap
 */
const strictOverlapFunction = `function rangesOverlap(
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date
): boolean {
  return startA < endB && startB < endA;
}`;

const functionRegex =
  /function\s+rangesOverlap\s*\([\s\S]*?\)\s*:\s*boolean\s*\{[\s\S]*?\n\}/m;

if (!functionRegex.test(content)) {
  fail("Fonction rangesOverlap impossible à remplacer proprement");
}

content = content.replace(functionRegex, strictOverlapFunction);

if (!content.includes("return startA < endB && startB < endA;")) {
  fail("rangesOverlap strict non appliqué");
}

fs.writeFileSync(enginePath, content, "utf8");

ok("rangesOverlap corrigé : les créneaux adjacents ne se bloquent plus");
console.log("");
console.log("[Q22E9K_B1_ADJACENT_SLOT_OVERLAP_FIX_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");