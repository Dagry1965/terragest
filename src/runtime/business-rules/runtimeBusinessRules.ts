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
