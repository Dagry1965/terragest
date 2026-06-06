import type { ERPModule } from "@/runtime/modules/ERPModule";

export type RuntimeBillingSourceType =
  | "atelier"
  | "boutique"
  | "mixed"
  | "generic";

export interface RuntimeCreateInvoiceFromSourceParams {
  sourceModule: string;
  sourceRecordId: string;
  sourceType?: RuntimeBillingSourceType;
  user?: unknown;
}

export interface RuntimeCreateInvoiceFromInterventionParams {
  interventionId: string;
  user?: unknown;
}

export type RuntimeBillingServiceResultReason =
  | "missing-source"
  | "missing-module"
  | "source-not-found"
  | "source-not-ready"
  | "invoice-already-exists"
  | "no-billable-lines"
  | "created"
  | "not-implemented";

export interface RuntimeBillingServiceResult {
  success: boolean;
  reason: RuntimeBillingServiceResultReason;
  message: string;
  factureId?: string;
  facture?: Record<string, unknown>;
  source?: Record<string, unknown>;
  effects?: string[];
}

export class RuntimeBillingService {
  static async createInvoiceFromSource(
    params: RuntimeCreateInvoiceFromSourceParams
  ): Promise<RuntimeBillingServiceResult> {
    if (!params.sourceModule || !params.sourceRecordId) {
      return {
        success: false,
        reason: "missing-source",
        message: "Source de facturation introuvable.",
      };
    }

    if (params.sourceModule === "interventionsauto") {
      return RuntimeBillingService.createInvoiceFromIntervention({
        interventionId: params.sourceRecordId,
        user: params.user,
      });
    }

    return {
      success: false,
      reason: "not-implemented",
      message: "La creation de facture pour cette source n'est pas encore disponible.",
    };
  }

  static async createInvoiceFromIntervention(
    params: RuntimeCreateInvoiceFromInterventionParams
  ): Promise<RuntimeBillingServiceResult> {
    if (!params.interventionId) {
      return {
        success: false,
        reason: "missing-source",
        message: "Intervention introuvable.",
      };
    }

    return {
      success: false,
      reason: "not-implemented",
      message:
        "La creation de facture depuis intervention sera branchee dans une prochaine passe.",
      effects: [
        "Service de facturation central cree",
        "Aucune facture creee pendant cette passe",
        "Aucun statut intervention modifie",
      ],
    };
  }

  static resolveModule(
    modules: ERPModule[] | undefined,
    moduleKey: string
  ): ERPModule | undefined {
    return modules?.find((module) => module.metadata.key === moduleKey);
  }
}