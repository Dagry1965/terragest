/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B1-FIX-FINAL";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b1-config-scope-final`;

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
  }
}

function main() {
  console.log(`[${PASS_ID}] Correction finale portée config...`);

  let content = read(TARGET);
  backup(TARGET);

  const usage = "RuntimeSchedulingEngine.computeAppointmentSlot(record, config)";
  const usageIndex = content.indexOf(usage);

  if (usageIndex === -1) {
    console.log("[SKIP] Aucun appel computeAppointmentSlot(record, config) trouvé.");
    return;
  }

  const methodStart = content.lastIndexOf("static ", usageIndex);
  if (methodStart === -1) {
    throw new Error(`[${PASS_ID}] Impossible de trouver la méthode contenant l'appel avec config.`);
  }

  const openBrace = content.indexOf("{", methodStart);
  if (openBrace === -1 || openBrace > usageIndex) {
    throw new Error(`[${PASS_ID}] Impossible de trouver l'accolade de la méthode.`);
  }

  const before = content.slice(0, methodStart);
  let header = content.slice(methodStart, openBrace);
  const afterHeader = content.slice(openBrace);

  const methodNameMatch = header.match(/static\s+([A-Za-z0-9_]+)/);
  const methodName = methodNameMatch ? methodNameMatch[1] : "UNKNOWN_METHOD";

  console.log(`[METHOD] ${methodName}`);

  if (header.includes("config?: Partial<RuntimeSchedulingFieldConfig>")) {
    console.log("[SKIP] La signature contient déjà config.");
  } else {
    header = header.replace(
      /record:\s*RuntimeRecord/,
      `record: RuntimeRecord,
    config?: Partial<RuntimeSchedulingFieldConfig>`
    );

    console.log("[PATCHED] config ajouté à la signature.");
  }

  content = before + header + afterHeader;

  content = content.replace(
    /config\?: Partial<RuntimeSchedulingFieldConfig>\s*,\s*config\?: Partial<RuntimeSchedulingFieldConfig>/g,
    "config?: Partial<RuntimeSchedulingFieldConfig>"
  );

  write(TARGET, content);

  console.log(`[WRITTEN] ${normalizePath(path.relative(ROOT, TARGET))}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
}

main();