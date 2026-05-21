const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const targetFile = path.join(
  ROOT,
  "src",
  "runtime",
  "firestore",
  "FirestoreRuntimeMutation.ts"
);

function read(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content.replace(/\r\n/g, "\n"), "utf8");
  console.log("[WRITTEN]", path.relative(ROOT, filePath));
}

function backup(filePath) {
  const backupPath = filePath + ".bak-q16b2-update-delete-totals-v2";

  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(filePath, backupPath);
    console.log("[BACKUP]", path.relative(ROOT, backupPath));
  }
}

function replaceOrThrow(content, pattern, replacement, label) {
  if (!pattern.test(content)) {
    throw new Error("[Q16B2_PATTERN_NOT_FOUND] " + label);
  }

  return content.replace(pattern, replacement);
}

backup(targetFile);

let content = read(targetFile);

/**
 * 1. Patch update()
 * Objectif :
 * - récupérer l'ancien record avant update si module = lignesinterventionauto
 * - fusionner ancien + nouveau pour que interventionId soit toujours disponible
 */
if (!content.includes("Q16B2_PREVIOUS_LINE_RECORD_BEFORE_UPDATE")) {
  content = replaceOrThrow(
    content,
    /static\s+async\s+update\s*\(\s*module:\s*ERPModule,\s*id:\s*string,\s*data:\s*Record<string,\s*unknown>\s*\)\s*\{\s*/,
    `static async update(
    module: ERPModule,
    id: string,
    data: Record<string, unknown>
  ) {
    // Q16B2_PREVIOUS_LINE_RECORD_BEFORE_UPDATE
    // Une update partielle peut ne pas contenir interventionId.
    // On récupère l'ancien record pour transmettre un record complet aux side-effects.
    const previousRecordForSideEffects =
      module.metadata.key === "lignesinterventionauto"
        ? await FirestoreRuntimeRepository.findById(
            module,
            id
          )
        : null;

`,
    "update method opening"
  );
}

if (!content.includes("Q16B2_MERGED_LINE_RECORD_FOR_SIDE_EFFECTS")) {
  content = replaceOrThrow(
    content,
    /const\s+updatedRecordForSideEffects\s*=\s*\{\s*([\s\S]*?)\s*id,\s*\};/,
    `const updatedRecordForSideEffects = {
      // Q16B2_MERGED_LINE_RECORD_FOR_SIDE_EFFECTS
      ...(previousRecordForSideEffects ?? {}),
      ...safeData,
      ...(typeof result === "object" && result !== null ? result : {}),
      id,
    };`,
    "updatedRecordForSideEffects merge"
  );
}

/**
 * 2. Patch delete()
 * Objectif :
 * - récupérer l'ancien record avant delete si module = lignesinterventionauto
 * - recalculer l'intervention parent après suppression
 */
if (!content.includes("Q16B2_PREVIOUS_LINE_RECORD_BEFORE_DELETE")) {
  content = replaceOrThrow(
    content,
    /static\s+async\s+delete\s*\(\s*module:\s*ERPModule,\s*id:\s*string\s*\)\s*\{\s*/,
    `static async delete(
    module: ERPModule,
    id: string
  ) {
    // Q16B2_PREVIOUS_LINE_RECORD_BEFORE_DELETE
    // Si une ligne est supprimée, on garde son interventionId pour recalculer le parent.
    const previousRecordForSideEffects =
      module.metadata.key === "lignesinterventionauto"
        ? await FirestoreRuntimeRepository.findById(
            module,
            id
          )
        : null;

`,
    "delete method opening"
  );
}

if (!content.includes("Q16B2_SYNC_TOTALS_AFTER_LINE_DELETE")) {
  content = replaceOrThrow(
    content,
    /await\s+runtimeEventBus\.emit\s*\(\s*`\$\{module\.metadata\.key\}\.deleted`,\s*\{\s*id,\s*result,\s*\}\s*\);\s*return\s+result;/,
    `await runtimeEventBus.emit(
      \`\${module.metadata.key}.deleted\`,
      {
        id,
        result,
      }
    );

    // Q16B2_SYNC_TOTALS_AFTER_LINE_DELETE
    if (previousRecordForSideEffects) {
      try {
        const { RuntimeInterventionTotalsService } =
          await import("@/runtime/interventions");

        const interventionId =
          String(previousRecordForSideEffects.interventionId ?? "").trim();

        if (interventionId) {
          await RuntimeInterventionTotalsService.syncInterventionTotals({
            interventionId,
          });
        }
      } catch (error) {
        console.error(
          "[RUNTIME_INTERVENTION_TOTALS_SYNC_AFTER_DELETE_ERROR]",
          error
        );
      }
    }

    return result;`,
    "delete emit and return"
  );
}

write(targetFile, content);

console.log("");
console.log("[Q16B2_DONE] Runtime totals sync patched for update/delete.");
console.log("");
console.log("Next:");
console.log("  pnpm build");