/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-E-C-FIX2";

const TARGET = path.join(
  ROOT,
  "scripts",
  "runtime",
  "audit-q22e9m-e-guard-slot-policy-usage.cjs"
);

const BACKUP = `${TARGET}.bak-q22e9m-e-c-fix2-policy-block`;

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

function replaceFunctionBlock(content, functionName, replacement) {
  const start = content.indexOf(`function ${functionName}(`);

  if (start === -1) {
    throw new Error(`[${PASS_ID}] fonction ${functionName} introuvable`);
  }

  const nextFunction = content.indexOf("\nfunction ", start + 1);

  if (nextFunction === -1) {
    throw new Error(`[${PASS_ID}] fonction suivante introuvable après ${functionName}`);
  }

  return (
    content.slice(0, start) +
    replacement.trimEnd() +
    "\n\n" +
    content.slice(nextFunction + 1)
  );
}

function main() {
  console.log(`[${PASS_ID}] Correction robuste audit input policy par bloc...`);

  let content = read(TARGET);
  backup(TARGET);

  const robustFunction = `function isPolicyResolverInput(content, index) {
  const start = content.lastIndexOf("SchedulingSlotPolicyResolver.resolve({", index);

  if (start === -1) {
    return false;
  }

  const end = content.indexOf("});", start);

  if (end === -1) {
    return false;
  }

  return index > start && index < end;
}`;

  if (content.includes("function isPolicyResolverInput(")) {
    content = replaceFunctionBlock(content, "isPolicyResolverInput", robustFunction);
    console.log("[PATCHED] isPolicyResolverInput remplacé par détection bloc");
  } else {
    content = content.replace(
      "function lineInfo(content, index) {",
      `${robustFunction}

function lineInfo(content, index) {`
    );
    console.log("[PATCHED] isPolicyResolverInput ajouté");
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