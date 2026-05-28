const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = path.join(
  ROOT,
  "src",
  "runtime",
  "workflow-persistence",
  "WorkflowRuntimeService.ts"
);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q1d-d1-workflow-cancellation-metadata";
fs.writeFileSync(backup, original, "utf8");

/**
 * Q1-D-D1
 * Enrichissement générique des transitions workflow d'annulation.
 * Pas spécifique RDV.
 */

if (!content.includes("function isCancellationState")) {
  const helper = `
function isCancellationState(value: unknown): boolean {
  const status = String(value ?? "").trim().toLowerCase();

  return (
    status === "annule" ||
    status === "annulee" ||
    status === "annulé" ||
    status === "annulée" ||
    status === "cancelled" ||
    status === "canceled"
  );
}

function resolveWorkflowActor(user: unknown): string {
  if (typeof user === "string" && user.trim()) {
    return user.trim();
  }

  if (user && typeof user === "object") {
    const source = user as Record<string, unknown>;

    return String(
      source.id ??
      source.uid ??
      source.email ??
      source.name ??
      "system"
    ).trim();
  }

  return "system";
}

function buildWorkflowTransitionPatch({
  stateField,
  toState,
  user,
  comment,
}: {
  stateField: string;
  toState: string;
  user?: unknown;
  comment?: unknown;
}): Record<string, unknown> {
  const patch: Record<string, unknown> = {
    [stateField]: toState,
  };

  if (isCancellationState(toState)) {
    const now = new Date().toISOString();

    patch.cancelledAt = now;
    patch.cancelledBy = resolveWorkflowActor(user);
    patch.cancelReason =
      typeof comment === "string" && comment.trim()
        ? comment.trim()
        : "Annulation via action workflow.";
  }

  return patch;
}

`;

  const marker = "export class WorkflowRuntimeService";
  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("Point insertion introuvable: export class WorkflowRuntimeService");
  }

  content = content.slice(0, index) + helper + content.slice(index);
}

content = content.replace(
  /await RuntimeDataBinding\.update\(\s*module,\s*entityId,\s*\{\s*\[stateField\]: toState,\s*\}\s*\);/,
  `await RuntimeDataBinding.update(
      module,
      entityId,
      buildWorkflowTransitionPatch({
        stateField,
        toState,
        user,
        comment,
      })
    );`
);

const problems = [];

if (!content.includes("function isCancellationState")) {
  problems.push("helper isCancellationState absent");
}

if (!content.includes("buildWorkflowTransitionPatch")) {
  problems.push("helper buildWorkflowTransitionPatch absent");
}

if (content.includes("[stateField]: toState,\n      }")) {
  problems.push("ancien update simple encore présent");
}

if (!content.includes("cancelledAt")) {
  problems.push("cancelledAt absent");
}

if (!content.includes("cancelledBy")) {
  problems.push("cancelledBy absent");
}

if (!content.includes("cancelReason")) {
  problems.push("cancelReason absent");
}

if (problems.length > 0) {
  console.log("[FAIL] Correction incomplète:");
  for (const problem of problems) {
    console.log(" - " + problem);
  }
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

if (content === original) {
  console.log("[INFO] Aucun changement applique. Correction peut-etre deja presente.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(0);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q1-D-D1 transitions d'annulation enrichies generiquement.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");
