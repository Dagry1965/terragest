import type {
  ERPModule,
}
from "@/runtime/modules";

export const terrainsModuleV2:
  ERPModule = {

  metadata: {

    key:
      "terrains",

    label:
      "Terrains",

    description:
      "Gestion fonciÃ¨re centrale ERP.",

    icon:
      "map",

    category:
      "Foncier",
    features: {

      dashboard:
        true,

      analytics:
        true,

      workflows:
        true,

      realtime:
        true,

      audit:
        true,
    },
  },

  schema: {

    collection:
      "terrains",

    fields: [

      {
        key:
          "code",

        label:
          "Code terrain",

        type:
          "text",

        required:
          true,
      },

      {
        key:
          "nom",

        label:
          "Nom",

        type:
          "text",

        required:
          true,
      },

      {
        key:
          "description",

        label:
          "Description",

        type:
          "textarea",
      },

      {
        key:
          "proprietaireId",

        label:
          "PropriÃ©taire",

        type:
          "relation",
        relation: {
          module:
            "utilisateurs",
        },
        required:
          true,
      },

      {
        key:
          "vocationTerrain",

        label:
          "Vocation",

        type:
          "select",

        required:
          true,

        options: [
          { label: "Agricole", value: "Agricole" },
          { label: "Habitation", value: "Habitation" },
          { label: "Commercial", value: "Commercial" },
          { label: "Mixte", value: "Mixte" },
        ],
      },

      {
        key:
          "surfaceTotale",

        label:
          "Surface totale",

        type:
          "number",

        required:
          true,
      },

      {
        key:
          "surfaceAgricole",

        label:
          "Surface agricole",

        type:
          "number",
      },

      {
        key:
          "surfaceHabitation",

        label:
          "Surface habitation",

        type:
          "number",
      },

      {
        key:
          "surfaceExploitee",

        label:
          "Surface exploitÃ©e",

        type:
          "number",
      },

      {
        key:
          "surfaceDisponible",

        label:
          "Surface disponible",

        type:
          "number",
      },

      {
        key:
          "adresse",

        label:
          "Adresse",

        type:
          "text",
      },

      {
        key:
          "commune",

        label:
          "Commune",

        type:
          "text",
      },

      {
        key:
          "region",

        label:
          "RÃ©gion",

        type:
          "text",
      },

      {
        key:
          "pays",

        label:
          "Pays",

        type:
          "text",
      },

      {
        key:
          "latitude",

        label:
          "Latitude",

        type:
          "number",
      },

      {
        key:
          "longitude",

        label:
          "Longitude",

        type:
          "number",
      },

      {
        key:
          "cadastre",

        label:
          "Cadastre",

        type:
          "text",
      },

      {
        key:
          "referenceFoncier",

        label:
          "RÃ©fÃ©rence fonciÃ¨re",

        type:
          "text",
      },

      {
        key:
          "statutTerrain",

        label:
          "Statut",

        type:
          "select",

        required:
          true,

        options: [
          { label: "Disponible", value: "Disponible" },
          { label: "Exploité", value: "Exploité" },
          { label: "Partiel", value: "Partiel" },
          { label: "Litige", value: "Litige" },
          { label: "Inactif", value: "Inactif" },
        ],
      },
    ],
  },
};