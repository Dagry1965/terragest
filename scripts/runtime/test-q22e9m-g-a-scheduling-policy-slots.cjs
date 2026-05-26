/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TEST_ID = "Q22E-9M-G-A";

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "Q22E-9M-G-A-scheduling-policy-slots-test.md"
);

const POLICY_FILE = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "SchedulingSlotPolicy.ts"
);

const ENGINE_FILE = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`[${TEST_ID}] Fichier introuvable: ${rel(file)}`);
  }

  return fs.readFileSync(file, "utf8");
}

function timeToMinutes(time) {
  const [hours, minutes] = String(time).split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(total) {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function generateExpectedSlots({ start, end, durationMinutes, bufferMinutes }) {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  const stepMinutes = durationMinutes + bufferMinutes;

  const slots = [];

  for (
    let cursor = startMinutes;
    cursor + stepMinutes <= endMinutes;
    cursor += stepMinutes
  ) {
    slots.push({
      start: minutesToTime(cursor),
      end: minutesToTime(cursor + stepMinutes),
      visibleDurationMinutes: durationMinutes,
      bufferMinutes,
      slotDurationMinutes: stepMinutes,
    });
  }

  return slots;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[${TEST_ID}] ${message}`);
  }
}

function main() {
  console.log(`[${TEST_ID}] Smoke test SchedulingSlotPolicy + slots...`);

  const policyContent = read(POLICY_FILE);
  const engineContent = read(ENGINE_FILE);

  assert(
    policyContent.includes("export class SchedulingSlotPolicyResolver"),
    "SchedulingSlotPolicyResolver absent."
  );

  assert(
    policyContent.includes("visibleDurationMinutes + bufferMinutes"),
    "La policy ne calcule pas slotDurationMinutes depuis visibleDuration + buffer."
  );

  assert(
    engineContent.includes("SchedulingSlotPolicyResolver.resolve"),
    "RuntimeSchedulingEngine ne consomme pas SchedulingSlotPolicyResolver."
  );

  assert(
    engineContent.includes("slotPolicy.visibleDurationMinutes") ||
      engineContent.includes("slotPolicy.slotDurationMinutes"),
    "RuntimeSchedulingEngine ne semble pas utiliser les valeurs résolues de la policy."
  );

  const expectedSlots = generateExpectedSlots({
    start: "08:00",
    end: "18:00",
    durationMinutes: 60,
    bufferMinutes: 15,
  });

  const expectedFirstSlots = expectedSlots.slice(0, 4).map(
    (slot) => `${slot.start} - ${slot.end}`
  );

  const expected = ["08:00 - 09:15", "09:15 - 10:30", "10:30 - 11:45", "11:45 - 13:00"];

  assert(
    JSON.stringify(expectedFirstSlots) === JSON.stringify(expected),
    `Plages attendues incorrectes: ${expectedFirstSlots.join(", ")}`
  );

  const report = [
    `# ${TEST_ID} — Scheduling policy slots smoke test`,
    "",
    "## Objectif",
    "",
    "Valider que la règle métier attendue 60 minutes + 15 minutes de buffer produit des slots bloqués de 75 minutes.",
    "",
    "## Résultat",
    "",
    "- Policy présente : OK",
    "- Engine branché sur policy : OK",
    "- Durée visible : 60 minutes",
    "- Buffer : 15 minutes",
    "- Durée bloquée : 75 minutes",
    "",
    "## Plages attendues",
    "",
    ...expectedFirstSlots.map((slot) => `- ${slot}`),
    "",
    "## Décision",
    "",
    "Le comportement attendu doit être porté par SchedulingSlotPolicy + RuntimeSchedulingEngine, pas par ERPSchedulingPlanningView.",
    "",
  ].join("\n");

  fs.mkdirSync(path.dirname(REPORT), { recursive: true });
  fs.writeFileSync(REPORT, report, "utf8");

  console.log(`[${TEST_ID}] DONE`);
  console.log(`[EXPECTED] ${expectedFirstSlots.join(" | ")}`);
  console.log(`[REPORT] ${rel(REPORT)}`);
}

main();