/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B2-C1B";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b2c1b-remove-rdv-validation-block`;

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

function removeMethodContaining(content, requiredNeedles) {
  const firstNeedle = requiredNeedles[0];
  const needleIndex = content.indexOf(firstNeedle);

  if (needleIndex === -1) {
    console.log(`[SKIP] Bloc contenant "${firstNeedle}" absent`);
    return content;
  }

  const methodStart = content.lastIndexOf("static ", needleIndex);

  if (methodStart === -1) {
    throw new Error(`[${PASS_ID}] Impossible de trouver la méthode statique contenant ${firstNeedle}`);
  }

  const openBraceIndex = content.indexOf("{", methodStart);

  if (openBraceIndex === -1 || openBraceIndex > needleIndex) {
    throw new Error(`[${PASS_ID}] Accolade ouvrante introuvable`);
  }

  const methodEnd = findMatchingBrace(content, openBraceIndex);

  if (methodEnd === -1) {
    throw new Error(`[${PASS_ID}] Accolade fermante introuvable`);
  }

  const method = content.slice(methodStart, methodEnd + 1);

  for (const needle of requiredNeedles) {
    if (!method.includes(needle)) {
      throw new Error(
        `[${PASS_ID}] Sécurité: la méthode trouvée ne contient pas le marqueur requis "${needle}"`
      );
    }
  }

  const methodHeader = method.slice(0, method.indexOf("{")).trim();
  console.log(`[REMOVED] ${methodHeader}`);

  const before = content.slice(0, methodStart).replace(/\n\s*$/, "\n");
  const after = content.slice(methodEnd + 1).replace(/^\s*\n/, "\n");

  return before + after;
}

function main() {
  console.log(`[${PASS_ID}] Suppression bloc validation RDV -> intervention du SchedulingEngine...`);

  let content = read(TARGET);
  backup(TARGET);

  content = removeMethodContaining(content, [
    "Rendez-vous introuvable.",
    "Impossible de créer une intervention",
    "consumedByInterventionId",
    "clientId",
    "vehiculeId",
  ]);

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