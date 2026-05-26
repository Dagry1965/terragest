/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B1-FIX3";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b1-fix3-apply-appointment-slot-config`;

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function read(file) {
  if (!fs.existsSync(file)) {
    throw new Error(`Fichier introuvable: ${normalizePath(path.relative(ROOT, file))}`);
  }

  return fs.readFileSync(file, "utf8");
}

function write(file, content) {
  fs.writeFileSync(file, content, "utf8");
}

function backup(file) {
  if (!fs.existsSync(BACKUP)) {
    fs.copyFileSync(file, BACKUP);
    console.log(`[BACKUP] ${normalizePath(path.relative(ROOT, BACKUP))}`);
  } else {
    console.log(`[BACKUP_EXISTS] ${normalizePath(path.relative(ROOT, BACKUP))}`);
  }
}

function findMatchingBrace(content, openBraceIndex) {
  let depth = 0;

  for (let i = openBraceIndex; i < content.length; i += 1) {
    const char = content[i];

    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;

    if (depth === 0) return i;
  }

  return -1;
}

function patchApplyAppointmentSlot(content) {
  const methodStart = content.indexOf("static applyAppointmentSlot");

  if (methodStart === -1) {
    throw new Error(`[${PASS_ID}] Méthode applyAppointmentSlot introuvable`);
  }

  const openBraceIndex = content.indexOf("{", methodStart);
  const methodEnd = findMatchingBrace(content, openBraceIndex);

  if (openBraceIndex === -1 || methodEnd === -1) {
    throw new Error(`[${PASS_ID}] Bloc applyAppointmentSlot non lisible`);
  }

  const before = content.slice(0, methodStart);
  let method = content.slice(methodStart, methodEnd + 1);
  const after = content.slice(methodEnd + 1);

  if (!method.includes("computeAppointmentSlot(record, config)")) {
    console.log("[SKIP] applyAppointmentSlot n'appelle pas computeAppointmentSlot(record, config)");
    return content;
  }

  if (method.includes("config?: Partial<RuntimeSchedulingFieldConfig>")) {
    console.log("[SKIP] applyAppointmentSlot possède déjà config");
    return content;
  }

  method = method.replace(
    /static\s+applyAppointmentSlot\s*\(\s*record:\s*RuntimeRecord\s*\)\s*:\s*RuntimeRecord\s*\{/,
    `static applyAppointmentSlot(
    record: RuntimeRecord,
    config?: Partial<RuntimeSchedulingFieldConfig>
  ): RuntimeRecord {`
  );

  if (!method.includes("config?: Partial<RuntimeSchedulingFieldConfig>")) {
    throw new Error(
      `[${PASS_ID}] Signature applyAppointmentSlot non patchée. Inspecter manuellement autour de applyAppointmentSlot.`
    );
  }

  console.log("[PATCHED] applyAppointmentSlot signature config");

  return before + method + after;
}

function main() {
  console.log(`[${PASS_ID}] Correction applyAppointmentSlot config scope...`);

  let content = read(TARGET);
  backup(TARGET);

  content = patchApplyAppointmentSlot(content);

  write(TARGET, content);

  console.log(`[WRITTEN] ${normalizePath(path.relative(ROOT, TARGET))}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
}

main();