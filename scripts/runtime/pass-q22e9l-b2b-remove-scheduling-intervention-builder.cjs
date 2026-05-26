/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B2-B";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b2b-remove-intervention-builder`;

const SEARCH_DIRS = [
  "src/runtime",
  "src/components",
  "src/app",
];

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

function walk(dir) {
  const root = path.join(ROOT, dir);
  if (!fs.existsSync(root)) return [];

  const files = [];

  function visit(current) {
    if (
      current.includes(`${path.sep}node_modules${path.sep}`) ||
      current.includes(`${path.sep}.next${path.sep}`) ||
      current.includes(`${path.sep}.git${path.sep}`)
    ) {
      return;
    }

    const stat = fs.statSync(current);

    if (stat.isDirectory()) {
      for (const child of fs.readdirSync(current)) {
        visit(path.join(current, child));
      }
      return;
    }

    if (/\.(ts|tsx|js|jsx|cjs|mjs)$/.test(current)) {
      files.push(current);
    }
  }

  visit(root);
  return files;
}

function findExternalCalls() {
  const findings = [];

  for (const file of SEARCH_DIRS.flatMap(walk)) {
    const content = fs.readFileSync(file, "utf8");
    const normalized = rel(file);

    if (normalized === rel(TARGET)) continue;

    if (content.includes("RuntimeSchedulingEngine.buildInterventionFromRendezvous")) {
      findings.push({
        file: normalized,
        kind: "direct",
      });
    }

    if (content.match(/\.buildInterventionFromRendezvous\s*\(/)) {
      findings.push({
        file: normalized,
        kind: "method-chain",
      });
    }
  }

  return findings;
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
    console.log(`[SKIP] Méthode ${methodName} absente`);
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
  console.log(`[${PASS_ID}] Suppression buildInterventionFromRendezvous du RuntimeSchedulingEngine...`);

  const externalCalls = findExternalCalls();

  if (externalCalls.length > 0) {
    console.log("[BLOCKED] Appels externes encore présents :");
    for (const finding of externalCalls) {
      console.log(`- ${finding.file} (${finding.kind})`);
    }

    throw new Error(
      `[${PASS_ID}] Suppression bloquée : remplacer les appels externes avant de supprimer la méthode.`
    );
  }

  let content = read(TARGET);
  backup(TARGET);

  content = removeStaticMethod(content, "buildInterventionFromRendezvous");

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9l-b2-rdv-intervention-extraction.cjs");
}

main();