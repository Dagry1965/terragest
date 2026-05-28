const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const workflowRel = "src/runtime/workflow-persistence/WorkflowRuntimeService.ts";
const workflowFile = path.join(ROOT, workflowRel);

if (!fs.existsSync(workflowFile)) {
  throw new Error("File not found: " + workflowFile);
}

const original = fs.readFileSync(workflowFile, "utf8");
let content = original;

const backup = workflowFile + ".bak-q1d-e1-fix-cascade-import";
fs.writeFileSync(backup, original, "utf8");

const importLine =
  'import { RuntimeWorkflowCascadeService } from "@/runtime/workflow-cascade";';

if (!content.includes(importLine)) {
  const importMatches = [...content.matchAll(/^import[\s\S]*?;\s*$/gm)];

  if (importMatches.length === 0) {
    throw new Error("Aucun import trouvé dans WorkflowRuntimeService.ts");
  }

  const lastImport = importMatches[importMatches.length - 1];
  const insertAt = lastImport.index + lastImport[0].length;

  content =
    content.slice(0, insertAt) +
    "\n" +
    importLine +
    content.slice(insertAt);
}

if (!content.includes("RuntimeWorkflowCascadeService.afterTransition")) {
  const persistMarker =
`    await WorkflowPersistenceEngine.persistTransition(
      sanitizeWorkflowPayload({
        module: module.metadata.key,
        entityId,
        fromState,
        toState,
        action: executedAction,
        user: user ?? "system",
        comment: comment ?? null,
      })
    );`;

  const index = content.indexOf(persistMarker);

  if (index < 0) {
    throw new Error("Bloc persistTransition exact introuvable dans WorkflowRuntimeService.ts");
  }

  const insertAt = index + persistMarker.length;

  content =
    content.slice(0, insertAt) +
`

    await RuntimeWorkflowCascadeService.afterTransition({
      module,
      entityId,
      record,
      fromState,
      toState,
      action: executedAction,
      user,
      comment,
    });` +
    content.slice(insertAt);
}

if (!content.includes(importLine)) {
  throw new Error("Import RuntimeWorkflowCascadeService non inséré.");
}

if (!content.includes("RuntimeWorkflowCascadeService.afterTransition")) {
  throw new Error("afterTransition non branché.");
}

fs.writeFileSync(workflowFile, content, "utf8");

console.log("[DONE] WorkflowRuntimeService branché sur RuntimeWorkflowCascadeService.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", workflowRel);
console.log("");
console.log("Next: pnpm build");
