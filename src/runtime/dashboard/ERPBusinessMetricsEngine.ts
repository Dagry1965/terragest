import type {
  ERPBusinessDashboardMetrics,
}
from "./ERPDashboardMetrics";

import {
  RuntimeDataBinding,
}
from "@/runtime/data-binding";

import {
  allERPModules,
}
from "@/runtime/modules/definitions/coreModules";

import type {
  ERPModule,
}
from "@/runtime/modules";


function getModule(
  moduleKey: string
): ERPModule | null {

  return (

    allERPModules.find(

      module =>

        module.metadata.key ===
          moduleKey

    ) ??

    null

  );

}


async function listModule(
  moduleKey: string
): Promise<any[]> {

  const module =
    getModule(
      moduleKey
    );

  if (!module) {

    return [];

  }

  return RuntimeDataBinding
    .list(
      module
    );

}


export class ERPBusinessMetricsEngine {

  static async load(

    workspace =
      "agri"

  ):

  Promise<
    ERPBusinessDashboardMetrics
  > {

    if (
      workspace ===
      "amarkhys"
    ) {

      const clients =
        await listModule(
          "clientsauto"
        );

      const vehicules =
        await listModule(
          "vehicules"
        );

      const rdv =
        await listModule(
          "rendezvous"
        );

      const interventions =
        await listModule(
          "interventionsauto"
        );

      const factures =
        await listModule(
          "facturesauto"
        );


      return {

        workspace:

          "amarkhys",


        metrics: [

          {

            key:
              "clients",

            label:
              "Clients",

            value:
              clients.length

          },

          {

            key:
              "vehicules",

            label:
              "Véhicules",

            value:
              vehicules.length

          },

          {

            key:
              "rdv",

            label:
              "RDV",

            value:
              rdv.length

          },

          {

            key:
              "interventions",

            label:
              "Interventions",

            value:
              interventions.length

          },

          {

            key:
              "factures",

            label:
              "Factures",

            value:
              factures.length

          }

        ]

      };

    }


    const terrains =
      await listModule(
        "terrains"
      );


    const exploitations =
      await listModule(
        "exploitations"
      );


    return {

      workspace:
        "agri",


      metrics: [

        {

          key:
            "terrains",

          label:
            "Terrains",

          value:
            terrains.length

        },

        {

          key:
            "exploitations",

          label:
            "Exploitations",

          value:
            exploitations.length

        }

      ]

    };

  }

}