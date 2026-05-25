import type { ERPModule } from "@/runtime/modules/ERPModule";

export const commandesstockautoModule: ERPModule = {
  metadata: {
    key: "commandesstockauto",
    label: "Commandes stock",
    description: "Commandes fournisseurs pour pieces et consommables AMARKHYS",
    icon: "shopping-cart",
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
    collection: "commandesstockauto",
    fields: [
{
        key: "numeroCommande",
        label: "Numero commande",
        type: "text",
        searchable: true,
        list: { visible: true, order: 1 },
        grid: { cols: 4 },
      },
{
        key: "fournisseurId",
        label: "Fournisseur",
        type: "relation",
        relation: { module: "fournisseursauto" },
        required: true,
        searchable: true,
        list: { visible: true, order: 2 },
        grid: { cols: 4 },
      },
{
        key: "dateCommande",
        label: "Date commande",
        type: "date",
        required: true,
        list: { visible: true, order: 3 },
        grid: { cols: 4 },
      },
{
        key: "dateLivraisonPrevue",
        label: "Date livraison prevue",
        type: "date",
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "montantHT",
        label: "Montant HT",
        type: "number",
        defaultValue: 0,
        list: { visible: false },
        grid: { cols: 4 },
      },
{
        key: "montantTTC",
        label: "Montant TTC",
        type: "number",
        defaultValue: 0,
        list: { visible: true, order: 4 },
        grid: { cols: 4 },
      },
{
        key: "statut",
        label: "Statut",
        type: "select",
        defaultValue: "brouillon",
        options: [
          { label: "Brouillon", value: "brouillon" },
          { label: "Envoyee", value: "envoyee" },
          { label: "Partiellement recue", value: "partiellement_recue" },
          { label: "Recue", value: "recue" },
          { label: "Annulee", value: "annulee" },
        ],
        list: { visible: true, order: 5 },
        grid: { cols: 4 },
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
        key: "commande",
        label: "Commande",
        fields: [
          "numeroCommande",
          "fournisseurId",
          "dateCommande",
          "dateLivraisonPrevue",
          "montantHT",
          "montantTTC",
          "statut",
          "notes",
        ],
        sections: [
          {
            key: "general",
            title: "Commande fournisseur",
            fields: [
              "numeroCommande",
              "fournisseurId",
              "dateCommande",
              "dateLivraisonPrevue",
              "montantHT",
              "montantTTC",
              "statut",
              "notes",
            ],
          },
        ],
      },
    ],
  },

  composition: {
    // Q21E_B_STOCK_ORDER_RELATIONSHIP_COMPOSITION
    // Commande stock knows its lines and receptions.
    labelFields: ["numeroCommande", "fournisseurId", "statut"],

    children: [
      {
        key: "lignes-commandestock",
        moduleKey: "lignescommandestockauto",
        foreignKey: "commandeId",
        title: "Lignes de commande",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        labelFields: ["produitId", "quantiteCommandee", "prixUnitaireHT", "statut"],
        subtitleFields: ["designation", "montantHT", "montantTTC"],
        totalField: "montantTTC",
        relations: [
          {
            field: "produitId",
            moduleKey: "produitsauto",
            labelFields: ["reference", "nom", "designation", "marque"],
          },
        ],
      },
      {
        key: "receptions-stock",
        moduleKey: "receptionsstockauto",
        foreignKey: "commandeId",
        title: "Réceptions",
        displayIn: ["detail", "edit"],
        lazy: true,
        position: "after",
        allowCreate: true,
        labelFields: ["ligneCommandeId", "produitId", "quantiteRecue", "dateReception", "statut"],
        subtitleFields: ["stockId", "mouvementStockId"],
        relations: [
          {
            field: "ligneCommandeId",
            moduleKey: "lignescommandestockauto",
            labelFields: ["produitId", "quantiteCommandee", "statut"],
          },
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
          {
            field: "mouvementStockId",
            moduleKey: "mouvementsstockauto",
            labelFields: ["typeMouvement", "produitId", "quantite", "stockId"],
          },
        ],
      },
    ],
  },
};
