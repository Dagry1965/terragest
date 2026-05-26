/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-D-B-FIX3";

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const BACKUP = `${TARGET}.bak-q22e9m-db-fix3-remove-duration-param-robust`;

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

function removeDurationFieldBlock(content) {
  const needle = "schedulingConfig.durationField";
  const needleIndex = content.indexOf(needle);

  if (needleIndex === -1) {
    console.log("[SKIP] schedulingConfig.durationField absent");
    return content;
  }

  const ifStart = content.lastIndexOf("if", needleIndex);

  if (ifStart === -1) {
    throw new Error(`[${PASS_ID}] Impossible de trouver le if autour de ${needle}`);
  }

  const openBraceIndex = content.indexOf("{", ifStart);

  if (openBraceIndex === -1 || openBraceIndex > needleIndex + 120) {
    throw new Error(`[${PASS_ID}] Accolade ouvrante introuvable autour de ${needle}`);
  }

  const closeBraceIndex = findMatchingBrace(content, openBraceIndex);

  if (closeBraceIndex === -1) {
    throw new Error(`[${PASS_ID}] Accolade fermante introuvable autour de ${needle}`);
  }

  const block = content.slice(ifStart, closeBraceIndex + 1);

  if (
    !block.includes("schedulingConfig.durationField") ||
    !block.includes("searchParams.set")
  ) {
    throw new Error(
      `[${PASS_ID}] Sécurité: le bloc trouvé ne ressemble pas au bloc durationField/searchParams.`
    );
  }

  console.log("[REMOVED] bloc if (schedulingConfig.durationField)");

  return (
    content.slice(0, ifStart).replace(/\n\s*$/, "\n") +
    content.slice(closeBraceIndex + 1).replace(/^\s*\n/, "\n")
  );
}

function main() {
  console.log(`[${PASS_ID}] Suppression robuste durationField dans la vue planning...`);

  let content = read(TARGET);
  backup(TARGET);

  content = removeDurationFieldBlock(content);

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