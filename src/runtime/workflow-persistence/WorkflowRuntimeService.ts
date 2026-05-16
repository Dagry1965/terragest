import {
  WorkflowPersistenceEngine,
} from "@/runtime/workflow-persistence/WorkflowPersistenceEngine";

import {
  RuntimeWorkflowEngine,
} from "@/runtime/workflows/RuntimeWorkflowEngine";

import {
  RuntimeDataBinding,
} from "@/runtime/data-binding";

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
      {
        [stateField]: toState,
      }
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

    return {
      success: true,
      stateField,
      from: fromState,
      to: toState,
      action: executedAction,
    };
  }
}