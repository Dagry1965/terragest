/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-E-B";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

const BACKUP = `${TARGET}.bak-q22e9m-eb-wire-slot-policy`;

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
    console.log("[SKIP] SchedulingSlotPolicyResolver déjà importé/utilisé");
    return content;
  }

  const importLine = `import { SchedulingSlotPolicyResolver } from "@/runtime/scheduling";`;
  const importBlockMatch = content.match(/^(?:import[\s\S]*?;\s*)+/);

  if (importBlockMatch) {
    const insertAt = importBlockMatch[0].length;
    console.log("[PATCHED] import SchedulingSlotPolicyResolver");
    return content.slice(0, insertAt) + importLine + "\n" + content.slice(insertAt);
  }

  console.log("[PATCHED] import SchedulingSlotPolicyResolver en haut");
  return importLine + "\n" + content;
}

function injectSlotPolicy(content) {
  /**
   * On injecte une policy après schedulingConfig si possible.
   */
  if (content.includes("const slotPolicy = SchedulingSlotPolicyResolver.resolve")) {
    console.log("[SKIP] slotPolicy déjà présent");
    return content;
  }

  const marker = "const schedulingConfig = module.scheduling;";

  if (!content.includes(marker)) {
    throw new Error(`[${PASS_ID}] marker schedulingConfig introuvable`);
  }

  const injection = `${marker}
  const slotPolicy = SchedulingSlotPolicyResolver.resolve({
    durationMinutes:
      typeof normalizedRecord.durationMinutes === "number"
        ? normalizedRecord.durationMinutes
        : Number(normalizedRecord.durationMinutes ?? 0) || undefined,
    bufferMinutes: schedulingConfig?.bufferMinutes,
    capacity: schedulingConfig?.capacity,
  });`;

  console.log("[PATCHED] slotPolicy injectée après schedulingConfig");

  return content.replace(marker, injection);
}

function replaceLocalCapacity(content) {
  const before = content;

  content = content.replace(
    /const capacity =\s*Math\.max\(\s*1,\s*Number\(schedulingConfig\?\.capacity \?\? 1\) \|\| 1\s*\);/m,
    "const capacity = slotPolicy.capacity;"
  );

  if (content !== before) {
    console.log("[PATCHED] capacity locale -> slotPolicy.capacity");
  } else {
    console.log("[SKIP] capacity locale non trouvée au format attendu");
  }

  return content;
}

function replaceOpeningHoursDuration(content) {
  const before = content;

  content = content.replace(
    /durationMinutes:\s*typeof mergedRecord\.durationMinutes === "number"\s*\?\s*mergedRecord\.durationMinutes\s*:\s*Number\(mergedRecord\.durationMinutes \?\? 0\) \|\| undefined,/m,
    "durationMinutes: slotPolicy.visibleDurationMinutes,"
  );

  if (content !== before) {
    console.log("[PATCHED] opening-hours duration -> slotPolicy.visibleDurationMinutes");
  } else {
    console.log("[SKIP] opening-hours duration pattern non trouvé");
  }

  return content;
}

function replaceConflictOptions(content) {
  const before = content;

  content = content.replace(
    /durationMinutes:\s*typeof normalizedRecord\.durationMinutes === "number"\s*\?\s*normalizedRecord\.durationMinutes\s*:\s*Number\(normalizedRecord\.durationMinutes \?\? 0\) \|\| undefined,/m,
    "durationMinutes: slotPolicy.visibleDurationMinutes,"
  );

  content = content.replace(
    /bufferMinutes:\s*schedulingConfig\?\.bufferMinutes,/m,
    "bufferMinutes: slotPolicy.bufferMinutes,"
  );

  content = content.replace(
    /capacity,\s*$/m,
    "capacity: slotPolicy.capacity,"
  );

  if (content !== before) {
    console.log("[PATCHED] conflict options -> slotPolicy");
  } else {
    console.log("[SKIP] conflict options patterns non trouvés");
  }

  return content;
}

function main() {
  console.log(`[${PASS_ID}] Branchement guard -> SchedulingSlotPolicyResolver...`);

  let content = read(TARGET);
  backup(TARGET);

  content = addPolicyImport(content);
  content = injectSlotPolicy(content);
  content = replaceLocalCapacity(content);
  content = replaceOpeningHoursDuration(content);
  content = replaceConflictOptions(content);

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9m-e-guard-slot-policy-usage.cjs");
}

main();