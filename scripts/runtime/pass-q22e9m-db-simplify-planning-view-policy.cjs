/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PASS_ID = "Q22E-9M-D-B";

const TARGET = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "scheduling",
  "ERPSchedulingPlanningView.tsx"
);

const BACKUP = `${TARGET}.bak-q22e9m-db-simplify-policy`;

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

function removeVisibleDurationHelper(content) {
  const helperIndex = content.indexOf("function getVisibleSchedulingDurationMinutes(");

  if (helperIndex === -1) {
    console.log("[SKIP] helper getVisibleSchedulingDurationMinutes absent");
    return content;
  }

  const nextFunctionIndex = content.indexOf("\nfunction ", helperIndex + 1);
  const nextConstIndex = content.indexOf("\nconst ", helperIndex + 1);

  const candidates = [nextFunctionIndex, nextConstIndex]
    .filter((index) => index !== -1)
    .sort((a, b) => a - b);

  const endIndex = candidates.length > 0 ? candidates[0] : content.length;

  const helperBlock = content.slice(helperIndex, endIndex);

  if (
    !helperBlock.includes("RuntimeSchedulingEngine.defaultDurationMinutes") &&
    !helperBlock.includes("durationMinutes")
  ) {
    throw new Error(
      `[${PASS_ID}] Sécurité: le bloc trouvé ne ressemble pas au helper de durée.`
    );
  }

  console.log("[REMOVED] getVisibleSchedulingDurationMinutes");

  return content.slice(0, helperIndex).replace(/\n\s*$/, "\n") + content.slice(endIndex).replace(/^\s*\n/, "\n");
}

function replaceDurationUsage(content) {
  let next = content;

  /**
   * La vue ne résout plus la durée. Elle utilise la valeur déjà portée par schedulingConfig
   * seulement comme information d'affichage temporaire.
   * Le fallback RuntimeSchedulingEngine est supprimé.
   */
  next = next.replace(
    /const durationMinutes =\s*getVisibleSchedulingDurationMinutes\(schedulingConfig\);/g,
    `const durationMinutes =
    Number(schedulingConfig.defaultDurationMinutes ?? schedulingConfig.durationMinutes ?? schedulingConfig.slotDurationMinutes ?? 0) || 0;`
  );

  next = next.replace(
    /const visibleDurationMinutes =\s*getVisibleSchedulingDurationMinutes\(schedulingConfig\);/g,
    `const visibleDurationMinutes =
    Number(schedulingConfig.defaultDurationMinutes ?? schedulingConfig.durationMinutes ?? schedulingConfig.slotDurationMinutes ?? 0) || undefined;`
  );

  /**
   * Si visibleDurationMinutes est transmis au runtime, on le laisse comme valeur optionnelle.
   * La policy/runtime décidera du fallback.
   */
  next = next.replace(
    /durationMinutes:\s*visibleDurationMinutes,/g,
    `durationMinutes: visibleDurationMinutes,`
  );

  return next;
}

function removeBufferPolicyFromViewCalls(content) {
  /**
   * La vue ne doit plus transmettre explicitement le buffer pour “étirer” les slots.
   * Le runtime/policy doit le résoudre. On supprime les lignes d’options directes.
   */
  let next = content;

  next = next.replace(
    /\s*bufferMinutes:\s*schedulingConfig\.bufferMinutes,\r?\n/g,
    "\n"
  );

  return next;
}

function removeEngineFallbackImportIfUnused(content) {
  /**
   * Si RuntimeSchedulingEngine n’est plus utilisé que pour defaultDurationMinutes,
   * le build signalera les imports inutiles selon config. On ne retire l’import que si
   * aucun usage RuntimeSchedulingEngine ne reste.
   */
  if (content.includes("RuntimeSchedulingEngine.")) {
    return content;
  }

  const before = content;

  content = content.replace(
    /import\s*\{\s*RuntimeSchedulingEngine\s*\}\s*from\s*["'][^"']+["'];\s*\r?\n/g,
    ""
  );

  if (content !== before) {
    console.log("[PATCHED] import RuntimeSchedulingEngine supprimé");
  }

  return content;
}

function main() {
  console.log(`[${PASS_ID}] Simplification policy dans ERPSchedulingPlanningView...`);

  let content = read(TARGET);
  backup(TARGET);

  content = replaceDurationUsage(content);
  content = removeBufferPolicyFromViewCalls(content);
  content = removeVisibleDurationHelper(content);
  content = removeEngineFallbackImportIfUnused(content);

  if (content.includes("getVisibleSchedulingDurationMinutes(")) {
    throw new Error(`[${PASS_ID}] getVisibleSchedulingDurationMinutes reste présent.`);
  }

  if (content.includes("RuntimeSchedulingEngine.defaultDurationMinutes")) {
    throw new Error(`[${PASS_ID}] RuntimeSchedulingEngine.defaultDurationMinutes reste présent.`);
  }

  write(TARGET, content);

  console.log(`[WRITTEN] ${rel(TARGET)}`);
  console.log("");
  console.log(`[${PASS_ID}] DONE`);
  console.log("");
  console.log("Next:");
  console.log("  pnpm build");
  console.log("  node .\\\\scripts\\\\runtime\\\\audit-q22e9m-d-planning-view-policy-leak.cjs");
}

main();