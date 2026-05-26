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

if (!content.includes("function rangesOverlap")) {
  fail("rangesOverlap introuvable");
}

/**
 * Signature compatible avec les appels existants :
 * rangesOverlap({ startAt, endAt }, { startAt, endAt })
 *
 * Règle correcte :
 * 08:00-09:00 et 09:00-10:00 => false
 * 08:00-09:00 et 08:30-09:30 => true
 */
const functionRegex =
  /function\s+rangesOverlap\s*\([\s\S]*?\)\s*:\s*boolean\s*\{[\s\S]*?\n\}/m;

if (!functionRegex.test(content)) {
  fail("Impossible de remplacer rangesOverlap proprement");
}

const replacement = `function rangesOverlap(
  left: {
    startAt: Date;
    endAt: Date;
  },
  right: {
    startAt: Date;
    endAt: Date;
  }
): boolean {
  return left.startAt < right.endAt && right.startAt < left.endAt;
}`;

content = content.replace(functionRegex, replacement);

if (!content.includes("return left.startAt < right.endAt && right.startAt < left.endAt;")) {
  fail("Nouvelle règle rangesOverlap non appliquée");
}

fs.writeFileSync(enginePath, content, "utf8");

ok("rangesOverlap corrigé avec signature à 2 objets");
ok("Les créneaux adjacents ne seront plus considérés comme chevauchants");

console.log("");
console.log("[Q22E9K_B1_RANGES_OVERLAP_SIGNATURE_FIX_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");