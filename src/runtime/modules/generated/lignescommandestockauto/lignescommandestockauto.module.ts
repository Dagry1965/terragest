import type { ERPModule } from "@/runtime/modules/ERPModule";

export const lignescommandestockautoModule: ERPModule = {
  metadata: {
    key: "lignescommandestockauto",
    label: "Lignes commande stock",
    description: "Details produits des commandes fournisseurs AMARKHYS",
    icon: "list",
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
    collection: "lignescommandestockauto",
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
        key: "produitId",
        label: "Produit",
        type: "relation",
        relation: { module: "produitsauto" },
        required: true,
        searchable: true,
        list: { order: 2 },
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
        searchable: true,
        list: { visible: false },
        grid: { cols: 4 },
      },
      {
        key: "designation",
        label: "Designation",
        type: "text",
        searchable: true,
        grid: { cols: 6 },
      },
      {
        key: "quantiteCommandee",
        label: "Quantite commandee",
        type: "number",
        required: true,
        defaultValue: 1,
        list: { order: 4 },
        grid: { cols: 3 },
      },
      {
        key: "quantiteRecue",
        label: "Quantite recue",
        type: "number",
        defaultValue: 0,
        list: { visible: false },
        grid: { cols: 3 },
      },
      {
        key: "prixUnitaireHT",
        label: "Prix unitaire HT",
        type: "number",
        defaultValue: 0,
        grid: { cols: 4 },
      },
      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        defaultValue: 0,
        list: { order: 6 },
        grid: { cols: 4 },
      },
      {
        key: "montantTTC",
        label: "Montant TTC",
        type: "number",
        defaultValue: 0,
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
   { label: "Validee", value: "validee" },
 ],
        list: { order: 7 },
        grid: { cols: 4 },
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
          "commandeId",
          "produitId",
                 "designation",
          "quantiteCommandee",
                 "prixUnitaireHT",
          "montantHT",
       "montantTTC",
          "statut",
        ],
        sections: [
          {
            key: "general",
            title: "Ligne de commande",
            fields: [
              "commandeId",
              "produitId",
                         "designation",
              "quantiteCommandee",
                         "prixUnitaireHT",
              "montantHT",
       "montantTTC",
              "statut",
            ],
          },
        ],
      },
    ],
  },

  composition: {
    // Q21D3A2_ORDER_LINE_COMPUTED_FIELDS
    // Metadata-driven computed fields.
    // The runtime engine calculates these values; the form must not recalculate locally.
    readOnlyFields: ["designation", "montantHT", "montantTTC"],

    computedFields: [
      {
        target: "montantHT",
        formula: "multiply",
        sources: ["quantiteCommandee", "prixUnitaireHT"],
        round: 2,
        defaultValue: 0,
      },
      {
        target: "montantTTC",
        formula: "add",
        sources: ["montantHT"],
        round: 2,
        defaultValue: 0,
      },
    ],
    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "commandesstockauto",
        foreignKey: "commandeId",
      },
    ],
    lockedFields: ["commandeId"],
    labelFields: ["produitId", "quantiteCommandee", "statut"],
  },
};
