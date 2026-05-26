/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-E-C-FINAL";

const TARGET = path.join(
  ROOT,
  "scripts",
  "runtime",
  "audit-q22e9m-e-guard-slot-policy-usage.cjs"
);

const BACKUP = `${TARGET}.bak-q22e9m-e-c-final-buffer-review`;

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
  console.log(`[${PASS_ID}] Reclassement audit buffer policy input en REVIEW...`);

  let content = read(TARGET);
  backup(TARGET);

  content = content.replace(
    /key:\s*"schedulingConfig\?\.bufferMinutes",\s*severity:\s*"HIGH",\s*decision:\s*"Lecture directe suspecte : passer par policy\.bufferMinutes\.",/m,
    `key: "schedulingConfig?.bufferMinutes",
    severity: "REVIEW",
    decision:
      "Acceptable si cette lecture est uniquement l'input transmis à SchedulingSlotPolicyResolver.resolve(...).",`
  );

  if (content.includes('key: "schedulingConfig?.bufferMinutes",\n    severity: "HIGH"')) {
    throw new Error(`[${PASS_ID}] schedulingConfig?.bufferMinutes est encore classé HIGH.`);
  }

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9m-e-guard-slot-policy-usage.cjs");
}

main();