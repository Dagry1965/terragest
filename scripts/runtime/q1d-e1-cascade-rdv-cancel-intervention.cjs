const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function write(rel, content) {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", rel);
}

function backup(rel, suffix) {
  const file = path.join(ROOT, rel);
  fs.writeFileSync(file + suffix, fs.readFileSync(file, "utf8"), "utf8");
  console.log("[BACKUP]", path.relative(ROOT, file + suffix));
}

write(
  "src/runtime/workflow-cascade/RuntimeWorkflowCascadeService.ts",
  `import type { ERPModule } from "@/runtime/modules/ERPModule";

import { RuntimeDataBinding } from "@/runtime/data-binding/RuntimeDataBinding";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";

type RuntimeWorkflowCascadeContext = {
  module: ERPModule;
  entityId: string;
  record?: Record<string, unknown>;
  fromState: string;
  toState: string;
  action: string;
  user?: unknown;
  comment?: unknown;
};

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

function getRecordId(record: Record<string, unknown>): string {
  return String(record.id ?? record._id ?? record.uid ?? "").trim();
}

function isInterventionAlreadyClosed(record: Record<string, unknown>): boolean {
  const statut = String(record.statut ?? "").trim().toLowerCase();

  return (
    statut === "annulee" ||
    statut === "annulée" ||
    statut === "facturee" ||
    statut === "facturée"
  );
}

export class RuntimeWorkflowCascadeService {
  static async afterTransition(
    context: RuntimeWorkflowCascadeContext
  ): Promise<void> {
    if (
      context.module.metadata.key !== "rendezvous" ||
      !isCancellationState(context.toState)
    ) {
      return;
    }

    await this.cancelLinkedInterventionsFromRendezvous(context);
  }

  private static async cancelLinkedInterventionsFromRendezvous(
    context: RuntimeWorkflowCascadeContext
  ): Promise<void> {
    const interventionsModule = coreERPModules.find(
      (module) => module.metadata.key === "interventionsauto"
    );

    if (!interventionsModule) {
      return;
    }

    const consumedByInterventionId = String(
      context.record?.consumedByInterventionId ?? ""
    ).trim();

    const allInterventions =
      await RuntimeDataBinding.list(interventionsModule);

    const linkedInterventions = allInterventions.filter((intervention) => {
      const interventionId = getRecordId(intervention);

      return (
        String(intervention.rendezVousId ?? "").trim() === context.entityId ||
        (consumedByInterventionId &&
          interventionId === consumedByInterventionId)
      );
    });

    if (linkedInterventions.length === 0) {
      return;
    }

    const now = new Date().toISOString();
    const actor = resolveWorkflowActor(context.user);
    const reason =
      typeof context.comment === "string" && context.comment.trim()
        ? context.comment.trim()
        : "Annulation en cascade depuis le rendez-vous.";

    for (const intervention of linkedInterventions) {
      const interventionId = getRecordId(intervention);

      if (!interventionId || isInterventionAlreadyClosed(intervention)) {
        continue;
      }

      await RuntimeDataBinding.update(
        interventionsModule,
        interventionId,
        {
          statut: "annulee",
          cancelledAt: now,
          cancelledBy: actor,
          cancelReason: reason,
          cancelledFromModule: "rendezvous",
          cancelledFromId: context.entityId,
        }
      );
    }
  }
}
`
);

write(
  "src/runtime/workflow-cascade/index.ts",
  `export { RuntimeWorkflowCascadeService } from "./RuntimeWorkflowCascadeService";
`
);

const workflowRel = "src/runtime/workflow-persistence/WorkflowRuntimeService.ts";
const workflowFile = path.join(ROOT, workflowRel);

if (!fs.existsSync(workflowFile)) {
  throw new Error("File not found: " + workflowFile);
}

backup(workflowRel, ".bak-q1d-e1-cascade-after-transition-v2");

let content = fs.readFileSync(workflowFile, "utf8");

const importLine =
  `import { RuntimeWorkflowCascadeService } from "@/runtime/workflow-cascade";`;

if (!content.includes(importLine)) {
  const importMarker =
    `from "@/runtime/data-binding/RuntimeDataBinding";`;

  const markerIndex = content.indexOf(importMarker);

  if (markerIndex < 0) {
    throw new Error("Import RuntimeDataBinding introuvable dans WorkflowRuntimeService.ts");
  }

  const lineEnd = content.indexOf("\n", markerIndex);

  content =
    content.slice(0, lineEnd + 1) +
    importLine +
    "\n" +
    content.slice(lineEnd + 1);
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
    throw new Error("Bloc persistTransition introuvable dans WorkflowRuntimeService.ts");
  }

  const insertAt = index + persistMarker.length;

  const cascadeCall = `

    await RuntimeWorkflowCascadeService.afterTransition({
      module,
      entityId,
      record,
      fromState,
      toState,
      action: executedAction,
      user,
      comment,
    });`;

  content =
    content.slice(0, insertAt) +
    cascadeCall +
    content.slice(insertAt);
}

const problems = [];

if (!content.includes(importLine)) {
  problems.push("import RuntimeWorkflowCascadeService absent");
}

if (!content.includes("RuntimeWorkflowCascadeService.afterTransition")) {
  problems.push("afterTransition non branché");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) {
    console.log(" - " + problem);
  }
  process.exit(1);
}

fs.writeFileSync(workflowFile, content, "utf8");

console.log("[DONE] Q1-D-E1 cascade RDV annule -> intervention annulee.");
console.log("");
console.log("Next:");
console.log("pnpm build");
