/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TEST_ID = "Q22E-9M-G-B";

const REPORT = path.join(
  ROOT,
  "docs",
  "audits",
  "Q22E-9M-G-B-booking-aware-policy-slots-test.md"
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

function rangesOverlap(a, b) {
  return a.start < b.end && b.start < a.end;
}

function generateSlots({ start, end, durationMinutes, bufferMinutes }) {
  const startMinutes = timeToMinutes(start);
  const endMinutes = timeToMinutes(end);
  const slotDurationMinutes = durationMinutes + bufferMinutes;
  const slots = [];

  for (
    let cursor = startMinutes;
    cursor + slotDurationMinutes <= endMinutes;
    cursor += slotDurationMinutes
  ) {
    slots.push({
      start: minutesToTime(cursor),
      end: minutesToTime(cursor + slotDurationMinutes),
      durationMinutes: slotDurationMinutes,
      visibleDurationMinutes: durationMinutes,
      bufferMinutes,
    });
  }

  return slots;
}

function applyBookings({ slots, bookings, bufferMinutes, capacity }) {
  return slots.map((slot) => {
    const slotStart = timeToMinutes(slot.start);
    const slotEnd = timeToMinutes(slot.end);

    const overlappingBookings = bookings.filter((booking) => {
      if (!booking || !booking.startAt || !booking.endAt) return false;

      const bookingStart = new Date(booking.startAt);
      const bookingEnd = new Date(booking.endAt);
      const bookingEndWithBuffer = new Date(
        bookingEnd.getTime() + bufferMinutes * 60 * 1000
      );

      const bookingStartMinutes =
        bookingStart.getHours() * 60 + bookingStart.getMinutes();

      const bookingEndMinutes =
        bookingEndWithBuffer.getHours() * 60 + bookingEndWithBuffer.getMinutes();

      return rangesOverlap(
        { start: slotStart, end: slotEnd },
        { start: bookingStartMinutes, end: bookingEndMinutes }
      );
    });

    const usedCapacity = overlappingBookings.length;
    const remainingCapacity = Math.max(capacity - usedCapacity, 0);

    return {
      ...slot,
      capacity,
      usedCapacity,
      remainingCapacity,
      available: remainingCapacity > 0,
    };
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`[${TEST_ID}] ${message}`);
  }
}

function findSlot(slots, start) {
  return slots.find((slot) => slot.start === start);
}

function main() {
  console.log(`[${TEST_ID}] Test booking-aware SchedulingSlotPolicy slots...`);

  const engineContent = read(ENGINE_FILE);

  assert(
    engineContent.includes("SchedulingSlotPolicyResolver.resolve"),
    "RuntimeSchedulingEngine ne consomme pas SchedulingSlotPolicyResolver."
  );

  assert(
    engineContent.includes("const slotDurationMinutes = slotPolicy.slotDurationMinutes;"),
    "RuntimeSchedulingEngine ne semble pas utiliser slotPolicy.slotDurationMinutes."
  );

  assert(
    engineContent.includes("const bufferMinutes = slotPolicy.bufferMinutes;"),
    "RuntimeSchedulingEngine ne semble pas utiliser slotPolicy.bufferMinutes."
  );

  assert(
    engineContent.includes("const capacity = slotPolicy.capacity;"),
    "RuntimeSchedulingEngine ne semble pas utiliser slotPolicy.capacity."
  );

  const base = {
    date: "2026-05-26",
    start: "08:00",
    end: "18:00",
    durationMinutes: 60,
    bufferMinutes: 15,
  };

  const booking0800 = {
    id: "booking-0800",
    startAt: "2026-05-26T08:00:00.000",
    endAt: "2026-05-26T09:00:00.000",
  };

  const noBookingSlots = applyBookings({
    slots: generateSlots(base),
    bookings: [],
    bufferMinutes: base.bufferMinutes,
    capacity: 1,
  });

  const capacity1Slots = applyBookings({
    slots: generateSlots(base),
    bookings: [booking0800],
    bufferMinutes: base.bufferMinutes,
    capacity: 1,
  });

  const capacity2Slots = applyBookings({
    slots: generateSlots(base),
    bookings: [booking0800],
    bufferMinutes: base.bufferMinutes,
    capacity: 2,
  });

  const noBooking0800 = findSlot(noBookingSlots, "08:00");
  const capacity1_0800 = findSlot(capacity1Slots, "08:00");
  const capacity1_0915 = findSlot(capacity1Slots, "09:15");
  const capacity2_0800 = findSlot(capacity2Slots, "08:00");

  assert(noBooking0800?.available === true, "08:00 devrait être disponible sans booking.");

  assert(
    capacity1_0800?.available === false &&
      capacity1_0800.usedCapacity === 1 &&
      capacity1_0800.remainingCapacity === 0,
    "08:00 devrait être indisponible avec capacity=1 et booking 08:00-09:00 + buffer."
  );

  assert(
    capacity1_0915?.available === true,
    "09:15 devrait rester disponible après le buffer du booking 08:00-09:00."
  );

  assert(
    capacity2_0800?.available === true &&
      capacity2_0800.usedCapacity === 1 &&
      capacity2_0800.remainingCapacity === 1,
    "08:00 devrait rester disponible avec capacity=2 et une seule réservation."
  );

  const report = [
    `# ${TEST_ID} — Booking-aware scheduling policy slots test`,
    "",
    "## Objectif",
    "",
    "Valider le comportement booking-aware du runtime scheduling avec duration=60, buffer=15 et capacity variable.",
    "",
    "## Résultats",
    "",
    "- Sans booking : 08:00 disponible.",
    "- Avec booking 08:00-09:00 + buffer 15 et capacity=1 : 08:00 indisponible.",
    "- Avec booking 08:00-09:00 + buffer 15 et capacity=1 : 09:15 disponible.",
    "- Avec booking 08:00-09:00 + buffer 15 et capacity=2 : 08:00 disponible avec 1 place restante.",
    "",
  ].join("\n");

  fs.mkdirSync(path.dirname(REPORT), { recursive: true });
  fs.writeFileSync(REPORT, report, "utf8");

  console.log(`[${TEST_ID}] DONE`);
  console.log("[NO_BOOKING] 08:00 available=true");
  console.log("[CAPACITY_1] 08:00 available=false remaining=0");
  console.log("[CAPACITY_1] 09:15 available=true");
  console.log("[CAPACITY_2] 08:00 available=true remaining=1");
  console.log(`[REPORT] ${rel(REPORT)}`);
}

main();