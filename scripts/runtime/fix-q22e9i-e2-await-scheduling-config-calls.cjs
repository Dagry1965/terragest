/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const guardPath = path.join(
  ROOT,
  "src",
  "runtime",
  "guards",
  "processRuntimeBeforeMutationGuards.ts"
);

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

if (!fs.existsSync(guardPath)) {
  fail("processRuntimeBeforeMutationGuards.ts introuvable");
}

let content = fs.readFileSync(guardPath, "utf8");

if (!content.includes("async function getSchedulingConfig")) {
  fail("getSchedulingConfig n'est pas async : état inattendu");
}

if (!content.includes("RuntimeSchedulingSettingsResolver.resolveForRuntimeGuard")) {
  fail("resolveForRuntimeGuard introuvable : Q22E-9I-E2 incomplet");
}

/**
 * Le bug actuel : ancien appel sync restant :
 * getSchedulingConfig(module)?.calendarExceptions
 *
 * On insère/réutilise une variable schedulingConfig avant assertWithinOpeningHours,
 * puis on l'utilise pour calendarExceptions.
 */
content = content.replace(
  /calendarExceptions:\s*getSchedulingConfig\(module\)\?\.calendarExceptions,/g,
  "calendarExceptions: schedulingConfig?.calendarExceptions,"
);

/**
 * Si schedulingConfig n'existe pas avant assertWithinOpeningHours, on l'ajoute.
 * Attention : plus bas dans la fonction, il peut déjà exister un autre const schedulingConfig.
 * On évite le doublon en remplaçant l'ancien bloc plus bas si nécessaire.
 */
if (
  content.includes("RuntimeSchedulingEngine.assertWithinOpeningHours") &&
  !/const\s+schedulingConfig\s*=\s*await\s+getSchedulingConfig\s*\(\s*module\s*,\s*context\s*\)\s*;[\s\S]{0,900}RuntimeSchedulingEngine\.assertWithinOpeningHours/.test(content)
) {
  content = content.replace(
    /(\s*)RuntimeSchedulingEngine\.assertWithinOpeningHours\s*\(\{/,
    `$1const schedulingConfig =
$1  await getSchedulingConfig(module, context);

$1RuntimeSchedulingEngine.assertWithinOpeningHours({`
  );

  ok("schedulingConfig async ajouté avant assertWithinOpeningHours()");
} else {
  ok("schedulingConfig async déjà présent avant assertWithinOpeningHours()");
}

/**
 * Supprime le doublon éventuel plus bas :
 * const schedulingConfig =
 *   await getSchedulingConfig(module, context);
 *
 * s'il apparaît une deuxième fois après normalizedRecord.
 */
const occurrences = [...content.matchAll(/const\s+schedulingConfig\s*=\s*\n\s*await\s+getSchedulingConfig\(module,\s*context\);/g)];

if (occurrences.length > 1) {
  let seen = 0;
  content = content.replace(
    /const\s+schedulingConfig\s*=\s*\n\s*await\s+getSchedulingConfig\(module,\s*context\);\s*/g,
    (match) => {
      seen += 1;
      return seen === 1 ? match : "";
    }
  );

  ok("Doublon schedulingConfig supprimé");
}

/**
 * Vérifications finales.
 */
if (content.includes("getSchedulingConfig(module)?.")) {
  fail("Il reste un appel sync getSchedulingConfig(module)?.");
}

if (content.includes("getSchedulingConfig(module);")) {
  fail("Il reste un appel getSchedulingConfig(module) sans context");
}

fs.writeFileSync(guardPath, content, "utf8");

ok("Tous les appels getSchedulingConfig utilisent maintenant await + context");
console.log("");
console.log("[Q22E9I_E2_AWAIT_FIX_DONE] Appels scheduling config corrigés.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");