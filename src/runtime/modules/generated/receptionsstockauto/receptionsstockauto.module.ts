import type { ERPModule } from "@/runtime/modules/ERPModule";

export const receptionsstockautoModule: ERPModule = {
  metadata: {
    key: "receptionsstockauto",
    label: "Receptions stock",
    description: "Receptions fournisseurs et entrees stock AMARKHYS",
    icon: "inbox",
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
    collection: "receptionsstockauto",
    fields: [
      {
        key: "commandeId",
        label: "Commande",
        type: "relation",
        relation: { module: "commandesstockauto" },
        required: true,
        searchable: true,
        list: { order: 1 },
        grid: { cols: 4 },
      },
      {
        key: "ligneCommandeId",
        label: "Ligne commande",
        type: "relation",
        relation: {
          module: "lignescommandestockauto",
          filterBy: {
            sourceField: "commandeId",
            targetField: "commandeId",
            includeEmptyTarget: false,
          },
        },
        required: true,
        searchable: true,
        list: { order: 2 },
        grid: { cols: 4 },
      },
      {
        key: "produitId",
        label: "Produit",
        type: "relation",
        relation: { module: "produitsauto" },
        required: true,
        searchable: true,
        list: { order: 3 },
        grid: { cols: 4 },
      },
      {
        key: "stockId",
        label: "Stock destination",
        type: "relation",
        relation: {
          module: "stocksauto",
          filterBy: {
            sourceField: "produitId",
            targetField: "produitId",
            includeEmptyTarget: false,
          },
        },
        required: true,
        searchable: true,
        list: { order: 4 },
        grid: { cols: 4 },
      },
      {
        key: "quantiteRecue",
        label: "Quantite recue",
        type: "number",
        required: true,
        defaultValue: 1,
        list: { order: 5 },
        grid: { cols: 4 },
      },
      {
        key: "dateReception",
        label: "Date reception",
        type: "date",
        required: true,
        list: { order: 6 },
        grid: { cols: 4 },
      },
      {
        key: "mouvementStockId",
        label: "Mouvement stock",
        type: "relation",
        relation: { module: "mouvementsstockauto" },
        grid: { cols: 4 },
        list: { visible: false },
      },
      {
        key: "stockProcessedAt",
        label: "Date traitement stock",
        type: "date",
        grid: { cols: 4 },
        list: { visible: false },
      },
      {
        key: "stockProcessedQuantity",
        label: "Quantite traitee stock",
        type: "number",
        grid: { cols: 4 },
        list: { visible: false },
      },
      {
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "brouillon",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validee", value: "validee" },
        ],
        list: { order: 7 },
        grid: { cols: 4 },
        // Q21D_RECEPTION_STATUS_RULE
        // Statuts visibles volontairement limites :
        // brouillon = preparation sans impact stock
        // validee = entree stock traitee par runtime
        // annulation = future action controlee avec mouvement inverse
      },
      {
        key: "notes",
        label: "Notes",
        type: "textarea",
        grid: { cols: 12 },
      },
    ],
  },

  form: {
    layout: "tabs",
    tabs: [
      {
        key: "reception",
        label: "Reception",
        fields: [
          "commandeId",
          "ligneCommandeId",
          "produitId",
          "stockId",
          "quantiteRecue",
          "dateReception",
          "statut",
          "notes",
        ],
        sections: [
          {
            key: "general",
            title: "Reception stock",
            fields: [
              "commandeId",
              "ligneCommandeId",
              "produitId",
              "stockId",
              "quantiteRecue",
              "dateReception",
                  "statut",
              "notes",
            ],
          },
        ],
      },
    ],
  },

  composition: {
    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "commandesstockauto",
        foreignKey: "commandeId",
      },
    ],
    lockedFields: ["commandeId"],
    labelFields: ["produitId", "quantiteRecue", "dateReception", "statut"],
  },
};
