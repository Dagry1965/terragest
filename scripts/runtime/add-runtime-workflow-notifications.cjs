const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const notificationDir = path.join(ROOT, "src/runtime/notifications");
const notificationFile = path.join(notificationDir, "RuntimeNotificationCenter.ts");
const formFile = path.join(ROOT, "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx");

if (!fs.existsSync(formFile)) {
  throw new Error(`File not found: ${formFile}`);
}

fs.mkdirSync(notificationDir, { recursive: true });

const notificationContent = `import type {
  ERPModule,
  ERPModuleAction,
} from "@/runtime/modules/ERPModule";

export type RuntimeNotificationTone =
  | "success"
  | "error"
  | "info"
  | "warning";

export interface RuntimeNotificationInput {
  tone: RuntimeNotificationTone;
  title: string;
  message: string;
  moduleKey?: string;
  actionKey?: string;
  recordId?: string;
  createdAt?: string;
}

function resolveRecordId(
  record?: Record<string, unknown> | null
): string | undefined {
  const id =
    record?.id ??
    record?._id ??
    record?.uid ??
    record?.key;

  return id === undefined || id === null
    ? undefined
    : String(id);
}

function resolveResultError(result?: unknown): string | undefined {
  if (!result) return undefined;

  if (result instanceof Error) return result.message;

  if (typeof result === "string") return result;

  if (
    typeof result === "object" &&
    result !== null &&
    "error" in result &&
    typeof result.error === "string"
  ) {
    return result.error;
  }

  if (
    typeof result === "object" &&
    result !== null &&
    "message" in result &&
    typeof result.message === "string"
  ) {
    return result.message;
  }

  return undefined;
}

export class RuntimeNotificationCenter {
  static notify(notification: RuntimeNotificationInput) {
    const payload = {
      ...notification,
      createdAt:
        notification.createdAt ??
        new Date().toISOString(),
    };

    console.log("ERP NOTIFICATION", payload);

    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("erp:notification", {
          detail: payload,
        })
      );
    }

    return payload;
  }

  static workflowSuccess({
    module,
    action,
    record,
  }: {
    module: ERPModule;
    action: ERPModuleAction;
    record?: Record<string, unknown> | null;
    result?: unknown;
  }) {
    const moduleLabel =
      module.metadata?.label ??
      module.metadata?.key ??
      "Module";

    const actionLabel =
      action.label ??
      action.key ??
      "Action workflow";

    return this.notify({
      tone: "success",
      title: "Workflow exécuté",
      message:
        \`\${moduleLabel} : \${actionLabel} exécuté avec succès.\`,
      moduleKey: module.metadata?.key,
      actionKey: action.key,
      recordId: resolveRecordId(record),
    });
  }

  static workflowError({
    module,
    action,
    record,
    result,
  }: {
    module: ERPModule;
    action: ERPModuleAction;
    record?: Record<string, unknown> | null;
    result?: unknown;
  }) {
    const moduleLabel =
      module.metadata?.label ??
      module.metadata?.key ??
      "Module";

    const actionLabel =
      action.label ??
      action.key ??
      "Action workflow";

    const reason =
      resolveResultError(result) ??
      "Action workflow impossible.";

    return this.notify({
      tone: "error",
      title: "Workflow bloqué",
      message:
        \`\${moduleLabel} : \${actionLabel} n'a pas pu être exécuté. \${reason}\`,
      moduleKey: module.metadata?.key,
      actionKey: action.key,
      recordId: resolveRecordId(record),
    });
  }
}
`;

fs.writeFileSync(notificationFile, notificationContent, "utf8");

let form = fs.readFileSync(formFile, "utf8");
const original = form;

if (!form.includes("@/runtime/notifications/RuntimeNotificationCenter")) {
  form = form.replace(
    `import { RuntimeActionEngine } from "@/runtime/actions/RuntimeActionEngine";`,
    `import { RuntimeActionEngine } from "@/runtime/actions/RuntimeActionEngine";
import {
  RuntimeNotificationCenter,
} from "@/runtime/notifications/RuntimeNotificationCenter";`
  );
}

form = form.replace(
  `          setErrors([
            {
              field: "workflow",
              message:
                workflowResult && "message" in workflowResult
                  ? String(workflowResult.message)
                  : workflowResult && "error" in workflowResult
                    ? String(workflowResult.error)
                    : "Action workflow impossible.",
            },
          ]);

          setSaving(false);
          return;`,
  `          RuntimeNotificationCenter.workflowError({
            module,
            action: workflowAction,
            record: savedRecord,
            result: workflowResult,
          });

          setErrors([
            {
              field: "workflow",
              message:
                workflowResult && "message" in workflowResult
                  ? String(workflowResult.message)
                  : workflowResult && "error" in workflowResult
                    ? String(workflowResult.error)
                    : "Action workflow impossible.",
            },
          ]);

          setSaving(false);
          return;`
);

form = form.replace(
  `        RuntimeNotificationCenter.workflowSuccess({`,
  `        RuntimeNotificationCenter.workflowSuccess({`
);

if (!form.includes("RuntimeNotificationCenter.workflowSuccess")) {
  form = form.replace(
    `        }
      }

      router.push(`,
    `        }

        RuntimeNotificationCenter.workflowSuccess({
          module,
          action: workflowAction,
          record: savedRecord,
          result: workflowResult,
        });
      }

      router.push(`
  );
}

if (form === original) {
  throw new Error("Aucune modification appliquée dans ERPEnterpriseForm.");
}

fs.writeFileSync(formFile, form, "utf8");

console.log("OK RuntimeNotificationCenter créé.");
console.log("OK notifications workflow branchées dans ERPEnterpriseForm.");
console.log("Fichiers modifiés :");
console.log("-", path.relative(ROOT, notificationFile));
console.log("-", path.relative(ROOT, formFile));