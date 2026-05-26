/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-D-B-FIX1";

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const BACKUP = `${TARGET}.bak-q22e9m-db-fix1-duration-type`;

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
  console.log(`[${PASS_ID}] Correction type duration dans planning view...`);

  let content = read(TARGET);
  backup(TARGET);

  content = content.replace(
    /Number\(schedulingConfig\.defaultDurationMinutes \?\? schedulingConfig\.durationMinutes \?\? schedulingConfig\.slotDurationMinutes \?\? 0\) \|\| 0/g,
    "Number(schedulingConfig.durationMinutes ?? schedulingConfig.slotDurationMinutes ?? 0) || 0"
  );

  content = content.replace(
    /Number\(schedulingConfig\.defaultDurationMinutes \?\? schedulingConfig\.durationMinutes \?\? schedulingConfig\.slotDurationMinutes \?\? 0\) \|\| undefined/g,
    "Number(schedulingConfig.durationMinutes ?? schedulingConfig.slotDurationMinutes ?? 0) || undefined"
  );

  if (content.includes("schedulingConfig.defaultDurationMinutes")) {
    throw new Error(
      `[${PASS_ID}] schedulingConfig.defaultDurationMinutes reste présent.`
    );
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