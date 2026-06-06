import type { ERPModule } from "@/runtime/modules/ERPModule";
import { RuntimeDataBinding } from "@/runtime/data-binding";
import { coreERPModules } from "@/runtime/modules/definitions/coreModules";
import { RuntimeMetrics } from "@/runtime/metrics/RuntimeMetrics";
import { RuntimeNotificationEngine } from "@/runtime/notifications/RuntimeNotificationEngine";

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

function asNumber(value: unknown): number {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  if (typeof value === "string") {
    const parsed =
      Number(
        value
          .replace(",", ".")
          .trim()
      );

    return Number.isFinite(parsed)
      ? parsed
      : 0;
  }

  return 0;
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}

function getRecordId(record: Record<string, unknown> | null | undefined): string {
  return String(
    record?.id ??
    record?._id ??
    record?.recordId ??
    record?.docId ??
    ""
  );
}

function resolveDateOnly(value: unknown): string {
  const raw =
    String(value ?? "").trim();

  const match =
    raw.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (match) {
    return match[1] + "-" + match[2] + "-" + match[3];
  }

  const parsed =
    new Date(raw);

  if (
    Number.isNaN(
      parsed.getTime()
    )
  ) {
    return "";
  }

  return parsed
    .toISOString()
    .split("T")[0];
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

    const facturesModule =
      RuntimeBillingService.resolveModule(
        coreERPModules,
        "facturesauto"
      );

    const interventionsModule =
      RuntimeBillingService.resolveModule(
        coreERPModules,
        "interventionsauto"
      );

    const lignesInterventionModule =
      RuntimeBillingService.resolveModule(
        coreERPModules,
        "lignesinterventionauto"
      );

    const lignesFactureModule =
      RuntimeBillingService.resolveModule(
        coreERPModules,
        "lignesfactureauto"
      );

    if (
      !facturesModule ||
      !interventionsModule ||
      !lignesInterventionModule ||
      !lignesFactureModule
    ) {
      return {
        success: false,
        reason: "missing-module",
        message: "Module de facturation incomplet.",
      };
    }

    const intervention =
      await RuntimeDataBinding.detail(
        interventionsModule,
        params.interventionId
      );

    if (!intervention) {
      return {
        success: false,
        reason: "source-not-found",
        message: "Intervention introuvable.",
      };
    }

    if (
      String(intervention.statut ?? "") !== "terminee"
    ) {
      return {
        success: false,
        reason: "source-not-ready",
        message: "L'intervention doit etre terminee avant creation de facture.",
        source: intervention,
      };
    }

    const existingFactures =
      await RuntimeDataBinding.list(
        facturesModule
      );

    const alreadyCreated =
      existingFactures.find(
        (facture) =>
          (
            String(facture.interventionId ?? "") === params.interventionId ||
            (
              String(facture.sourceModule ?? "") === "interventionsauto" &&
              String(facture.sourceRecordId ?? "") === params.interventionId
            )
          ) &&
          String(facture.statutFacture ?? "") !== "annulee"
      );

    if (alreadyCreated) {
      return {
        success: false,
        reason: "invoice-already-exists",
        message: "Une facture active existe deja pour cette intervention.",
        factureId: getRecordId(alreadyCreated),
        facture: alreadyCreated,
        source: intervention,
      };
    }

    const lignesIntervention =
      await RuntimeDataBinding.list(
        lignesInterventionModule
      );

    const lignesFacturables =
      lignesIntervention.filter(
        (ligne) => {
          const lineInterventionId =
            String(ligne.interventionId ?? "");

          const removedAt =
            String(ligne.removedAt ?? "").trim();

          const statutLigne =
            String(
              ligne.statutLigne ??
              ligne.statut ??
              ""
            );

          return (
            lineInterventionId === params.interventionId &&
            !removedAt &&
            statutLigne !== "annulee" &&
            statutLigne !== "retiree"
          );
        }
      );

    if (lignesFacturables.length === 0) {
      return {
        success: false,
        reason: "no-billable-lines",
        message: "Aucune ligne facturable trouvee pour cette intervention.",
        source: intervention,
      };
    }

    const montantHT =
      roundMoney(
        asNumber(intervention.montantHT) ||
        asNumber(intervention.coutTotal) ||
        lignesFacturables.reduce(
          (total, ligne) =>
            total +
            (
              asNumber(ligne.montantHT) ||
              asNumber(ligne.totalHT) ||
              asNumber(ligne.montant)
            ),
          0
        )
      );

    const montantTVA =
      roundMoney(
        asNumber(intervention.montantTVA)
      );

    const tauxTVA =
      montantHT > 0 && montantTVA > 0
        ? roundMoney((montantTVA / montantHT) * 100)
        : 18;

    const montantTTC =
      roundMoney(
        asNumber(intervention.montantTTC) ||
        (
          montantHT +
          (
            montantTVA > 0
              ? montantTVA
              : montantHT * tauxTVA / 100
          )
        )
      );

    const todayDate =
      new Date()
        .toISOString()
        .split("T")[0];

    const interventionDate =
      resolveDateOnly(
        intervention.dateIntervention ??
        intervention.dateRendezVous
      );

    const dateFacture =
      interventionDate && interventionDate > todayDate
        ? interventionDate
        : todayDate;

    const numeroFacture =
      `FAC-${Date.now()}`;

    const createdFacture =
      await RuntimeDataBinding.create(
        facturesModule,
        {
          numeroFacture,
          dateFacture,
          statutFacture: "emise",
          clientId: intervention.clientId,
          vehiculeId: intervention.vehiculeId,
          interventionId: params.interventionId,
          montantHT,
          tva: tauxTVA,
          montantTTC,
          montantPaye: 0,
          resteAPayer: montantTTC,
          statutPaiement: "en_attente",
          typeFacture: "atelier",
          sourceScope: "single",
          sourceType: "atelier",
          sourceModule: "interventionsauto",
          sourceRecordId: params.interventionId,
          sourceLabel: String(
            intervention.numeroIntervention ??
            intervention.code ??
            intervention.titre ??
            params.interventionId
          ),
        }
      );

    let factureIdForLines =
      getRecordId(createdFacture as Record<string, unknown>);

    if (!factureIdForLines) {
      const refreshedFactures =
        await RuntimeDataBinding.list(
          facturesModule
        );

      const createdFromList =
        refreshedFactures.find(
          (facture) =>
            String(facture.numeroFacture ?? "") === numeroFacture ||
            (
              String(facture.interventionId ?? "") === params.interventionId &&
              String(facture.statutFacture ?? "") !== "annulee"
            )
        );

      factureIdForLines =
        getRecordId(createdFromList);
    }

    for (const ligne of lignesFacturables) {
      const lineMontantHT =
        roundMoney(
          asNumber(ligne.montantHT) ||
          asNumber(ligne.totalHT) ||
          asNumber(ligne.montant)
        );

      const lineTauxTVA =
        asNumber(ligne.tauxTVA) ||
        asNumber(ligne.tva) ||
        tauxTVA;

      const lineMontantTVA =
        roundMoney(
          asNumber(ligne.montantTVA) ||
          (
            lineMontantHT > 0
              ? lineMontantHT * lineTauxTVA / 100
              : 0
          )
        );

      const lineMontantTTC =
        roundMoney(
          asNumber(ligne.montantTTC) ||
          asNumber(ligne.montantTotal) ||
          (
            lineMontantHT +
            lineMontantTVA
          )
        );

      await RuntimeDataBinding.create(
        lignesFactureModule,
        {
          factureId: factureIdForLines,
          parentModuleKey: "facturesauto",
          parentRecordId: factureIdForLines,
          parentForeignKey: "factureId",
          designation: String(
            ligne.designation ??
            ligne.produitNom ??
            ligne.libelle ??
            ligne.nom ??
            "Ligne intervention"
          ),
          description: String(
            ligne.description ??
            ligne.observations ??
            ""
          ),
          quantite: asNumber(ligne.quantite) || 1,
          prixUnitaireHT:
            asNumber(ligne.prixUnitaireHT) ||
            asNumber(ligne.prixUnitaire) ||
            lineMontantHT,
          montantHT: lineMontantHT,
          tauxTVA: lineTauxTVA,
          montantTVA: lineMontantTVA,
          montantTTC: lineMontantTTC,
          statutLigne: "validee",
          sourceType: "atelier",
          sourceModule: "lignesinterventionauto",
          sourceRecordId: params.interventionId,
          sourceLineId: String(
            ligne.id ??
            ligne._id ??
            ""
          ),
          clientId:
            intervention.clientId ??
            ligne.clientId,
          vehiculeId:
            intervention.vehiculeId ??
            ligne.vehiculeId,
          interventionId: params.interventionId,
          produitId: ligne.produitId,
          tenantId: intervention.tenantId,
          workspace:
            intervention.workspace ??
            "amarkhys",
        }
      );
    }

    RuntimeMetrics.increment(
      "amarkhys.interventions.invoice_created",
      {
        workspace:
          String(intervention.workspace ?? "amarkhys"),

        moduleKey:
          "interventionsauto",

        tenantId:
          intervention.tenantId
            ? String(intervention.tenantId)
            : undefined,
      }
    );

    await RuntimeNotificationEngine.notify({
      type: "amarkhys.facture",
      module: "facturesauto",
      title: "Facture creee",
      message: "Facture creee depuis intervention terminee",
      severity: "info",
    });

    return {
      success: true,
      reason: "created",
      message: "Facture creee depuis intervention terminee.",
      factureId: factureIdForLines,
      facture:
        createdFacture as Record<string, unknown>,
      source: intervention,
      effects: [
        "Facture atelier creee",
        `${lignesFacturables.length} ligne(s) facture creee(s)`,
        "Statut intervention conserve",
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