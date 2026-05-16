import type {
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

function renderRuntimeToast(
  notification: RuntimeNotificationInput
) {
  if (typeof window === "undefined") {
    return;
  }

  const containerId =
    "erp-runtime-notification-container";

  let container =
    document.getElementById(containerId);

  if (!container) {
    container =
      document.createElement("div");

    container.id = containerId;

    container.style.position = "fixed";
    container.style.top = "24px";
    container.style.right = "24px";
    container.style.zIndex = "9999";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.gap = "12px";
    container.style.maxWidth = "420px";
    container.style.pointerEvents = "none";

    document.body.appendChild(container);
  }

  const toast =
    document.createElement("div");

  const isSuccess =
    notification.tone === "success";

  const isError =
    notification.tone === "error";

  toast.style.pointerEvents = "auto";
  toast.style.borderRadius = "18px";
  toast.style.padding = "16px 18px";
  toast.style.boxShadow =
    "0 18px 50px rgba(15, 23, 42, 0.22)";
  toast.style.border =
    isSuccess
      ? "1px solid rgba(34, 197, 94, 0.35)"
      : isError
        ? "1px solid rgba(239, 68, 68, 0.35)"
        : "1px solid rgba(148, 163, 184, 0.35)";
  toast.style.background =
    isSuccess
      ? "linear-gradient(135deg, #ecfdf5, #ffffff)"
      : isError
        ? "linear-gradient(135deg, #fef2f2, #ffffff)"
        : "linear-gradient(135deg, #eff6ff, #ffffff)";
  toast.style.color = "#0f172a";
  toast.style.fontFamily =
    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";
  toast.style.transform = "translateX(16px)";
  toast.style.opacity = "0";
  toast.style.transition =
    "opacity 180ms ease, transform 180ms ease";

  const title =
    document.createElement("div");

  title.textContent =
    notification.title;

  title.style.fontSize = "14px";
  title.style.fontWeight = "900";
  title.style.marginBottom = "6px";

  const message =
    document.createElement("div");

  message.textContent =
    notification.message;

  message.style.fontSize = "13px";
  message.style.lineHeight = "1.5";
  message.style.color = "#334155";

  toast.appendChild(title);
  toast.appendChild(message);
  container.appendChild(toast);

  window.requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(0)";
  });

  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(16px)";

    window.setTimeout(() => {
      toast.remove();

      if (
        container &&
        container.children.length === 0
      ) {
        container.remove();
      }
    }, 220);
  }, 4200);
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

    renderRuntimeToast(payload);

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
        `${moduleLabel} : ${actionLabel} exécuté avec succès.`,
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
        `${moduleLabel} : ${actionLabel} n'a pas pu être exécuté. ${reason}`,
      moduleKey: module.metadata?.key,
      actionKey: action.key,
      recordId: resolveRecordId(record),
    });
  }
}
