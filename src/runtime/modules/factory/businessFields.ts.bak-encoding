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
  { key: "reference", label: "RÃ©fÃ©rence", type: "text", required: true },
  {
    key: "commandeId",
    label: "Commande",
    type: "relation",
    relation: {
      module: "commandes",
      collection: "commandes",
      labelField: "reference",
    },
  },
  {
    key: "clientId",
    label: "Client",
    type: "relation",
    relation: {
      module: "clients",
      collection: "clients",
      labelField: "nom",
    },
  },
  { key: "dateLivraison", label: "Date livraison", type: "date" },
  { key: "adresseLivraison", label: "Adresse livraison", type: "textarea" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["PrÃ©vue", "En cours", "LivrÃ©e", "AnnulÃ©e"],
  },
];

export const achatFields = [
  { key: "reference", label: "RÃ©fÃ©rence", type: "text", required: true },
  {
    key: "fournisseurId",
    label: "Fournisseur",
    type: "relation",
    relation: {
      module: "fournisseurs",
      collection: "fournisseurs",
      labelField: "nom",
    },
  },
  { key: "dateAchat", label: "Date achat", type: "date" },
  { key: "montantHT", label: "Montant HT", type: "number" },
  { key: "montantTTC", label: "Montant TTC", type: "number" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Brouillon", "ValidÃ©", "RÃ©ceptionnÃ©", "AnnulÃ©"],
  },
];

export const employeFields = [
  { key: "nom", label: "Nom", type: "text", required: true },
  { key: "prenom", label: "PrÃ©nom", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "telephone", label: "TÃ©lÃ©phone", type: "text" },
  { key: "poste", label: "Poste", type: "text" },
  { key: "dateEmbauche", label: "Date embauche", type: "date" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Actif", "Suspendu", "Sorti"],
  },
];

export const vehiculeFields = [
  { key: "immatriculation", label: "Immatriculation", type: "text", required: true },
  { key: "marque", label: "Marque", type: "text" },
  { key: "modele", label: "ModÃ¨le", type: "text" },
  { key: "typeVehicule", label: "Type vÃ©hicule", type: "select", options: ["Voiture", "Camion", "Tracteur", "Moto", "Autre"] },
  { key: "kilometrage", label: "KilomÃ©trage", type: "number" },
  { key: "dateMiseEnService", label: "Date mise en service", type: "date" },
  { key: "couleur", label: "Couleur", type: "text" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Disponible", "En service", "En maintenance", "Hors service"],
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
    key: "produitId",
    label: "Produit",
    type: "relation",
    relation: {
      module: "produits",
      collection: "produits",
      labelField: "nom",
    },
  },
  {
    key: "type",
    label: "Type",
    type: "select",
    required: true,
    options: ["EntrÃ©e", "Sortie", "Correction", "Transfert"],
  },
  { key: "quantite", label: "QuantitÃ©", type: "number", required: true },
  { key: "dateMouvement", label: "Date mouvement", type: "date" },
  { key: "motif", label: "Motif", type: "textarea" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Brouillon", "ValidÃ©", "AnnulÃ©"],
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
  { key: "nom", label: "Nom", type: "text", required: true },
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
  { key: "superficie", label: "Superficie", type: "number" },
  { key: "culture", label: "Culture", type: "text" },
  { key: "localisation", label: "Localisation", type: "text" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Disponible", "En culture", "Repos", "Indisponible"],
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
      labelField: "nom",
    },
  },
  {
    key: "produitId",
    label: "Produit rÃ©coltÃ©",
    type: "relation",
    relation: {
      module: "produits",
      collection: "produits",
      labelField: "nom",
    },
  },
  { key: "dateRecolte", label: "Date rÃ©colte", type: "date" },
  { key: "quantite", label: "QuantitÃ©", type: "number" },
  { key: "unite", label: "UnitÃ©", type: "text" },
  { key: "qualite", label: "QualitÃ©", type: "select", options: ["A", "B", "C"] },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["PrÃ©vue", "RÃ©coltÃ©e", "StockÃ©e", "Vendue"],
  },
];

export const intrantFields = [
  { key: "nom", label: "Nom", type: "text", required: true },
  {
    key: "categorie",
    label: "CatÃ©gorie",
    type: "select",
    options: ["Semence", "Engrais", "Traitement", "Alimentation", "Carburant", "Autre"],
  },
  { key: "unite", label: "UnitÃ©", type: "text" },
  { key: "stockActuel", label: "Stock actuel", type: "number" },
  { key: "seuilAlerte", label: "Seuil alerte", type: "number" },
  { key: "prixUnitaire", label: "Prix unitaire", type: "number" },
  {
    key: "fournisseurId",
    label: "Fournisseur",
    type: "relation",
    relation: {
      module: "fournisseurs",
      collection: "fournisseurs",
      labelField: "nom",
    },
  },
];
export const fournisseurFields = [
  { key: "nom", label: "Nom", type: "text", required: true },
  { key: "contact", label: "Contact", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "telephone", label: "TÃ©lÃ©phone", type: "text" },
  { key: "adresse", label: "Adresse", type: "textarea" },
  { key: "categorie", label: "CatÃ©gorie", type: "select", options: ["Intrants", "MatÃ©riel", "Services", "Transport", "Autre"] },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Actif", "Inactif", "Suspendu"],
  },
];

export const interventionFields = [
  { key: "titre", label: "Titre", type: "text", required: true },
  {
    key: "materielId",
    label: "MatÃ©riel",
    type: "relation",
    relation: {
      module: "materiels",
      collection: "materiels",
      labelField: "nom",
    },
  },
  {
    key: "responsableId",
    label: "Responsable",
    type: "relation",
    relation: {
      module: "utilisateurs",
      collection: "utilisateurs",
      labelField: "nom",
    },
  },
  { key: "dateIntervention", label: "Date intervention", type: "date" },
  { key: "cout", label: "CoÃ»t", type: "number" },
  { key: "description", label: "Description", type: "textarea" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["PlanifiÃ©e", "En cours", "TerminÃ©e", "AnnulÃ©e"],
  },
];

export const maintenanceFields = [
  { key: "titre", label: "Titre", type: "text", required: true },
  {
    key: "materielId",
    label: "MatÃ©riel",
    type: "relation",
    relation: {
      module: "materiels",
      collection: "materiels",
      labelField: "nom",
    },
  },
  {
    key: "priorite",
    label: "PrioritÃ©",
    type: "select",
    options: ["Basse", "Normale", "Haute", "Critique"],
  },
  { key: "datePrevue", label: "Date prÃ©vue", type: "date" },
  { key: "coutEstime", label: "CoÃ»t estimÃ©", type: "number" },
  { key: "description", label: "Description", type: "textarea" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Ouverte", "PlanifiÃ©e", "En cours", "ClÃ´turÃ©e"],
  },
];

export const incidentFields = [
  { key: "titre", label: "Titre", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea" },
  {
    key: "moduleConcerne",
    label: "Module concernÃ©",
    type: "text",
  },
  {
    key: "gravite",
    label: "GravitÃ©",
    type: "select",
    options: ["Faible", "Moyenne", "Haute", "Critique"],
  },
  { key: "dateIncident", label: "Date incident", type: "date" },
  {
    key: "responsableId",
    label: "Responsable",
    type: "relation",
    relation: {
      module: "utilisateurs",
      collection: "utilisateurs",
      labelField: "nom",
    },
  },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Ouvert", "En cours", "RÃ©solu", "Clos"],
  },
];

export const tacheFields = [
  { key: "titre", label: "Titre", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea" },
  {
    key: "assigneA",
    label: "AssignÃ© Ã ",
    type: "relation",
    relation: {
      module: "utilisateurs",
      collection: "utilisateurs",
      labelField: "nom",
    },
  },
  { key: "dateEcheance", label: "Date Ã©chÃ©ance", type: "date" },
  {
    key: "priorite",
    label: "PrioritÃ©",
    type: "select",
    options: ["Basse", "Normale", "Haute", "Critique"],
  },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Ã€ faire", "En cours", "TerminÃ©e", "AnnulÃ©e"],
  },
];

export const utilisateurFields = [
  { key: "nom", label: "Nom", type: "text", required: true },
  { key: "prenom", label: "PrÃ©nom", type: "text" },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "telephone", label: "TÃ©lÃ©phone", type: "text" },
  {
    key: "role",
    label: "RÃ´le",
    type: "select",
    options: ["Admin", "Manager", "EmployÃ©", "Lecteur"],
  },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Actif", "Inactif", "Suspendu"],
  },
];
