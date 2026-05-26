/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-G-A1";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9m-g-a1-wire-engine-slots-policy`;

function rel(filePath) {
  return path.relative(ROOT, filePath).split(path.sep).join("/");
}

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`[${PASS_ID}] Fichier introuvable: ${rel(file)}`);
  }
  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file) {
  if (!fs.existsSync(BACKUP)) {
    fs.copyFileSync(file, BACKUP);
    console.log(`[BACKUP] ${rel(BACKUP)}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${rel(BACKUP)}`);
  }
}

function patchGetAvailableSlotsWithBookings(content) {
  const before = content;

  content = content.replace(
    /\/\/ Q22D1_BOOKING_AWARE_AVAILABILITY\s*\r?\n\s*\/\/ Generic ERP availability:\s*opening-hours slots minus existing bookings\.\s*\r?\n\s*const bufferMinutes = Math\.max\(\s*0,\s*asNumber\(params\.bufferMinutes,\s*0\)\s*\);\s*\r?\n\s*const visibleDurationMinutes = Math\.max\(\s*1,\s*asNumber\(\s*params\.durationMinutes,\s*RuntimeSchedulingEngine\.defaultDurationMinutes\s*\)\s*\);\s*\r?\n\s*const slotDurationMinutes =\s*visibleDurationMinutes \+ bufferMinutes;\s*/m,
    `// Q22D1_BOOKING_AWARE_AVAILABILITY
    // Generic ERP availability: opening-hours slots minus existing bookings.
    const slotPolicy = SchedulingSlotPolicyResolver.resolve({
      durationMinutes: params.durationMinutes,
      bufferMinutes: params.bufferMinutes,
      capacity: params.capacity,
      openingHoursProfile: params.profile,
    });

    const visibleDurationMinutes = slotPolicy.visibleDurationMinutes;
    const bufferMinutes = slotPolicy.bufferMinutes;
    const slotDurationMinutes = slotPolicy.slotDurationMinutes;
`
  );

  content = content.replace(
    /const capacity = Math\.max\(\s*1,\s*asNumber\(params\.capacity,\s*1\)\s*\);/m,
    "const capacity = slotPolicy.capacity;"
  );

  if (content === before) {
    throw new Error(
      `[${PASS_ID}] Aucun remplacement effectué. Inspecter getAvailableSlotsWithBookings.`
    );
  }

  console.log("[PATCHED] getAvailableSlotsWithBookings utilise slotPolicy");

  return content;
}

function patchGetAvailableSlotsForDate(content) {
  const before = content;

  content = content.replace(
    /const durationMinutes = Math\.max\(\s*1,\s*asNumber\(params\.durationMinutes,\s*profile\.defaultSlotDurationMinutes\)\s*\);/m,
    `const slotPolicy = SchedulingSlotPolicyResolver.resolve({
      durationMinutes: params.durationMinutes,
      defaultDurationMinutes: profile.defaultSlotDurationMinutes,
      openingHoursProfile: profile,
    });

    const durationMinutes = slotPolicy.slotDurationMinutes;`
  );

  if (content !== before) {
    console.log("[PATCHED] getAvailableSlotsForDate utilise slotPolicy pour duration");
  } else {
    console.log("[SKIP] getAvailableSlotsForDate déjà différent ou non trouvé");
  }

  return content;
}

function patchAssertWithinOpeningHours(content) {
  const before = content;

  content = content.replace(
    /const durationMinutes = Math\.max\(\s*1,\s*asNumber\(params\.durationMinutes,\s*profile\.defaultSlotDurationMinutes\)\s*\);/m,
    `const slotPolicy = SchedulingSlotPolicyResolver.resolve({
      durationMinutes: params.durationMinutes,
      defaultDurationMinutes: profile.defaultSlotDurationMinutes,
      openingHoursProfile: profile,
    });

    const durationMinutes = slotPolicy.slotDurationMinutes;`
  );

  if (content !== before) {
    console.log("[PATCHED] assertWithinOpeningHours utilise slotPolicy pour duration");
  } else {
    console.log("[SKIP] assertWithinOpeningHours pattern déjà patché ou absent");
  }

  return content;
}

function assertPolicyUsage(content) {
  const required = [
    "const visibleDurationMinutes = slotPolicy.visibleDurationMinutes;",
    "const bufferMinutes = slotPolicy.bufferMinutes;",
    "const slotDurationMinutes = slotPolicy.slotDurationMinutes;",
    "const capacity = slotPolicy.capacity;",
  ];

  const missing = required.filter((needle) => !content.includes(needle));

  if (missing.length > 0) {
    throw new Error(`[${PASS_ID}] Usage policy incomplet: ${missing.join(", ")}`);
  }

  const forbidden = [
    "const bufferMinutes = Math.max(",
    "const visibleDurationMinutes = Math.max(",
    "const slotDurationMinutes =\n      visibleDurationMinutes + bufferMinutes",
    "const capacity = Math.max(",
  ];

  const remaining = forbidden.filter((needle) => content.includes(needle));

  if (remaining.length > 0) {
    throw new Error(`[${PASS_ID}] Calculs locaux restants: ${remaining.join(", ")}`);
  }
}

function main() {
  console.log(`[${PASS_ID}] Branchement réel slots moteur -> SchedulingSlotPolicy...`);

  let content = read(TARGET);
  backup(TARGET);

  content = patchGetAvailableSlotsWithBookings(content);
  content = patchGetAvailableSlotsForDate(content);
  content = patchAssertWithinOpeningHours(content);

  assertPolicyUsage(content);

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\test-q22e9m-g-a-scheduling-policy-slots.cjs");
}

main();