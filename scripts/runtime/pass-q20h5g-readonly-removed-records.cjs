const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function file(relPath) {
  return path.join(ROOT, relPath);
}

function read(relPath) {
  return fs.readFileSync(file(relPath), "utf8");
}

function write(relPath, content) {
  fs.writeFileSync(file(relPath), content, "utf8");
  console.log(`[WRITTEN] ${relPath}`);
}

function backup(relPath, suffix) {
  const source = file(relPath);
  const target = file(`${relPath}.bak-${suffix}`);
  if (!fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log(`[BACKUP] ${relPath}.bak-${suffix}`);
  } else {
    console.log(`[BACKUP EXISTS] ${relPath}.bak-${suffix}`);
  }
}

function replaceRequired(content, pattern, replacement, label) {
  const next = content.replace(pattern, replacement);
  if (next === content) {
    throw new Error(`[MISSING] ${label}`);
  }
  console.log(`[PATCHED] ${label}`);
  return next;
}

const suffix = "q20h5g-readonly-removed-records";

/**
 * ERPRuntimePage:
 * - détecte les records retirés via removedAt
 * - masque les actions runtime si record retiré
 * - transmet forceReadOnlyBecauseRemoved au formulaire
 */
{
  const rel = "src/components/erp/runtime/ERPRuntimePage.tsx";
  backup(rel, suffix);

  let content = read(rel);

  if (!content.includes("const isRemovedRecord = Boolean(record?.removedAt);")) {
    content = replaceRequired(
      content,
      /(\s*)const runtimeActions\s*=\s*([\s\S]*?)\n\s*:\s*\[\];/,
      `$1const isRemovedRecord = Boolean(record?.removedAt);

$1const runtimeActions =
$1  (type === "detail" || type === "edit") && !isRemovedRecord
$1    ? RuntimeActionEngine.getAvailableActions({
$1        actions: module?.actions ?? [],
$1        record,
$1        context,
$1      })
$1    : [];`,
      "ERPRuntimePage runtimeActions"
    );
  } else {
    console.log("[SKIP] ERPRuntimePage isRemovedRecord already present");
  }

  if (!content.includes("forceReadOnlyBecauseRemoved={isRemovedRecord}")) {
    content = replaceRequired(
      content,
      /workflowActions=\{runtimeActions\}/,
      `workflowActions={isRemovedRecord ? [] : runtimeActions}
            forceReadOnlyBecauseRemoved={isRemovedRecord}`,
      "ERPRuntimePage form props"
    );
  } else {
    console.log("[SKIP] ERPRuntimePage forceReadOnlyBecauseRemoved already present");
  }

  write(rel, content);
}

/**
 * ERPEnterpriseForm:
 * - ajoute prop forceReadOnlyBecauseRemoved
 * - force tous les champs en readOnly si removedAt
 * - affiche bandeau lecture seule
 * - masque les actions workflow
 * - neutralise submit
 */
{
  const rel = "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx";
  backup(rel, suffix);

  let content = read(rel);

  if (!content.includes("forceReadOnlyBecauseRemoved?: boolean;")) {
    content = replaceRequired(
      content,
      /(\s*)workflowActions\?: ERPModuleAction\[\];/,
      `$1workflowActions?: ERPModuleAction[];
$1forceReadOnlyBecauseRemoved?: boolean;`,
      "ERPEnterpriseForm prop interface"
    );
  } else {
    console.log("[SKIP] ERPEnterpriseForm prop already present");
  }

  if (!content.includes("forceReadOnlyBecauseRemoved = false,")) {
    content = replaceRequired(
      content,
      /(\s*)workflowActions = \[\],/,
      `$1workflowActions = [],
$1forceReadOnlyBecauseRemoved = false,`,
      "ERPEnterpriseForm prop default"
    );
  } else {
    console.log("[SKIP] ERPEnterpriseForm default already present");
  }

  if (!content.includes("const isRemovedRecord = forceReadOnlyBecauseRemoved || Boolean(initialData?.removedAt);")) {
    content = replaceRequired(
      content,
      /(\s*)const readOnlyFields\s*=\s*mode === "edit"/,
      `$1const isRemovedRecord = forceReadOnlyBecauseRemoved || Boolean(initialData?.removedAt);

$1const readOnlyFields =
$1  isRemovedRecord
$1    ? fields.map((field) => field.key)
$1    : mode === "edit"`,
      "ERPEnterpriseForm readOnlyFields"
    );
  } else {
    console.log("[SKIP] ERPEnterpriseForm isRemovedRecord already present");
  }

  if (!content.includes('event.preventDefault() : handleSubmit')) {
    content = replaceRequired(
      content,
      /<form onSubmit=\{handleSubmit\} className="space-y-8">/,
      `<form onSubmit={isRemovedRecord ? (event) => event.preventDefault() : handleSubmit} className="space-y-8">
        {isRemovedRecord ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 shadow-sm">
            <div className="text-sm font-black text-slate-900">
              Ligne retirée — lecture seule
            </div>
            <p className="mt-1 text-sm font-medium text-slate-600">
              Cette ligne a été retirée du flux actif. Elle est conservée pour l'audit et ne peut plus être modifiée depuis ce formulaire.
            </p>
          </div>
        ) : null}`,
      "ERPEnterpriseForm removed banner"
    );
  } else {
    console.log("[SKIP] ERPEnterpriseForm banner already present");
  }

  content = content.replace(
    /mode === "edit" &&\s*\n\s*workflowActions\.length > 0 && \(/,
    `mode === "edit" &&
        !isRemovedRecord &&
        workflowActions.length > 0 && (`
  );

  content = content.replaceAll(
    "disabled={saving}",
    "disabled={saving || isRemovedRecord}"
  );

  write(rel, content);
}

console.log("");
console.log("[Q20H5G_DONE] Removed records are now read-only in runtime forms.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
console.log("  Test direct URL of removed line");
console.log("  git status --short");