/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-E-C";

const TARGET = path.join(
  ROOT,
  "scripts",
  "runtime",
  "audit-q22e9m-e-guard-slot-policy-usage.cjs"
);

const BACKUP = `${TARGET}.bak-q22e9m-e-c-ignore-policy-input`;

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
  console.log(`[${PASS_ID}] Ajustement audit: ignorer les inputs de SchedulingSlotPolicyResolver...`);

  let content = read(TARGET);
  backup(TARGET);

  if (content.includes("isPolicyResolverInput")) {
    console.log("[SKIP] audit déjà ajusté");
  } else {
    const helper = `
function isPolicyResolverInput(content, index) {
  const before = content.slice(Math.max(0, index - 220), index);
  return before.includes("SchedulingSlotPolicyResolver.resolve({");
}
`;

    content = content.replace(
      "function lineInfo(content, index) {",
      `${helper}
function lineInfo(content, index) {`
    );

    content = content.replace(
      `findings.push({
      key: target.key,
      severity: target.severity,
      decision: target.decision,
      file: rel(TARGET),
      line: info.lineNumber,
      text: info.line,
    });`,
      `const isPolicyInput = isPolicyResolverInput(content, match.index);
    findings.push({
      key: target.key,
      severity: isPolicyInput && target.key === "schedulingConfig?.bufferMinutes" ? "REVIEW" : target.severity,
      decision:
        isPolicyInput && target.key === "schedulingConfig?.bufferMinutes"
          ? "Acceptable : valeur source transmise à SchedulingSlotPolicyResolver.resolve(...)."
          : target.decision,
      file: rel(TARGET),
      line: info.lineNumber,
      text: info.line,
    });`
    );

    console.log("[PATCHED] audit ignore policy input direct buffer");
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