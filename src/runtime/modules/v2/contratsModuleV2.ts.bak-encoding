import type {
  ERPModule,
}
from "@/runtime/modules";

export const contratsModuleV2:
  ERPModule = {

  metadata: {

    key:
      "contrats",

    label:
      "Contrats",

    description:
      "Gestion contractuelle ERP.",

    icon:
      "file-text",

    category:
      "Juridique",

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
      "contrats",

    fields: [

      {
        key:
          "code",

        label:
          "Code contrat",

        type:
          "text",

        required:
          true,
      },

      {
        key:
          "nom",

        label:
          "Nom contrat",

        type:
          "text",

        required:
          true,
      },

      {
        key:
          "terrainId",

        label:
          "Terrain",

        type:
          "relation",

        relation: {
          module:
            "terrains",
        },

        required:
          true,
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
          "typeContrat",

        label:
          "Type contrat",

        type:
          "select",

        required:
          true,

        options: [

          {
            label:
              "Location",

            value:
              "Location",
          },

          {
            label:
              "Concession",

            value:
              "Concession",
          },

          {
            label:
              "Achat",

            value:
              "Achat",
          },

          {
            label:
              "Partenariat",

            value:
              "Partenariat",
          },
        ],
      },

      {
        key:
          "dateDebut",

        label:
          "Date dÃ©but",

        type:
          "date",

        required:
          true,
      },

      {
        key:
          "dateFin",

        label:
          "Date fin",

        type:
          "date",

        required:
          true,
      },

      {
        key:
          "montantContrat",

        label:
          "Montant contrat",

        type:
          "number",
      },

      {
        key:
          "statutContrat",

        label:
          "Statut contrat",

        type:
          "select",

        required:
          true,

        options: [

          {
            label:
              "Actif",

            value:
              "Actif",
          },

          {
            label:
              "Suspendu",

            value:
              "Suspendu",
          },

          {
            label:
              "ExpirÃ©",

            value:
              "ExpirÃ©",
          },

          {
            label:
              "RÃ©siliÃ©",

            value:
              "RÃ©siliÃ©",
          },
        ],
      },

      {
        key:
          "documentContrat",

        label:
          "Document contrat",

        type:
          "file",
      },

      {
        key:
          "description",

        label:
          "Description",

        type:
          "textarea",
      },
    ],
  },
};