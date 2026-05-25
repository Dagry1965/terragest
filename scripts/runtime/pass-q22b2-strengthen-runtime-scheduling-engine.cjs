const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TAG = "q22b2-strengthen-runtime-scheduling-engine";

const targetFile = "src/runtime/scheduling/RuntimeSchedulingEngine.ts";
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

if (content.includes("Q22B2_GENERIC_OPENING_HOURS")) {
  console.log("[SKIP] Q22B-2 already installed.");
  process.exit(0);
}

/**
 * 1) Add generic imports.
 */
if (!content.includes("DEFAULT_WORKSPACE_OPENING_HOURS")) {
  content = content.replace(
    `export type RuntimeRecord = Record<string, unknown>;`,
    `import {
  DEFAULT_WORKSPACE_OPENING_HOURS,
  getOpeningDayForDate,
} from "./RuntimeOpeningHours";

import type {
  RuntimeAvailabilitySlot,
  RuntimeDateTimeRange,
  RuntimeOpeningHoursProfile,
} from "./RuntimeSchedulingTypes";

export type RuntimeRecord = Record<string, unknown>;`
  );
}

/**
 * 2) Add generic helpers before RuntimeSchedulingEngine class.
 */
const classMarker = `export class RuntimeSchedulingEngine {`;

const helpers = `
function parseRuntimeTimeToMinutes(value: string): number {
  const normalized = normalizeTimeOnly(value);

  if (!normalized) {
    throw new Error(\`Invalid runtime time value: \${value}\`);
  }

  const [hours, minutes] = normalized.split(":").map(Number);

  return hours * 60 + minutes;
}

function formatRuntimeMinutesToTime(value: number): string {
  const hours = Math.floor(value / 60);
  const minutes = value % 60;

  return (
    String(hours).padStart(2, "0") +
    ":" +
    String(minutes).padStart(2, "0")
  );
}

function buildRuntimeDateTimeIso(dateOnly: string, timeOnly: string): string {
  const date = buildLocalDateTime(dateOnly, timeOnly);

  if (!date) {
    throw new Error(
      "Impossible de construire le créneau : date ou heure invalide."
    );
  }

  return date.toISOString();
}

`;

if (!content.includes("parseRuntimeTimeToMinutes")) {
  if (!content.includes(classMarker)) {
    throw new Error("[MISSING] RuntimeSchedulingEngine class marker");
  }

  content = content.replace(classMarker, helpers + classMarker);
}

/**
 * 3) Insert generic static methods after defaultDurationMinutes.
 */
const insertAfter = `  static readonly defaultDurationMinutes = 60;`;

const genericMethods = `

  static buildDateTimeRange(params: {
    date: string;
    time: string;
    durationMinutes?: number;
  }): RuntimeDateTimeRange {
    // Q22B2_GENERIC_OPENING_HOURS
    const durationMinutes = Math.max(
      1,
      asNumber(params.durationMinutes, RuntimeSchedulingEngine.defaultDurationMinutes)
    );

    const startAt = buildRuntimeDateTimeIso(params.date, params.time);
    const startDate = new Date(startAt);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);

    return {
      startAt,
      endAt: endDate.toISOString(),
    };
  }

  static getAvailableSlotsForDate(params: {
    date: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
  }): RuntimeAvailabilitySlot[] {
    const profile = params.profile ?? DEFAULT_WORKSPACE_OPENING_HOURS;

    const durationMinutes = Math.max(
      1,
      asNumber(params.durationMinutes, profile.defaultSlotDurationMinutes)
    );

    const normalizedDate = normalizeDateOnly(params.date);

    if (!normalizedDate) {
      return [];
    }

    const date = new Date(normalizedDate + "T00:00:00");
    const openingDay = getOpeningDayForDate(profile, date);

    if (!openingDay || !openingDay.isOpen) {
      return [];
    }

    const slots: RuntimeAvailabilitySlot[] = [];

    for (const period of openingDay.periods) {
      const periodStart = parseRuntimeTimeToMinutes(period.start);
      const periodEnd = parseRuntimeTimeToMinutes(period.end);

      for (
        let cursor = periodStart;
        cursor + durationMinutes <= periodEnd;
        cursor += durationMinutes
      ) {
        const start = formatRuntimeMinutesToTime(cursor);
        const end = formatRuntimeMinutesToTime(cursor + durationMinutes);

        slots.push({
          start,
          end,
          label: start + " - " + end,
          available: true,
        });
      }
    }

    return slots;
  }

  static assertWithinOpeningHours(params: {
    date: string;
    time: string;
    durationMinutes?: number;
    profile?: RuntimeOpeningHoursProfile;
  }): SchedulingValidationResult {
    const profile = params.profile ?? DEFAULT_WORKSPACE_OPENING_HOURS;

    const durationMinutes = Math.max(
      1,
      asNumber(params.durationMinutes, profile.defaultSlotDurationMinutes)
    );

    const normalizedTime = normalizeTimeOnly(params.time);

    if (!normalizedTime) {
      return {
        ok: false,
        reason: "L'heure sélectionnée est invalide.",
      };
    }

    const slots = RuntimeSchedulingEngine.getAvailableSlotsForDate({
      date: params.date,
      durationMinutes,
      profile,
    });

    const allowed = slots.some((slot) => slot.start === normalizedTime);

    if (!allowed) {
      return {
        ok: false,
        reason:
          "Le créneau sélectionné est en dehors des horaires d'ouverture.",
      };
    }

    return { ok: true };
  }`;

if (!content.includes("static buildDateTimeRange")) {
  if (!content.includes(insertAfter)) {
    throw new Error("[MISSING] defaultDurationMinutes insertion point");
  }

  content = content.replace(insertAfter, insertAfter + genericMethods);
}

fs.writeFileSync(target, content, "utf8");

console.log(`[WRITTEN] ${targetFile}`);
console.log("[Q22B2_DONE] RuntimeSchedulingEngine strengthened with generic opening-hours scheduling methods.");
console.log("");
console.log("Next:");
console.log("  pnpm build");