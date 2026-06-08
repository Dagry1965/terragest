const fs = require("fs");
const path = require("path");

const root = process.cwd();
const file = "src/runtime/actions/RuntimeActionEngine.ts";
const fullPath = path.join(root, file);

let content = fs.readFileSync(fullPath, "utf8");
const before = content;

if (content.includes("CLIENT_WORKFLOW_A2_GENERIC_ACTION_SET")) {
  console.log("[UNCHANGED] CLIENT_WORKFLOW_A2_GENERIC_ACTION_SET already present");
  process.exit(0);
}

const marker = `        return WorkflowRuntimeService
          .executeTransition({`;

const insert = `        // CLIENT_WORKFLOW_A2_GENERIC_ACTION_SET
        // Generic metadata-driven runtime action.
        // If an action declares set: { ... }, apply it to the current record
        // through RuntimeDataBinding instead of hardcoding module-specific logic.
        const actionSet =
          (action as unknown as { set?: Record<string, unknown> }).set;

        if (
          action.runtimeOnly &&
          actionSet &&
          record
        ) {
          const entityId =
            String(
              (record as Record<string, unknown>).id ??
              (record as Record<string, unknown>)._id ??
              ""
            );

          if (!entityId) {
            return {
              success: false,
              severity: "warning",
              title: "Action impossible",
              message: "Identifiant de l'enregistrement introuvable.",
              action,
              record,
            };
          }

          const updatePayload = {
            ...actionSet,
            updatedAt: new Date().toISOString(),
            updatedBy:
              String(
                (user as Record<string, unknown> | undefined)?.id ??
                (user as Record<string, unknown> | undefined)?.uid ??
                (user as Record<string, unknown> | undefined)?.email ??
                "runtime-action"
              ),
          };

          const updatedRecord =
            await RuntimeDataBinding.update(
              module,
              entityId,
              updatePayload
            );

          const feedback =
            (action as unknown as {
              feedback?: {
                successTitle?: string;
                successMessage?: string;
              };
            }).feedback;

          return {
            success: true,
            severity: "success",
            title:
              feedback?.successTitle ??
              "Action effectuée",
            message:
              feedback?.successMessage ??
              "L'action métier a été appliquée avec succès.",
            action,
            record:
              (updatedRecord as Record<string, unknown>) ??
              {
                ...record,
                ...updatePayload,
              },
            result: {
              type: "action-set",
              moduleKey:
                module?.metadata?.key,
              recordId:
                entityId,
              set:
                actionSet,
            },
          };
        }

`;

if (!content.includes(marker)) {
  throw new Error("[CLIENT-WORKFLOW-A2] Insertion marker not found");
}

content = content.replace(marker, insert + marker);

if (content !== before) {
  fs.writeFileSync(fullPath, content, "utf8");
  console.log("[UPDATED]", file);
} else {
  console.log("[UNCHANGED]", file);
}

console.log("[CLIENT-WORKFLOW-A2] Done");