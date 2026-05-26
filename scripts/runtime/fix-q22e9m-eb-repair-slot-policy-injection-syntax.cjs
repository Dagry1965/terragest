/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-E-B-FIX3";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

const BACKUP = `${TARGET}.bak-q22e9m-eb-fix3-repair-slot-policy-injection`;

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

function main() {
  console.log(`[${PASS_ID}] Réparation injection slotPolicy dans guard...`);

  let content = read(TARGET);
  backup(TARGET);

  const brokenBlock = `const slotPolicy = SchedulingSlotPolicyResolver.resolve({
    durationMinutes: slotPolicy.visibleDurationMinutes,
    bufferMinutes: slotPolicy.bufferMinutes,
    capacity: schedulingConfig?.capacity: slotPolicy.capacity,
      });`;

  const fixedBlock = `const slotPolicy = SchedulingSlotPolicyResolver.resolve({
    durationMinutes:
      typeof mergedRecord.durationMinutes === "number"
        ? mergedRecord.durationMinutes
        : Number(mergedRecord.durationMinutes ?? 0) || undefined,
    bufferMinutes: schedulingConfig?.bufferMinutes,
    capacity: schedulingConfig?.capacity,
  });`;

  if (content.includes(brokenBlock)) {
    content = content.replace(brokenBlock, fixedBlock);
    console.log("[PATCHED] bloc slotPolicy cassé remplacé");
  } else {
    content = content.replace(
      /const slotPolicy = SchedulingSlotPolicyResolver\.resolve\(\{\s*durationMinutes:\s*slotPolicy\.visibleDurationMinutes,\s*bufferMinutes:\s*slotPolicy\.bufferMinutes,\s*capacity:\s*schedulingConfig\?\.capacity:\s*slotPolicy\.capacity,\s*\}\);/m,
      fixedBlock
    );

    console.log("[PATCHED] tentative regex bloc slotPolicy cassé");
  }

  if (content.includes("capacity: schedulingConfig?.capacity: slotPolicy.capacity")) {
    throw new Error(`[${PASS_ID}] syntaxe cassée encore présente`);
  }

  if (content.includes("durationMinutes: slotPolicy.visibleDurationMinutes,\n    bufferMinutes: slotPolicy.bufferMinutes")) {
    throw new Error(`[${PASS_ID}] slotPolicy auto-référente encore présente`);
  }

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
}

main();