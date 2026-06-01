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
        relation: {
    module: "produitsauto",
    filterBy: {
      sourceField: "typeArticle",
      targetField: "typeArticle",
    },
  },
        dependsOn: "typeArticle",
        autoFill: {
          map: {
            produitCode: ["code", "reference"],
            produitNom: ["nom", "designation"],
            designation: ["nom", "designation"],
            typeArticle: ["typeArticle"],
            typeLigne: ["typeArticle"],
            prixUnitaireHT: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
            prixUnitaire: ["prixVente", "prixUnitaireHT", "prixUnitaire", "prixPromo"],
            tauxTVA: ["tauxTVA"],
          },
          recalculate: true,
        },
        searchable: true,
  helperText: "Produit filtré selon le type d’article sélectionné.",
        list: { order: 2 },
        grid: { cols: 6 },
      },
      {
        key: "stockId",
        label: "Stock source",
        type: "relation",
        relation: {
    module: "stocksauto",
    filterBy: {
      sourceField: "produitId",
      targetField: "produitId",
    },
  },
        dependsOn: "produitId",
        searchable: true,
        grid: { cols: 6 },
        helperText: "Stock source filtré selon le produit sélectionné.",
      },
      {
        key: "produitCode",
        label: "Code produit",
        type: "text",
        list: { order: 3 },
        grid: { cols: 4 },
      },
      {
        key: "produitNom",
        label: "Nom produit",
        type: "text",
        searchable: true,
        list: { order: 4 },
        grid: { cols: 8 },
      },
      {
        key: "typeArticle",
        label: "Type article",
        type: "select",
        defaultValue: "piece",
        options: [
          { label: "Pièce", value: "piece" },
          { label: "Main d’œuvre", value: "main_oeuvre" },
          { label: "Service", value: "service" },
          { label: "Remise", value: "remise" },
        ],
        grid: { cols: 4 },
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
        key: "prixUnitaireHT",
        label: "Prix unitaire HT",
        type: "number",
        defaultValue: 0,
        grid: { cols: 4 },
      },
      {
        key: "tauxTVA",
        label: "TVA (%)",
        type: "number",
        defaultValue: 18,
        grid: { cols: 4 },
      },
      {
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "montantTVA",
        label: "Montant TVA",
        type: "number",
        grid: { cols: 4 },
      },
      {
        key: "montantTTC",
        label: "Montant TTC",
        type: "number",
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
        // Q20H3_SIMPLIFIED_LINE_STATUSES
        // Côté utilisateur, une ligne est seulement préparée ou confirmée.
        // Facturation/retrait sont gérés par relations/actions runtime, pas par statut manuel.
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Validée", value: "validee" },
        ],
        list: { order: 8 },
        grid: { cols: 4 },
      },
      {
        key: "stockMovementId",
        label: "Mouvement stock",
        type: "relation",
        relation: { module: "mouvementsstockauto" },
        searchable: true,
        grid: { cols: 4 },
      },
      {
        key: "removedAt",
        label: "Retirée le",
        type: "datetime",
        list: { visible: false },
        grid: { cols: 6 },
      },
      {
        key: "removedBy",
        label: "Retirée par",
        type: "text",
        list: { visible: false },
        grid: { cols: 6 },
      },
      {
        key: "removedReason",
        label: "Motif du retrait",
        type: "textarea",
        list: { visible: false },
        grid: { cols: 12 },
      },
      {
        key: "stockProcessedAt",
        label: "Stock traité le",
        type: "date",
        grid: { cols: 4 },
      },
      {
        key: "stockProcessedQuantity",
        label: "Quantité traitée en stock",
        type: "number",
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
          "produitCode",
          "produitNom",
          "typeArticle",
          "quantite",
          "prixUnitaire",
          "prixUnitaireHT",
          "tauxTVA",
          "montantHT",
          "montantTVA",
          "montantTTC",
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
              "produitCode",
              "produitNom",
              "typeArticle",
            ],
          },
          {
            key: "montants",
            title: "Quantité et montant",
            fields: [
              "quantite",
              "prixUnitaire",
              "prixUnitaireHT",
              "tauxTVA",
              "montantHT",
              "montantTVA",
              "montantTTC",
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



  composition: {
    contextBanner: {
      title: "Contexte ligne intervention",
      items: [
        {
          relationField: "interventionId",
          moduleKey: "interventionsauto",
          labelFields: [
            "typeIntervention",
            "dateIntervention",
            "statut",
          ],
          tone: "workshop",
        },
        {
          relationField: "produitId",
          moduleKey: "produitsauto",
          labelFields: [
            "reference",
            "nom",
            "categorie",
          ],
          tone: "product",
        },
        {
          relationField: "stockId",
          moduleKey: "stocksauto",
          labelFields: [
            "produitNom",
            "quantite",
            "seuilMinimum",
          ],
          tone: "stock",
        },
      ],
    },

    // Q15F_B_REQUIRED_PARENT_CONTEXT
    // Une ligne d'intervention doit toujours être créée dans le contexte d'une intervention parente.
    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "interventionsauto",
        foreignKey: "interventionId",
      },
    ],

    labelFields: [
      "designation",
      "typeLigne",
      "statut",
    ],

    breadcrumbs: [
      {
        field: "interventionId",
        moduleKey: "interventionsauto",
        labelFields: [
          "dateIntervention",
          "typeIntervention",
          "statut",
        ],
      },
    ],

    relations: [
      {
        field: "interventionId",
        moduleKey: "interventionsauto",
        labelFields: [
          "dateIntervention",
          "typeIntervention",
          "statut",
        ],
        snapshotFields: [
          "clientId",
          "vehiculeId",
          "rendezVousId",
          "dateIntervention",
          "typeIntervention",
        ],
        displayAs: "card",
        lockDerivedFields: true,
      },
      {
        field: "produitId",
        moduleKey: "produitsauto",
        labelFields: [
          "nom",
          "reference",
          "code",
        ],
        displayAs: "inline",
      },
      {
        field: "stockId",
        moduleKey: "stocksauto",
        labelFields: [
          "nom",
          "emplacement",
          "reference",
        ],
        displayAs: "inline",
      },
    ],

    lockedFields: [
      "interventionId",
      "produitCode",
      "produitNom",
      "typeArticle",
      "prixUnitaireHT",
      "tauxTVA",
      "montantHT",
      "montantTVA",
      "montantTTC",
      "montantTotal",
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
    ],

    readOnlyFields: [
      "produitCode",
      "produitNom",
      "typeArticle",
      "prixUnitaireHT",
      "tauxTVA",
      "montantHT",
      "montantTVA",
      "montantTTC",
      "montantTotal",
      "stockMovementId",
      "stockProcessedAt",
      "stockProcessedQuantity",
          "removedAt",
      "removedBy",
      "removedReason",
],
  },

  actions: [
    {
      key: "retirer-ligne",
      label: "Retirer la ligne",
      type: "danger",
      runtimeOnly: true,
      permission: "lignesinterventionauto:update",
    },
  ],

  workflows: [
    {
      key: "ligne-intervention",
      label: "Cycle ligne intervention",
      initialState: "brouillon",

      // Q20H3_SIMPLIFIED_LINE_WORKFLOW
      // Le workflow visible reste volontairement simple.
      // Les états de facturation, retrait ou neutralisation sont techniques.
      states: [
        { key: "brouillon", label: "Brouillon", color: "default" },
        { key: "validee", label: "Validée", color: "success" },
      ],

      transitions: [
        { from: "brouillon", to: "validee", action: "Valider" },
      ],
    },
  ],
};
