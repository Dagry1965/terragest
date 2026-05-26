/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-C-FIX1";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9m-c-fix1-robust-slot-policy-import`;

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

  const importLine = `import { SchedulingSlotPolicyResolver } from "./SchedulingSlotPolicy";`;

  /**
   * Cas 1 : fichier avec un bloc d'imports TypeScript au début.
   * On insère après le dernier point-virgule d'import trouvé au début du fichier.
   */
  const importBlockMatch = content.match(/^(?:import[\s\S]*?;\s*)+/);

  if (importBlockMatch) {
    const insertAt = importBlockMatch[0].length;
    console.log("[PATCHED] import ajouté après le bloc d'imports");
    return content.slice(0, insertAt) + importLine + "\n" + content.slice(insertAt);
  }

  /**
   * Cas 2 : directive éventuelle.
   */
  if (content.startsWith('"use client";') || content.startsWith("'use client';")) {
    const firstLineEnd = content.indexOf("\n");
    console.log("[PATCHED] import ajouté après directive use client");
    return content.slice(0, firstLineEnd + 1) + importLine + "\n" + content.slice(firstLineEnd + 1);
  }

  if (content.startsWith('"use server";') || content.startsWith("'use server';")) {
    const firstLineEnd = content.indexOf("\n");
    console.log("[PATCHED] import ajouté après directive use server");
    return content.slice(0, firstLineEnd + 1) + importLine + "\n" + content.slice(firstLineEnd + 1);
  }

  /**
   * Cas 3 : fallback au tout début.
   */
  console.log("[PATCHED] import ajouté en haut du fichier");
  return importLine + "\n" + content;
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
    console.log("[PATCHED] non-blocking status helper branché sur policy");
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
  const marker = `// Generic ERP availability: opening-hours slots minus existing bookings.`;

  if (!content.includes(marker)) {
    console.log("[SKIP] marker disponibilité générique absent");
    return content;
  }

  const markerIndex = content.indexOf(marker);
  const methodStart = content.lastIndexOf("static ", markerIndex);
  const openBrace = content.indexOf("{", methodStart);

  if (methodStart === -1 || openBrace === -1 || openBrace > markerIndex) {
    throw new Error(`[${PASS_ID}] Impossible de localiser getAvailableSlotsForDate`);
  }

  const before = content.slice(0, openBrace + 1);
  const after = content.slice(openBrace + 1);

  const injectionPoint = "const date = normalizeDateOnly(params.date);";

  if (!after.includes(injectionPoint)) {
    console.log("[SKIP] point d'injection policy absent");
    return content;
  }

  const beforeInjection = after.slice(0, after.indexOf(injectionPoint));
  if (beforeInjection.includes("const slotPolicy = SchedulingSlotPolicyResolver.resolve")) {
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
  console.log(`[${PASS_ID}] Branchement robuste RuntimeSchedulingEngine -> SchedulingSlotPolicyResolver...`);

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