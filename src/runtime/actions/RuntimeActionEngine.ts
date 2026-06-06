import type {
  ERPModule,
  ERPModuleAction,
  ERPModuleWorkflow,
  ERPActionVisibilityRule,
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

export type RuntimeActionResultSeverity =
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface RuntimeActionResult {
  success: boolean;
  title?: string;
  message?: string;
  severity?: RuntimeActionResultSeverity;
  action?: ERPModuleAction;
  record?: Record<string, unknown>;
  result?: unknown;
  errors?: unknown;
  effects?: string[];
  nextActions?: string[];
}

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

  static isEmptyActionValue(value: unknown): boolean {
    return (
      value === undefined ||
      value === null ||
      value === ""
    );
  }

  static normalizeActionValue(value: unknown): string | number | boolean | undefined {
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      return value;
    }

    if (value === undefined || value === null) {
      return undefined;
    }

    return String(value);
  }

  static matchesActionGovernanceRule(
    record: Record<string, unknown> | undefined,
    rule: ERPActionVisibilityRule
  ): boolean {
    if (!record) {
      return false;
    }

    const value = record[rule.field];
    const normalizedValue =
      RuntimeActionEngine.normalizeActionValue(value);

    if (rule.empty === true) {
      return RuntimeActionEngine.isEmptyActionValue(value);
    }

    if (rule.notEmpty === true) {
      return !RuntimeActionEngine.isEmptyActionValue(value);
    }

    if (
      rule.equals !== undefined &&
      normalizedValue !== rule.equals
    ) {
      return false;
    }

    if (
      rule.notEquals !== undefined &&
      normalizedValue === rule.notEquals
    ) {
      return false;
    }

    if (
      Array.isArray(rule.in) &&
      !rule.in.includes(normalizedValue as string | number | boolean)
    ) {
      return false;
    }

    if (
      Array.isArray(rule.notIn) &&
      rule.notIn.includes(normalizedValue as string | number | boolean)
    ) {
      return false;
    }

    return true;
  }

  static matchesAllActionGovernanceRules(
    record: Record<string, unknown> | undefined,
    rules?: ERPActionVisibilityRule[]
  ): boolean {
    if (!rules || rules.length === 0) {
      return true;
    }

    return rules.every((rule) =>
      RuntimeActionEngine.matchesActionGovernanceRule(record, rule)
    );
  }

  static matchesAnyActionGovernanceRule(
    record: Record<string, unknown> | undefined,
    rules?: ERPActionVisibilityRule[]
  ): boolean {
    if (!rules || rules.length === 0) {
      return false;
    }

    return rules.some((rule) =>
      RuntimeActionEngine.matchesActionGovernanceRule(record, rule)
    );
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

    return actions
      .filter((action) => {
        // Q20H5C_RUNTIME_ONLY_ACTIONS
        // Une action runtimeOnly est une action mÃ©tier contrÃ´lÃ©e
        // qui ne correspond pas forcÃ©ment Ã  une transition de statut.
        if (
          allowedActionKeys &&
          !allowedActionKeys.includes(action.key) &&
          !action.runtimeOnly
        ) {
          return false;
        }

        if (
          action.governance?.hiddenWhen &&
          RuntimeActionEngine.matchesAnyActionGovernanceRule(
            record,
            action.governance.hiddenWhen
          )
        ) {
          return false;
        }

        if (
          action.governance?.visibleWhen &&
          !RuntimeActionEngine.matchesAllActionGovernanceRules(
            record,
            action.governance.visibleWhen
          )
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
      })
      .map((action) => {
        if (
          action.governance?.disabledWhen &&
          RuntimeActionEngine.matchesAnyActionGovernanceRule(
            record,
            action.governance.disabledWhen
          )
        ) {
          return {
            ...action,
            disabled: true,
            description:
              action.governance.disabledReason ??
              "Cette action n'est pas disponible dans l'Ã©tat actuel.",
          };
        }

        return action;
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
    // Action mÃƒÆ’Ã‚Â©tier non-transitionnelle : retirer proprement une ligne
    // sans rÃƒÆ’Ã‚Â©introduire un statut utilisateur "annulÃƒÆ’Ã‚Â©e".
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
          reason: "Ligne retirÃƒÆ’Ã‚Â©e depuis l'action mÃƒÆ’Ã‚Â©tier.",
        });

      if (!result.removed) {
        return {
          success: false,
          message:
            result.reason === "line-linked-to-invoice"
              ? "Cette ligne est dÃƒÆ’Ã‚Â©jÃƒÆ’Ã‚Â  liÃƒÆ’Ã‚Â©e ÃƒÆ’Ã‚Â  une facture. Elle ne peut pas ÃƒÆ’Ã‚Âªtre retirÃƒÆ’Ã‚Â©e directement."
              : result.reason === "already-removed"
                ? "Cette ligne a dÃƒÆ’Ã‚Â©jÃƒÆ’Ã‚Â  ÃƒÆ’Ã‚Â©tÃƒÆ’Ã‚Â© retirÃƒÆ’Ã‚Â©e."
                : result.reason === "stock-not-found"
                  ? "Stock introuvable pour rÃƒÆ’Ã‚Â©intÃƒÆ’Ã‚Â©grer la quantitÃƒÆ’Ã‚Â©."
                  : result.reason === "missing-stock-product-or-quantity"
                    ? "Impossible de rÃƒÆ’Ã‚Â©intÃƒÆ’Ã‚Â©grer le stock : produit, stock ou quantitÃƒÆ’Ã‚Â© manquant."
                    : "Retrait de la ligne impossible.",
          result,
          action,
          record,
        };
      }

      return {
        success: true,
        message: "Ligne retirÃƒÆ’Ã‚Â©e avec succÃƒÆ’Ã‚Â¨s.",
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