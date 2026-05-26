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

const functionRegex =
  /function\s+rangesOverlap\s*\([\s\S]*?\)\s*:\s*boolean\s*\{[\s\S]*?\n\}/m;

if (!functionRegex.test(content)) {
  fail("Impossible de remplacer rangesOverlap proprement");
}

const replacement = `function rangesOverlap(
  left: {
    startAt: string | Date;
    endAt: string | Date;
    durationMinutes?: unknown;
  },
  right: {
    startAt: string | Date;
    endAt: string | Date;
    durationMinutes?: unknown;
  }
): boolean {
  const leftStart =
    left.startAt instanceof Date
      ? left.startAt.getTime()
      : new Date(left.startAt).getTime();

  const leftEnd =
    left.endAt instanceof Date
      ? left.endAt.getTime()
      : new Date(left.endAt).getTime();

  const rightStart =
    right.startAt instanceof Date
      ? right.startAt.getTime()
      : new Date(right.startAt).getTime();

  const rightEnd =
    right.endAt instanceof Date
      ? right.endAt.getTime()
      : new Date(right.endAt).getTime();

  if (
    !Number.isFinite(leftStart) ||
    !Number.isFinite(leftEnd) ||
    !Number.isFinite(rightStart) ||
    !Number.isFinite(rightEnd)
  ) {
    return false;
  }

  return leftStart < rightEnd && rightStart < leftEnd;
}`;

content = content.replace(functionRegex, replacement);

if (content.includes("[key: string]: unknown")) {
  fail("Index signature encore présente");
}

if (!content.includes("durationMinutes?: unknown;")) {
  fail("durationMinutes optionnel non appliqué");
}

if (!content.includes("return leftStart < rightEnd && rightStart < leftEnd;")) {
  fail("Règle overlap stricte non appliquée");
}

fs.writeFileSync(enginePath, content, "utf8");

ok("rangesOverlap compatible RuntimeAppointmentSlot");
ok("rangesOverlap accepte aussi les objets temporaires avec durationMinutes");
ok("Créneaux adjacents : end === start ne bloque plus");

console.log("");
console.log("[Q22E9K_B1_RANGES_OVERLAP_RUNTIME_SLOT_TYPE_FIX_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");