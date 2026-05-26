/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-D-B-FIX2";

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const BACKUP = `${TARGET}.bak-q22e9m-db-fix2-remove-duration-param`;

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
  console.log(`[${PASS_ID}] Suppression durationField calculé dans la vue planning...`);

  let content = read(TARGET);
  backup(TARGET);

  const before = content;

  content = content.replace(
    /\s*if\s*\(\s*schedulingConfig\.durationField\s*\)\s*\{\s*const durationMinutes\s*=\s*Number\(\s*schedulingConfig\.durationMinutes\s*\?\?\s*schedulingConfig\.slotDurationMinutes\s*\?\?\s*0\s*\)\s*\|\|\s*0;\s*searchParams\.set\(\s*schedulingConfig\.durationField,\s*String\(durationMinutes\)\s*\);\s*\}/m,
    ""
  );

  content = content.replace(
    /\s*if\s*\(\s*schedulingConfig\.durationField\s*\)\s*\{\s*const durationMinutes\s*=\s*Number\([\s\S]*?\)\s*\|\|\s*0;\s*searchParams\.set\(\s*schedulingConfig\.durationField,\s*String\(durationMinutes\)\s*\);\s*\}/m,
    ""
  );

  if (content === before) {
    throw new Error(
      `[${PASS_ID}] Bloc durationField non supprimé. Inspecter autour de schedulingConfig.durationField.`
    );
  }

  if (content.includes("schedulingConfig.defaultDurationMinutes")) {
    throw new Error(`[${PASS_ID}] defaultDurationMinutes reste présent.`);
  }

  if (content.includes("schedulingConfig.durationMinutes")) {
    throw new Error(`[${PASS_ID}] durationMinutes reste présent dans schedulingConfig.`);
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