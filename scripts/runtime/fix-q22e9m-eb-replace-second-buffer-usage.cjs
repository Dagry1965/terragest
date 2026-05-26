/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-E-B-FIX4";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

const BACKUP = `${TARGET}.bak-q22e9m-eb-fix4-second-buffer-usage`;

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

function replaceSecondBufferUsage(content) {
  const matches = [...content.matchAll(/bufferMinutes:\s*schedulingConfig\?\.bufferMinutes,/g)];

  if (matches.length === 0) {
    console.log("[SKIP] aucune lecture directe bufferMinutes restante");
    return content;
  }

  if (matches.length === 1) {
    console.log("[SKIP] seule lecture bufferMinutes restante = injection policy");
    return content;
  }

  const second = matches[1];
  const start = second.index;
  const end = start + second[0].length;

  console.log("[PATCHED] deuxième usage bufferMinutes -> slotPolicy.bufferMinutes");

  return (
    content.slice(0, start) +
    "bufferMinutes: slotPolicy.bufferMinutes," +
    content.slice(end)
  );
}

function main() {
  console.log(`[${PASS_ID}] Remplacement usage direct buffer hors policy...`);

  let content = read(TARGET);
  backup(TARGET);

  content = replaceSecondBufferUsage(content);

  const matches = [...content.matchAll(/bufferMinutes:\s*schedulingConfig\?\.bufferMinutes,/g)];

  if (matches.length > 1) {
    throw new Error(
      `[${PASS_ID}] Trop de lectures directes bufferMinutes restantes: ${matches.length}`
    );
  }

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