import { RuntimeRecordMappingEngine } from "../mapping";
import {
  RuntimeBusinessRule,
}
from "@/runtime/business-rules/RuntimeBusinessRule";

import {
  RuntimeNotificationEngine,
}
from "@/runtime/notifications/RuntimeNotificationEngine";

import {
  RuntimeMetrics,
}
from "@/runtime/metrics/RuntimeMetrics";

import { RuntimeDataBinding }
from "@/runtime/data-binding";

import {
  coreERPModules
}
from "@/runtime/modules/definitions/coreModules";

import {
  RuntimeSchedulingEngine,
}
from "@/runtime/scheduling/RuntimeSchedulingEngine";




export const runtimeBusinessRules:
  RuntimeBusinessRule[] = [

  // =====================================================
  // STOCK FAIBLE
  // =====================================================

  {
    id:
      "stock-low-alert",

    module:
      "stocks",

    event:
      "stock.updated",

    condition:
      (payload) =>

        payload.quantite <=
          payload.seuilAlerte,

    action:
      async (payload) => {

        await RuntimeNotificationEngine
          .notify({

            type:
              "stock.low",

            module:
              "stocks",

            title:
              "Stock faible",

            message:
              `Le stock ${payload.produit} est faible.`,

            severity:
              "warning",
          });
      },
  },

  // =====================================================
  // MAINTENANCE CRITIQUE
  // =====================================================

  {
    id:
      "maintenance-critical",

    module:
      "maintenance",

    event:
      "maintenance.created",

    condition:
      (payload) =>

        payload.criticite ===
          "critical",

    action:
      async (payload) => {

        await RuntimeNotificationEngine
          .notify({

            type:
              "maintenance.critical",

            module:
              "maintenance",

            title:
              "Maintenance critique",

            message:
              `Maintenance critique sur ${payload.materiel}.`,

            severity:
              "critical",
          });
      },
  },
// =====================================================
// AMARKHYS - VIDANGE -> RAPPEL
// =====================================================

{

  id:
    "amarkhys-vidange-reminder",

  module:
    "interventionsauto",

  event:
    "interventionsauto.created",

  condition:
    (payload) =>

      payload.typeIntervention ===
        "vidange"

      &&

      payload.kilometrage,

  action:
    async (payload) => {

      const rappelsModule =
        coreERPModules.find(

          module =>

            module.metadata.key ===
              "rappelsauto"

        );

      if (
        !rappelsModule
      ) {

        return;
      }

      const prochainKm =

        Number(
          payload.kilometrage
        )

        +

        5000;

      await RuntimeDataBinding
        .create(

          rappelsModule,

          {

            clientId:
              payload.clientId,

            vehiculeId:
              payload.vehiculeId,

            typeRappel:
              "vidange",

            canal:
              "notification",

            statut:
              "planifie",

            dateRappel:
              new Date(

                Date.now()

                +

                1000
                *
                60
                *
                60
                *
                24
                *
                180

              ),

            message:

              `Vidange prévue vers ${prochainKm} km`

          }

        );
	RuntimeMetrics.sum(
  "amarkhys.revenue.predicted",

  Number(
    payload.coutTotal ?? 0
  ),

  {
    workspace:
      "amarkhys",

    moduleKey:
      "facturesauto",

    tenantId:
      payload.tenantId,
  }
);
      await RuntimeNotificationEngine
        .notify({

          type:
            "amarkhys.vidange",

          module:
            "interventionsauto",

          title:
            "Rappel vidange créé",

          message:

            `Rappel automatique créé pour ${prochainKm} km`,

          severity:
            "info"

        });

    }

},

// =====================================================
// AMARKHYS
// RDV CONFIRME -> INTERVENTION
// =====================================================
// AMARKHYS
// RDV CONFIRME -> INTERVENTION
// =====================================================

// =====================================================
// AMARKHYS
// RDV CREE CONFIRME -> INTERVENTION
// =====================================================

{
  id:
    "amarkhys-rdv-create-intervention-on-create",

  module:
    "rendezvous",

  event:
    "rendezvous.created",

  condition:
    (payload) =>
      payload.statut ===
        "confirme",

  action:
    async (payload) => {
      const interventionsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "interventionsauto"
        );

      const rendezvousModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "rendezvous"
        );

      if (
        !interventionsModule ||
        !rendezvousModule
      ) {
        return;
      }

      const rendezvousRecord =
        payload.id
          ? await RuntimeDataBinding.detail(
              rendezvousModule,
              String(payload.id)
            )
          : payload;

      const effectiveRendezvous = {
        ...payload,
        ...(rendezvousRecord ?? {}),
        id:
          rendezvousRecord?.id ??
          payload.id,
      };

      const validation =
        RuntimeSchedulingEngine
          .assertRendezvousCanCreateIntervention(
            effectiveRendezvous
          );

      if (!validation.ok) {
        if (effectiveRendezvous.consumedByInterventionId) {
          return;
        }

        await RuntimeNotificationEngine
          .notify({
            type:
              "amarkhys.intervention.skipped",

            module:
              "interventionsauto",

            title:
              "Intervention non créée",

            message:
              validation.reason ??
              "Impossible de créer l'intervention depuis ce rendez-vous.",

            severity:
              "warning",
          });

        return;
      }

      const interventionPayload =
        buildInterventionFromRendezvousRecord(
            effectiveRendezvous
          );

      const createdIntervention =
        await RuntimeDataBinding
          .create(
            interventionsModule,
            {
              ...interventionPayload,

              tenantId:
                effectiveRendezvous.tenantId ??
                payload.tenantId,

              workspace:
                effectiveRendezvous.workspace ??
                payload.workspace ??
                "amarkhys",

              userId:
                effectiveRendezvous.userId ??
                payload.userId,
            }
          );

      const createdInterventionId =
        typeof createdIntervention === "object" &&
        createdIntervention !== null
          ? String(
              createdIntervention.id ?? ""
            )
          : "";

      if (
        createdInterventionId &&
        effectiveRendezvous.id
      ) {
        await RuntimeDataBinding
          .update(
            rendezvousModule,
            String(effectiveRendezvous.id),
            {
              consumedByInterventionId:
                createdInterventionId,

              consumedAt:
                new Date().toISOString(),
            }
          );
      }

      await RuntimeNotificationEngine
        .notify({
          type:
            "amarkhys.intervention",

          module:
            "interventionsauto",

          title:
            "Intervention créée",

          message:
            "Intervention créée depuis RDV confirmé",

          severity:
            "info"
        });
    }
},



{
  id:
    "amarkhys-rdv-create-intervention",

  module:
    "rendezvous",

  event:
    "rendezvous.updated",

  condition:
    (payload) =>
      payload.statut ===
        "confirme",

  action:
    async (payload) => {
      const interventionsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "interventionsauto"
        );

      const rendezvousModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "rendezvous"
        );

      if (
        !interventionsModule ||
        !rendezvousModule
      ) {
        return;
      }

      const rendezvousRecord =
        payload.id
          ? await RuntimeDataBinding.detail(
              rendezvousModule,
              String(payload.id)
            )
          : payload;

      const effectiveRendezvous = {
        ...payload,
        ...(rendezvousRecord ?? {}),
        id:
          rendezvousRecord?.id ??
          payload.id,
      };

      const validation =
        RuntimeSchedulingEngine
          .assertRendezvousCanCreateIntervention(
            effectiveRendezvous
          );

      if (!validation.ok) {
        if (effectiveRendezvous.consumedByInterventionId) {
          return;
        }

        await RuntimeNotificationEngine
          .notify({
            type:
              "amarkhys.intervention.skipped",

            module:
              "interventionsauto",

            title:
              "Intervention non créée",

            message:
              validation.reason ??
              "Impossible de créer l'intervention depuis ce rendez-vous.",

            severity:
              "warning",
          });

        return;
      }

      const interventionPayload =
        buildInterventionFromRendezvousRecord(
            effectiveRendezvous
          );

      const createdIntervention =
        await RuntimeDataBinding
          .create(
            interventionsModule,
            {
              ...interventionPayload,

              tenantId:
                effectiveRendezvous.tenantId ??
                payload.tenantId,

              workspace:
                effectiveRendezvous.workspace ??
                payload.workspace ??
                "amarkhys",

              userId:
                effectiveRendezvous.userId ??
                payload.userId,
            }
          );

      const createdInterventionId =
        typeof createdIntervention === "object" &&
        createdIntervention !== null
          ? String(
              createdIntervention.id ?? ""
            )
          : "";

      if (
        createdInterventionId &&
        effectiveRendezvous.id
      ) {
        await RuntimeDataBinding
          .update(
            rendezvousModule,
            String(effectiveRendezvous.id),
            {
              consumedByInterventionId:
                createdInterventionId,

              consumedAt:
                new Date().toISOString(),
            }
          );
      }

      await RuntimeNotificationEngine
        .notify({
          type:
            "amarkhys.intervention",

          module:
            "interventionsauto",

          title:
            "Intervention créée",

          message:
            "Intervention créée depuis RDV confirmé",

          severity:
            "info"
        });
    }
},

// =====================================================
// INTERVENTION TERMINEE
// -> FACTURE AUTO
// =====================================================

{

  id:
    "amarkhys-intervention-create-facture",

  module:
    "interventionsauto",

  event:
    "interventionsauto.updated",

  condition:
    (payload) =>

      payload.statut ===
        "terminee",

  action:
    async (payload) => {

      const facturesModule =

        coreERPModules.find(

          module =>

            module.metadata.key ===
              "facturesauto"

        );

      if (
        !facturesModule
      ) {

        return;
      }

      const interventionsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "interventionsauto"
        );

      const interventionId =
        String(
          payload.id ??
          payload._id ??
          ""
        );

      const persistedIntervention =
        interventionsModule && interventionId
          ? await RuntimeDataBinding.detail(
              interventionsModule,
              interventionId
            )
          : null;

      const intervention = {
        ...(persistedIntervention ?? {}),
        ...payload,
      };

      const existingFactures =
        await RuntimeDataBinding.list(
          facturesModule
        );

      const alreadyCreated =
        existingFactures.some(
          facture =>
            String(facture.interventionId ?? "") ===
              interventionId &&
            String(facture.statutFacture ?? "") !==
              "annulee"
        );

      if (alreadyCreated) {
        return;
      }

      const asNumber =
        (value: unknown): number => {
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
        };

      const roundMoney =
        (value: number): number =>
          Math.round(value * 100) / 100;

      const montantHT =
        roundMoney(
          asNumber(intervention.montantHT) ||
          asNumber(intervention.coutTotal)
        );

      const montantTVA =
        roundMoney(
          asNumber(intervention.montantTVA)
        );

      const tauxTVA =
        montantHT > 0 && montantTVA > 0
          ? roundMoney((montantTVA / montantHT) * 100)
          : 18;

      const resolveDateOnly =
        (value: unknown): string => {
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
        };

      const todayDate =
        new Date()
          .toISOString()
          .split("T")[0];

      const interventionDate =
        resolveDateOnly(
          intervention.dateIntervention ??
          intervention.dateRendezVous ??
          payload.dateIntervention ??
          payload.dateRendezVous
        );

      const resolveAutoInvoiceDate =
        (): string => {
          if (
            interventionDate &&
            interventionDate > todayDate
          ) {
            return interventionDate;
          }

          return todayDate;
        };

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

      await RuntimeDataBinding
        .create(

          facturesModule,

          {

            numeroFacture:
              `FAC-${Date.now()}`,

            dateFacture:
              resolveAutoInvoiceDate(),

            statutFacture:
              "emise",

            clientId:
              intervention.clientId,

            vehiculeId:
              intervention.vehiculeId,

            interventionId,

            montantHT,

            tva:
              tauxTVA,

            montantTTC,

            montantPaye:
              0,

            resteAPayer:
              montantTTC,

            statutPaiement:
              "en_attente"

          }

        );

RuntimeMetrics.increment(
  "amarkhys.interventions.completed",
  {
    workspace:
      "amarkhys",

    moduleKey:
      "interventionsauto",

    tenantId:
      payload.tenantId,
  }
);

      await RuntimeNotificationEngine
        .notify({

          type:
            "amarkhys.facture",

          module:
            "facturesauto",

          title:
            "Facture créée",

          message:
            "Facture générée depuis intervention terminée",

          severity:
            "info"

        });

    }

},

// =====================================================
// FACTURE PAYEE
// -> KPI CA REEL
// =====================================================

{

  id:
    "amarkhys-facture-paid-revenue",

  module:
    "facturesauto",

  event:
    "facturesauto.updated",

  condition:
    (payload) =>

      payload.statutPaiement ===
        "paye",

  action:
    async (payload) => {

      RuntimeMetrics.sum(

        "amarkhys.revenue.real",

        Number(
          payload.montantTTC ?? 0
        ),

        {

          workspace:
            "amarkhys",

          moduleKey:
            "facturesauto",

          tenantId:
            payload.tenantId,

          userId:
            payload.userId,

        }

      );


      RuntimeMetrics.increment(

        "amarkhys.factures.paid",

        {

          workspace:
            "amarkhys",

          moduleKey:
            "facturesauto",

          tenantId:
            payload.tenantId,

        }

      );


      await RuntimeNotificationEngine
        .notify({

          type:
            "amarkhys.revenue",

          module:
            "facturesauto",

          title:
            "CA mis Ã  jour",

          message:

            `Paiement reçu : ${payload.montantTTC}`,

          severity:
            "info",

        });

    }

},

// =====================================================
// AMARKHYS
// ENCAISSEMENT -> RECALCUL FACTURE
// =====================================================

{
  id:
    "amarkhys-encaissement-recompute-facture",

  module:
    "encaissementsauto",

  event:
    "encaissementsauto.created",

  condition:
    (payload) =>
      Boolean(
        payload.factureId
      ),

  action:
    async (payload) => {
      const facturesModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "facturesauto"
        );

      const encaissementsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "encaissementsauto"
        );

      const interventionsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "interventionsauto"
        );

      if (
        !facturesModule ||
        !encaissementsModule
      ) {
        return;
      }

      const facture =
        await RuntimeDataBinding.detail(
          facturesModule,
          String(payload.factureId)
        );

      if (!facture) {
        return;
      }

      const asRuntimeNumber =
        (value: unknown): number => {
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
        };

      const roundMoney =
        (value: number): number =>
          Math.round(value * 100) / 100;

      const linkedIntervention =
        interventionsModule &&
        facture.interventionId
          ? await RuntimeDataBinding.detail(
              interventionsModule,
              String(facture.interventionId)
            )
          : null;

      const invoiceMontantHT =
        asRuntimeNumber(facture.montantHT);

      const invoiceMontantTVA =
        asRuntimeNumber(facture.montantTVA);

      const invoiceMontantTTC =
        asRuntimeNumber(
          facture.montantTTC ??
          facture.totalTTC ??
          facture.montantTotal ??
          facture.total
        );

      const interventionMontantHT =
        asRuntimeNumber(
          linkedIntervention?.montantHT ??
          linkedIntervention?.coutTotal
        );

      const interventionMontantTVA =
        asRuntimeNumber(
          linkedIntervention?.montantTVA
        );

      const interventionMontantTTC =
        asRuntimeNumber(
          linkedIntervention?.montantTTC
        );

      const repairedMontantHT =
        roundMoney(
          invoiceMontantHT > 0
            ? invoiceMontantHT
            : interventionMontantHT
        );

      const repairedMontantTVA =
        roundMoney(
          invoiceMontantTVA > 0
            ? invoiceMontantTVA
            : interventionMontantTVA
        );

      const repairedMontantTTC =
        roundMoney(
          invoiceMontantTTC > 0
            ? invoiceMontantTTC
            : interventionMontantTTC > 0
              ? interventionMontantTTC
              : repairedMontantHT + repairedMontantTVA
        );

      const repairedTVARate =
        repairedMontantHT > 0 && repairedMontantTVA > 0
          ? roundMoney(
              repairedMontantTVA /
              repairedMontantHT *
              100
            )
          : asRuntimeNumber(facture.tva) || 18;

      const encaissements =
        await RuntimeDataBinding.list(
          encaissementsModule
        );

      const encaissementsValides =
        encaissements.filter(
          (encaissement: any) =>
            String(encaissement.factureId) ===
              String(payload.factureId) &&
            encaissement.statut ===
              "valide"
        );

      const montantPaye =
        encaissementsValides.reduce(
          (total: number, encaissement: any) =>
            total +
            Number(
              encaissement.montant ?? 0
            ),
          0
        );

      const montantTTC =
        repairedMontantTTC;

      const resteAPayer =
        Math.max(
          montantTTC - montantPaye,
          0
        );

      const statutPaiement =
        montantPaye <= 0
          ? "en_attente"
          : montantPaye < montantTTC
            ? "partiel"
            : "paye";

      await RuntimeDataBinding.update(
        facturesModule,
        String(payload.factureId),
        {
          montantHT:
            repairedMontantHT,

          montantTVA:
            repairedMontantTVA,

          tva:
            repairedTVARate,

          montantTTC:
            repairedMontantTTC,

          montantPaye,
          resteAPayer,
          statutPaiement,
          dernierEncaissementAt:
            new Date().toISOString(),
        },
        {
          systemMutation: true,
          mutationSource: "runtime:billing",
        }
      );

      await RuntimeNotificationEngine
        .notify({
          type:
            "amarkhys.facture.recomputed",

          module:
            "facturesauto",

          title:
            "Facture recalculée",

          message:
            `Paiement reçu : ${montantPaye}. Reste à payer : ${resteAPayer}.`,

          severity:
            "info",
        });
    }
},

// =====================================================
// AMARKHYS
// ENCAISSEMENT MIS A JOUR -> RECALCUL FACTURE
// =====================================================

{
  id:
    "amarkhys-encaissement-updated-recompute-facture",

  module:
    "encaissementsauto",

  event:
    "encaissementsauto.updated",

  condition:
    (payload) =>
      Boolean(
        payload.factureId
      ),

  action:
    async (payload) => {
      const facturesModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "facturesauto"
        );

      const encaissementsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "encaissementsauto"
        );

      const interventionsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "interventionsauto"
        );

      if (
        !facturesModule ||
        !encaissementsModule
      ) {
        return;
      }

      const facture =
        await RuntimeDataBinding.detail(
          facturesModule,
          String(payload.factureId)
        );

      if (!facture) {
        return;
      }

      const asRuntimeNumber =
        (value: unknown): number => {
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
        };

      const roundMoney =
        (value: number): number =>
          Math.round(value * 100) / 100;

      const linkedIntervention =
        interventionsModule &&
        facture.interventionId
          ? await RuntimeDataBinding.detail(
              interventionsModule,
              String(facture.interventionId)
            )
          : null;

      const invoiceMontantHT =
        asRuntimeNumber(facture.montantHT);

      const invoiceMontantTVA =
        asRuntimeNumber(facture.montantTVA);

      const invoiceMontantTTC =
        asRuntimeNumber(
          facture.montantTTC ??
          facture.totalTTC ??
          facture.montantTotal ??
          facture.total
        );

      const interventionMontantHT =
        asRuntimeNumber(
          linkedIntervention?.montantHT ??
          linkedIntervention?.coutTotal
        );

      const interventionMontantTVA =
        asRuntimeNumber(
          linkedIntervention?.montantTVA
        );

      const interventionMontantTTC =
        asRuntimeNumber(
          linkedIntervention?.montantTTC
        );

      const repairedMontantHT =
        roundMoney(
          invoiceMontantHT > 0
            ? invoiceMontantHT
            : interventionMontantHT
        );

      const repairedMontantTVA =
        roundMoney(
          invoiceMontantTVA > 0
            ? invoiceMontantTVA
            : interventionMontantTVA
        );

      const repairedMontantTTC =
        roundMoney(
          invoiceMontantTTC > 0
            ? invoiceMontantTTC
            : interventionMontantTTC > 0
              ? interventionMontantTTC
              : repairedMontantHT + repairedMontantTVA
        );

      const repairedTVARate =
        repairedMontantHT > 0 && repairedMontantTVA > 0
          ? roundMoney(
              repairedMontantTVA /
              repairedMontantHT *
              100
            )
          : asRuntimeNumber(facture.tva) || 18;

      const encaissements =
        await RuntimeDataBinding.list(
          encaissementsModule
        );

      const encaissementsValides =
        encaissements.filter(
          (encaissement: any) =>
            String(encaissement.factureId) ===
              String(payload.factureId) &&
            encaissement.statut ===
              "valide"
        );

      const montantPaye =
        encaissementsValides.reduce(
          (total: number, encaissement: any) =>
            total +
            Number(
              encaissement.montant ?? 0
            ),
          0
        );

      const montantTTC =
        repairedMontantTTC;

      const resteAPayer =
        Math.max(
          montantTTC - montantPaye,
          0
        );

      const statutPaiement =
        montantPaye <= 0
          ? "en_attente"
          : montantPaye < montantTTC
            ? "partiel"
            : "paye";

      await RuntimeDataBinding.update(
        facturesModule,
        String(payload.factureId),
        {
          montantHT:
            repairedMontantHT,

          montantTVA:
            repairedMontantTVA,

          tva:
            repairedTVARate,

          montantTTC:
            repairedMontantTTC,

          montantPaye,
          resteAPayer,
          statutPaiement,
          dernierEncaissementAt:
            new Date().toISOString(),
        },
        {
          systemMutation: true,
          mutationSource: "runtime:billing",
        }
      );

      await RuntimeNotificationEngine
        .notify({
          type:
            "amarkhys.facture.recomputed",

          module:
            "facturesauto",

          title:
            "Facture recalculée",

          message:
            `Encaissement mis à jour. Payé : ${montantPaye}. Reste : ${resteAPayer}.`,

          severity:
            "info",
        });
    }
},


// =====================================================
// AMARKHYS
// ECHEANCE EN RETARD -> RAPPEL FACTURE IMPAYEE
// =====================================================

{
  id:
    "amarkhys-echeance-overdue-reminder",

  module:
    "echeancespaiementauto",

  event:
    "echeancespaiementauto.created",

  condition:
    (payload) => {
      if (
        !payload.factureId ||
        !payload.dateEcheance
      ) {
        return false;
      }

      if (
        payload.statut === "payee" ||
        payload.statut === "annulee"
      ) {
        return false;
      }

      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const dateEcheance =
        new Date(
          String(payload.dateEcheance)
        );

      dateEcheance.setHours(
        0,
        0,
        0,
        0
      );

      return dateEcheance.getTime() <= today.getTime();
    },

  action:
    async (payload) => {
      const rappelsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "rappelsauto"
        );

      const echeancesModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "echeancespaiementauto"
        );

      if (
        !rappelsModule ||
        !echeancesModule
      ) {
        return;
      }

      const montantPrevu =
        Number(
          payload.montantPrevu ?? 0
        );

      const montantPaye =
        Number(
          payload.montantPaye ?? 0
        );

      const reste =
        Math.max(
          montantPrevu - montantPaye,
          0
        );

      await RuntimeDataBinding.create(
        rappelsModule,
        {
          clientId:
            payload.clientId,

          vehiculeId:
            payload.vehiculeId,

          typeRappel:
            "facture_impayee",

          dateRappel:
            new Date()
              .toISOString()
              .split("T")[0],

          canal:
            payload.canalRelance ??
            "whatsapp",

          statut:
            "planifie",

          message:
            `Échéance de paiement en retard. Facture : ${payload.factureId}. Reste attendu : ${reste} FCFA.`,
        }
      );

      if (payload.id) {
        await RuntimeDataBinding.update(
          echeancesModule,
          String(payload.id),
          {
            statut:
              "en_retard",

            dernierRappelAt:
              new Date()
                .toISOString()
                .split("T")[0],
          }
        );
      }

      await RuntimeNotificationEngine.notify({
        type:
          "amarkhys.echeance.overdue",

        module:
          "echeancespaiementauto",

        title:
          "Échéance en retard",

        message:
          `Une relance a été créée pour une échéance de ${reste} FCFA.`,

        severity:
          "warning",
      });
    }
},

// =====================================================
// AMARKHYS
// ECHEANCE MISE A JOUR -> RAPPEL SI RETARD
// =====================================================

{
  id:
    "amarkhys-echeance-updated-overdue-reminder",

  module:
    "echeancespaiementauto",

  event:
    "echeancespaiementauto.updated",

  condition:
    (payload) => {
      if (
        !payload.factureId ||
        !payload.dateEcheance
      ) {
        return false;
      }

      if (
        payload.statut === "payee" ||
        payload.statut === "annulee" ||
        payload.statut === "en_retard"
      ) {
        return false;
      }

      const today =
        new Date();

      today.setHours(
        0,
        0,
        0,
        0
      );

      const dateEcheance =
        new Date(
          String(payload.dateEcheance)
        );

      dateEcheance.setHours(
        0,
        0,
        0,
        0
      );

      return dateEcheance.getTime() <= today.getTime();
    },

  action:
    async (payload) => {
      const rappelsModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "rappelsauto"
        );

      const echeancesModule =
        coreERPModules.find(
          module =>
            module.metadata.key ===
              "echeancespaiementauto"
        );

      if (
        !rappelsModule ||
        !echeancesModule
      ) {
        return;
      }

      const montantPrevu =
        Number(
          payload.montantPrevu ?? 0
        );

      const montantPaye =
        Number(
          payload.montantPaye ?? 0
        );

      const reste =
        Math.max(
          montantPrevu - montantPaye,
          0
        );

      await RuntimeDataBinding.create(
        rappelsModule,
        {
          clientId:
            payload.clientId,

          vehiculeId:
            payload.vehiculeId,

          typeRappel:
            "facture_impayee",

          dateRappel:
            new Date()
              .toISOString()
              .split("T")[0],

          canal:
            payload.canalRelance ??
            "whatsapp",

          statut:
            "planifie",

          message:
            `Échéance de paiement en retard. Facture : ${payload.factureId}. Reste attendu : ${reste} FCFA.`,
        }
      );

      if (payload.id) {
        await RuntimeDataBinding.update(
          echeancesModule,
          String(payload.id),
          {
            statut:
              "en_retard",

            dernierRappelAt:
              new Date()
                .toISOString()
                .split("T")[0],
          }
        );
      }

      await RuntimeNotificationEngine.notify({
        type:
          "amarkhys.echeance.overdue",

        module:
          "echeancespaiementauto",

        title:
          "Échéance en retard",

        message:
          `Une relance a été créée pour une échéance de ${reste} FCFA.`,

        severity:
          "warning",
      });
    }
},

];


function buildInterventionFromRendezvousRecord(
  rendezvous: Record<string, unknown>
): Record<string, unknown> {
  return RuntimeRecordMappingEngine.mapRecord(rendezvous, {
    clientId: "clientId",
    vehiculeId: "vehiculeId",
    rendezVousId: "id",
    typeIntervention: {
      from: "typeService",
      fallback: "autre",
    },
    dateIntervention: "dateRendezVous",
    statut: {
      value: "planifiee",
    },
  });
}
