import type {
  ERPModule,
  ERPModuleAction,
  ERPModuleWorkflow,
}
from "@/runtime/modules/ERPModule";

import {
  WorkflowRuntimeService,
}
from "@/runtime/workflow-persistence/WorkflowRuntimeService";

import {
  RuntimeWorkflowEngine,
}
from "@/runtime/workflows/RuntimeWorkflowEngine";

export class RuntimeActionEngine {

  static resolveStateField(
    workflow: ERPModuleWorkflow,
    record?: Record<string, unknown>
  ): string {

    if (workflow.stateField) {
      return workflow.stateField;
    }

    if (record && "workflowState" in record) {
      return "workflowState";
    }

    if (record && "statut" in record) {
      return "statut";
    }

    return "status";
  }

  static getAvailableActions({
    actions = [],
    userPermissions = ["*"],
    workflow,
    record,
  }: {
    actions?: ERPModuleAction[];
    userPermissions?: string[];
    workflow?: ERPModuleWorkflow;
    record?: Record<string, unknown>;
  }): ERPModuleAction[] {

    let allowedActionKeys: string[] | null = null;

    if (workflow && record) {
      const stateField =
        RuntimeActionEngine.resolveStateField(
          workflow,
          record
        );

      const currentState =
        String(
          record[stateField] ??
          workflow.initialState ??
          ""
        );

      allowedActionKeys =
        RuntimeWorkflowEngine
          .getAvailableTransitions(
            workflow,
            currentState
          )
          .map((transition) => transition.action);
    }

    return actions.filter((action) => {
      if (
        allowedActionKeys &&
        !allowedActionKeys.includes(action.key)
      ) {
        return false;
      }

      if (!action.permission) {
        return true;
      }

      return (
        userPermissions.includes("*") ||
        userPermissions.includes(action.permission)
      );
    });
  }

  static async execute({

    module,

    action,

    record,

    user,

  }: {

    module?: ERPModule;

    action: ERPModuleAction;

    record?: Record<string, unknown>;

    user?: unknown;

  }) {

    const workflow =
      module?.workflows?.[0];

    console.log(
      "ERP ACTION EXECUTED",
      {
        module:
          module?.metadata?.key,

        action:
          action.key,

        record,
      }
    );

    if (
      workflow &&
      record
    ) {

      const entityId =
        String(
          (record as any)?.id ??
          (record as any)?.uid ??
          (record as any)?.key ??
          ""
        );

      if (entityId) {

        return WorkflowRuntimeService
          .executeTransition({

            module,

            workflow,

            entityId,

            record,

            action:
              action.key,

            user,
          });
      }
    }

    return {
      success: true,
      action,
      record,
    };
  }
}