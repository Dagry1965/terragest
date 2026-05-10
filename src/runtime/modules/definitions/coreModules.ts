import type { ERPModule } from "../ERPModule";

export const coreERPModules: ERPModule[] = [
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
        { key: "type", label: "Type", type: "select", required: true, filterable: true, options: [{ label: "Igname", value: "igname" }, { label: "Manioc", value: "manioc" }, { label: "Arachide", value: "arachide" }, { label: "Maïs", value: "mais" }, { label: "Viande", value: "viande" }, { label: "Œufs", value: "oeufs" }, { label: "Lait", value: "lait" }, { label: "Tilapia", value: "tilapia" }, { label: "Silure", value: "silure" }, { label: "Maison", value: "maison" }, { label: "Appartement", value: "appartement" }] },
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
        { key: "type", label: "Type mouvement", type: "select", required: true, filterable: true, options: [{ label: "Entrée", value: "entree" }, { label: "Sortie", value: "sortie" }, { label: "Transfert", value: "transfert" }, { label: "Correction", value: "correction" }] },
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
      description: "Gestion agro-foncière des terrains, propriétaires, vocations, surfaces, contrats et exploitations liées.",
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

        { key: "proprietaireId", label: "Propriétaire", type: "relation", relation: "utilisateurs", required: true, filterable: true },

        { key: "vocationTerrain", label: "Terrain à vocation", type: "select", required: true, filterable: true, options: [
          { label: "Agricole", value: "agricole" },
          { label: "Habitation", value: "habitation" },
          { label: "Piscicole", value: "piscicole" },
          { label: "Élevage", value: "elevage" },
          { label: "Mixte", value: "mixte" },
          { label: "Réserve foncière", value: "reserve_fonciere" },
        ] },

        { key: "surfaceTotale", label: "Surface totale", type: "number", required: true, sortable: true },
        { key: "surfaceDisponible", label: "Surface disponible", type: "number", sortable: true },
        { key: "surfaceAgricole", label: "Surface agricole", type: "number", sortable: true },
        { key: "surfaceHabitation", label: "Surface habitation", type: "number", sortable: true },

        { key: "prixAcquisition", label: "Prix d'acquisition", type: "number", sortable: true },
        { key: "dateAcquisition", label: "Date d'acquisition", type: "date", sortable: true },

        { key: "typeContratFoncier", label: "Type de contrat foncier", type: "select", filterable: true, options: [
          { label: "Achat", value: "achat" },
          { label: "Location", value: "location" },
          { label: "Bail rural", value: "bail_rural" },
          { label: "Concession", value: "concession" },
          { label: "Donation", value: "donation" },
          { label: "Héritage", value: "heritage" },
        ] },

        { key: "referenceContrat", label: "Référence contrat", type: "text", searchable: true },

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

    actions: [
      { key: "create", label: "Créer", type: "primary", href: "/terrains/nouveau", event: "TERRAIN_CREATED" },
      { key: "edit", label: "Modifier", type: "secondary", event: "TERRAIN_UPDATED" },
      { key: "archive", label: "Archiver", type: "danger", event: "TERRAIN_ARCHIVED" },
    ],
    relations: [
      { key: "proprietaire", label: "Propriétaire", targetModule: "utilisateurs", type: "many-to-one" },
      { key: "exploitations", label: "Exploitations liées", targetModule: "exploitations", type: "one-to-many" },
      { key: "contrats", label: "Contrats fonciers", targetModule: "contrats", type: "one-to-many" },
    ],
    workflows: [
      {
        key: "create-terrain",
        label: "Création terrain",
        initialState: "draft",
        states: ["draft", "validated", "active", "archived"],
      },
    ],
  }
];