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
        list: { visible: true, order: 1 },
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
          // Q21D3C3A_EXCLUDE_USED_BY
          // Exclude order lines already used in an existing reception.
          excludeUsedBy: {
            module: "receptionsstockauto",
            field: "ligneCommandeId",
          },

          // Q21D3D_LINE_COMMAND_AUTOFILL_PRODUCT
          // The selected order line carries the product and ordered quantity.
          // RuntimeAutoFillEngine applies this generically from relation metadata.
          autoFill: {
            map: {
              produitId: ["produitId"],
              quantiteRecue: ["quantiteCommandee"],
            },
            recalculate: true,
          },
        },
        required: true,
        searchable: true,
        list: { visible: true, order: 2 },
        grid: { cols: 4 },
      },
{
        key: "produitId",
        label: "Produit",
        type: "relation",
        relation: { module: "produitsauto" },
        required: true,
        searchable: true,
        list: { visible: true, order: 3 },
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
        list: { visible: true, order: 4 },
        grid: { cols: 4 },
      },
{
        key: "quantiteRecue",
        label: "Quantite recue",
        type: "number",
        required: true,
        defaultValue: 1,
        list: { visible: true, order: 5 },
        grid: { cols: 4 },
      },
{
        key: "dateReception",
        label: "Date reception",
        type: "date",
        required: true,
        list: { visible: true, order: 6 },
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
        list: { visible: true, order: 7 },
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
        list: { visible: false },
        grid: { cols: 12 },
      }
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
    // Q21E_B_RECEPTION_RELATIONSHIP_COMPOSITION
    // Réception knows its parent command and generated stock movements.
    requiresParentContext: true,
    allowedParents: [
      {
        moduleKey: "commandesstockauto",
        foreignKey: "commandeId",
      },
    ],
    lockedFields: ["commandeId"],
    labelFields: ["ligneCommandeId", "produitId", "stockId", "quantiteRecue", "dateReception", "statut"],

    children: [
      {
        key: "mouvements-stock-reception",
        moduleKey: "mouvementsstockauto",
        foreignKey: "sourceId",
        title: "Mouvements stock générés",
        description: "Mouvements stock créés automatiquement depuis cette réception.",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: false,
        labelFields: ["typeMouvement", "produitId", "quantite", "stockId"],
        subtitleFields: ["dateMouvement", "sourceModule"],
        relations: [
          {
            field: "produitId",
            moduleKey: "produitsauto",
            labelFields: ["reference", "nom", "designation", "marque"],
          },
          {
            field: "stockId",
            moduleKey: "stocksauto",
            labelFields: ["produitId", "emplacement", "typeStock", "quantite", "statut"],
          },
        ],
      },
    ],
  },
};
