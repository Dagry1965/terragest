import type { ERPModule } from "@/runtime/modules/ERPModule";

export const lignesinterventionautoModule: ERPModule = {
  metadata: {
    key: "lignesinterventionauto",
    label: "Lignes intervention",
    description: "Pièces, services et main d’œuvre consommés sur une intervention AMARKHYS",
    icon: "list-checks",
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
    collection: "lignesinterventionauto",

    fields: [
      {
        key: "interventionId",
        label: "Intervention",
        type: "relation",
        relation: { module: "interventionsauto" },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 6 },
      },
      {
        key: "produitId",
        label: "Produit / pièce",
        type: "relation",
        relation: { module: "produitsauto" },
        searchable: true,
        list: { order: 2 },
        grid: { cols: 6 },
      },
      {
        key: "stockId",
        label: "Stock source",
        type: "relation",
        relation: { module: "stocksauto" },
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "designation",
        label: "Désignation",
        type: "text",
        required: true,
        searchable: true,
        list: { order: 3 },
        grid: { cols: 6 },
      },
      {
        key: "typeLigne",
        label: "Type ligne",
        type: "select",
        defaultValue: "piece",
        options: [
          { label: "Pièce", value: "piece" },
          { label: "Main d’œuvre", value: "main_oeuvre" },
          { label: "Service", value: "service" },
          { label: "Remise", value: "remise" },
        ],
        list: { order: 4 },
        grid: { cols: 4 },
      },
      {
        key: "quantite",
        label: "Quantité",
        type: "number",
        defaultValue: 1,
        required: true,
        list: { order: 5 },
        grid: { cols: 4 },
      },
      {
        key: "prixUnitaire",
        label: "Prix unitaire",
        type: "number",
        defaultValue: 0,
        required: true,
        list: { order: 6 },
        grid: { cols: 4 },
      },
      {
        key: "montantTotal",
        label: "Montant total",
        type: "number",
        computed: {
          formula: "quantite * prixUnitaire",
          dependsOn: ["quantite", "prixUnitaire"],
        },
        list: { order: 7 },
        grid: { cols: 4 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "brouillon",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validée", value: "validee" },
          { label: "Facturée", value: "facturee" },
          { label: "Annulée", value: "annulee" },
        ],
        list: { order: 8 },
        grid: { cols: 4 },
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
        key: "ligne",
        label: "Ligne",

        fields: [
          "interventionId",
          "designation",
          "typeLigne",
          "produitId",
          "stockId",
          "quantite",
          "prixUnitaire",
          "montantTotal",
          "statut",
        ],

        sections: [
          {
            key: "infos",
            title: "Informations ligne",
            fields: [
              "interventionId",
              "designation",
              "typeLigne",
              "statut",
            ],
          },
          {
            key: "relations",
            title: "Produit et stock",
            fields: [
              "produitId",
              "stockId",
            ],
          },
          {
            key: "montants",
            title: "Quantité et montant",
            fields: [
              "quantite",
              "prixUnitaire",
              "montantTotal",
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
      key: "ligne-intervention",
      label: "Cycle ligne intervention",
      initialState: "brouillon",

      states: [
        { key: "brouillon", label: "Brouillon", color: "default" },
        { key: "validee", label: "Validée", color: "success" },
        { key: "facturee", label: "Facturée", color: "info" },
        { key: "annulee", label: "Annulée", color: "danger" },
      ],

      transitions: [
        { from: "brouillon", to: "validee", action: "Valider" },
        { from: "validee", to: "facturee", action: "Marquer facturée" },
        { from: "brouillon", to: "annulee", action: "Annuler" },
        { from: "validee", to: "annulee", action: "Annuler" },
      ],
    },
  ],
};
