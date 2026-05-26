/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-E-B-FIX1";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

const BACKUP = `${TARGET}.bak-q22e9m-eb-fix1-real-structure`;

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

  const importLine = `import { SchedulingSlotPolicyResolver } from "@/runtime/scheduling";`;
  const marker = `import { RuntimeSchedulingSettingsResolver } from "@/runtime/scheduling/settings";`;

  if (content.includes(marker)) {
    console.log("[PATCHED] import SchedulingSlotPolicyResolver ajouté après settings resolver");
    return content.replace(marker, `${marker}\n${importLine}`);
  }

  const importBlockMatch = content.match(/^(?:import[\s\S]*?;\s*)+/);
  if (importBlockMatch) {
    const insertAt = importBlockMatch[0].length;
    console.log("[PATCHED] import SchedulingSlotPolicyResolver ajouté après imports");
    return content.slice(0, insertAt) + importLine + "\n" + content.slice(insertAt);
  }

  console.log("[PATCHED] import SchedulingSlotPolicyResolver ajouté en haut");
  return importLine + "\n" + content;
}

function injectSlotPolicyAfterSchedulingConfig(content) {
  if (content.includes("const slotPolicy = SchedulingSlotPolicyResolver.resolve")) {
    console.log("[SKIP] slotPolicy déjà injectée");
    return content;
  }

  const marker = `const schedulingConfig =
    await getSchedulingConfig(module, context);`;

  if (!content.includes(marker)) {
    throw new Error(`[${PASS_ID}] marker getSchedulingConfig réel introuvable`);
  }

  const replacement = `${marker}

  const slotPolicy = SchedulingSlotPolicyResolver.resolve({
    durationMinutes:
      typeof mergedRecord.durationMinutes === "number"
        ? mergedRecord.durationMinutes
        : Number(mergedRecord.durationMinutes ?? 0) || undefined,
    bufferMinutes: schedulingConfig?.bufferMinutes,
    capacity: schedulingConfig?.capacity,
  });`;

  console.log("[PATCHED] slotPolicy injectée après getSchedulingConfig");

  return content.replace(marker, replacement);
}

function replaceOpeningHoursDuration(content) {
  const before = content;

  content = content.replace(
    /durationMinutes:\s*typeof\s+mergedRecord\.durationMinutes\s*===\s*"number"\s*\?\s*mergedRecord\.durationMinutes\s*:\s*Number\(mergedRecord\.durationMinutes\s*\?\?\s*0\)\s*\|\|\s*undefined,/m,
    "durationMinutes: slotPolicy.visibleDurationMinutes,"
  );

  if (content !== before) {
    console.log("[PATCHED] assertWithinOpeningHours duration -> slotPolicy.visibleDurationMinutes");
  } else {
    console.log("[SKIP] pattern opening-hours duration non trouvé");
  }

  return content;
}

function replaceCapacity(content) {
  const before = content;

  content = content.replace(
    /const capacity =\s*Math\.max\(\s*1,\s*Number\(schedulingConfig\?\.capacity\s*\?\?\s*1\)\s*\|\|\s*1\s*\);/m,
    "const capacity = slotPolicy.capacity;"
  );

  if (content !== before) {
    console.log("[PATCHED] capacity locale -> slotPolicy.capacity");
  } else {
    console.log("[SKIP] pattern capacity non trouvé");
  }

  return content;
}

function replaceSlotsOptions(content) {
  const before = content;

  content = content.replace(
    /durationMinutes:\s*typeof\s+normalizedRecord\.durationMinutes\s*===\s*"number"\s*\?\s*normalizedRecord\.durationMinutes\s*:\s*Number\(normalizedRecord\.durationMinutes\s*\?\?\s*0\)\s*\|\|\s*undefined,/m,
    "durationMinutes: slotPolicy.visibleDurationMinutes,"
  );

  content = content.replace(
    /bufferMinutes:\s*schedulingConfig\?\.bufferMinutes,/m,
    "bufferMinutes: slotPolicy.bufferMinutes,"
  );

  content = content.replace(
    /capacity,/m,
    "capacity: slotPolicy.capacity,"
  );

  if (content !== before) {
    console.log("[PATCHED] getAvailableSlotsWithBookings options -> slotPolicy");
  } else {
    console.log("[SKIP] options slots non trouvées");
  }

  return content;
}

function assertNoSuspiciousLocalPolicy(content) {
  const forbidden = [
    "Number(schedulingConfig?.capacity ?? 1)",
    "Number(normalizedRecord.durationMinutes ?? 0) || undefined",
    "schedulingConfig?.bufferMinutes,",
  ];

  const remaining = forbidden.filter((needle) => content.includes(needle));

  if (remaining.length > 0) {
    throw new Error(
      `[${PASS_ID}] Restes suspects: ${remaining.join(", ")}`
    );
  }
}

function main() {
  console.log(`[${PASS_ID}] Branchement guard -> SchedulingSlotPolicyResolver structure réelle...`);

  let content = read(TARGET);
  backup(TARGET);

  content = addPolicyImport(content);
  content = injectSlotPolicyAfterSchedulingConfig(content);
  content = replaceOpeningHoursDuration(content);
  content = replaceCapacity(content);
  content = replaceSlotsOptions(content);

  assertNoSuspiciousLocalPolicy(content);

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