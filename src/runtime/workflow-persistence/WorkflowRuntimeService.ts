import {
  WorkflowPersistenceEngine,
} from "@/runtime/workflow-persistence/WorkflowPersistenceEngine";

import {
  RuntimeWorkflowEngine,
} from "@/runtime/workflows/RuntimeWorkflowEngine";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

import { RuntimeWorkflowCascadeService } from "@/runtime/workflow-cascade";
function sanitizeWorkflowPayload<T extends Record<string, unknown>>(
  payload: T
): T {
  const next: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(payload)) {
    if (value !== undefined) {
      next[key] = value;
    }
  }

  return next as T;
}


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

export class WorkflowRuntimeService {
  static resolveStateField(
    workflow: any,
    record: Record<string, any>
  ): string {
    if (workflow?.stateField) {
      return workflow.stateField;
    }

    if ("workflowState" in record) {
      return "workflowState";
    }

    if ("statut" in record) {
      return "statut";
    }

    return "status";
  }

  static async executeTransition({
    module,
    workflow,
    entityId,
    record,
    action,
    user,
    comment,
  }: any) {
    const stateField =
      WorkflowRuntimeService.resolveStateField(
        workflow,
        record ?? {}
      );

    const currentState =
      String(record?.[stateField] ?? workflow?.initialState ?? "");

    const result =
      RuntimeWorkflowEngine.executeTransition(
        workflow,
        currentState,
        action
      );

    if (!result.success || !result.from || !result.to || !result.action) {
      return {
        success: false,
        error: result.error ?? "Transition runtime invalide",
      };
    }

    const fromState: string = result.from;
    const toState: string = result.to;
    const executedAction: string = result.action;

    await RuntimeDataBinding.update(
      module,
      entityId,
      buildWorkflowTransitionPatch({
        stateField,
        toState,
        user,
        comment,
      })
    );

    await WorkflowPersistenceEngine.persistTransition(
      sanitizeWorkflowPayload({
        module: module.metadata.key,
        entityId,
        fromState,
        toState,
        action: executedAction,
        user: user ?? "system",
        comment: comment ?? null,
      })
    );

    await RuntimeWorkflowCascadeService.afterTransition({
      module,
      entityId,
      record,
      fromState,
      toState,
      action: executedAction,
      user,
      comment,
    });

    return {
      success: true,
      stateField,
      from: fromState,
      to: toState,
      action: executedAction,
    };
  }
}