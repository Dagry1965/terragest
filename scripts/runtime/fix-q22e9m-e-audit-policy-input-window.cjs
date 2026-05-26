/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-E-C-FIX1";

const TARGET = path.join(
  ROOT,
  "scripts",
  "runtime",
  "audit-q22e9m-e-guard-slot-policy-usage.cjs"
);

const BACKUP = `${TARGET}.bak-q22e9m-e-c-fix1-policy-window`;

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
  console.log(`[${PASS_ID}] Élargissement détection input policy dans audit...`);

  let content = read(TARGET);
  backup(TARGET);

  content = content.replace(
    /const before = content\.slice\(Math\.max\(0, index - 220\), index\);/g,
    "const before = content.slice(Math.max(0, index - 1200), index);"
  );

  content = content.replace(
    /return before\.includes\("SchedulingSlotPolicyResolver\.resolve\(\{"\);/g,
    `const after = content.slice(index, Math.min(content.length, index + 220));
  return before.includes("SchedulingSlotPolicyResolver.resolve({") && after.includes("capacity: schedulingConfig?.capacity");`
  );

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9m-e-guard-slot-policy-usage.cjs");
}

main();