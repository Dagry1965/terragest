/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B2-C2";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b2c2-generic-non-blocking-status`;

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
  console.log(`[${PASS_ID}] Généricisation non-blocking scheduling status...`);

  let content = read(TARGET);
  backup(TARGET);

  const oldFunction = `function isCancelledAppointment(record: RuntimeRecord): boolean {
  return asString(record.statut).toLowerCase() === "annule";
}`;

  const newFunction = `const DEFAULT_NON_BLOCKING_SCHEDULING_STATUSES = [
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

  if (content.includes(oldFunction)) {
    content = content.replace(oldFunction, newFunction);
    console.log("[PATCHED] isCancelledAppointment -> isNonBlockingSchedulingRecord");
  } else if (!content.includes("function isNonBlockingSchedulingRecord(")) {
    throw new Error(
      `[${PASS_ID}] Fonction isCancelledAppointment introuvable et isNonBlockingSchedulingRecord absente.`
    );
  } else {
    console.log("[SKIP] fonction déjà générique");
  }

  const before = content;
  content = content.replace(
    /\bisCancelledAppointment\s*\(/g,
    "isNonBlockingSchedulingRecord("
  );

  if (content !== before) {
    console.log("[PATCHED] appels remplacés");
  } else {
    console.log("[SKIP] aucun appel isCancelledAppointment restant");
  }

  if (content.includes("isCancelledAppointment")) {
    throw new Error(
      `[${PASS_ID}] Il reste une référence isCancelledAppointment. Inspecter RuntimeSchedulingEngine.ts.`
    );
  }

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9l-b2c-rdv-consumption-validation.cjs");
}

main();