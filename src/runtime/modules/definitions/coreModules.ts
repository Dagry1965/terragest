import type { ERPModule } from "../ERPModule";
import {
  createBusinessModule,
  clientFields, commandeFields, recetteFields, depenseFields, devisFields, factureFields,
}
from "../factory";

export const coreERPModules: ERPModule[] = [
  {
    metadata: {
      key: "utilisateurs",
      label: "Utilisateurs",
      description: "RÃƒÂ©fÃƒÂ©rentiel des utilisateurs et propriÃƒÂ©taires.",
      icon: "users",
      category: "Administration",
      dashboard: false,
    },
    permissions: {
      create: true,
      read: true,
      update: true,
      delete: false,
    },
    persistence: {
      firestore: true,
      timestamps: true,
      softDelete: false,
    },
    schema: {
      collection: "utilisateurs",
      timestamps: true,
      softDelete: false,
      fields: [
        { key: "prenom", label: "PrÃƒÂ©nom", type: "text", searchable: true },
        { key: "nom", label: "Nom", type: "text", searchable: true, sortable: true },
        { key: "email", label: "Email", type: "email", searchable: true },
        { key: "role", label: "RÃƒÂ´le", type: "text", filterable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
    actions: [
      { key: "view", label: "Voir", type: "primary", event: "UTILISATEUR_VIEWED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "UTILISATEUR_UPDATED" },
    ],
    relations: [
      { key: "terrains", label: "Terrains possÃƒÂ©dÃƒÂ©s", targetModule: "terrains", type: "one-to-many" },
    ],
  },

  {
    metadata: {
      key: "produits",
      label: "Produits",
      description: "RÃƒÂ©fÃƒÂ©rentiel central des produits agricoles, animaux, piscicoles et immobiliers.",
      icon: "package",
      category: "RÃƒÂ©fÃƒÂ©rentiel",
      enabled: true,
      visible: true,
      order: 10,
      routes: {
        list: "/produits",
        create: "/produits/nouveau",
        details: "/produits",
        edit: "/produits",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
      },
    },
    schema: {
      module: "produits",
      collection: "produits",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Produit", type: "text", required: true, searchable: true, sortable: true },
        { key: "categorie", label: "CatÃƒÂ©gorie", type: "select", required: true, filterable: true, options: [{ label: "Agricole", value: "agricole" }, { label: "Animal", value: "animal" }, { label: "Piscicole", value: "piscicole" }, { label: "Immobilier", value: "immobilier" }] },
        { key: "type", label: "Type", type: "select", required: true, filterable: true, options: [{ label: "Igname", value: "igname" }, { label: "Manioc", value: "manioc" }, { label: "Arachide", value: "arachide" }, { label: "MaÃƒÂ¯s", value: "mais" }, { label: "Viande", value: "viande" }, { label: "Ã…â€™ufs", value: "oeufs" }, { label: "Lait", value: "lait" }, { label: "Tilapia", value: "tilapia" }, { label: "Silure", value: "silure" }, { label: "Maison", value: "maison" }, { label: "Appartement", value: "appartement" }] },
        { key: "modeStock", label: "Gestion de stock", type: "select", required: true, filterable: true, options: [{ label: "Stockable", value: "stockable" }, { label: "Non stockable", value: "non_stockable" }] },
        { key: "unite", label: "UnitÃƒÂ©", type: "text" },
        { key: "seuilMinimum", label: "Seuil minimum", type: "number", sortable: true },
        { key: "prixAchat", label: "Prix achat", type: "number", sortable: true },
        { key: "prixVente", label: "Prix vente", type: "number", sortable: true },
        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },
    actions: [
      { key: "create", label: "CrÃƒÂ©er", type: "primary", href: "/produits/nouveau", event: "PRODUIT_CREATED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "PRODUIT_UPDATED" },
      { key: "archive", label: "Archiver", type: "danger", event: "PRODUIT_ARCHIVED" },
    ],
    relations: [
      { key: "stocks", label: "Stocks liÃƒÂ©s", targetModule: "stocks", type: "one-to-many" },
      { key: "mouvements", label: "Mouvements de stock", targetModule: "mouvements", type: "one-to-many" },
      { key: "maintenance", label: "Maintenance", targetModule: "maintenance", type: "one-to-many" },
      { key: "interventions", label: "Interventions", targetModule: "interventions", type: "one-to-many" },
    ],
    workflows: [
      {
        key: "create-produit",
        label: "CrÃƒÂ©ation produit",
        initialState: "draft",
        states: ["draft", "validated", "active", "archived"],
      },
    ],
  },

  {
    metadata: {
      key: "stocks",
      label: "Stocks",
      description: "Suivi des stocks, niveaux, seuils et valorisation.",
      icon: "boxes",
      category: "Logistique",
      enabled: true,
      visible: true,
      order: 20,
      routes: {
        list: "/stocks",
        create: "/stocks/nouveau",
        details: "/stocks",
        edit: "/stocks",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "stocks",
      collection: "stocks",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "produitId", label: "Produit", type: "relation", relation: "produits", required: true, filterable: true },
        { key: "quantite", label: "QuantitÃƒÂ©", type: "number", required: true, sortable: true },
        { key: "unite", label: "UnitÃƒÂ©", type: "text" },
        { key: "seuilAlerte", label: "Seuil alerte", type: "number", sortable: true },
        { key: "emplacement", label: "Emplacement", type: "text", searchable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "mouvements",
      label: "Mouvements",
      description: "EntrÃƒÂ©es, sorties, corrections et transferts de stock.",
      icon: "repeat",
      category: "Logistique",
      enabled: true,
      visible: true,
      order: 30,
      routes: {
        list: "/mouvements",
        create: "/mouvements/nouveau",
        details: "/mouvements",
        edit: "/mouvements",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
      },
    },
    schema: {
      module: "mouvements",
      collection: "mouvements",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "produitId", label: "Produit", type: "relation", relation: "produits", required: true, filterable: true },
        { key: "stockId", label: "Stock", type: "relation", relation: "stocks", required: true },
        { key: "type", label: "Type mouvement", type: "select", required: true, filterable: true, options: [{ label: "EntrÃƒÂ©e", value: "entree" }, { label: "Sortie", value: "sortie" }, { label: "Transfert", value: "transfert" }, { label: "Correction", value: "correction" }] },
        { key: "quantite", label: "QuantitÃƒÂ©", type: "number", required: true, sortable: true },
        { key: "motif", label: "Motif", type: "text", searchable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "maintenance",
      label: "Maintenance",
      description: "Maintenance prÃƒÂ©ventive, corrective et critique.",
      icon: "settings",
      category: "OpÃƒÂ©rations",
      enabled: true,
      visible: true,
      order: 40,
      routes: {
        list: "/maintenance",
        create: "/maintenance/nouveau",
        details: "/maintenance",
        edit: "/maintenance",
      },
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
      module: "maintenance",
      collection: "maintenance",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "titre", label: "Maintenance", type: "text", required: true, searchable: true, sortable: true },
        { key: "materielId", label: "MatÃƒÂ©riel", type: "relation", relation: "materiels" },
        { key: "produitId", label: "Produit consommÃƒÂ©", type: "relation", relation: "produits" },
        { key: "priorite", label: "PrioritÃƒÂ©", type: "select", filterable: true, options: [{ label: "Basse", value: "basse" }, { label: "Normale", value: "normale" }, { label: "Haute", value: "haute" }, { label: "Critique", value: "critique" }] },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "interventions",
      label: "Interventions",
      description: "Suivi des interventions terrain, affectations et clÃƒÂ´tures.",
      icon: "wrench",
      category: "OpÃƒÂ©rations",
      enabled: true,
      visible: true,
      order: 50,
      routes: {
        list: "/interventions",
        create: "/interventions/nouveau",
        details: "/interventions",
        edit: "/interventions",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "interventions",
      collection: "interventions",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "titre", label: "Intervention", type: "text", required: true, searchable: true, sortable: true },
        { key: "materielId", label: "MatÃƒÂ©riel", type: "relation", relation: "materiels" },
        { key: "produitId", label: "Produit utilisÃƒÂ©", type: "relation", relation: "produits" },
        { key: "responsable", label: "Responsable", type: "text", searchable: true },
        { key: "statut", label: "Statut", type: "status", filterable: true },
      ],
    },
  },

  {
    metadata: {
      key: "terrains",
      label: "Terrains",
      description: "Gestion agro-fonciÃƒÂ¨re des terrains, propriÃƒÂ©taires, vocations, surfaces, contrats et exploitations liÃƒÂ©es.",
      icon: "map",
      category: "Foncier",
      enabled: true,
      visible: true,
      order: 60,
      routes: {
        list: "/terrains",
        create: "/terrains/nouveau",
        details: "/terrains",
        edit: "/terrains",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
      },
    },
    schema: {
      module: "terrains",
      collection: "terrains",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Terrain", type: "text", required: true, searchable: true, sortable: true },

        { key: "proprietaireId", label: "PropriÃƒÂ©taire", type: "relation", relation: "utilisateurs", required: true, filterable: true },

        { key: "vocationTerrain", label: "Terrain ÃƒÂ  vocation", type: "select", required: true, filterable: true, options: [
          { label: "Agricole", value: "agricole" },
          { label: "Habitation", value: "habitation" },
          { label: "Piscicole", value: "piscicole" },
          { label: "Ãƒâ€°levage", value: "elevage" },
          { label: "Mixte", value: "mixte" },
          { label: "RÃƒÂ©serve fonciÃƒÂ¨re", value: "reserve_fonciere" },
        ] },

        { key: "surfaceTotale", label: "Surface totale", type: "number", required: true, sortable: true },

        //  VisibilitÃƒÂ© conditionnelle ajoutÃƒÂ©e sur les champs demandÃƒÂ©s
        { 
          key: "surfaceAgricole", 
          label: "Surface agricole", 
          type: "number", 
          sortable: true,
          visibility: {
            field: "vocationTerrain",
            equals: "agricole",
          },
        },
        { 
          key: "surfaceHabitation", 
          label: "Surface habitation", 
          type: "number", 
          sortable: true,
          visibility: {
            field: "vocationTerrain",
            equals: "habitation",
          },
        },

	  //  Champ computed ajoutÃƒÂ©
  {
    key: "surfaceDisponible",
    label: "Surface disponible",
    type: "number",
    sortable: true,

    computed: {
      formula: "surfaceTotale - surfaceOccupee",
      dependsOn: ["surfaceTotale", "surfaceOccupee"],
    },
  },


        { key: "prixAcquisition", label: "Prix d'acquisition", type: "number", sortable: true },
        { key: "dateAcquisition", label: "Date d'acquisition", type: "date", sortable: true },

        { key: "typeContratFoncier", label: "Type de contrat foncier", type: "select", filterable: true, options: [
          { label: "Achat", value: "achat" },
          { label: "Location", value: "location" },
          { label: "Bail rural", value: "bail_rural" },
          { label: "Concession", value: "concession" },
          { label: "Donation", value: "donation" },
          { label: "HÃƒÂ©ritage", value: "heritage" },
        ] },

        { key: "referenceContrat", label: "RÃƒÂ©fÃƒÂ©rence contrat", type: "text", searchable: true },

        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },

    form: {
      layout: "tabs",

      tabs: [
        {
          key: "general",
          label: "Informations",
          fields: [
            "nom",
            "proprietaireId",
            "vocationTerrain",
            "statut",
          ],
        },

        {
          key: "surfaces",
          label: "Surfaces",
          fields: [
            "surfaceTotale",
            "surfaceDisponible",
            "surfaceAgricole",
            "surfaceHabitation",
          ],
        },

        {
          key: "contrat",
          label: "Contrat foncier",
          fields: [
            "typeContratFoncier",
            "referenceContrat",
            "prixAcquisition",
            "dateAcquisition",
          ],
        },
      ],
    },

    // VisibilitÃƒÂ© au niveau du module (conservÃƒÂ©e de la demande prÃƒÂ©cÃƒÂ©dente)
    visibility: {
      field: "vocationTerrain",
      equals: "agricole",
    },

    actions: [
      { key: "create", label: "CrÃƒÂ©er", type: "primary", href: "/terrains/nouveau", event: "TERRAIN_CREATED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "TERRAIN_UPDATED" },
      { key: "archive", label: "Archiver", type: "danger", event: "TERRAIN_ARCHIVED" },
    ],
    relations: [
      { key: "proprietaire", label: "PropriÃƒÂ©taire", targetModule: "utilisateurs", type: "many-to-one" },
      { key: "exploitations", label: "Exploitations liÃƒÂ©es", targetModule: "exploitations", type: "one-to-many" },
      { key: "contrats", label: "Contrats fonciers", targetModule: "contrats", type: "one-to-many" },
    ],
    workflows: [
      {
        key: "create-terrain",
        label: "CrÃƒÂ©ation terrain",
        initialState: "draft",
        states: ["draft", "validated", "active", "archived"],
      },
    ],
  }
  ,

  {
    metadata: {
      key: "fournisseurs",
      label: "Fournisseurs",
      description: "Gestion des fournisseurs, partenaires et prestataires.",
      icon: "building",
      category: "RÃ©fÃ©rentiel",
      enabled: true,
      visible: true,
      order: 90,
      routes: {
        list: "/fournisseurs",
        create: "/fournisseurs/nouveau",
        details: "/fournisseurs",
        edit: "/fournisseurs",
      },
      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        automation: true,
        notifications: true,
        audit: true,
        realtime: true,
      },
    },
    schema: {
      module: "fournisseurs",
      collection: "fournisseurs",
      timestamps: true,
      softDelete: true,
      fields: [
        { key: "nom", label: "Nom", type: "text", required: true, searchable: true, sortable: true },
        { key: "email", label: "Email", type: "email", searchable: true },
        { key: "telephone", label: "TÃ©lÃ©phone", type: "text", searchable: true },
        {
          key: "categorie",
          label: "CatÃ©gorie",
          type: "select",
          options: [
            { label: "Agricole", value: "agricole" },
            { label: "MatÃ©riel", value: "materiel" },
            { label: "Service", value: "service" },
            { label: "Transport", value: "transport" },
            { label: "Autre", value: "autre" },
          ],
        },
        { key: "statut", label: "Statut", type: "status", required: true, filterable: true },
      ],
    },
    actions: [
      { key: "create", label: "CrÃ©er", type: "primary", href: "/fournisseurs/nouveau", event: "FOURNISSEUR_CREATED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "FOURNISSEUR_UPDATED" },
      { key: "archive", label: "Archiver", type: "danger", event: "FOURNISSEUR_ARCHIVED" },
    ],
    workflows: [
      {
        key: "create-fournisseur",
        label: "CrÃ©ation fournisseur",
        initialState: "draft",
        states: ["draft", "validated", "active", "archived"],
      },
    ],
  },
  createBusinessModule({
    key: "clients",
    label: "Clients",
    description: "Gestion centralisÃ©e des clients.",
    fields: clientFields,
  }),
  createBusinessModule({
    key: "devis",
    label: "Devis",
    description: "Gestion des devis.",
    fields: devisFields,
  }),

  {
    metadata: {
      key: "achats",
      label: "Achats",
      description: "Module ERP Achats.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/achats",
        create: "/achats/nouveau",
        details: "/achats",
        edit: "/achats",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "achats",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "livraisons",
      label: "Livraisons",
      description: "Module ERP Livraisons.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/livraisons",
        create: "/livraisons/nouveau",
        details: "/livraisons",
        edit: "/livraisons",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "livraisons",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "employes",
      label: "Employes",
      description: "Module ERP Employes.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/employes",
        create: "/employes/nouveau",
        details: "/employes",
        edit: "/employes",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "employes",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "taches",
      label: "Taches",
      description: "Module ERP Taches.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/taches",
        create: "/taches/nouveau",
        details: "/taches",
        edit: "/taches",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "taches",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "incidents",
      label: "Incidents",
      description: "Module ERP Incidents.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/incidents",
        create: "/incidents/nouveau",
        details: "/incidents",
        edit: "/incidents",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "incidents",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "vehicules",
      label: "Vehicules",
      description: "Module ERP Vehicules.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/vehicules",
        create: "/vehicules/nouveau",
        details: "/vehicules",
        edit: "/vehicules",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "vehicules",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "parcelles",
      label: "Parcelles",
      description: "Module ERP Parcelles.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/parcelles",
        create: "/parcelles/nouveau",
        details: "/parcelles",
        edit: "/parcelles",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "parcelles",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "recoltes",
      label: "Recoltes",
      description: "Module ERP Recoltes.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/recoltes",
        create: "/recoltes/nouveau",
        details: "/recoltes",
        edit: "/recoltes",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

     schema: {
  collection: "recoltes",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },

  {
    metadata: {
      key: "intrants",
      label: "Intrants",
      description: "Module ERP Intrants.",
      icon: "package",
      category: "Metier",
      enabled: true,

      routes: {
        list: "/intrants",
        create: "/intrants/nouveau",
        details: "/intrants",
        edit: "/intrants",
      },

      features: {
        dashboard: true,
        analytics: true,
        workflows: true,
        audit: true,
        realtime: true,
        automation: true,
        notifications: true,
        observability: true,
      },
    },

    schema: {
  collection: "intrants",
      fields: [
        {
          key: "nom",
          label: "Nom",
          type: "text",
          required: true,
        },
      ],
    },
  },
  createBusinessModule({
    key: "depenses",
    label: "DÃ©penses",
    description: "Gestion des dÃ©penses.",
    fields: depenseFields,
  }),
  createBusinessModule({
    key: "recettes",
    label: "Recettes",
    description: "Gestion des recettes.",
    fields: recetteFields,
  }),

];