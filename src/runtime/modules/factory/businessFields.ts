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
  { key: "reference", label: "Référence", type: "text", required: true },
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
    options: ["Prévue", "En cours", "Livrée", "Annulée"],
  },
];

export const achatFields = [
  { key: "reference", label: "Référence", type: "text", required: true },
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
    options: ["Brouillon", "Validé", "Réceptionné", "Annulé"],
  },
];

export const employeFields = [
  { key: "nom", label: "Nom", type: "text", required: true },
  { key: "prenom", label: "Prénom", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "telephone", label: "Téléphone", type: "text" },
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
  { key: "modele", label: "Modèle", type: "text" },
  { key: "typeVehicule", label: "Type véhicule", type: "select", options: ["Voiture", "Camion", "Tracteur", "Moto", "Autre"] },
  { key: "kilometrage", label: "Kilométrage", type: "number" },
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
    label: "Catégorie",
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
    label: "Quantité",
    type: "number",
    required: true,
  },
  {
    key: "unite",
    label: "Unité",
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
    options: ["Entrée", "Sortie", "Correction", "Transfert"],
  },
  { key: "quantite", label: "Quantité", type: "number", required: true },
  { key: "dateMouvement", label: "Date mouvement", type: "date" },
  { key: "motif", label: "Motif", type: "textarea" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Brouillon", "Validé", "Annulé"],
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
    label: "Propriétaire",
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
    label: "Produit récolté",
    type: "relation",
    relation: {
      module: "produits",
      collection: "produits",
      labelField: "nom",
    },
  },
  { key: "dateRecolte", label: "Date récolte", type: "date" },
  { key: "quantite", label: "Quantité", type: "number" },
  { key: "unite", label: "Unité", type: "text" },
  { key: "qualite", label: "Qualité", type: "select", options: ["A", "B", "C"] },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Prévue", "Récoltée", "Stockée", "Vendue"],
  },
];

export const intrantFields = [
  { key: "nom", label: "Nom", type: "text", required: true },
  {
    key: "categorie",
    label: "Catégorie",
    type: "select",
    options: ["Semence", "Engrais", "Traitement", "Alimentation", "Carburant", "Autre"],
  },
  { key: "unite", label: "Unité", type: "text" },
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
  { key: "telephone", label: "Téléphone", type: "text" },
  { key: "adresse", label: "Adresse", type: "textarea" },
  { key: "categorie", label: "Catégorie", type: "select", options: ["Intrants", "Matériel", "Services", "Transport", "Autre"] },
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
    label: "Matériel",
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
  { key: "cout", label: "Coût", type: "number" },
  { key: "description", label: "Description", type: "textarea" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Planifiée", "En cours", "Terminée", "Annulée"],
  },
];

export const maintenanceFields = [
  { key: "titre", label: "Titre", type: "text", required: true },
  {
    key: "materielId",
    label: "Matériel",
    type: "relation",
    relation: {
      module: "materiels",
      collection: "materiels",
      labelField: "nom",
    },
  },
  {
    key: "priorite",
    label: "Priorité",
    type: "select",
    options: ["Basse", "Normale", "Haute", "Critique"],
  },
  { key: "datePrevue", label: "Date prévue", type: "date" },
  { key: "coutEstime", label: "Coût estimé", type: "number" },
  { key: "description", label: "Description", type: "textarea" },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Ouverte", "Planifiée", "En cours", "Clôturée"],
  },
];

export const incidentFields = [
  { key: "titre", label: "Titre", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea" },
  {
    key: "moduleConcerne",
    label: "Module concerné",
    type: "text",
  },
  {
    key: "gravite",
    label: "Gravité",
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
    options: ["Ouvert", "En cours", "Résolu", "Clos"],
  },
];

export const tacheFields = [
  { key: "titre", label: "Titre", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea" },
  {
    key: "assigneA",
    label: "Assigné à",
    type: "relation",
    relation: {
      module: "utilisateurs",
      collection: "utilisateurs",
      labelField: "nom",
    },
  },
  { key: "dateEcheance", label: "Date échéance", type: "date" },
  {
    key: "priorite",
    label: "Priorité",
    type: "select",
    options: ["Basse", "Normale", "Haute", "Critique"],
  },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["À faire", "En cours", "Terminée", "Annulée"],
  },
];

export const utilisateurFields = [
  { key: "nom", label: "Nom", type: "text", required: true },
  { key: "prenom", label: "Prénom", type: "text" },
  { key: "email", label: "Email", type: "email", required: true },
  { key: "telephone", label: "Téléphone", type: "text" },
  {
    key: "role",
    label: "Rôle",
    type: "select",
    options: ["Admin", "Manager", "Employé", "Lecteur"],
  },
  {
    key: "statut",
    label: "Statut",
    type: "select",
    options: ["Actif", "Inactif", "Suspendu"],
  },
];
