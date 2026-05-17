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

              `Vidange prÃ©vue vers ${prochainKm} km`

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
            "Rappel vidange crÃ©Ã©",

          message:

            `Rappel automatique crÃ©Ã© pour ${prochainKm} km`,

          severity:
            "info"

        });

    }

},

// =====================================================
// AMARKHYS
// RDV CONFIRME -> INTERVENTION
// =====================================================

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

      const clientId =
        rendezvousRecord?.clientId ??
        payload.clientId ??
        null;

      const vehiculeId =
        rendezvousRecord?.vehiculeId ??
        payload.vehiculeId ??
        null;

      if (
        !clientId ||
        !vehiculeId
      ) {
        await RuntimeNotificationEngine
          .notify({
            type:
              "amarkhys.intervention.skipped",

            module:
              "interventionsauto",

            title:
              "Intervention non créée",

            message:
              "Impossible de créer l'intervention : client ou véhicule manquant sur le rendez-vous.",

            severity:
              "warning",
          });

        return;
      }

      await RuntimeDataBinding
        .create(
          interventionsModule,
          {
            clientId,

            vehiculeId,

            rendezVousId:
              payload.id,

            typeIntervention:
              rendezvousRecord?.typeService ??
              payload.typeService ??
              "autre",

            dateIntervention:
              rendezvousRecord?.dateRendezVous ??
              payload.dateRendezVous ??
              new Date(),

            statut:
              "ouverte"
          }
        );

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

      await RuntimeDataBinding
        .create(

          facturesModule,

          {

            numeroFacture:
              `FAC-${Date.now()}`,

            dateFacture:
              new Date()
                .toISOString()
                .split("T")[0],

            clientId:
              payload.clientId,

            vehiculeId:
              payload.vehiculeId,

            interventionId:
              payload.id,

            montantHT:
              payload.coutTotal ?? 0,

            tva:
              18,

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
            "Facture crÃ©Ã©e",

          message:
            "Facture gÃ©nÃ©rÃ©e depuis intervention terminÃ©e",

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

            `Paiement reÃ§u : ${payload.montantTTC}`,

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
        Number(
          facture.montantTTC ??
          facture.totalTTC ??
          facture.montantTotal ??
          facture.total ??
          0
        );

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
          montantPaye,
          resteAPayer,
          statutPaiement,
          dernierEncaissementAt:
            new Date().toISOString(),
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
        Number(
          facture.montantTTC ??
          facture.totalTTC ??
          facture.montantTotal ??
          facture.total ??
          0
        );

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
          montantPaye,
          resteAPayer,
          statutPaiement,
          dernierEncaissementAt:
            new Date().toISOString(),
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

];
