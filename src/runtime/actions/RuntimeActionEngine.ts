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
} from "@/runtime/workflows/RuntimeWorkflowEngine";

import {
  RuntimeValidationEngine,
} from "@/runtime/validation/RuntimeValidationEngine";

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
      // Q20H5C_RUNTIME_ONLY_ACTIONS
      // Une action runtimeOnly est une action métier contrôlée
      // qui ne correspond pas forcément à une transition de statut.
      if (
        allowedActionKeys &&
        !allowedActionKeys.includes(action.key) &&
        !action.runtimeOnly
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

    // Q20H5C_B2_REMOVE_LINE_ACTION
    // Action métier non-transitionnelle : retirer proprement une ligne
    // sans réintroduire un statut utilisateur "annulée".
    if (
      module?.metadata?.key === "lignesinterventionauto" &&
      action.key === "retirer-ligne" &&
      record
    ) {
      const { RuntimeLineRemovalService } =
        await import("@/runtime/line-items");

      const lineId =
        String(
          (record as any)?.id ??
          (record as any)?._id ??
          ""
        );

      if (!lineId) {
        return {
          success: false,
          message: "Ligne intervention introuvable.",
          action,
          record,
        };
      }

      const result =
        await RuntimeLineRemovalService.removeInterventionLine({
          lineId,
          reason: "Ligne retirée depuis l'action métier.",
        });

      if (!result.removed) {
        return {
          success: false,
          message:
            result.reason === "line-linked-to-invoice"
              ? "Cette ligne est déjà liée à une facture. Elle ne peut pas être retirée directement."
              : result.reason === "already-removed"
                ? "Cette ligne a déjà été retirée."
                : result.reason === "stock-not-found"
                  ? "Stock introuvable pour réintégrer la quantité."
                  : result.reason === "missing-stock-product-or-quantity"
                    ? "Impossible de réintégrer le stock : produit, stock ou quantité manquant."
                    : "Retrait de la ligne impossible.",
          result,
          action,
          record,
        };
      }

      return {
        success: true,
        message: "Ligne retirée avec succès.",
        result,
        action,
        record,
      };
    }

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

        const validation =
          RuntimeValidationEngine.validate(module, record);

        if (validation.length > 0) {
          return {
            success: false,
            message:
              "Veuillez renseigner les champs obligatoires avant de continuer.",
            errors: validation,
            action,
            record,
          };
        }

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