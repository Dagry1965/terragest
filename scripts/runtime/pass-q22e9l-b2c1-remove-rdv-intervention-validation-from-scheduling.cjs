/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B2-C1";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b2c1-remove-rdv-validation`;

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

function removeStaticMethod(content, methodName) {
  const methodIndex = content.indexOf(`static ${methodName}`);

  if (methodIndex === -1) {
    console.log(`[SKIP] static ${methodName} absent`);
    return content;
  }

  const openBraceIndex = content.indexOf("{", methodIndex);

  if (openBraceIndex === -1) {
    throw new Error(`[${PASS_ID}] Accolade ouvrante introuvable pour ${methodName}`);
  }

  const methodEnd = findMatchingBrace(content, openBraceIndex);

  if (methodEnd === -1) {
    throw new Error(`[${PASS_ID}] Accolade fermante introuvable pour ${methodName}`);
  }

  const before = content.slice(0, methodIndex);
  const after = content.slice(methodEnd + 1);

  console.log(`[REMOVED] static ${methodName}`);

  return before.replace(/\n\s*$/, "\n") + after.replace(/^\s*\n/, "\n");
}

function main() {
  console.log(`[${PASS_ID}] Suppression validation RDV -> intervention du SchedulingEngine...`);

  let content = read(TARGET);
  backup(TARGET);

  content = removeStaticMethod(content, "validateRendezvousForIntervention");

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