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
  { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
  { key: "dateCommande", label: "Date commande", type: "date", required: true, sortable: true },
  { key: "montantTotal", label: "Montant total", type: "number", sortable: true },
  { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
];

export const factureFields = [
  { key: "numero", label: "Numéro facture", type: "text", required: true, searchable: true, sortable: true },
  { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
  { key: "commandeId", label: "Commande", type: "relation", relation: "commandes" },
  { key: "dateFacture", label: "Date facture", type: "date", required: true, sortable: true },
  { key: "montantHT", label: "Montant HT", type: "number", sortable: true },
  { key: "montantTTC", label: "Montant TTC", type: "number", sortable: true },
  { key: "statut", label: "Statut", type: "status", required: true, filterable: true },

];

export const devisFields = [
  { key: "numero", label: "Numéro devis", type: "text", required: true, searchable: true, sortable: true },
  { key: "clientId", label: "Client", type: "relation", relation: "clients", required: true, filterable: true },
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
