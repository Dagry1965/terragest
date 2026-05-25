const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22c-wire-opening-hours-guard-rendezvous";

const targetFile = "src/runtime/guards/processRuntimeBeforeMutationGuards.ts";
const target = path.join(ROOT, targetFile);

if (!fs.existsSync(target)) {
  throw new Error(`[MISSING] ${targetFile}`);
}

const backup = `${target}.bak-${TAG}`;

if (!fs.existsSync(backup)) {
  fs.copyFileSync(target, backup);
  console.log(`[BACKUP] ${targetFile}.bak-${TAG}`);
}

let content = fs.readFileSync(target, "utf8");

if (content.includes("Q22C_OPENING_HOURS_GUARD")) {
  console.log("[SKIP] Q22C already installed.");
  process.exit(0);
}

const marker = `  const normalizedRecord =
    RuntimeSchedulingEngine.normalizeAppointmentForScheduling(
      mergedRecord
    );`;

const replacement = `  const openingHoursValidation =
    RuntimeSchedulingEngine.assertWithinOpeningHours({
      // Q22C_OPENING_HOURS_GUARD
      // First consumer of the generic ERP Scheduling Runtime.
      // This remains generic: rendezvous provides date/time/duration, the engine validates the slot.
      date: asString(mergedRecord.dateRendezVous),
      time: asString(mergedRecord.heureRendezVous),
      durationMinutes:
        typeof mergedRecord.durationMinutes === "number"
          ? mergedRecord.durationMinutes
          : Number(mergedRecord.durationMinutes ?? 0) || undefined,
    });

  if (!openingHoursValidation.ok) {
    throw new Error(
      openingHoursValidation.reason ??
      "Créneau indisponible selon les horaires d'ouverture."
    );
  }

  const normalizedRecord =
    RuntimeSchedulingEngine.normalizeAppointmentForScheduling(
      mergedRecord
    );`;

if (!content.includes(marker)) {
  throw new Error("[MISSING] normalizeAppointmentForScheduling marker");
}

content = content.replace(marker, replacement);

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22C_DONE] Opening hours guard wired for rendezvous mutations.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("");
console.log("Manual tests:");
console.log("  - create rendezvous Monday 08:00 => allowed");
console.log("  - create rendezvous Monday 13:00 => blocked");
console.log("  - create rendezvous Sunday 10:00 => blocked");