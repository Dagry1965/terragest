import {
  RuntimeBusinessRule,
}
from "@/runtime/business-rules/RuntimeBusinessRule";

import {
  RuntimeNotificationEngine,
}
from "@/runtime/notifications/RuntimeNotificationEngine";

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
];
