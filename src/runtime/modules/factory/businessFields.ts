export const clientFields = [
  { key: "code", label: "Code client", type: "text", required: true, searchable: true, sortable: true },
  { key: "nom", label: "Nom", type: "text", required: true, searchable: true, sortable: true },
  { key: "email", label: "Email", type: "email", searchable: true },
  { key: "telephone", label: "Téléphone", type: "text", searchable: true },
  { key: "adresse", label: "Adresse", type: "textarea" },
  { key: "typeClient", label: "Type client", type: "select", filterable: true, options: [
    { label: "Particulier", value: "particulier" },
    { label: "Entreprise", value: "entreprise" },
    { label: "Coopérative", value: "cooperative" },
  ] },
  { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
];

export const commandeFields = [
  { key: "numero", label: "Numéro commande", type: "text", required: true, searchable: true, sortable: true },
  { key: "clientId", label: "Client", type: "relation", relation: {
      module: "clients",
      collection: "clients",
      labelField: "nom",
    }, required: true, filterable: true },
  { key: "dateCommande", label: "Date commande", type: "date", required: true, sortable: true },
  { key: "montantTotal", label: "Montant total", type: "number", sortable: true },
  { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
];

export const factureFields = [
  { key: "numero", label: "Numéro facture", type: "text", required: true, searchable: true, sortable: true },
  { key: "clientId", label: "Client", type: "relation", relation: {
      module: "clients",
      collection: "clients",
      labelField: "nom",
    }, required: true, filterable: true },
  { key: "commandeId", label: "Commande", type: "relation", relation: {
      module: "commandes",
      collection: "commandes",
      labelField: "reference",
    } },
  { key: "dateFacture", label: "Date facture", type: "date", required: true, sortable: true },
  { key: "montantHT", label: "Montant HT", type: "number", sortable: true },
  { key: "montantTTC", label: "Montant TTC", type: "number", sortable: true },
  { key: "statut", label: "Statut", type: "status", required: true, filterable: true },

];

export const devisFields = [
  { key: "numero", label: "Numéro devis", type: "text", required: true, searchable: true, sortable: true },
  { key: "clientId", label: "Client", type: "relation", relation: {
      module: "clients",
      collection: "clients",
      labelField: "nom",
    }, required: true, filterable: true },
  { key: "dateDevis", label: "Date devis", type: "date", required: true, sortable: true },
  { key: "dateValidite", label: "Date validité", type: "date", sortable: true },
  { key: "montantTotal", label: "Montant total", type: "number", sortable: true },
  { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
];

export const depenseFields = [
  { key: "libelle", label: "Libellé", type: "text", required: true, searchable: true, sortable: true },
  { key: "categorie", label: "Catégorie", type: "select", filterable: true, options: [
    { label: "Achat", value: "achat" },
    { label: "Transport", value: "transport" },
    { label: "Maintenance", value: "maintenance" },
    { label: "Salaire", value: "salaire" },
    { label: "Autre", value: "autre" },
  ] },
  { key: "montant", label: "Montant", type: "number", required: true, sortable: true },
  { key: "dateDepense", label: "Date dépense", type: "date", required: true, sortable: true },
  { key: "statut", label: "Statut", type: "status", filterable: true },
];

export const recetteFields = [
  { key: "libelle", label: "Libellé", type: "text", required: true, searchable: true, sortable: true },
  { key: "source", label: "Source", type: "text", searchable: true },
  { key: "montant", label: "Montant", type: "number", required: true, sortable: true },
  { key: "dateRecette", label: "Date recette", type: "date", required: true, sortable: true },
  { key: "statut", label: "Statut", type: "status", filterable: true },
];

export const livraisonFields = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
];

export const achatFields = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
];

export const employeFields = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
];

export const vehiculeFields = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
];


export const produitFields = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
  {
    key: "categorie",
    label: "CatÃ©gorie",
    type: "select",
    required: true,
    options: [
      "Agricole",
      "Animal",
      "Piscicole",
      "Immobilier",
    ],
  },
  {
    key: "modeStock",
    label: "Mode de stock",
    type: "select",
    options: [
      "Stockable",
      "Non stockable",
    ],
  },
  {
    key: "prixAchat",
    label: "Prix achat",
    type: "number",
  },
  {
    key: "prixVente",
    label: "Prix vente",
    type: "number",
  },
];

export const stockFields = [
  {
    key: "produitId",
    label: "Produit",
    type: "relation",
    required: true,
    relation: {
      module: "produits",
      collection: "produits",
      labelField: "nom",
    },
  },
  {
    key: "quantite",
    label: "QuantitÃ©",
    type: "number",
    required: true,
  },
  {
    key: "unite",
    label: "UnitÃ©",
    type: "text",
  },
  {
    key: "seuilAlerte",
    label: "Seuil alerte",
    type: "number",
  },
];

export const mouvementFields = [
  {
    key: "stockId",
    label: "Stock",
    type: "relation",
    required: true,
    relation: {
      module: "stocks",
      collection: "stocks",
      labelField: "id",
    },
  },
  {
    key: "type",
    label: "Type",
    type: "select",
    options: [
      "EntrÃ©e",
      "Sortie",
      "Correction",
      "Transfert",
    ],
  },
  {
    key: "quantite",
    label: "QuantitÃ©",
    type: "number",
  },
];

export const terrainFields = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
    required: true,
  },
  {
    key: "proprietaireId",
    label: "PropriÃ©taire",
    type: "relation",
    relation: {
      module: "utilisateurs",
      collection: "utilisateurs",
      labelField: "nom",
    },
  },
  {
    key: "surfaceTotale",
    label: "Surface totale",
    type: "number",
  },
  {
    key: "vocation",
    label: "Vocation",
    type: "select",
    options: [
      "Agricole",
      "Habitation",
      "Piscicole",
      "Commercial",
    ],
  },
];

export const parcelleFields = [
  {
    key: "terrainId",
    label: "Terrain",
    type: "relation",
    relation: {
      module: "terrains",
      collection: "terrains",
      labelField: "nom",
    },
  },
  {
    key: "superficie",
    label: "Superficie",
    type: "number",
  },
  {
    key: "culture",
    label: "Culture",
    type: "text",
  },
];

export const recolteFields = [
  {
    key: "parcelleId",
    label: "Parcelle",
    type: "relation",
    relation: {
      module: "parcelles",
      collection: "parcelles",
      labelField: "id",
    },
  },
  {
    key: "dateRecolte",
    label: "Date rÃ©colte",
    type: "date",
  },
  {
    key: "quantite",
    label: "QuantitÃ©",
    type: "number",
  },
];

export const intrantFields = [
  {
    key: "nom",
    label: "Nom",
    type: "text",
  },
  {
    key: "categorie",
    label: "CatÃ©gorie",
    type: "select",
    options: [
      "Semence",
      "Engrais",
      "Traitement",
      "Alimentation",
    ],
  },
  {
    key: "stockActuel",
    label: "Stock actuel",
    type: "number",
  },
];