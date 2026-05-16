import type { ERPModule } from "../../ERPModule";

export const terrainsModule: ERPModule = {
  metadata: {
    key: "terrains",
    label: "Terrains",
    description: "Gestion foncière des terrains.",
    icon: "map",
    category: "Métier",
    routes: {
      list: "/terrains",
      create: "/terrains/nouveau",
      details: "/terrains/[id]",
      edit: "/terrains/[id]/edit",
    },
  },

  schema: {
    collection: "terrains",

    fields: [
      {
        key: "code",
        label: "Code",
        type: "text",
        grid: { cols: 4 },
        list: {
          visible: true,
          order: 1,
        },
      },

      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
        grid: { cols: 4 },
        list: {
          visible: true,
          order: 2,
        },
      },

      {
        key: "vocationTerrain",
        label: "Vocation du terrain",
        type: "select",
        required: true,
        grid: { cols: 4 },
        options: [
          { label: "Habitation", value: "habitation" },
          { label: "Agricole", value: "agricole" },
          { label: "Mixte", value: "mixte" },
          { label: "Commercial", value: "commercial" },
        ],
        list: {
          visible: true,
          order: 3,
        },
      },

      {
        key: "surfaceTotale",
        label: "Surface totale (ha)",
        type: "number",
        required: true,
        grid: { cols: 4 },
        list: {
          visible: true,
          order: 4,
        },
      },

      {
        key: "surfaceDisponible",
        label: "Surface disponible (ha)",
        type: "number",
        grid: { cols: 4 },
        list: {
          visible: true,
          order: 5,
        },
      },

      {
        key: "statut",
        label: "Statut",
        type: "select",
        required: true,
        grid: { cols: 4 },
        options: [
          { label: "Actif", value: "actif" },
          { label: "Inactif", value: "inactif" },
          { label: "Suspendu", value: "suspendu" },
        ],
        list: {
          visible: true,
          order: 6,
        },
      },

      {
        key: "adresse",
        label: "Adresse",
        type: "text",
        required: true,
        grid: { cols: 4 },
        list: {
          visible: false,
          order: 7,
        },
      },

      {
        key: "commune",
        label: "Commune",
        type: "text",
        grid: { cols: 4 },
        list: {
          visible: false,
          order: 8,
        },
      },

      {
        key: "ville",
        label: "Ville",
        type: "text",
        required: true,
        grid: { cols: 4 },
        list: {
          visible: false,
          order: 9,
        },
      },

      {
        key: "latitude",
        label: "Latitude",
        type: "number",
        grid: { cols: 4 },
        list: {
          visible: false,
          order: 10,
        },
      },

      {
        key: "longitude",
        label: "Longitude",
        type: "number",
        grid: { cols: 4 },
        list: {
          visible: false,
          order: 11,
        },
      },

      {
        key: "pays",
        label: "Pays",
        type: "text",
        defaultValue: "Congo-Brazzaville",
        grid: { cols: 4 },
        list: {
          visible: false,
          order: 12,
        },
      },

      {
        key: "proprietaireId",
        label: "Propriétaire",
        type: "relation",
        required: true,
        relation: {
          module: "utilisateurs",
        },
        searchable: true,
        grid: { cols: 4 },
        list: {
          visible: false,
          order: 13,
        },
      },

      {
        key: "contratId",
        label: "Contrat",
        type: "relation",
        relation: { module: "contrats",

  create: {

    enabled:
      true,

    prefill: {

      typeContrat:
        "terrain",

    },

  },

},
        searchable: true,
        grid: { cols: 4 },
        list: {
          visible: false,
          order: 14,
        },
      },

      {
        key: "description",
        label: "Description",
        type: "textarea",
        grid: { cols: 12 },
        list: {
          visible: false,
          order: 15,
        },
      },
    ],
  },

  form: {
    layout: "tabs",

    tabs: [
      {
        key: "general",
        label: "Général",
        fields: [
          "nom",
          "vocationTerrain",
          "surfaceTotale",
          "surfaceDisponible",
          "statut",
        ],
        sections: [
          {
            key: "identite",
            title: "Identité",
            fields: [
              "nom",
              "vocationTerrain",
              "surfaceTotale",
              "surfaceDisponible",
              "statut",
            ],
          },
        ],
      },

      {
        key: "localisation",
        label: "Localisation",
        fields: [
          "adresse",
          "commune",
          "ville",
          "latitude",
          "longitude",
          "pays",
        ],
        sections: [
          {
            key: "adresse_section",
            title: "Adresse",
            fields: [
              "adresse",
              "commune",
              "ville",
              "latitude",
              "longitude",
              "pays",
            ],
          },
        ],
      },

      {
        key: "relations",
        label: "Relations",
        fields: [
          "proprietaireId",
          "contratId",
        ],
        sections: [
          {
            key: "relations_section",
            title: "Relations",
            fields: [
              "proprietaireId",
              "contratId",
            ],
          },
        ],
      },

      {
        key: "description",
        label: "Description",
        fields: [
          "description",
        ],
        sections: [
          {
            key: "description_section",
            title: "Description",
            fields: [
              "description",
            ],
          },
        ],
      },
    ],
  },
};