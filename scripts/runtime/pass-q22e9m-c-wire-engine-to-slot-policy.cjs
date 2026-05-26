/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-C";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9m-c-wire-slot-policy`;

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

function addPolicyImport(content) {
  if (content.includes("SchedulingSlotPolicyResolver")) {
    console.log("[SKIP] SchedulingSlotPolicyResolver déjà présent");
    return content;
  }

  const firstImportMatch = content.match(/^import .+;$/m);

  if (!firstImportMatch || firstImportMatch.index === undefined) {
    throw new Error(`[${PASS_ID}] Aucun import simple trouvé dans RuntimeSchedulingEngine.ts`);
  }

  const insertAt = firstImportMatch.index + firstImportMatch[0].length;

  console.log("[PATCHED] import SchedulingSlotPolicyResolver");

  return (
    content.slice(0, insertAt) +
    `\nimport { SchedulingSlotPolicyResolver } from "./SchedulingSlotPolicy";` +
    content.slice(insertAt)
  );
}

function replaceNonBlockingHelper(content) {
  const oldBlock = `const DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES = [
  "annule",
  "annulee",
  "annulé",
  "annulée",
  "cancelled",
  "canceled",
];

function isNonBlockingSchedulingRecord(record: RuntimeRecord): boolean {
  const status = asString(record.statut).toLowerCase();
  return DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES.includes(status);
}`;

  const newBlock = `function isNonBlockingSchedulingRecord(record: RuntimeRecord): boolean {
  const policy = SchedulingSlotPolicyResolver.resolve();
  return SchedulingSlotPolicyResolver.isNonBlockingRecord(record, policy);
}`;

  if (content.includes(oldBlock)) {
    console.log("[PATCHED] non-blocking status helper branché sur SchedulingSlotPolicyResolver");
    return content.replace(oldBlock, newBlock);
  }

  if (content.includes("DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES")) {
    throw new Error(
      `[${PASS_ID}] DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES existe encore mais le bloc exact n'a pas été trouvé.`
    );
  }

  if (content.includes("function isNonBlockingSchedulingRecord(")) {
    console.log("[SKIP] helper isNonBlockingSchedulingRecord déjà différent");
    return content;
  }

  throw new Error(`[${PASS_ID}] helper isNonBlockingSchedulingRecord introuvable`);
}

function wireGetAvailableSlotsPolicy(content) {
  /**
   * Remplacement progressif :
   * - On garde les paramètres existants.
   * - On résout une policy depuis params.durationMinutes/bufferMinutes/capacity/profile.
   * - On remplace les calculs locaux par policy.visibleDurationMinutes, policy.bufferMinutes, policy.capacity.
   */
  const marker = `// Generic ERP availability: opening-hours slots minus existing bookings.`;

  if (!content.includes(marker)) {
    console.log("[SKIP] marker disponibilité générique absent");
    return content;
  }

  const methodIndex = content.indexOf(marker);
  const methodStart = content.lastIndexOf("static ", methodIndex);
  const methodOpenBrace = content.indexOf("{", methodStart);

  if (methodStart === -1 || methodOpenBrace === -1) {
    throw new Error(`[${PASS_ID}] Méthode getAvailableSlotsForDate non localisée`);
  }

  const before = content.slice(0, methodOpenBrace + 1);
  const after = content.slice(methodOpenBrace + 1);

  const methodEndMarker = "const date = normalizeDateOnly(params.date);";

  if (!after.includes(methodEndMarker)) {
    console.log("[SKIP] point d'injection policy absent");
    return content;
  }

  if (after.slice(0, after.indexOf(methodEndMarker)).includes("const slotPolicy = SchedulingSlotPolicyResolver.resolve")) {
    console.log("[SKIP] slotPolicy déjà injectée");
    return content;
  }

  const injection = `
    const slotPolicy = SchedulingSlotPolicyResolver.resolve({
      durationMinutes: params.durationMinutes,
      bufferMinutes: params.bufferMinutes,
      capacity: params.capacity,
      openingHoursProfile: params.profile,
    });
`;

  let patched = before + injection + after;

  patched = patched.replace(
    /const visibleDurationMinutes = Math\.max\(\s*1,\s*asNumber\(params\.durationMinutes,\s*RuntimeSchedulingEngine\.defaultDurationMinutes\)\s*\);/m,
    `const visibleDurationMinutes = slotPolicy.visibleDurationMinutes;`
  );

  patched = patched.replace(
    /const bufferMinutes = Math\.max\(\s*0,\s*asNumber\(params\.bufferMinutes,\s*0\)\s*\);/m,
    `const bufferMinutes = slotPolicy.bufferMinutes;`
  );

  patched = patched.replace(
    /const capacity = Math\.max\(\s*1,\s*asNumber\(params\.capacity,\s*1\)\s*\);/m,
    `const capacity = slotPolicy.capacity;`
  );

  console.log("[PATCHED] getAvailableSlotsForDate utilise slotPolicy");

  return patched;
}

function main() {
  console.log(`[${PASS_ID}] Branchement RuntimeSchedulingEngine -> SchedulingSlotPolicyResolver...`);

  let content = read(TARGET);
  backup(TARGET);

  content = addPolicyImport(content);
  content = replaceNonBlockingHelper(content);
  content = wireGetAvailableSlotsPolicy(content);

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9m-a-scheduling-slot-policy-readiness.cjs");
}

main();