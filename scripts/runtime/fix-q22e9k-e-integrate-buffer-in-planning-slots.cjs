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

if (!content.includes("static getAvailableSlotsWithBookings")) {
  fail("getAvailableSlotsWithBookings introuvable");
}

const oldBlock = `    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes: params.durationMinutes,
      profile: params.profile,
      calendarExceptions: params.calendarExceptions,
    });

    const bufferMinutes = Math.max(
      0,
      asNumber(params.bufferMinutes, 0)
    );`;

const newBlock = `    const bufferMinutes = Math.max(
      0,
      asNumber(params.bufferMinutes, 0)
    );

    const visibleDurationMinutes = Math.max(
      1,
      asNumber(
        params.durationMinutes,
        RuntimeSchedulingEngine.defaultDurationMinutes
      )
    );

    const slotDurationMinutes =
      visibleDurationMinutes + bufferMinutes;

    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes: slotDurationMinutes,
      profile: params.profile,
      calendarExceptions: params.calendarExceptions,
    });`;

if (!content.includes(oldBlock)) {
  fail("Bloc slots/buffer actuel introuvable");
}

content = content.replace(oldBlock, newBlock);

/**
 * Dans le calcul de slotRange, on doit utiliser la durée totale du slot,
 * pas seulement la durée visible.
 */
content = content.replace(
  /durationMinutes:\s*params\.durationMinutes,\s*\}\);/m,
  `durationMinutes: slotDurationMinutes,
      });`
);

/**
 * Les objets transmis à rangesOverlap peuvent garder durationMinutes,
 * mais on remplace params.durationMinutes par slotDurationMinutes pour cohérence.
 */
content = content.replace(
  /durationMinutes:\s*\n\s*params\.durationMinutes\s*\?\?\s*\n\s*RuntimeSchedulingEngine\.defaultDurationMinutes,/g,
  "durationMinutes: slotDurationMinutes,"
);

if (!content.includes("const slotDurationMinutes =")) {
  fail("slotDurationMinutes non ajouté");
}

if (!content.includes("durationMinutes: slotDurationMinutes")) {
  fail("slotDurationMinutes non utilisé dans getAvailableSlotsWithBookings");
}

fs.writeFileSync(enginePath, content, "utf8");

ok("getAvailableSlotsWithBookings génère les slots avec duration + buffer");
ok("Le buffer est intégré à la plage affichée du planning");
console.log("");
console.log("[Q22E9K_E_BUFFER_IN_PLANNING_SLOTS_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");