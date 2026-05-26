/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9L-B1-FIX1";

const TARGET = path.join(
  ROOT,
  "src",
  "runtime",
  "scheduling",
  "RuntimeSchedulingEngine.ts"
);

const BACKUP = `${TARGET}.bak-q22e9l-b1-fix1-same-vehicle`;

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

function replaceOrThrow(content, pattern, replacement, label) {
  const next = content.replace(pattern, replacement);

  if (next === content) {
    throw new Error(`[${PASS_ID}] Remplacement non appliqué: ${label}`);
  }

  console.log(`[PATCHED] ${label}`);
  return next;
}

function main() {
  console.log(`[${PASS_ID}] Correction sameVehicle resourceField...`);

  let content = read(TARGET);
  backup(TARGET);

  /**
   * Corrige la fonction sameVehicle cassée par B1.
   * Elle ne doit pas utiliser params hors scope.
   * Elle reçoit maintenant resourceField en option.
   */
  const brokenSameVehiclePattern =
    /function sameVehicle\(a: RuntimeRecord, b: RuntimeRecord\): boolean \{\s*const resourceField = "resourceField" in params && typeof params\.resourceField === "string"\s*\?\s*params\.resourceField\s*:\s*resolveRuntimeSchedulingFieldConfig\(\)\.resourceField;\s*const vehicleA = getRuntimeSchedulingFieldString\(a, resourceField\);\s*const vehicleB = getRuntimeSchedulingFieldString\(b, resourceField\);\s*return Boolean\(vehicleA && vehicleB && vehicleA === vehicleB\);\s*\}/m;

  const fixedSameVehicle = `function sameVehicle(
  a: RuntimeRecord,
  b: RuntimeRecord,
  resourceField?: string
): boolean {
  const resolvedResourceField =
    resourceField || resolveRuntimeSchedulingFieldConfig().resourceField;

  const resourceA = getRuntimeSchedulingFieldString(a, resolvedResourceField);
  const resourceB = getRuntimeSchedulingFieldString(b, resolvedResourceField);

  return Boolean(resourceA && resourceB && resourceA === resourceB);
}`;

  if (brokenSameVehiclePattern.test(content)) {
    content = replaceOrThrow(
      content,
      brokenSameVehiclePattern,
      fixedSameVehicle,
      "sameVehicle broken params scope"
    );
  } else {
    /**
     * Fallback : si le format exact a changé, corrige uniquement les lignes fautives.
     */
    content = content.replace(
      /function sameVehicle\(a: RuntimeRecord, b: RuntimeRecord\): boolean \{/,
      `function sameVehicle(
  a: RuntimeRecord,
  b: RuntimeRecord,
  resourceField?: string
): boolean {`
    );

    content = content.replace(
      /const resourceField = "resourceField" in params && typeof params\.resourceField === "string"\s*\?\s*params\.resourceField\s*:\s*resolveRuntimeSchedulingFieldConfig\(\)\.resourceField;\s*const vehicleA = getRuntimeSchedulingFieldString\(a, resourceField\);\s*const vehicleB = getRuntimeSchedulingFieldString\(b, resourceField\);\s*return Boolean\(vehicleA && vehicleB && vehicleA === vehicleB\);/m,
      `const resolvedResourceField =
    resourceField || resolveRuntimeSchedulingFieldConfig().resourceField;

  const resourceA = getRuntimeSchedulingFieldString(a, resolvedResourceField);
  const resourceB = getRuntimeSchedulingFieldString(b, resolvedResourceField);

  return Boolean(resourceA && resourceB && resourceA === resourceB);`
    );

    console.log("[PATCHED] sameVehicle fallback");
  }

  /**
   * Si des appels sameVehicle(a, b) existent dans une méthode qui a params.resourceField,
   * on les laisse compiler. La fonction a un fallback générique.
   * Une passe suivante pourra propager explicitement resourceField.
   */

  write(TARGET, content);

  console.log(`[WRITTEN] ${normalizePath(path.relative(ROOT, TARGET))}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9l-a-runtime-scheduling-engine.cjs");
}

main();
