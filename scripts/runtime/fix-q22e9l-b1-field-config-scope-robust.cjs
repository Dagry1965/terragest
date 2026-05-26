/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B1-FIX2B";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b1-fix2b-field-config-scope-robust`;

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

function patchMethodContainingFieldConfig(content) {
  const needle = "fieldConfig.dateField";
  const usageIndex = content.indexOf(needle);

  if (usageIndex === -1) {
    console.log("[SKIP] Aucun usage fieldConfig.dateField trouvé.");
    return content;
  }

  const methodStart = content.lastIndexOf("static ", usageIndex);

  if (methodStart === -1) {
    throw new Error(`[${PASS_ID}] Impossible de trouver le début de méthode avant fieldConfig.dateField`);
  }

  const openBraceIndex = content.indexOf("{", methodStart);

  if (openBraceIndex === -1 || openBraceIndex > usageIndex) {
    throw new Error(`[${PASS_ID}] Impossible de trouver l'accolade ouvrante de la méthode`);
  }

  const methodEnd = findMatchingBrace(content, openBraceIndex);

  if (methodEnd === -1) {
    throw new Error(`[${PASS_ID}] Impossible de trouver la fin de la méthode`);
  }

  let before = content.slice(0, methodStart);
  let method = content.slice(methodStart, methodEnd + 1);
  let after = content.slice(methodEnd + 1);

  const methodHeader = method.slice(0, method.indexOf("{") + 1);
  const methodBody = method.slice(method.indexOf("{") + 1);

  const methodNameMatch = methodHeader.match(/static\s+([A-Za-z0-9_]+)/);
  const methodName = methodNameMatch ? methodNameMatch[1] : "UNKNOWN_METHOD";

  console.log(`[METHOD] ${methodName}`);

  if (!method.includes("fieldConfig.dateField")) {
    console.log("[SKIP] Méthode sans fieldConfig.dateField.");
    return content;
  }

  /**
   * 1. Ajouter config?: Partial<RuntimeSchedulingFieldConfig>
   * si la méthode ne l'a pas déjà.
   */
  if (!methodHeader.includes("config?: Partial<RuntimeSchedulingFieldConfig>")) {
    method = method.replace(
      /static\s+([A-Za-z0-9_]+)\s*\(\s*record:\s*RuntimeRecord\s*\)/,
      `static $1(
    record: RuntimeRecord,
    config?: Partial<RuntimeSchedulingFieldConfig>
  )`
    );

    console.log("[PATCHED] signature config ajoutée si motif compatible");
  } else {
    console.log("[SKIP] signature config déjà présente");
  }

  /**
   * 2. Recalculer header/body après modification éventuelle.
   */
  const openAfterSignature = method.indexOf("{");
  const headerAfterSignature = method.slice(0, openAfterSignature + 1);
  const bodyAfterSignature = method.slice(openAfterSignature + 1);

  /**
   * 3. Injecter fieldConfig au début de la méthode si absent.
   */
  if (!bodyAfterSignature.includes("const fieldConfig = resolveRuntimeSchedulingFieldConfig(config);")) {
    method =
      headerAfterSignature +
      `
    const fieldConfig = resolveRuntimeSchedulingFieldConfig(config);` +
      bodyAfterSignature;

    console.log("[PATCHED] fieldConfig injecté");
  } else {
    console.log("[SKIP] fieldConfig déjà présent");
  }

  return before + method + after;
}

function patchApplyAppointmentSlotSignature(content) {
  /**
   * Si applyAppointmentSlot appelle computeAppointmentSlot(record, config),
   * elle doit aussi accepter config.
   */
  const applyIndex = content.indexOf("static applyAppointmentSlot");

  if (applyIndex === -1) {
    console.log("[SKIP] applyAppointmentSlot absent");
    return content;
  }

  const openBraceIndex = content.indexOf("{", applyIndex);
  const methodEnd = findMatchingBrace(content, openBraceIndex);

  if (openBraceIndex === -1 || methodEnd === -1) {
    console.log("[SKIP] applyAppointmentSlot non patchable automatiquement");
    return content;
  }

  let before = content.slice(0, applyIndex);
  let method = content.slice(applyIndex, methodEnd + 1);
  let after = content.slice(methodEnd + 1);

  if (
    method.includes("computeAppointmentSlot(record, config)") &&
    !method.includes("config?: Partial<RuntimeSchedulingFieldConfig>")
  ) {
    method = method.replace(
      /static\s+applyAppointmentSlot\s*\(\s*record:\s*RuntimeRecord\s*\)/,
      `static applyAppointmentSlot(
    record: RuntimeRecord,
    config?: Partial<RuntimeSchedulingFieldConfig>
  )`
    );

    console.log("[PATCHED] applyAppointmentSlot signature config");
  } else {
    console.log("[SKIP] applyAppointmentSlot signature OK ou config non utilisée");
  }

  return before + method + after;
}

function removeDuplicateFieldConfig(content) {
  return content.replace(
    /const fieldConfig = resolveRuntimeSchedulingFieldConfig\(config\);\s*const fieldConfig = resolveRuntimeSchedulingFieldConfig\(config\);/g,
    "const fieldConfig = resolveRuntimeSchedulingFieldConfig(config);"
  );
}

function main() {
  console.log(`[${PASS_ID}] Correction robuste fieldConfig scope...`);

  let content = read(TARGET);
  backup(TARGET);

  content = patchMethodContainingFieldConfig(content);
  content = patchApplyAppointmentSlotSignature(content);
  content = removeDuplicateFieldConfig(content);

  write(TARGET, content);

  console.log(`[WRITTEN] ${normalizePath(path.relative(ROOT, TARGET))}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
}

main();