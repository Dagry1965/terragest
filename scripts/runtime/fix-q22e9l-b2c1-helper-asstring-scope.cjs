/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B2-C1-FIX3";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "business-rules",
  "runtimeBusinessRules.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b2c1-fix3-helper-asstring-scope`;

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
  console.log(`[${PASS_ID}] Correction portée asString dans helper BusinessRule...`);

  let content = read(TARGET);
  backup(TARGET);

  if (!content.includes("function assertRendezvousCanCreateInterventionRecord(")) {
    throw new Error(
      `[${PASS_ID}] helper assertRendezvousCanCreateInterventionRecord introuvable`
    );
  }

  if (!content.includes("function businessRuleAsString(")) {
    const helperIndex = content.indexOf(
      "function assertRendezvousCanCreateInterventionRecord("
    );

    const localAsString = `function businessRuleAsString(value: unknown): string {
  if (value === undefined || value === null) return "";
  return String(value).trim();
}

`;

    content =
      content.slice(0, helperIndex) +
      localAsString +
      content.slice(helperIndex);

    console.log("[PATCHED] businessRuleAsString ajouté avant le helper");
  } else {
    console.log("[SKIP] businessRuleAsString déjà présent");
  }

  const helperStart = content.indexOf(
    "function assertRendezvousCanCreateInterventionRecord("
  );

  const nextFunctionIndex = content.indexOf("\nfunction ", helperStart + 1);
  const helperEnd = nextFunctionIndex === -1 ? content.length : nextFunctionIndex;

  const before = content.slice(0, helperStart);
  let helper = content.slice(helperStart, helperEnd);
  const after = content.slice(helperEnd);

  helper = helper.replace(/\basString\(/g, "businessRuleAsString(");

  content = before + helper + after;

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
}

main();