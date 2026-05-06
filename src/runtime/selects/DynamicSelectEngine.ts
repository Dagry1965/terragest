import {
  DynamicSelectContext,
  DynamicSelectOption,
}
from "@/runtime/selects/DynamicSelect.types";

export class DynamicSelectEngine {

  static async getOptions(

    field: string,

    context:
      DynamicSelectContext

  ): Promise<
    DynamicSelectOption[]
  > {

    switch (field) {

      case "materiel":

        return this.getMateriels(
          context
        );

      case "terrain":

        return this.getTerrains(
          context
        );

      case "technicien":

        return this.getTechniciens(
          context
        );

      default:
        return [];
    }
  }

  static async getMateriels(
    context:
      DynamicSelectContext
  ) {

    const options:
      DynamicSelectOption[] = [

      {
        label:
          "Tracteur Démo",

        value:
          "tracteur-demo",

        metadata: {
          type:
            "tracteur",
        },
      },

      {
        label:
          "Moissonneuse ERP",

        value:
          "moissonneuse-erp",

        metadata: {
          type:
            "moissonneuse",
        },
      },
    ];

    return options;
  }

  static async getTerrains(
    context:
      DynamicSelectContext
  ) {

    return [

      {
        label:
          "Terrain Nord",

        value:
          "terrain-nord",
      },

      {
        label:
          "Terrain Sud",

        value:
          "terrain-sud",
      },
    ];
  }

  static async getTechniciens(
    context:
      DynamicSelectContext
  ) {

    const options:
      DynamicSelectOption[] = [

      {
        label:
          "Technicien Alpha",

        value:
          "tech-alpha",
      },

      {
        label:
          "Technicien Beta",

        value:
          "tech-beta",
      },
    ];

    if (
      context.criticite ===
      "critical"
    ) {

      return options.slice(0, 1);
    }

    return options;
  }
}
