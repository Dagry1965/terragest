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

if (!content.includes("const bookingsBySlot")) {
  fail("bookingsBySlot introuvable");
}

/**
 * 1) Ajouter des helpers locaux pour comparer les plages réelles sans buffer.
 */
if (!content.includes("function buildPlanningDateTime(")) {
  const anchor = /function getVisibleSchedulingDurationMinutes\([\s\S]*?\n\}/m;

  if (!anchor.test(content)) {
    fail("getVisibleSchedulingDurationMinutes introuvable pour insérer les helpers");
  }

  content = content.replace(
    anchor,
    (match) => `${match}

function buildPlanningDateTime(dateOnly: string, timeOnly: string) {
  return new Date(\`\${dateOnly}T\${timeOnly}:00\`);
}

function toPlanningTimestamp(value: unknown) {
  const text = asString(value);

  if (!text) {
    return Number.NaN;
  }

  const timestamp = new Date(text).getTime();

  return Number.isFinite(timestamp) ? timestamp : Number.NaN;
}

function planningRangesOverlap(
  leftStart: number,
  leftEnd: number,
  rightStart: number,
  rightEnd: number
) {
  if (
    !Number.isFinite(leftStart) ||
    !Number.isFinite(leftEnd) ||
    !Number.isFinite(rightStart) ||
    !Number.isFinite(rightEnd)
  ) {
    return false;
  }

  return leftStart < rightEnd && rightStart < leftEnd;
}
`
  );

  ok("Helpers affichage planning ajoutés");
} else {
  ok("Helpers affichage planning déjà présents");
}

/**
 * 2) Remplacer le regroupement visuel des réservations.
 *
 * Ancien :
 * - rattache seulement sur timeField/startAt.includes
 *
 * Nouveau :
 * - rattache au slot uniquement si la plage réelle du RDV chevauche la plage réelle du slot
 * - aucun buffer utilisé pour l'affichage
 */
const oldBlock = `    for (const slot of slots) {
      const related =
        dateRecords.filter((record) => {
          const timeValue =
            asString(record[schedulingConfig.timeField]);

          if (timeValue === slot.start) {
            return true;
          }

          const startAt =
            asString(record[startField]);

          return startAt.includes("T" + slot.start);
        });

      bookingsBySlot.set(slot.start, related);
    }`;

const newBlock = `    for (const slot of slots) {
      const slotStart =
        buildPlanningDateTime(selectedDate, slot.start).getTime();

      const slotEnd =
        buildPlanningDateTime(selectedDate, slot.end).getTime();

      const related =
        dateRecords.filter((record) => {
          const recordStartAt =
            toPlanningTimestamp(record[startField]);

          const recordEndAt =
            toPlanningTimestamp(record[endField]);

          if (
            Number.isFinite(recordStartAt) &&
            Number.isFinite(recordEndAt)
          ) {
            return planningRangesOverlap(
              slotStart,
              slotEnd,
              recordStartAt,
              recordEndAt
            );
          }

          const timeValue =
            asString(record[schedulingConfig.timeField]);

          return timeValue === slot.start;
        });

      bookingsBySlot.set(slot.start, related);
    }`;

if (!content.includes(oldBlock)) {
  fail("Ancien bloc bookingsBySlot introuvable ou déjà modifié");
}

content = content.replace(oldBlock, newBlock);

/**
 * 3) Sécuriser le compteur totalBookings : il reste basé sur l'affichage réel.
 * fullSlots reste basé sur engine availability, mais l'affichage des réservations devient cohérent.
 */
if (!content.includes("planningRangesOverlap(")) {
  fail("planningRangesOverlap non utilisé après correction");
}

if (content.includes('startAt.includes("T" + slot.start)')) {
  fail("Ancien rattachement startAt.includes encore présent");
}

fs.writeFileSync(planningPath, content, "utf8");

ok("bookingsBySlot utilise les plages réelles sans buffer");
ok("Les réservations ne seront plus affichées dans le mauvais créneau");
console.log("");
console.log("[Q22E9K_B2_PLANNING_BOOKINGS_DISPLAY_FIX_DONE]");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm dev");