import type { ERPModule } from "@/runtime/modules/ERPModule";

export const produitsautoModule: ERPModule = {
  metadata: {
    key: "produitsauto",
    label: "Produits",
    description: "Produits, pièces et consommables AMARKHYS",
    icon: "package",
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
    collection: "produitsauto",

    fields: [
      {
        key: "reference",
        label: "Référence",
        type: "text",
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 4 },
      },
      {
        key: "nom",
        label: "Nom",
        type: "text",
        required: true,
        searchable: true,
        list: { order: 2 },
        grid: { cols: 4 },
      },
      {
        key: "marque",
        label: "Marque",
        type: "text",
        defaultValue: "PETRONAS",
        searchable: true,
        grid: { cols: 4 },
      },
      {
        key: "categorie",
        label: "Catégorie",
        type: "select",
        options: [
          { label: "Huile moteur", value: "huile_moteur" },
          { label: "Filtre", value: "filtre" },
          { label: "Liquide", value: "liquide" },
          { label: "Pièce", value: "piece" },
          { label: "Consommable", value: "consommable" },
          { label: "Service", value: "service" },
        ],
        grid: { cols: 6 },
      },
      {
        key: "typeProduit",
        label: "Type produit",
        type: "select",
        options: [
          { label: "Stockable", value: "stockable" },
          { label: "Non stockable", value: "non_stockable" },
        ],
        defaultValue: "stockable",
        grid: { cols: 6 },
      },
      {
        key: "unite",
        label: "Unité",
        type: "text",
        defaultValue: "unité",
        grid: { cols: 4 },
      },
      {
        key: "prixAchat",
        label: "Prix achat",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "prixVente",
        label: "Prix vente",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "seuilMinimum",
        label: "Seuil minimum",
        type: "number",
        grid: { cols: 6 },
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        grid: { cols: 12 },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "actif",
        options: [
          { label: "Actif", value: "actif" },
          { label: "Rupture", value: "rupture" },
          { label: "Inactif", value: "inactif" },
          { label: "Archivé", value: "archive" },
        ],
        list: { order: 3 },
        grid: { cols: 6 },
      },
    ],
  },

  form: {
    layout: "tabs",

    tabs: [
      {
        key: "identite",
        label: "Identité",

        fields: [
          "reference",
          "nom",
          "marque",
          "categorie",
          "typeProduit",
          "unite",
          "statut",
        ],

        sections: [
          {
            key: "infos",
            title: "Informations produit",
            fields: [
              "reference",
              "nom",
              "marque",
              "categorie",
              "typeProduit",
              "unite",
              "statut",
            ],
          },
        ],
      },

      {
        key: "prix",
        label: "Prix",

        fields: [
          "prixAchat",
          "prixVente",
          "seuilMinimum",
        ],

        sections: [
          {
            key: "tarifs",
            title: "Prix et seuils",
            fields: [
              "prixAchat",
              "prixVente",
              "seuilMinimum",
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
            key: "details",
            title: "Description",
            fields: [
              "description",
            ],
          },
        ],
      },
    ],
  },

  workflows: [
    {
      key: "produit",
      label: "Cycle produit",
      initialState: "actif",

      states: [
        { key: "actif", label: "Actif", color: "success" },
        { key: "rupture", label: "Rupture", color: "danger" },
        { key: "inactif", label: "Inactif", color: "default" },
        { key: "archive", label: "Archivé", color: "warning" },
      ],

      transitions: [
        { from: "actif", to: "rupture", action: "Déclarer rupture" },
        { from: "rupture", to: "actif", action: "Réapprovisionner" },
        { from: "actif", to: "inactif", action: "Désactiver" },
        { from: "inactif", to: "archive", action: "Archiver" },
      ],
    },
  ],
};