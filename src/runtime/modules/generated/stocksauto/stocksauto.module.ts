import type { ERPModule } from "@/runtime/modules/ERPModule";

export const stocksautoModule: ERPModule = {
  metadata: {
    key: "stocksauto",
    label: "Stocks",
    description: "Stocks pièces, produits et consommables AMARKHYS",
    icon: "warehouse",
    category: "amarkhys",

    features: {
      dashboard: true,
      analytics: true,
      workflows: true,
      automation: true,
      notifications: true,
      observability: true,
      audit: true,
      realtime: true,
    },
  },

  schema: {
    collection: "stocksauto",

    fields: [
      {
        key: "produitId",
        label: "Produit",
        type: "relation",
        relation: { module: "produitsauto" },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "quantite",
        label: "Quantité",
        type: "number",
        required: true,
        list: { order: 2 },
        grid: { cols: 3 },
      },
      {
        key: "seuilAlerte",
        label: "Seuil alerte",
        type: "number",
        grid: { cols: 3 },
      },
      {
        key: "emplacement",
        label: "Emplacement",
        type: "text",
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "typeStock",
        label: "Type stock",
        type: "select",
        options: [
          { label: "Atelier", value: "atelier" },
          { label: "Magasin", value: "magasin" },
          { label: "Dépôt", value: "depot" },
          { label: "Réserve", value: "reserve" },
        ],
        grid: { cols: 6 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "disponible",
        options: [
          { label: "Disponible", value: "disponible" },
          { label: "Stock faible", value: "stock_faible" },
          { label: "Rupture", value: "rupture" },
          { label: "Archivé", value: "archive" },
        ],
        list: { order: 3 },
        grid: { cols: 6 },
      },
      {
        key: "observations",
        label: "Observations",
        type: "textarea",
        grid: { cols: 12 },
      },
    ],
  },

  form: {
    layout: "tabs",

    tabs: [
      {
        key: "stock",
        label: "Stock",

        fields: [
          "produitId",
          "quantite",
          "seuilAlerte",
          "emplacement",
          "typeStock",
          "statut",
        ],

        sections: [
          {
            key: "infos",
            title: "Informations stock",
            fields: [
              "produitId",
              "quantite",
              "seuilAlerte",
              "emplacement",
              "typeStock",
              "statut",
            ],
          },
        ],
      },

      {
        key: "notes",
        label: "Notes",

        fields: [
          "observations",
        ],

        sections: [
          {
            key: "observations",
            title: "Observations",
            fields: [
              "observations",
            ],
          },
        ],
      },
    ],
  },

  workflows: [
    {
      key: "stock",
      label: "Cycle stock",
      initialState: "disponible",

      states: [
        { key: "disponible", label: "Disponible", color: "success" },
        { key: "stock_faible", label: "Stock faible", color: "warning" },
        { key: "rupture", label: "Rupture", color: "danger" },
        { key: "archive", label: "Archivé", color: "default" },
      ],

      transitions: [
        { from: "disponible", to: "stock_faible", action: "Déclarer stock faible" },
        { from: "stock_faible", to: "rupture", action: "Déclarer rupture" },
        { from: "rupture", to: "disponible", action: "Réapprovisionner" },
        { from: "disponible", to: "archive", action: "Archiver" },
      ],
    },
  ],
};